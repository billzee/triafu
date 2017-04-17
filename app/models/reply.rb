class Reply < ApplicationRecord
  belongs_to :comment
  belongs_to :user

  validates_presence_of :comment_id

  paginates_per 9

  def self.all_from_comment comment_id
    where(comment_id: comment_id)
  end
end
