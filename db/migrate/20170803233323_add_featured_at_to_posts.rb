class AddFeaturedAtToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :featured_at, :datetime, default: nil
  end
end
