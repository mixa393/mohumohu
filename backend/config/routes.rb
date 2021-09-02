Rails.application.routes.draw do
  # root to: 'users#index'
  # get 'users', to: 'users#index'

  namespace :api do
    namespace :v1 do
      resources :teams, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show, :create, :update, :destroy]
      resources :laundries, only: [:show, :create, :update, :destroy]
      get    '/login',   to: 'sessions#new'
      post   '/login',   to: 'sessions#create'
      delete '/logout',  to: 'sessions#destroy'
    end
  end
end
