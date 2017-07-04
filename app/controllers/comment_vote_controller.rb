class CommentVoteController < ApplicationController
  before_action :user_logged_in?, only: :index
  before_action :authenticate_user!, only: :create

  def index
    if request.format.json?
      comment_vote = CommentVote.find_by(user: current_user, comment_id: params[:comment_id])
      if comment_vote
        render :json => { :vote => comment_vote.vote }
      else
        render :json => {}
      end
    end
  end

  def create
    comment_vote = CommentVote.find_by(user: current_user, comment_id: params[:comment_id])

    if comment_vote
      comment_vote.vote = vote_params[:vote]
      if !comment_vote.vote_changed?
        render :json => {} and return
      end
      should_notificate = false
    else
      comment_vote = CommentVote.new vote_params
      should_notificate = true
    end

    if comment_vote.save

      if comment_vote.vote == true && should_notificate
        Notification.create user: comment_vote.comment.user,
        actor: current_user, notifiable: comment_vote, post: comment_vote.post
      end

      render :json => { :vote => comment_vote.vote }
    else
      render :json => { :errors => comment_vote.errors }
    end
  end

  private

  def user_logged_in?
    render :json => {} unless current_user
  end

  def vote_params
    params.require(:comment_vote).permit(:vote).merge(user: current_user, comment_id: params[:comment_id])
  end
end
