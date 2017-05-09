Rails.application.routes.draw do

  get 'hello_world', to: 'hello_world#index'
  devise_for :users,
  :controllers  =>
  {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions',
    :omniauth_callbacks => "users/omniauth_callbacks"
  }

  as :user do
    get 'users/edit/password', to: 'users/registrations#edit_password', as: :edit_user_registration_password
  end

  concern :paginatable do
    get '(page/:page)', action: :index, on: :collection, as: ''
  end

  shallow do

    resources :posts, concerns: :paginatable, only: [:index, :create, :show], path_names: { index: 'new/:id' } do
      resources :post_vote, only: [:index, :create]

      resources :comments, concerns: :paginatable, only: [:index, :create] do
        resources :comment_vote, only: [:index, :create]

        resources :replies, concerns: :paginatable, only: [:index, :create] do
          resources :reply_vote, only: [:index, :create]
        end
      end
    end

  end

  post 'post/upload_file' => 'posts#upload_file'
  get 'post/remove_file' => 'posts#remove_file'

  root :to => "posts#index"
end
