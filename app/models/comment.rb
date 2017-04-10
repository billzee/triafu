class Comment < ApplicationRecord
  belongs_to :post
  has_many :replies, foreign_key: :reply_to
  paginates_per 9

  default_scope { where(reply_to: nil) }
  validates_presence_of :post_id

  has_many :replies, -> { limit 3 }, foreign_key: :reply_to

  def self.all_from_post post_id
    where(post_id: post_id).order(created_at: :desc)
  end
end
