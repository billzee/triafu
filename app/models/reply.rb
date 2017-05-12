class Reply < ApplicationRecord
  belongs_to :comment
  belongs_to :user

  validates_presence_of :comment_id
  has_many :reply_votes

  validates :text, length: { maximum: 500 }, presence: true

  paginates_per 9

  def self.all_from_comment comment_id
    where(comment_id: comment_id).order(created_at: :asc).sort_by(&:points).reverse
  end

  def points
    upvote_count - downvote_count
  end

  def downvote_count
    reply_votes.where(vote: false).size
  end

  def upvote_count
    reply_votes.where(vote: true).size
  end
end
