class ReplyVoteController < ApplicationController
  before_action :authenticate_user!

  def index
    if request.format.json?
      reply_vote = ReplyVote.find_by(user: current_user, reply_id: params[:reply_id])
      if reply_vote
        render :json => { :vote => reply_vote.vote }
      else
        render :json => {}
      end
    end
  end

  def create
    reply_vote = ReplyVote.find_by(user: current_user, reply_id: params[:reply_id])

    if reply_vote
      reply_vote.vote = vote_params[:vote]
      if !reply_vote.vote_changed?
        render :json => {} and return
      end
      should_notificate = false
    else
      reply_vote = ReplyVote.new vote_params
      should_notificate = true
    end

    if reply_vote.save

      if reply_vote.vote == true && should_notificate
        Notification.create user: reply_vote.reply.user, actor: current_user,
        notifiable: reply_vote, post: reply_vote.post
      end

      render :json => { :vote => reply_vote.vote }
    else
      render :json => { :errors => reply_vote.errors }
    end
  end

  private

  def vote_params
    params.require(:reply_vote).permit(:vote).merge(user: current_user, reply_id: params[:reply_id])
  end
end
