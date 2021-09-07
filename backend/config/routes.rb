Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/weather", to: "weather#get"

      resources :teams, only: [:show, :create, :update, :destroy]
      resources :laundries
      resources :laundry_histories, only: [:index, :show, :create, :destroy]

      # ログイン用
      mount_devise_token_auth_for 'User', at: 'auth', controllers: { registrations: 'api/v1/auth/registrations' }
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
