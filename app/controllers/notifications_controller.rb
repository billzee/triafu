class NotificationsController < ApplicationController
  before_action :user_logged_in?

  def index
    if request.format.json?
      @notifications = Notification.where(user: current_user)
    end
  end

  private

  def user_logged_in?
    render :json => {} unless current_user
  end
end
