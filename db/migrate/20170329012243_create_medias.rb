class CreateMedias < ActiveRecord::Migration[5.0]
  def change
    create_table :medias do |t|
      t.string :image
      t.integer :post_id

      t.timestamps
    end
  end
end
