Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/weather", to: "weather#get"

      resources :teams, only: [:show, :create, :update, :destroy]
      resources :laundries, id: /\d+/
      get "/laundries/list", to: "laundries#list"
      put "/laundries/:id/washed", to: "laundries#washed"

      # ログイン用
      mount_devise_token_auth_for 'User', at: 'auth', controllers: { registrations: 'api/v1/auth/registrations' }
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
