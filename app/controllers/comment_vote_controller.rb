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
      shouldNotificate = false
    else
      comment_vote = CommentVote.new vote_params
      shouldNotificate = true
    end

    if comment_vote.save

      if comment_vote.vote && shouldNotificate
        author = Comment.find(comment_vote.comment.post_id).user
        Notification.create user: author, actor: current_user, notifiable: comment_vote
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
