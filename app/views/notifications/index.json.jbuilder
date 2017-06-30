json.notifications @notifications do |notification|
  topic = notification.notifiable.class.to_s.underscore

  if topic == :post
    post = notification.notifiable

    if post.screenshot
      json.image post.screenshot
    else
      json.image post.image
    end
  else
    post = Post.find(notification.notifiable.post_id)

    json.image notification.actor.image
  end

  json.id notification.id
  json.actor notification.actor.username
  json.topic topic
  json.url post_path(post.reference_id)
end

json.total_unread @notifications.unread.count
