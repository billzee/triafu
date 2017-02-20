class PostsController < ApplicationController

  def index
    @posts = Post.all.order created_at: :desc
  end

  def create
    if Post.create post_params
      redirect_to posts_path
    end
  end

  private

  def post_params
    params.require(:post).permit :title
  end
end
