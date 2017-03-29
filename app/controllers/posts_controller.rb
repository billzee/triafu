class PostsController < ApplicationController

  def index
    @posts = Post.order(created_at: :desc)
    respond_to do |format|
      format.html
      format.json {render :json => @posts}
    end
  end

  def upload_image
    @@world = post_params[:image]
  end

  def create
    post = Post.new post_params
    if post.save
      p post.image
      redirect_to posts_path
    end
  end

  def vote
    post = Post.find(params[:post_id])
    post.vote params[:type]
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :image, :funny_count).merge(image: @@world)
  end

  def uploaded_image
    params.require(:post).permit :image
  end
end
