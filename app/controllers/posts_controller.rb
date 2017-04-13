class PostsController < ApplicationController

  before_action :authenticate_user!, :except => [:show, :index]

  def index
    @paginated_posts = paginated_posts
  end

  def show
    @post = Post.find(params[:id])
  end

  def upload_media
    @@media = Media.new media_params
  end

  def create
    if @@media.save
      post = Post.new post_params
      post.media = @@media
      if post.save
        respond_to do |format|
          format.html {redirect_to post}
          format.json {render json: post.id, status: :ok}
        end
      end
    end
  end

  def vote
    post = Post.find(params[:post_id])
    post.vote params[:type]
    redirect_to posts_path
  end

  private

  def paginated_posts page=1
    posts = Post.all
    page = params[:page] unless params[:page] == nil
    posts = posts.page(page)
  end

  def post_params
    params.require(:post).permit(:title, :original).merge(user_id: current_user.id)
  end

  def media_params
    params.require(:media).permit :image
  end
end
