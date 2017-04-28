class Media < ApplicationRecord
  attr_accessor :image_upload_width, :image_upload_height

  mount_uploader :image, ImageUploader
  mount_uploader :video, ImageUploader

  validates_presence_of :image, :unless => :video?
  validates_presence_of :video, :unless => :image?

  validates_processing_of :image
  validate :check_image_dimensions

  belongs_to :post

  def check_image_dimensions
    ::Rails.logger.info "Avatar upload dimensions: #{self.image_upload_width}x#{self.image_upload_height}"
    errors.add :image, "Dimensions of uploaded image should be not less than 150x150 pixels." if self.image_upload_width < 150 || image_upload_height < 150
  end

  def uploading?
    image_upload_width.present? && image_upload_height.present?
  end
end
