class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    ActionCable.server.broadcast("notification:user_#{notification.user_id}", notification: render_notification(notification))
  end

  private

  def render_notification notification
    ApplicationController.render('notifications/notification', locals: { :@notification => notification })
  end
end
