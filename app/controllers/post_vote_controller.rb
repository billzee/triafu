class PostVoteController < ApplicationController
  before_action :user_logged_in?, only: :index
  before_action :authenticate_user!, only: :create

  def index
    if request.format.json?
      post_vote = PostVote.find_by(user: current_user, post_id: params[:post_id])
      if post_vote
        render :json => { :vote => post_vote.vote }
      else
        render :json => {}
      end
    end
  end

  def create
    post_vote = PostVote.find_by(user: current_user, post_id: params[:post_id])

    if post_vote
      post_vote.vote = vote_params[:vote]
      if !post_vote.vote_changed?
        render :json => {} and return
      end
      should_notificate = false
    else
      post_vote = PostVote.new vote_params
      should_notificate = true
    end

    if post_vote.save

      if post_vote.vote == :funny || :smart && should_notificate
        Notification.create user: post_vote.post.user, actor: current_user, notifiable: post_vote
      end

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
    params.require(:post_vote).permit(:vote).merge(user: current_user, post_id: params[:post_id])
  end
end
