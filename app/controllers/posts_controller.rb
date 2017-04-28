class PostsController < ApplicationController
  before_action :authenticate_user!, :except => [:show, :index]
  @@new_post = Post.new

  def index
    @paginated_posts = paginated_posts
  end

  def show
    @post = Post.find(params[:id])
  end

  def upload_media
    @@new_post = Post.new post_image_params
    render :json => {}
  end

  def remove_media
    @@new_post.image = nil
    render :json => {}
  end

  def create
    @@new_post.update post_params

    if @@new_post.save
      respond_to do |format|
        format.html {redirect_to @@new_post}
        format.json {render json: @@new_post.id}
      end
    else
      render :json => { :errors => @@new_post.errors }
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

  def post_image_params
    params.require(:post).permit :image
  end
end
