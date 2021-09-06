Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/weather", to: "weather#get"
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :teams, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show, :create, :update, :destroy]
      resources :laundries
    end
  end
end
