class CommentsController < ApplicationController

  def index
    respond_to do |format|
      format.json {render :json => Comment.comments_and_replies(params[:post_id]) }
    end
  end

  def create
    if Comment.create comment_params
      respond_to do |format|
        comments = Comment.where(post_id: params[:post_id]).order(created_at: :desc)
        format.json {render :json => comments.to_json(:include => :replies)}
      end
    end
  end

  def reply
    reply = Reply.new reply_params
    if reply.save reply_params
      respond_to do |format|
        comments = Comment.where(post_id: params[:post_id]).order(created_at: :desc)
        format.json {render :json => comments.to_json(:include => :replies)}
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id])
  end

  def reply_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id], reply_to: params[:comment_id])
  end
end
