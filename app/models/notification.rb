class Notification < ApplicationRecord
  enum topic: [ :post_upvote, :post_comment, :comment_upvote, :comment_reply, :reply_upvote ]

  before_create :validate_recipient
  after_create_commit { NotificationBroadcastJob.perform_now self }

  belongs_to :user

  protected

  def validate_recipient
    if self.recipient_id == self.actor_id then throw(:abort) end
  end
end
