class CreatePostVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :post_votes do |t|
      t.integer :post_id
      t.integer :user_id

      t.integer :vote

      t.timestamps
    end
  end
end
