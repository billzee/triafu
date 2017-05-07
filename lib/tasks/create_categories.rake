namespace :create_categories do
  desc "Creates top category"
  task top: :environment do
    Category.create id: 1, title: "Top"
  end

  desc "Creates new category"
  task new: :environment do
    Category.create id: 2, title: "Novas"
  end

end
