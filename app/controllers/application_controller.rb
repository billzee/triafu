class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :check_for_mobile

  before_action :configure_permitted_parameters, if: :devise_controller?

  def check_for_mobile
    session[:mobile_override] = params[:mobile] if params[:mobile]
    prepare_for_mobile if mobile_device?
  end

  def prepare_for_mobile
    prepend_view_path ([Rails.root + 'app' + 'views_mobile', Rails.root + 'app' + 'views'])
  end

  def mobile_device?
    # if session[:mobile_override]
    #   session[:mobile_override] == "1"
    # else
      # Season this regexp to taste. I prefer to treat iPad as non-mobile.
      (request.user_agent =~ /Mobile|webOS/)
    # end
  end

  helper_method :user_logged_in?
  helper_method :mobile_device?

  def configure_permitted_parameters
    added_attrs = [:full_name, :username, :email, :password, :password_confirmation]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
