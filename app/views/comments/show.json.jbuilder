json.comment do
  json.id @comment.id
  json.text @comment.text
  json.created_at @comment.created_at

  json.points @comment.points

  json.user do
    json.id @comment.user.id
    json.username @comment.user.username
  end
end
