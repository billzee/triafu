Rails.application.routes.draw do

  concern :paginatable do
    get '(page/:page)', action: :index, on: :collection, as: ''
  end

  resources :posts, only: [:index, :create, :show] do
    get :vote

    resources :comments, concerns: :paginatable, only: [:index, :create] do
      post :reply
    end
  end

  match 'post/upload_media' => 'posts#upload_media', :via => :post


  root :to => "posts#index"
end
