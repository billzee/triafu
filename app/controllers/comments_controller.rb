class CommentsController < ApplicationController

  before_action :authenticate_user!, :except => :index

  def index
    @paginated_comments = paginated_comments
  end

  def create
    @comment = Comment.new comment_params
    if @comment.save
      @paginated_comments = paginated_comments
      render action: "index"
    else
      render :json => { :errors => @comment.errors }
    end
  end

  private

  def paginated_comments page=1
    c = Comment.all_from_post params[:post_id]
    page = params[:page] unless params[:page] == nil
    c = c.page(page)
  end

  def comment_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id]).merge(user_id: current_user.id)
  end

  def reply_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id], comment_id: params[:comment_id])
  end
end
