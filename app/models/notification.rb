class Notification < ApplicationRecord
  acts_as_paranoid

  before_create :validate_recipient
  after_create_commit { NotificationBroadcastJob.perform_now self }

  belongs_to :user
  belongs_to :actor, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  belongs_to :post

  paginates_per 9

  def self.unread
    where(read_at: nil).order(created_at: :desc)
  end

  def self.latest_read
    where.not(read_at: nil).order(created_at: :desc).take(6)
  end

  def self.total_unread
    self.unread.count
  end

  protected

  def validate_recipient
    if self.user_id == self.actor_id then throw(:abort) end
  end
end
