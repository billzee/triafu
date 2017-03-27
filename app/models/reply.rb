class Reply < ApplicationRecord
  default_scope { where("reply_to IS NOT NULL") }
  self.table_name = 'comments'
  belongs_to :comment

  before_save do
    self.post_id = Comment.find(self.reply_to).post_id
  end

  validates_presence_of :post_id
  validates_presence_of :reply_to
end
