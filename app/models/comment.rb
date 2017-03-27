class Comment < ApplicationRecord
  belongs_to :post
  has_many :replies, foreign_key: :reply_to

  default_scope { where(reply_to: nil) }
  validates_presence_of :post_id

  def self.comments_and_replies post_id
    self.where(post_id: post_id).order(created_at: :desc).to_json(:include => :replies)
  end
end
