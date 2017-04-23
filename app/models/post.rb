class Post < ApplicationRecord
  # after_initialize :set_defaults, unless: :persisted?

  validates_presence_of :title
  validates_presence_of :media

  belongs_to :category
  belongs_to :user

  has_many :comments
  has_many :post_votes
  has_one :media

  paginates_per 2

  def funny_count
    self.post_votes.where(vote_type: :funny).size
  end

  def smart_count
    self.post_votes.where(vote_type: :smart).size
  end

  def negative_count
    self.post_votes.where(vote_type: :negative).size
  end

  # def vote
  #   PostVote.create(user_id: current_user.id, post_id: id, vote_type: :funny)
  # end
end
