class RepliesController < ApplicationController
  before_action :authenticate_user!, :except => :index
  PAGINATES_PER = 9

  def index
    if request.format.json?
      @paginated_replies = paginated_replies
    end
  end

  def create
    @reply = Reply.new reply_params
    if @reply.save

      author = Comment.find(params[:comment_id]).user
      Notification.create recipient_id: author.id, actor_id: current_user.id, topic: :comment_reply

      render :show
    else
      render :json => { :errors => @reply.errors }
    end
  end

  private

  def paginated_replies page=1
    r = Reply.all_from_comment params[:comment_id]
    page = params[:page] unless params[:page] == nil
    r = {replies: Kaminari.paginate_array(r).page(page).per(PAGINATES_PER), comment_id: params[:comment_id].to_i}
  end

  def reply_params
    params.require(:reply).permit(:text).merge(comment_id: params[:comment_id], user: current_user)
  end
end
