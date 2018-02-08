if notification.notifiable.class.name == "PostVote"
  topic = notification.notifiable.vote.capitalize
else
  topic = notification.notifiable.class.name
end

json.id notification.id
json.topic topic
json.actor notification.actor.username
json.image notification.actor.image
json.created_at notification.created_at

if notification.post
  json.url post_path(notification.post.reference_id)
else
  json.url root_path
end
