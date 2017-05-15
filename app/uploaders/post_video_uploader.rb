class PostVideoUploader < CarrierWave::Uploader::Base
  include CarrierWave::FFMPEG

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :mp4 do
    process encode_video: [:mp4]
  end

  version :webm do
    process encode_video: [:webm]
  end

  def extension_white_list
    %w(mp4 mov avi mkv 3gp mpg mpeg gif)
  end
end
