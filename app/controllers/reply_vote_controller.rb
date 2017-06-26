class ReplyVoteController < ApplicationController
  before_action :user_logged_in?, only: :index
  before_action :authenticate_user!, only: :create

  def index
    if request.format.json?
      reply_vote = ReplyVote.find_by(user_id: current_user.id, reply_id: params[:reply_id])
      if reply_vote
        render :json => { :vote => reply_vote.vote }
      else
        render :json => {}
      end
    end
  end

  def create
    reply_vote = ReplyVote.find_by(user_id: current_user.id, reply_id: params[:reply_id])

    if reply_vote
      reply_vote.vote = vote_params[:vote]
      if !reply_vote.vote_changed?
        render :json => {} and return
      end
    else
      reply_vote = ReplyVote.new vote_params
    end

    if reply_vote.save

      author = Reply.find(params[:reply_id]).user
      Notification.create recipient_id: author.id, actor_id: current_user.id, topic: :reply_upvote

      render :json => { :vote => reply_vote.vote }
    else
      render :json => { :errors => reply_vote.errors }
    end
  end

  private

  def user_logged_in?
    render :json => {} unless current_user
  end

  def vote_params
    params.require(:reply_vote).permit(:vote).merge(user_id: current_user.id, reply_id: params[:reply_id])
  end
end
