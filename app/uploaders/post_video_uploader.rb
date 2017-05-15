class PostVideoUploader < CarrierWave::Uploader::Base
  include CarrierWave::FFmpeg

  MAX_RESOLUTION = '640x360'

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
  before :store, :remember_cache_id
  after :store, :delete_tmp_dir
  after :store, :remove_original_file
  after :cache, :bigger_than_max_resolution?

  def remove_original_file(p)
    if self.version_name.nil?
      self.file.delete if self.file.exists?
    end
  end

  def unlink_original(file)
    return unless delete_original_file
    file.delete if version_name.blank?
  end

  def remember_cache_id(new_file)
    @cache_id_was = cache_id
  end

  def delete_tmp_dir(new_file)
    if @cache_id_was.present? && @cache_id_was =~ /\A[\d]{8}\-[\d]{4}\-[\d]+\-[\d]{4}\z/
      FileUtils.rm_rf(File.join(root, cache_dir, @cache_id_was))
    end
  end

  version :mp4 do
    process encode: [:mp4, resolution: MAX_RESOLUTION], if: :bigger_than_max_resolution?
    process encode: [:mp4], if: :smaller_than_max_resolution?

    def full_filename(for_file)
      super.chomp(File.extname(super)) + '.mp4'
    end
  end

  version :webm do
    process encode: [:webm, resolution: MAX_RESOLUTION], if: :bigger_than_max_resolution?
    process encode: [:webm], if: :smaller_than_max_resolution?

    def full_filename(for_file)
      super.chomp(File.extname(super)) + '.webm'
    end
  end

  def bigger_than_max_resolution?(file)
    movie(file.path).resolution > MAX_RESOLUTION ? true : false
  end

  def smaller_than_max_resolution?(file)
    movie(file.path).resolution <= MAX_RESOLUTION ? true : false
  end

  def extension_white_list
    %w(mp4 mov avi mkv 3gp mpg mpeg gif)
  end
end
