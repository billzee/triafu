class AddHasAudioToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :has_audio, :boolean, default: false
  end
end
