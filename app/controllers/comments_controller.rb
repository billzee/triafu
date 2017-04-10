class CommentsController < ApplicationController

  def index
    c = paginated_comments
    @paginated_comments = {comments: c, total_pages: c.total_pages}
  end

  def create
    if Comment.create comment_params
      json_comments params[:post_id], params[:page]
    end
  end

  private

  def paginated_comments page=1, per=2
    c = Comment.all_from_post params[:post_id]
    page = params[:page] unless params[:page] == nil
    c = c.page(page).per(per)
  end

  def comment_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id])
  end

  def reply_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id], reply_to: params[:comment_id])
  end
end
