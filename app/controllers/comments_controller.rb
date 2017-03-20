class CommentsController < ApplicationController
  before_action :set_comment
  respond_to :html, :json

  def index
    @comments = Comment.all
    respond_with(@comments)
  end

  def create
    @comment = Comment.new comment_params

    flash[:notice] = "Task was successfully created." if @comment.save
    respond_with(@comment)

  end

  private

  def comment_params
    params.require(:comment).permit :text
  end
end
