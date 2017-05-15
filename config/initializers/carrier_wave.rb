require 'carrierwave/orm/activerecord'

dir = Rails.root.join('lib', 'carrierwave_processing')
$LOAD_PATH.unshift(dir)
Dir[File.join(dir, "*.rb")].each { |file| require File.basename(file) }
