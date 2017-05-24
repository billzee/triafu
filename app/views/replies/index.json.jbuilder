json.replies @paginated_replies[:replies] do |reply|
  json.id reply.id
  json.text reply.text

  json.created_at reply.created_at
  json.points reply.points

  json.user do
    json.id reply.user.id
    json.username reply.user.username

    if reply.user.avatar.file
      json.image reply.user.avatar.url
    else
      json.image reply.user.image
    end

  end
end

json.comment_id @paginated_replies[:comment_id]

if @paginated_replies[:replies].size > 0
  json.last_page @paginated_replies[:replies].last_page?
else
  json.last_page true
end
