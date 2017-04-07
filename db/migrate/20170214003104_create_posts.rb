class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :original
      t.integer :funny_count
      t.integer :smart_count
      t.integer :negative_count

      t.integer :category_id

      t.timestamps
    end
  end
end
