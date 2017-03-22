class Post < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?

  validates_presence_of :title
  mount_uploader :image, ImageUploader

  validates_processing_of :image
  validate :image_size_validation

  has_many :comments

  def vote type
    self[type] = self[type] + 1
    self.save
  end

  def set_defaults
    self.funny_count = 0
    self.smart_count = 0
    self.negative_count = 0
  end

  private

  def image_size_validation
    errors[:image] << "should be less than 500KB" if image.size > 0.5.megabytes
  end
end
