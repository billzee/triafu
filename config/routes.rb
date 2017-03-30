Rails.application.routes.draw do

  resources :posts, only: [:index, :create] do
    get :vote

    resources :comments, only: [:index, :create] do
      post :reply
    end
  end

  match 'post/upload_media' => 'posts#upload_media', :via => :post

  root :to => "posts#index"
end
