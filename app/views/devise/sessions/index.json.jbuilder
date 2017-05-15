json.user do
  json.image @current_user.image
  json.email @current_user.email
  json.username @current_user.username
  json.full_name @current_user.full_name
  json.username_changed @current_user.username_changed

  if @current_user.facebook_uid then json.facebook_connect true end
  if @current_user.google_oauth2_uid then json.google_connect true end
end
