class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :text
      t.integer :upvotes
      t.integer :downvotes

      t.string :image

      t.integer :post_id
      t.integer :user_id

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :comments, :deleted_at
  end
end
