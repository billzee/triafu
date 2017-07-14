class PostVoteController < ApplicationController
  before_action :authenticate_user!, only: [:create]

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

      if post_vote.vote == :funny || post_vote.vote == :smart && should_notificate
        Notification.create user: post_vote.post.user, actor: current_user,
        notifiable: post_vote, post: post_vote.post
      end

      render :json => { :vote => post_vote.vote }
    else
      render :json => { :errors => post_vote.errors }
    end
  end

  private

  def vote_params
    params.require(:post_vote).permit(:vote).merge(user: current_user, post_id: params[:post_id])
  end
end
