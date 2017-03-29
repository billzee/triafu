Rails.application.routes.draw do

  resources :posts, only: [:index, :create] do
    get :vote

    resources :comments, only: [:index, :create] do
      post :reply
    end
  end

  match 'post/cache_image' => 'posts#cache_image', :via => :post

  root :to => "posts#index"
end
