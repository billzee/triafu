Rails.application.routes.draw do

  devise_for :users,
  controllers:
  {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions',
    :confirmations => 'users/confirmations',
    :omniauth_callbacks => "users/omniauth_callbacks"
  },
  path: 'conta',
  path_names:
  {
    sign_in: 'entrar',
    sign_out: 'sair',
    sign_up: 'registrar',
    password: 'senha',
    confirmation: 'confirmacao',
    edit: 'editar/perfil'
  }

  as :user do
    get 'current_user', to: 'users/sessions#index'

    get 'conta/editar/senha', to: 'users/registrations#edit_password', as: :edit_user_registration_password
    get 'conta/editar/imagem', to: 'users/registrations#edit_image', as: :edit_user_registration_image

    get 'usuario/:username', to: 'posts#index', as: :user_posts

    put 'user/disconnect_social_network', to: 'users/registrations#disconnect_social_network'

    put 'user/update_password', to: 'users/registrations#update_password'
    put 'user/update_avatar', to: 'users/registrations#update_avatar'
  end

  concern :paginatable do
    get '(page/:page)', action: :index, on: :collection, as: ''
  end

  shallow do

    resources :posts, concerns: :paginatable, only: [:index, :create] do
      resources :post_vote, only: [:index, :create]

      resources :comments, concerns: :paginatable, only: [:index, :create] do
        resources :comment_vote, only: [:index, :create]

        resources :replies, concerns: :paginatable, only: [:index, :create] do
          resources :reply_vote, only: [:index, :create]
        end
      end
    end

  end

  resources :notifications, concerns: :paginatable, only: [:index] do
    get 'bell', to: 'notifications#bell', on: :collection
    get 'read', to: 'notifications#read', on: :collection
  end

  get 'pub/:reference_id' => 'posts#show', as: :post
  get 'post_json/:reference_id' => 'posts#show_json'

  post 'post/upload_file' => 'posts#upload_file'
  delete 'post/remove_file' => 'posts#remove_file'

  get '/top' => 'posts#index', category: "top", as: :top_posts
  get '/novas' => 'posts#index', category: "newcomer", as: :newcomer_posts

  root :to => "posts#index"

  %w( 404 422 500 ).each do |code|
    get code, :to => "errors#show", :code => code
  end
end
