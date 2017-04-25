class PostVote < ApplicationRecord
  enum vote: [ :funny, :smart, :negative ]

  belongs_to :post
  belongs_to :user

  validates_uniqueness_of :user_id, :scope => :post_id
end
