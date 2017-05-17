json.comment do
  json.id @comment.id
  json.text @comment.text
  json.created_at @comment.created_at

  json.points @comment.points

  json.user do
    json.id @comment.user.id
    json.username @comment.user.username

    if @comment.user.avatar.file
      if @comment.user.avatar.versions.include?(:thumb)
        json.image @comment.user.image.thumb.url
      else
        json.image @comment.user.avatar.url
      end
    else
      json.image @comment.user.image
    end

  end
end
