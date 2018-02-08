module ApplicationHelper
  def user_posts_path?
    return url_for.starts_with? "/usuario/"
  end
end
