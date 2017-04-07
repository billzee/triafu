class Media < ApplicationRecord
  mount_uploader :image, ImageUploader
  mount_uploader :video, ImageUploader

  validates_presence_of :image, :unless => :video?
  validates_presence_of :video, :unless => :image?

  validates_processing_of :image
  validate :image_size_validation

  belongs_to :post

  private

  def image_size_validation
    errors[:image] << "should be less than 500KB" if image.size > 5.megabytes
  end
end
