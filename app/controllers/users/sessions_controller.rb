class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  def index
    if request.format.json?
      @current_user = current_user
    end
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in, username: self.resource.username)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_to do |format|
      format.html {respond_with resource, location: after_sign_in_path_for(resource)}
      format.json {render json: resource.invalid? ? resource.errors : resource}
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
