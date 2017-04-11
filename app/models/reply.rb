class Reply < ApplicationRecord
  default_scope { where("reply_to IS NOT NULL") }
  self.table_name = 'comments'
  belongs_to :comment

  validates_presence_of :reply_to

  paginates_per 3

  def self.all_from_comment comment_id
    where(reply_to: comment_id)
  end
end
