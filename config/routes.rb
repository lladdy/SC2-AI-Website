Rails.application.routes.draw do
 # protect_from_forgery with: :exception
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    devise_for :users, controllers: {
	sessions: 'sessions',
	registrations: 'registrations'
    }

    # devise_for does not create routes to get the users.
    resources :authors, only: [:index, :show]
    resources :users, only: [:index]
    # Custom endpoints for login and logout.
    # We want /logout instead of /users/logout.
    devise_scope :user do
      get 'login', to: 'sessions#new'
      post 'login', to: 'sessions#create'
      get 'logout', to: 'sessions#destroy'
    end
    resources :bots, only: [:index, :show]
    resources :game_results, only: [:index]
    match "/bots/upload", to: "bots#upload", via: [:post]
#    get "/*path", to: "routes#invalid"
  end
#  get "/*path", to: "home#index"
  root "home#index"
end
