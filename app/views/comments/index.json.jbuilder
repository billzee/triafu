json.array! @comments do |comment|
  json.merge! comment.attributes
  json.replies comment.replies
end
