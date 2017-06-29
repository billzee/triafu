class NotificationChannel < ActionCable::Channel::Base
  def subscribed
    stream_for "user_#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
