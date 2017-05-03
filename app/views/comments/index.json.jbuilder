json.comments @paginated_comments do |comment|
  json.id comment.id
  json.text comment.text
  json.created_at comment.created_at

  json.points comment.points

  json.has_more_replies comment.replies.size > 2 ? true : false

  json.replies comment.replies.limit(2) do |reply|
    json.id reply.id
    json.text reply.text
    json.created_at reply.created_at

    json.points reply.points

    json.user do
      json.id reply.user.id
      json.username reply.user.username
    end
  end

  json.user do
    json.id comment.user.id
    json.username comment.user.username
  end
end

if @paginated_comments.size > 0 then json.last_page @paginated_comments.last_page? else json.last_page true end
json.total_count @paginated_comments.total_count
