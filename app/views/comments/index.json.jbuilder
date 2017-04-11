json.comments @paginated_comments do |comment|
  json.merge! comment.attributes
  json.replies comment.replies
end

json.total_pages @paginated_comments.last_page?
json.total_count @paginated_comments.total_count
