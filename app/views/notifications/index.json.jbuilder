json.notifications @notifications do |notification|
  post = notification.notifiable.post

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
  json.read_at notification.read_at

  json.url post_path(post.reference_id)
end

json.total_unread current_user.notifications.total_unread
