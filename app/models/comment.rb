class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  has_many :replies
  has_many :comment_votes

  validates_presence_of :post_id

  validates :text, length: { maximum: 500 }, presence: true

  paginates_per 9

  def self.all_from_post post_id
    where(post_id: post_id).order(created_at: :asc).sort_by(&:points).reverse
  end

  def points
    upvote_count - downvote_count
  end

  def downvote_count
    comment_votes.where(vote: false).size
  end

  def upvote_count
    comment_votes.where(vote: true).size
  end
end
