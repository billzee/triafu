class ReplyVote < ApplicationRecord
  belongs_to :reply
  belongs_to :user
  
  has_one :post, through: :reply

  validates_uniqueness_of :user_id, :scope => :reply_id
end
