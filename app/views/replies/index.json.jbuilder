json.comments @paginated_replies do |reply|
  json.id reply.id
  json.text reply.text
  json.created_at reply.created_at

  json.user do
    json.id reply.user.id
    json.username reply.user.username
  end
end

json.last_page @paginated_replies.last_page?
