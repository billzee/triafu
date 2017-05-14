class PostImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # before :cache, :capture_size_before_cache # callback, example here: http://goo.gl/9VGHI
  #
  # def capture_size_before_cache(new_file)
  #   if model.image_upload_width.nil? || model.image_upload_height.nil?
  #     model.image_upload_width, model.image_upload_height = `identify -format "%wx %h" #{new_file.path}`.split(/x/).map { |dim| dim.to_i }
  #   end
  # end

  storage :file
  # storage :fog

  before :store, :remember_cache_id
  after :store, :delete_tmp_dir
  after :store, :remove_original_file

  def remember_cache_id(new_file)
    @cache_id_was = cache_id
  end

  def delete_tmp_dir(new_file)
    if @cache_id_was.present? && @cache_id_was =~ /\A[\d]{8}\-[\d]{4}\-[\d]+\-[\d]{4}\z/
      FileUtils.rm_rf(File.join(root, cache_dir, @cache_id_was))
    end
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def remove_original_file(p)
    if self.version_name.nil?
      self.file.delete if self.file.exists?
    end
  end

  version :jpg do
    process :resize_to_limit => [600, -1]
  end

  def default_url
    "#{model.class.to_s.underscore.downcase}/#{mounted_as}/missing/" + [version_name, 'missing.png'].compact.join('_')
  end

  def filename
    super.chomp(File.extname(super)) + '.jpg'
  end

  def extension_white_list
    %w(jpg jpeg png bmp tif tiff)
  end
end
