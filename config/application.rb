require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Triafu
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.time_zone = 'America/Sao_Paulo'

    config.i18n.default_locale = 'pt-BR'
    config.autoload_paths  = %W(#{config.root}/lib)

    config.exceptions_app = self.routes

    config.to_prepare do
      Devise::Mailer.layout "mailer" # email.haml or email.erb
    end

    ENV['S3_KEY'] = ""
    ENV['S3_SECRET'] = ""
  end
end
