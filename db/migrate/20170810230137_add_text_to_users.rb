class AddTextToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :text, :text
  end
end
