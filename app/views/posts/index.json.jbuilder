json.posts @paginated_posts do |post|
  json.merge! post.attributes

  json.media post.media
end

json.last_page @paginated_posts.last_page?
