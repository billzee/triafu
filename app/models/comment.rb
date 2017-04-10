class Comment < ApplicationRecord
  belongs_to :post
  has_many :replies, foreign_key: :reply_to

  default_scope { where(reply_to: nil) }
  validates_presence_of :post_id

  has_many :replies, foreign_key: :reply_to
  # paginates_per 2

  def self.with_replies post_id
    where(post_id: post_id).includes(:replies)
  end
end
