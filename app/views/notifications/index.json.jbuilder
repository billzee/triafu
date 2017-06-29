json.notifications @notifications do |notification|
  json.id notification.id
  json.topic notification.topic

  json.actor notification.actor.username
end
