class PostsController < ApplicationController
  before_action :authenticate_user!, :except => [:show, :index]

  def index
    @paginated_posts = paginated_posts
    @@media = nil
  end

  def show
    @post = Post.find(params[:id])
  end

  def upload_media
    @@media = Media.new media_params
  end

  def remove_media
    @@media = nil
  end

  def create
    @post = Post.new post_params

    if @@media
      if @@media.save
        @post.media = @@media
        if @post.save
          respond_to do |format|
            format.html {redirect_to @post}
            format.json {render json: @post.id, status: :ok}
          end
        else
          render :json => { :errors => @post.errors }
        end
      else
        render :json => { :errors => @media.errors }
      end
    else
      render :json => { :errors => {media: "não pode ficar em branco"} }
    end
  end

  def vote
    post_vote = PostVote.find_by(user_id: current_user.id, post_id: params[:post_id])

    if post_vote
      post_vote.vote = vote_params[:vote]
      if !post_vote.vote_changed?
        render :json => {} and return
      end
    else
      post_vote = PostVote.new vote_params
    end

    if post_vote.save
      render :json => { :vote => post_vote.vote }
    else
      render :json => { :errors => post_vote.errors }
    end
  end

  private

  def paginated_posts page=1
    posts = Post.all
    page = params[:page] unless params[:page] == nil
    posts = posts.page(page)
  end

  def vote_params
    params.require(:post_vote).permit(:vote).merge(user_id: current_user.id, post_id: params[:post_id])
  end

  def post_params
    params.require(:post).permit(:title, :original).merge(user_id: current_user.id)
  end

  def media_params
    params.require(:media).permit :image
  end
end
