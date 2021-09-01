Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # root to: 'users#index'
  # get 'users', to: 'users#index'

  namespace :api do
    namespace :v1 do
      resources :teams, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show, :create, :update, :destroy]
      resources :laundries, only: [:show, :create, :update, :destroy]
    end
  end
end
