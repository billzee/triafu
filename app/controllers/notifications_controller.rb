class NotificationsController < ApplicationController
  before_action :authenticate_user!

  def index
    if request.format.json?
      @notifications = json_notifications
    end
  end

  def show_all
    @notifications = paginated_notifications
  end

  def read
    if request.format.json?
      notifications = current_user.notifications.unread.first(6)
      if notifications.size > 0
        notifications.each do |notification|
          notification.update_column(:read_at, Time.zone.now)
        end
      end

      @notifications = json_notifications
      render :index
    end
  end

  private

  def json_notifications
    current_user.notifications.sort_by { |a| [a ? 1 : 0, a] }.reverse.take(6)
  end

  def paginated_notifications
    notifications = current_user.notifications
    page = params[:page] ? params[:page] : 1
    notifications = notifications.page(page)
  end
end
