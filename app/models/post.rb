class Post < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?
  
  validates_presence_of :title
  validates_presence_of :media

  belongs_to :category
  belongs_to :user

  has_many :comments
  has_one :media

  paginates_per 2

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
