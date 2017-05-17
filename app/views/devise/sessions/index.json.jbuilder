json.user do
  json.email @current_user.email
  json.username @current_user.username
  json.full_name @current_user.full_name
  json.username_changed @current_user.username_changed

  if @current_user.avatar.file
    if @current_user.avatar.versions.include?(:thumb)
      json.image @current_user.image.thumb.url
    else
      json.image @current_user.avatar.url
    end
  else
    json.image @current_user.image
  end

  if @current_user.facebook_uid then json.facebook_connected true end
  if @current_user.google_oauth2_uid then json.google_connected true end
end
