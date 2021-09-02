Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :teams, only: [:show, :create, :update, :destroy]
      resources :users, only: [:show, :create, :update, :destroy]
      resources :laundries, only: [:show, :create, :update, :destroy]
      get    '/login',   to: 'sessions#new'
      post   '/login',   to: 'sessions#create'
      delete '/logout',  to: 'sessions#destroy'
      post '/signup', to: 'registrations#signup'
    end
  end
end
