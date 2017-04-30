class RepliesController < ApplicationController
  before_action :authenticate_user!, :except => :index

  def index
    @paginated_replies = paginated_replies
  end

  def create
    @reply = Reply.new reply_params
    if @reply.save
      render :show
    else
      render :json => { :errors => @reply.errors }
    end
  end

  private

  def paginated_replies page=1
    r = Reply.all_from_comment params[:comment_id]
    page = params[:page] unless params[:page] == nil
    r = {replies: r.page(page), comment_id: params[:comment_id].to_i}
  end

  def reply_params
    params.require(:reply).permit(:text).merge(comment_id: params[:comment_id], user_id: current_user.id)
  end
end
