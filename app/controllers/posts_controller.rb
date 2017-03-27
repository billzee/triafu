class PostsController < ApplicationController

  def index
    @posts = Post.order(created_at: :desc)
    respond_to do |format|
      format.html
      format.json {render :json => @posts}
    end
  end

  def create
    if Post.create post_params
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
    params.require(:post).permit :title, :image, :funny_count
  end
end
