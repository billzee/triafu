# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://triafu.com.br"
SitemapGenerator::Sitemap.adapter = SitemapGenerator::WaveAdapter.new

SitemapGenerator::Sitemap.public_path = 'tmp/'

SitemapGenerator::Sitemap.sitemaps_host = ENV['S3_URL']

SitemapGenerator::Sitemap.create do
  add newcomer_posts_path
  add top_posts_path

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
