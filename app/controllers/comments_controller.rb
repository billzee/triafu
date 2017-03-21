class CommentsController < ApplicationController

  def index
    @comments = Comment.order(created_at: :desc)
    respond_to do |format|
      format.json {render :json => @comments}
    end
  end

  def create
    if Comment.create comment_params
      respond_to do |format|
        comments = Comment.order(created_at: :desc)
        format.json {render :json => comments}
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit :text
  end
end
