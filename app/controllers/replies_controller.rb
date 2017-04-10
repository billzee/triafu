class RepliesController < ApplicationController

  def index
    p 'chegou no controller'
    r = paginated_replies
    @paginated_replies = {replies: r, total_pages: r.total_pages}
  end

  def create
    if Reply.create reply_params
      p paginated_replies
    end
  end

  private

  def paginated_replies page=1, per=3
    r = Reply.all_from_comment params[:comment_id]
    page = params[:page] unless params[:page] == nil
    r = r.page(page).per(per)
  end

  def reply_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id], reply_to: params[:comment_id])
  end
end
