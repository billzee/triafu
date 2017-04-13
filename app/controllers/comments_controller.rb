class CommentsController < ApplicationController

  before_action :authenticate_user!, :except => :index

  def index
    @paginated_comments = paginated_comments
  end

  def create
    if Comment.create comment_params
      @paginated_comments = paginated_comments
      render action: "index"
    end
  end

  private

  def paginated_comments page=1
    c = Comment.all_from_post params[:post_id]
    page = params[:page] unless params[:page] == nil
    c = c.page(page)
  end

  def comment_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id])
  end

  def reply_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id], reply_to: params[:comment_id])
  end
end
