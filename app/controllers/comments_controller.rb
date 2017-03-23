class CommentsController < ApplicationController

  def index
    @comments = Comment.where(post_id: params[:post_id]).order(created_at: :desc)
    respond_to do |format|
      format.json {render :json => @comments}
    end
  end

  def create
    if Comment.create comment_params
      respond_to do |format|
        comments = Comment.where(post_id: comment_params[:post_id]).order(created_at: :desc)
        format.json {render :json => comments}
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit :text, :post_id
  end
end
