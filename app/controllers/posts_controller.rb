class PostsController < ApplicationController

  def index
    @posts = Post.all.order created_at: :desc
    @comments = Comment.all.order created_at: :desc
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
    params.require(:post).permit :title, :funny_count
  end
end
