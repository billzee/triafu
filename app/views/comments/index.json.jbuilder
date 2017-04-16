json.comments @paginated_comments do |comment|
  json.merge! comment.attributes
  json.has_more_replies comment.replies.size > 2 ? true : false
  json.replies comment.replies.limit(2)
  json.user comment.user
end

json.last_page @paginated_comments.last_page?
json.total_count @paginated_comments.total_count
