class PostVote < ApplicationRecord
  enum vote_type: [ :funny, :smart, :negative ]

  has_one :post
  has_one :user
end
