json.user do
  if @current_user.facebook_uid then json.facebook_connected true end
  if @current_user.google_oauth2_uid then json.google_connected true end
end
