# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://triafu.com.br"

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
  #   Article.find_each do |article|
  #     add article_path(article), :lastmod => article.updated_at
  #   end

  add newcomer_posts_path
  add top_posts_path
  add new_user_session_path

  Post.find_each do |post|
    if post.comments.size > 0
      add post_path(post.reference_id), :lastmod => post.comments.last.created_at
    else
      add post_path(post.reference_id), :lastmod => post.created_at
    end
  end

  User.find_each do |user|
    if user.posts.size > 0
      add user_posts_path(user.username), :lastmod => user.posts.last.created_at
    else
      add user_posts_path(user.username), :lastmod => user.created_at
    end
  end

end
