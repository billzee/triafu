class Post < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?

  validates_presence_of :title
  mount_uploader :image, ImageUploader

  def vote type
    self[type] = self[type] + 1
    self.save
  end

  def set_defaults
    self.funny_count = 0
    self.smart_count = 0
    self.negative_count = 0
  end
end
