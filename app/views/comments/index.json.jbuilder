json.comments @paginated_comments[:comments] do |comment|
  json.merge! comment.attributes
  json.replies comment.replies
end

json.total_pages @paginated_comments[:total_pages]

json.total_count @paginated_comments[:total_count]
