class CommentVoteController < ApplicationController
  before_action :user_logged_in?, only: :index
  before_action :authenticate_user!, only: :create

  def index
    if request.format.json?
      comment_vote = CommentVote.find_by(user_id: current_user.id, comment_id: params[:comment_id])
      if comment_vote
        render :json => { :vote => comment_vote.vote }
      else
        render :json => {}
      end
    end
  end

  def create
    comment_vote = CommentVote.find_by(user_id: current_user.id, comment_id: params[:comment_id])

    if comment_vote
      comment_vote.vote = vote_params[:vote]
      if !comment_vote.vote_changed?
        render :json => {} and return
      end
    else
      comment_vote = CommentVote.new vote_params
    end

    if comment_vote.save
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
    params.require(:comment_vote).permit(:vote).merge(user_id: current_user.id, comment_id: params[:comment_id])
  end
end
