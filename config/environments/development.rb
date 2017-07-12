Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # facebook
  ENV['FACEBOOK_KEY'] = "1029182447212780"
  ENV['FACEBOOK_SECRET'] = "bd605ca83f4559e6bfce4bb416cd2623"

  # google
  ENV['GOOGLE_OAUTH2_KEY'] = "970037955727-rb604a2n487bg3p2bff7d9ispmp5ktl7.apps.googleusercontent.com"
  ENV['GOOGLE_OAUTH2_SECRET'] = "lgn9EluUvU1WAiq9ahJ0dO0g"

  # aws s3
  ENV['S3_BUCKET_NAME'] = "triafu-development"
  ENV['S3_KEY'] = "AKIAJ4MWWZ6DIH2P3LGA"
  ENV['S3_SECRET'] = "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"
  ENV['S3_URL'] = "http://s3.amazonaws.com/#{ENV['S3_BUCKET_NAME']}/"

  # zoho
  ENV['ZOHO_MAIL'] = "vindiesel@triafu.com.br"
  ENV['ZOHO_PASS'] = "57d1f0f8c0928960f607b4077f072c7c"

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=172800'
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # mailer
  config.action_mailer.perform_deliveries = false
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_caching = false
  config.action_mailer.default_url_options = { host: 'localhost', port: 5000 }

  config.action_mailer.default :charset => "utf-8"

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: "smtp.zoho.com",
    port: 465,
    user_name: ENV['ZOHO_MAIL'],
    password: ENV['ZOHO_PASS'],
    domain: "triafu.com.br",
    authentication: :login,
    ssl: true,
    tls: true,
    enable_starttls_auto: true
  }

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

end
