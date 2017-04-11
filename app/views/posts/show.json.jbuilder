json.set! :post do
  json.merge! @post.attributes
  json.set! :media, @post.media
end
