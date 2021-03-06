class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    build_resource(sign_up_params)

    if resource.invalid? && resource.errors.include?(:full_name)
      resource.generate_generic_username!
    else
      resource.generate_username!
      if resource.invalid? && resource.errors.include?(:username)
        resource.generate_secure_username!
      end
    end

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up, username: resource.username
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}", username: resource.username
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # GET /resource/edit
  # def edit
  # end

  def disconnect_social_network
    if params[:network]
      user = User.find current_user.id

      if params[:network] == "google"
        user.google_oauth2_uid = nil
        user.google_image = nil
      elsif params[:network] == "facebook"
        user.facebook_uid = nil
        user.facebook_image = nil
      end

      if user.save
        render :json => {}
      else
        render :json => {errors: user.errors}
      end

    end

    render :json => {}
  end

  def edit_password
    @user = current_user
  end

  # PUT /resource
  # def update
  #   super
  # end

  def update_password
    @user = User.find(current_user.id)
    if @user.update(user_password_params)
      bypass_sign_in(@user)
      flash[:notice] = "senha alterada!"
      redirect_to root_path
    else
      flash[:alert] = @user.errors.full_messages.first
      redirect_to edit_user_registration_password_path
    end
  end

  def update_avatar
    user = User.find(current_user.id)

    if user.update user_avatar_params
      render :json => {image: user.image}
    elsif user.errors[:avatar]
      render :json => {errors: user.errors[:avatar]}
    else
      render :json => {}
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up , keys: [:full_name, :email])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :text, :username, :email, :password, :password_confirmation])
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def user_password_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def user_avatar_params
    params.require(:user).permit :avatar
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
