class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.integer :actor_id

      t.integer :notifiable_id
      t.string :notifiable_type

      t.integer :action

      t.datetime :read_at
      t.timestamps
    end
  end
end
