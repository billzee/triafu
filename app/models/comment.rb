class Comment < ApplicationRecord
  belongs_to :post

  default_scope { where(reply_to: nil) }
  validates_presence_of :post_id

  has_many :replies, -> { limit(3) }, foreign_key: :reply_to

  def self.comments_and_replies post_id, page=1
    self.where(post_id: post_id).order(created_at: :desc).page(page).per(2).to_json(:include => :replies)
  end
end
