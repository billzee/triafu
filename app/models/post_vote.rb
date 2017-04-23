class PostVote < ApplicationRecord
  enum vote: [ :funny, :smart, :negative ]

  has_one :post
  has_one :user

  validate :cannot_vote_more_than_once

  private

  def cannot_vote_more_than_once
    if PostVote.where(user_id: user_id, post_id: post_id).length > 1
      errors.add(:vote, "não pode ter mais de uma ocorrência")
    end
  end
end
