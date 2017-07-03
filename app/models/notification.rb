class Notification < ApplicationRecord
  scope :unread, -> {where read_at: nil}

  before_create :validate_recipient
  after_create_commit { NotificationBroadcastJob.perform_now self }

  belongs_to :user
  belongs_to :actor, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  protected

  def validate_recipient
    if self.user_id == self.actor_id then throw(:abort) end
  end
end
