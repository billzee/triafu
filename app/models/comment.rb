class Comment < ApplicationRecord
  belongs_to :post

  default_scope { where(reply_to: nil) }
  validates_presence_of :post_id

  has_many :replies, -> { limit(3) }, foreign_key: :reply_to

  def self.comments_and_replies post_id
    self.where(post_id: post_id).order(created_at: :desc).page(1).per(1).to_json(:include => :replies)
  end
end
