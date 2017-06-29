class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    ActionCable.server.broadcast("notification:user_#{notification.recipient_id}", notification: render_notification(notification))
  end

  private

  def render_notification notification
    ApplicationController.render('notifications/notification', locals: { :@notification => notification })
  end
end
