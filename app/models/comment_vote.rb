class CommentVote < ApplicationRecord
  belongs_to :comment
  belongs_to :user

  has_one :post, through: :comment

  validates_uniqueness_of :user_id, :scope => :comment_id
end
