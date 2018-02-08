class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  before :store, :remember_cache_id
  after :store, :delete_tmp_dir

  process :efficient_conversion => [150, 150]

  def remember_cache_id(new_file)
    @cache_id_was = cache_id
  end

  def delete_tmp_dir(new_file)
    if @cache_id_was.present? && @cache_id_was =~ /\A[\d]{8}\-[\d]{4}\-[\d]+\-[\d]{4}\z/
      FileUtils.rm_rf(File.join(root, cache_dir, @cache_id_was))
    end
  end

  def default_url
    colors = ["red", "yellow", "pink"]
    backgrounds = ["", "-inverse"]

    "https://#{ENV['S3_BUCKET_NAME']}.s3.amazonaws.com/assets/#{colors.sample}#{backgrounds.sample}.png"
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def filename
    "#{secure_token}.jpg" if original_filename.present?
  end

  def extension_whitelist
    %w(jpg jpeg png)
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end

  def efficient_conversion(width, height)
    manipulate! do |img|
      img.format("jpg") do |c|
        c.background '#FFFFFF'
        c.alpha 'remove'
        c.auto_orient
        c.fuzz        "3%"
        c.trim
        c.resize      "#{width}x#{height}^"
        c.gravity     "center"
        c.extent      "#{width}x#{height}"
      end

      img
    end
  end
end
