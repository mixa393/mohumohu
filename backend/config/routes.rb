Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :teams, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show, :create, :update, :destroy]
      resources :laundries, only: [:show, :create, :update, :destroy]
      post '/login', to: 'sessions#login'
      post '/logout', to: 'sessions#logout'
      get '/logged_in', to: 'sessions#logged_in?'
    end
  end
end
