class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def facebook
    if user_signed_in?
      connect_social_network
    else
      sign_in_or_sign_up_user :facebook
    end
  end

  def google_oauth2
    if user_signed_in?
      connect_social_network
    else
      sign_in_or_sign_up_user :google
    end
  end

  def failure
    redirect_to root_path
  end

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/plataformatec/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  protected

  def connect_social_network
    data = request.env["omniauth.auth"]
    info = data["info"]

    user = User.find current_user.id
    if data["provider"] == 'facebook'
      user.update facebook_uid: data["uid"], facebook_image: info["image"]
    elsif data["provider"] == 'google_oauth2'
      user.update google_oauth2_uid: data["uid"], google_image: info["image"]
    end

    user.save unless !user.changed?
    render :index
  end

  def sign_in_or_sign_up_user kind
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in @user, :event => :authentication
      set_flash_message(:notice, :success, username: @user.username, kind: kind) if is_navigational_format?
      render :index
    else
      session["omniauth_data"] = request.env["omniauth.auth"].except("extra")
      redirect_to new_user_registration_url
    end
  end

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
end
