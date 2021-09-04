Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#login'
      post '/logout', to: 'sessions#logout'
      get '/logged_in', to: 'sessions#logged_in?'
      get "/weather", to: "weather#get"
      resources :teams, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show, :create, :update, :destroy]
      resources :laundries
      resources :laundry_histories, only: [:index, :show, :create, :destroy]
    end
  end
end
