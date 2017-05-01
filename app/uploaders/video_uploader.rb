class VideoUploader < CarrierWave::Uploader::Base
    # include CarrierWave::FFmpeg
    include CarrierWave::Video::Thumbnailer

    RESOLUTIONS = [
        { version: :p360, resolution: '640x360'},
        { version: :p240, resolution: '427x240'}
      ]

    # Choose what kind of storage to use for this uploader:
    storage :file

    # Override the directory where uploaded files will be stored.
    # This is a sensible default for uploaders that are meant to be mounted:
    # def store_dir
    #   "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    # end
    #
    # before :store, :remember_cache_id
    # after :store, :delete_tmp_dir

    # store! nil's the cache_id after it finishes so we need to remember it for deletion
    # def remember_cache_id(new_file)
    #   @cache_id_was = cache_id
    # end
    #
    # def delete_tmp_dir(new_file)
    #   if @cache_id_was.present? && @cache_id_was =~ /\A[\d]{8}\-[\d]{4}\-[\d]+\-[\d]{4}\z/
    #     FileUtils.rm_rf(File.join(root, cache_dir, @cache_id_was))
    #   end
    # end

    # version :mp4 do
    #   process encode: [:mp4]
    #
    #   def full_filename(for_file)
    #     super.chomp(File.extname(super)) + '.mp4'
    #   end
    #
    #   RESOLUTIONS.each do |resolution|
    #     version resolution[:version], if: "bigger_than_#{resolution[:resolution]}?".to_sym
    #
    #     version resolution[:version] do
    #       process encode: [:mp4, resolution: resolution[:resolution]]
    #     end
    #   end
    # end

    # version :webm do
    #   process encode: [:webm]
    #
    #   def full_filename(for_file)
    #     super.chomp(File.extname(super)) + '.webm'
    #   end
    #
    #   RESOLUTIONS.each do |resolution|
    #     version resolution[:version], if: "bigger_than_#{resolution[:resolution]}?".to_sym
    #
    #     version resolution[:version] do
    #       process encode: [:webm, resolution: resolution[:resolution]]
    #     end
    #   end
    # end
    
    # RESOLUTIONS.each do |resolution|
    #   define_method("bigger_than_#{resolution[:resolution]}?") do |argument|
    #     movie(argument.path).resolution > resolution[:resolution] ? true : false
    #   end
    # end

    # Add a white list of extensions which are allowed to be uploaded.
    def extension_white_list
      %w(mp4 mov avi mkv 3gp mpg mpeg)
    end

    version :thumb do
      process thumbnail: [{quality: 8, size: 150, square: true, strip: true, logger: Rails.logger}]
      def full_filename for_file
        png_name for_file, version_name
      end
    end

    def png_name for_file, version_name
      %Q{#{version_name}_#{for_file.chomp(File.extname(for_file))}.png}
    end
end
