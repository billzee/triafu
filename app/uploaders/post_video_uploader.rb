class PostVideoUploader < CarrierWave::Uploader::Base
  include CarrierWave::FFMPEG

  storage :fog
  after :store, :remove_original_file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.reference_id}"
  end

  def remove_original_file(p)
    if self.version_name.nil?
      self.file.delete if self.file.exists?
    end
  end

  version :mp4 do
    process encode_video: [:mp4]

    def full_filename(for_file)
      super.chomp(File.extname(super)) + '.mp4'
    end
  end

  version :webm do
    process encode_video: [:webm]

    def full_filename(for_file)
      super.chomp(File.extname(super)) + '.webm'
    end
  end

  def extension_white_list
    %w(mp4 mov avi mkv 3gp mpg mpeg gif)
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end
