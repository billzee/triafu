class Notification < ApplicationRecord
  enum topic: [ :post_upvote, :post_comment, :comment_upvote, :comment_reply ]

  belongs_to :user
end
