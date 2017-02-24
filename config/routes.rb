Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :posts do
    get "vote"
  end
  resources :comments
  root :to => "posts#index"
end
