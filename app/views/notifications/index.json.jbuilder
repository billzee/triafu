json.notifications @notifications do |notification|
  topic = notification.notifiable.class.to_s.underscore
  post = notification.notifiable.post

  case topic
  when "post_vote"
    topic = notification.notifiable.vote

    if post.image.file
      json.image post.image.url
    elsif post.video.file
      json.image post.video.url(:screenshot)
    end

  when "comment"
    if post.image.file
      json.image post.image.url
    elsif post.video.file
      json.image post.video.url(:screenshot)
    end
  else
    json.image notification.actor.image
  end

  json.id notification.id
  json.topic topic
  json.actor notification.actor.username
  json.created_at notification.created_at

  json.url post_path(post.reference_id)
end

json.total_unread @notifications.unread.count
