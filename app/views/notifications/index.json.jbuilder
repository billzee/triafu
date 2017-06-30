json.notifications @notifications do |notification|
  topic = notification.notifiable.class.to_s.underscore

  if topic == :post
    post = notification.notifiable
  else
    post = Post.find(notification.notifiable.post_id)
  end

  json.id notification.id

  # json.action notification.action
  json.actor notification.actor.username
  json.topic topic
  json.url post_path(post.reference_id)
end
