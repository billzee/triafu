class VideoUploader < CarrierWave::Uploader::Base
    include CarrierWave::FFmpeg

    MAX_RESOLUTION = '640x360'

    # Choose what kind of storage to use for this uploader:
    storage :file

    def store_dir
      "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    end

    after :store, :unlink_original

    def unlink_original(file)
      File.delete if version_name.blank?
    end

    version :mp4 do
      if :bigger_than_max_resolution?
        process encode: [:mp4, resolution: MAX_RESOLUTION]
      else
        process encode: [:mp4]
      end

      def full_filename(for_file)
        super.chomp(File.extname(super)) + '.mp4'
      end
    end

    version :webm do
      if :bigger_than_max_resolution?
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

    protected

    def bigger_than_max_resolution?(file)
      p "to no metodo"
      p file
      movie(file.path).resolution > MAX_RESOLUTION ? true : false
    end

end
