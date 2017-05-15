class Post < ApplicationRecord
  attr_accessor :file, :media, :upload_progress

  enum category: [ :newcomer, :top ]

  validates_presence_of :title

  validates :original, :format => URI::regexp(%w(http https)), allow_blank: true

  mount_uploader :image, PostImageUploader
  mount_uploader :video, PostVideoUploader

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

  # validates :video,
  # file_size: {
  #   greater_than_or_equal_to: 50.megabytes
  # }

  validate :file_to_image_or_video
  belongs_to :user

  has_many :comments
  has_many :post_votes

  paginates_per 2

  def self.all_from_category category=:top
    where(category: category).order(updated_at: :desc)
  end

  def destroy_file?
    self.file = self.video = self.image = nil

    if self.video.file == nil &&
      self.image.file == nil &&
      self.file == nil
      return true
    else
      return false
    end
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

  protected

  def file_to_image_or_video
    if self.video.file.nil? && self.image.file.nil?
      if file
        if (file.content_type == 'image/gif' || file.content_type.start_with?('video'))
          self.video = file
        elsif file.content_type.start_with?('image')
          self.image = file
        else
          errors.add(:file, "formato não-suportado")
        end
      end
    end
  end

  # def self.ranked_currents_from_category category=:top, rank
  #   posts = []
  #   number_of_hours = 20
  #
  #   if rank
  #     while posts.size == 0 do
  #       posts = where('created_at > ?', (number_of_hours).minutes.ago)
  #       number_of_hours = number_of_hours + 20
  #     end
  #
  #     posts.order(created_at: :asc).sort_by(&(rank)).reverse
  #   end
  # end
end
