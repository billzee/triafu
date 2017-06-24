class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.boolean :checked

      t.integer :topic

      t.timestamps
    end
  end
end
