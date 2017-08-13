class ConverterJob < ApplicationJob
  queue_as :default

  def perform(tmpfile, encoded_file, model, opts = {}, transcoder_opts = {})
    file = ::FFMPEG::Movie.new(tmpfile)
    if file.valid? # true (would be false if ffmpeg fails to read the movie)
      if !file.audio_stream.nil?
        model.has_audio = true
      else
        model.has_audio = false
      end
      
      file.screenshot(encoded_file, seek_time: 3, resolution: '320x240')
      file.transcode(encoded_file, opts, transcoder_opts) { |progress| puts "#{(progress * 100).round(2)} %" }
      model.model.finished! # change status and save
    else
      model.model.error!
    end

    File.delete(tmpfile)
  end
end
