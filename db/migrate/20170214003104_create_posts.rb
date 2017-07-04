class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :reference_id
      t.string :title
      t.string :original
      t.integer :category, default: 0

      ## Media
      t.string :image
      t.string :video

      t.integer :user_id

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :posts, :deleted_at
  end
end
