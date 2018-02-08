class CreateReplies < ActiveRecord::Migration[5.1]
  def change
    create_table :replies do |t|
      t.text :text
      t.integer :upvotes
      t.integer :downvotes

      t.string :image

      t.integer :comment_id
      t.integer :user_id

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :replies, :deleted_at
  end
end
