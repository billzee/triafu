class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    render :json => @comments
  end

  def create
    Comment.create comment_params
    redirect_to posts_path
  end

  private

  def comment_params
    params.require(:comment).permit :text
  end
end
