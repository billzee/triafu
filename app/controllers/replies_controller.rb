class RepliesController < ApplicationController

  def index
    @paginated_replies = paginated_replies
  end

  def create
    @reply = Reply.new reply_params
    if @reply.save
      @paginated_replies = paginated_replies
      render action: "index"
    else
      render :json => { :errors => @reply.errors }
    end
  end

  private

  def paginated_replies page=1
    r = Reply.all_from_comment params[:comment_id]
    page = params[:page] unless params[:page] == nil
    r = r.page(page)
  end

  def reply_params
    params.require(:reply).permit(:text).merge(comment_id: params[:comment_id], user_id: current_user.id)
  end
end
