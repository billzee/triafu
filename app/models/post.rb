class Post < ApplicationRecord
  attr_accessor :file, :image_upload_width, :image_upload_height

  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader

  validates_processing_of :image
  validates_integrity_of :image

  validates_presence_of :title
  validates :original, :format => URI::regexp(%w(http https)), allow_blank: true

  validates :file,
  presence: true,
  file_size: {
    greater_than_or_equal_to: 20.kilobytes,
    less_than_or_equal_to: 10.megabytes
  }

  validates :image,
  file_content_type: {
    allow: ['image/jpeg', 'image/png']
  }

  validate :permit_image_or_video

  belongs_to :category
  belongs_to :user

  has_many :comments
  has_many :post_votes

  paginates_per 2

  def permit_image_or_video
    if file
      if file.content_type.start_with?('image')
        self.image = file
      elsif file.content_type.start_with?('video')
        self.video = file
        p self.video
      else
        errors.add(:file, "formato não-suportado")
      end
    end
  end

  def set_success(format, opts)
    self.success = true
  end

  def destroy_file?
    self.image = self.video = self.file = nil
    return true
  end

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
