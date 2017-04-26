class PostVoteController < ApplicationController
  before_action :user_logged_in?, only: :index
  before_action :authenticate_user!, only: :create

  def index
    post_vote = PostVote.find_by(user_id: current_user.id, post_id: params[:post_id])
    if post_vote
      render :json => { :vote => post_vote.vote }
    else
      render :json => {}
    end
  end

  def create
    post_vote = PostVote.find_by(user_id: current_user.id, post_id: params[:post_id])

    if post_vote
      post_vote.vote = vote_params[:vote]
      if !post_vote.vote_changed?
        render :json => {} and return
      end
    else
      post_vote = PostVote.new vote_params
    end

    if post_vote.save
      render :json => { :vote => post_vote.vote }
    else
      render :json => { :errors => post_vote.errors }
    end
  end

  private

  def user_logged_in?
    render :json => {} unless current_user
  end

  def vote_params
    params.require(:post_vote).permit(:vote).merge(user_id: current_user.id, post_id: params[:post_id])
  end
end