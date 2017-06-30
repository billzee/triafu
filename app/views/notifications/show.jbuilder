json.notification do
  json.topic @notification.action
  json.actor @notification.actor.username
end
