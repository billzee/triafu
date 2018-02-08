class CreateReplyVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :reply_votes do |t|
      t.integer :reply_id
      t.integer :user_id

      t.boolean :vote

      t.timestamps
    end
  end
end
