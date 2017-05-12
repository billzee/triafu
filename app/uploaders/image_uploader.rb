class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # before :cache, :capture_size_before_cache # callback, example here: http://goo.gl/9VGHI
  #
  # def capture_size_before_cache(new_file)
  #   if model.image_upload_width.nil? || model.image_upload_height.nil?
  #     p "no uploader"
  #     model.image_upload_width, model.image_upload_height = `identify -format "%wx %h" #{new_file.path}`.split(/x/).map { |dim| dim.to_i }
  #   end
  # end

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  after :store, :remove_original_file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def remove_original_file
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

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

  def extension_white_list
    %w(jpg jpeg png bmp tif tiff)
  end
end
