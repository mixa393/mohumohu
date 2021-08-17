Rails.application.routes.draw do
  # root to: 'users#index'
  # get 'users', to: 'users#index'

  namespace :api do
    namespace :v1 do
      resources :teams, only: [:create, :update, :destroy]
      post 'teams/:id', to: 'teams#remove'
      # resources :users
    end
  end
end
