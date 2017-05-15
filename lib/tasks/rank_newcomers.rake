namespace :triafu do
  desc "Grab some newcomer posts and put them on top"
  task rank_newcomers: :environment do
    newcomers = Post.all_from_category :newcomer
    selected_posts = newcomers.sort_by(&:points).reverse.take(10)
    if selected_posts.size > 0
      selected_posts.each do |post|
        post.update_column(:category, :top)
      end
    end
  end
end
