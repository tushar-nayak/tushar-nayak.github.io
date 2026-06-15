# frozen_string_literal: true

module JekyllImagemagick
  class ImageConvert
    def self.run(input_file, output_file, flags, long_edge, resize_flags)
      Jekyll.logger.info(LOG_PREFIX, "Generating image \"#{output_file}\"")

      cmd = "magick \"#{input_file}\" #{flags} "
      if long_edge != 0
        cmd += "-resize \"#{long_edge}>\" #{resize_flags} "
      end
      cmd += "\"#{output_file}\""
      Jekyll.logger.debug(LOG_PREFIX, "Running command \"#{cmd}\"")
      run_cmd(cmd)
    end
  end
end
