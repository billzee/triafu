class NotificationsController < ApplicationController
  before_action :authenticate_user!

  def bell
    if request.format.json?
      @notifications = bell_notifications
    end
  end

  def index
    if request.format.json?
      @paginated_notifications = paginated_notifications
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
      render :json => {totalUnread: current_user.notifications.total_unread}
    end
  end

  private

  def bell_notifications
    current_user.notifications.sort_by { |a| [a ? 1 : 0, a] }.reverse.take(6)
  end

  def paginated_notifications
    notifications = current_user.notifications
    page = params[:page] ? params[:page] : 1
    notifications = notifications.page(page)
  end
end
