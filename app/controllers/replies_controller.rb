class RepliesController < ApplicationController

  def index
    @paginated_replies = paginated_replies
  end

  def create
    if Reply.create reply_params
      @paginated_replies = paginated_replies
      render action: "index"
    end
  end

  private

  def paginated_replies page=1
    r = Reply.all_from_comment params[:comment_id]
    page = params[:page] unless params[:page] == nil
    r = r.page(page)
  end

  def reply_params
    params.require(:reply).permit(:text).merge(reply_to: params[:comment_id], user: current_user)
  end
end
