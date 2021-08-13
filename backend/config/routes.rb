Rails.application.routes.draw do
  root to: 'users#index'
  get 'users', to: 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
