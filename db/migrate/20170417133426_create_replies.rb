class CreateReplies < ActiveRecord::Migration[5.0]
  def change
    create_table :replies do |t|
      t.text :text
      t.integer :upvotes
      t.integer :downvotes

      t.string :image

      t.integer :comment_id
      t.integer :user_id

      t.timestamps
    end
  end
end
