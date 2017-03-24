class Reply < ApplicationRecord
  self.table_name = 'comments'

  before_save do
    self.post_id = Comment.find(self.parent_id).post_id
    p 'aquiiiiii', self.post_id
  end
  validates_presence_of :post_id

  belongs_to :parent, class_name: "Comment"
end
