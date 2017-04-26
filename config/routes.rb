Rails.application.routes.draw do

  devise_for :users,
  :controllers  =>
  {
    :registrations => 'users/registrations'
  }

  as :user do
    get 'users/edit/password', to: 'users/registrations#edit_password', as: :edit_user_registration_password
  end

  concern :paginatable do
    get '(page/:page)', action: :index, on: :collection, as: ''
  end

  shallow do
    resources :posts, concerns: :paginatable, only: [:index, :create, :show] do
      resources :post_vote, only: [:index, :create]

      resources :comments, concerns: :paginatable, only: [:index, :create] do
        resources :comment_vote, only: [:index, :create]

        resources :replies, concerns: :paginatable, only: [:index, :create] do
          resources :reply_vote, only: [:index, :create]
        end

      end
    end
  end

  post 'post/upload_media' => 'posts#upload_media'
  get 'post/remove_media' => 'posts#remove_media'

  root :to => "posts#index"
end
