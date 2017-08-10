json.post do
  json.id @post.id
  json.reference_id @post.reference_id

  json.title @post.title
  json.user_id @post.user_id

  json.original @post.original

  json.points @post.points
  json.funny_count @post.funny_count
  json.smart_count @post.smart_count
  json.negative_count @post.negative_count

  if user_signed_in?
    json.user_vote @post.user_vote current_user.id
  end

  if @post.image.file then json.image @post.image end

  if @post.video.file
    json.video @post.video.versions
    json.has_audio @post.has_audio
  end

  json.created_at @post.created_at
  json.comment_count @post.comments.size
end
