module CarrierWave
  module FFMPEG
    module ClassMethods
      def encode_video(target_format)
        process encode_video: [target_format]
      end
    end

    def encode_video(format)
      directory = File.dirname(current_path)
      tmpfile = File.join(directory, 'tmpfile')
      File.rename(current_path, tmpfile)

      file = ::FFMPEG::Movie.new(tmpfile)
      new_name = File.basename(current_path, '.*') + '.' + format.to_s
      current_extension = File.extname(current_path).gsub('.', '')
      encoded_file = File.join(directory, new_name)

      options = { resolution: '320x240',
        custom: %w(-vc libx264 -crf 12 -movflags +faststart -pix_fmt yuv420p)
      }

      transcoder_options = {
        f: format,
        preserve_aspect_ratio: :width
      }

      file.transcode(encoded_file, options, transcoder_options)

      # warning: magic!
      # change format for uploaded file name and store file format
      # without this lines processed video files will remain in cache folder
      self.filename[-current_extension.size..-1] = format.to_s
      self.file.file[-current_extension.size..-1] = format.to_s

      File.delete(tmpfile)
    end
  end
end
