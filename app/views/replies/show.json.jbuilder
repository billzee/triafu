json.reply do
  json.id @reply.id
  json.text @reply.text
  json.created_at @reply.created_at

  json.points @reply.points

  json.user do
    json.id @reply.user.id
    json.username @reply.user.username
    json.avatar @reply.user.avatar
  end
end

json.comment_id @reply[:comment_id]
