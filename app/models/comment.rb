class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  has_many :replies

  validates_presence_of :post_id

  validates :text, presence: true

  paginates_per 9

  def self.all_from_post post_id
    where(post_id: post_id).order(created_at: :desc)
  end
end
