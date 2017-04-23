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
    self.post_votes.where(vote: :funny).size
  end

  def smart_count
    self.post_votes.where(vote: :smart).size
  end

  def negative_count
    self.post_votes.where(vote: :negative).size
  end

  def user_voted user_id
    post_votes.where(user_id: user_id, post_id: id)
  end
end
