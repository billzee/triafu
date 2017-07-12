namespace :triafu do
  desc "Grab some newcomer posts and put them on top"
  task :rank_posts, [:quantity] => :environment do |t, args|
    newcomers = Post.all_from_category :newcomer
    selected_posts = newcomers.sort_by(&:points).reverse.take(args[:quantity].to_i || 0)
    if selected_posts.size > 0
      selected_posts.each do |post|
        post.update_column(:category, :top)
        p "ranking... " + post.reference_id
      end
    end
  end
end
