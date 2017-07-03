json.notification do
  post = @notification.notifiable.post

  if @notification.notifiable.class == "PostVote"
    topic = @notification.notifiable.vote.capitalize
  else
    topic = @notification.notifiable.class.name
  end

  json.id @notification.id
  json.topic topic
  json.actor @notification.actor.username
  json.image @notification.actor.image
  json.created_at @notification.created_at

  json.url post_path(post.reference_id)
end
