class VideoUploader < CarrierWave::Uploader::Base
    include CarrierWave::FFmpeg

    MAX_RESOLUTION = '640x360'
    bigger = false

    # Choose what kind of storage to use for this uploader:
    storage :file

    def store_dir
      "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    end

    before :store, :remember_cache_id
    after :store, :delete_tmp_dir
    after :cache, :bigger_than_max_resolution?

    def bigger_than_max_resolution?(file)
      p "vai checar se e maior"
      bigger = movie(file.path).resolution > MAX_RESOLUTION ? true : false
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
      if bigger
        process encode: [:mp4, resolution: MAX_RESOLUTION]
      else
        process encode: [:mp4]
      end

      def full_filename(for_file)
        super.chomp(File.extname(super)) + '.mp4'
      end
    end

    version :webm do
      if bigger
        process encode: [:webm, resolution: MAX_RESOLUTION]
      else
        process encode: [:webm]
      end

      def full_filename(for_file)
        super.chomp(File.extname(super)) + '.webm'
      end
    end

    def extension_white_list
      %w(mp4 mov avi mkv 3gp mpg mpeg gif)
    end

end
