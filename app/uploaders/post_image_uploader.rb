class PostImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # storage :file
  # storage :fog

  before :store, :remember_cache_id
  after :store, :delete_tmp_dir

  process :resize_to_limit => [600, -1]

  def remember_cache_id(new_file)
    @cache_id_was = cache_id
  end

  def full_filename(for_file)
    super.chomp(File.extname(super)) + '.jpg'
  end

  def delete_tmp_dir(new_file)
    if @cache_id_was.present? && @cache_id_was =~ /\A[\d]{8}\-[\d]{4}\-[\d]+\-[\d]{4}\z/
      FileUtils.rm_rf(File.join(root, cache_dir, @cache_id_was))
    end
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg png bmp tif tiff)
  end
end
