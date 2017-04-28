class Post < ApplicationRecord
  attr_accessor :image_upload_width, :image_upload_height

  mount_uploader :image, ImageUploader
  mount_uploader :video, ImageUploader

  validates_presence_of :image, :unless => :video?
  validates_presence_of :video, :unless => :image?

  validates_processing_of :image
  validates_integrity_of :image

  validates_presence_of :title
  validates :original, :format => URI::regexp(%w(http https)), allow_blank: true

  validates :image, file_size: { less_than_or_equal_to: 5.kilobytes },
    file_content_type: { allow: ['image/jpeg', 'image/png'] }

  belongs_to :category
  belongs_to :user

  has_many :comments
  has_many :post_votes

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

  def image=(obj)
     super(obj)
   end
end
