namespace :triafu do
  desc "Grab some newcomer posts and put them on top"
  task :rank_posts, [:quantity] => :environment do |t, args|
    newcomers = Post.all_from_category :newcomer
    selected_posts = newcomers.sort_by(&:points).reverse.take(args[:quantity].to_i || 0)
    if selected_posts.size > 0
      selected_posts.each do |post|
        p "ranking... " + post.reference_id
        post.update category: :top
      end
    else
      p "nothing to be ranked ):"
    end
  end

  desc "feature the most qualified posts in the last week and remove the old ones"
  task :feature_posts, [:quantity] => :environment do |t, args|

    featured_posts = Post.where.not(featured_at: nil)
    if featured_posts.size > 0
      p "there are featured posts to be removed"
      featured_posts.each do |post|
        p "removing old featured post... " + post.reference_id
        post.update_column("featured_at", nil)
      end
    else
      p "no old post to be removed from featured"
    end

    older_posts = Post.where('updated_at >= ?', 1.week.ago)
    selected_posts = older_posts.sort_by(&:points).reverse.take(args[:quantity].to_i || 0)
    if selected_posts.size > 0
      selected_posts.each do |post|
        p "featuring... " + post.reference_id
        post.update_column("featured_at", Time.zone.now)
      end
    else
      p "nothing to be featured ):"
    end
  end
end
