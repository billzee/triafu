class Comment < ApplicationRecord
  belongs_to :post
  has_many :replies, foreign_key: :parent_id, dependent: :destroy

  validates_presence_of :post_id
end
