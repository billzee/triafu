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

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # version :normal do
  #   process :mogrify => [{
  #     :width => 600
  #   }]
  # end

  def default_url
    "#{model.class.to_s.underscore.downcase}/#{mounted_as}/missing/" + [version_name, 'missing.png'].compact.join('_')
  end

  # def filename
  #   super.chomp(File.extname(super)) + '.jpg'
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

  def extension_white_list
    %w(jpg jpeg png bmp tif tiff)
  end

  # private
  #
  # def mogrify(options = {})
  #   manipulate! do |img|
  #     img.format("jpg") do |c|
  #       c.fuzz        "3%"
  #       c.trim
  #       c.width      "#{options[:width]}>" if options.has_key?(:width)
  #       c.resize      "#{options[:resolution]}<" if options.has_key?(:resolution)
  #       c.profile.+   "!xmp,*"
  #       c.profile     "#{Rails.root}/lib/color_profiles/sRGB_v4_ICC_preference_displayclass.icc"
  #       c.colorspace  "sRGB"
  #     end
  #     img
  #   end
  # end

end
