class Post < ApplicationRecord
  # after_initialize :set_defaults, unless: :persisted?

  validates_presence_of :title
  validates_presence_of :media
  validates :original, :format => URI::regexp(%w(http https)), allow_blank: true

  belongs_to :category
  belongs_to :user

  has_many :comments
  has_many :post_votes
  has_one :media

  paginates_per 2

  def points
    funny_count + smart_count - negative_count
  end

  def funny_count
    post_votes.where(vote: :funny).size
  end

  def smart_count
    post_votes.where(vote: :smart).size
  end

  def negative_count
    post_votes.where(vote: :negative).size
  end

  def user_vote user_id
    post_votes.find_by(user_id: user_id) ? post_votes.find_by(user_id: user_id).vote : nil
  end
end
