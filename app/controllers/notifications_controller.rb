class NotificationsController < ApplicationController
  before_action :user_logged_in?

  def index
    if request.format.json?
      @notifications = pick_notifications
    end
  end

  def read
    if request.format.json?
      notifications = current_user.notifications.unread.first(6)
      if notifications.size > 0
        notifications.each do |notification|
          notification.update_column(:read_at, Time.zone.now)
        end
      end

      @notifications = pick_notifications
      render :index
    end
  end

  private

  def pick_notifications
    return current_user.notifications.sort_by { |a| [a ? 1 : 0, a] }.reverse.take(6)
  end

  def user_logged_in?
    render :json => {} unless current_user
  end
end
