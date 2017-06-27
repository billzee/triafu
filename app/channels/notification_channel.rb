class NotificationChannel < ApplicationCable::Channel
  def subscribed
    p "subscribed?"
  end
end
