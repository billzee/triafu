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

      # notify comment author
      comment = @reply.comment
      Notification.create user: comment.user, actor: current_user, notifiable: @reply

      # notify everyone on comment thread
      comment.replies.uniq.each do |reply|
        if comment.user.id != reply.user.id
          Notification.create user: reply.user, actor: current_user, notifiable: @reply
        end
      end

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
