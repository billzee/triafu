json.user do
  json.image @current_user.image
  json.email @current_user.email
  json.username @current_user.username
  json.full_name @current_user.full_name
  json.username_changed @current_user.username_changed
end
