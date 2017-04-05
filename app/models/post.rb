class Post < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?
  validates_presence_of :title

  has_many :comments
  has_one :media

  def vote type
    self[type] = self[type] + 1
    self.save
  end

  def set_defaults
    self.funny_count = 0
    self.smart_count = 0
    self.negative_count = 0
  end

  def self.with_media id
    self.find(id).to_json(:include => :media)
  end

  def self.all_with_media
    self.order(created_at: :desc).to_json(:include => :media)
  end

  private

  def image_size_validation
    errors[:image] << "should be less than 500KB" if image.size > 0.5.megabytes
  end
end
