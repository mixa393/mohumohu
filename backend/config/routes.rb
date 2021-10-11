Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/weather", to: "weather#get"

      resources :teams, only: [:show, :create, :update, :destroy]
      resources :laundries, id: /\d+/
      get "/laundries/weekly", to: "laundries#weekly"
      get "/laundries/list", to: "laundries#list"
      put "/laundries/washed", to: "laundries#washed"
      put "/laundries/un_washed", to: "laundries#un_washed"
      resources :laundry_histories, only: [:index, :show, :create, :destroy]

      # ログイン用
      mount_devise_token_auth_for 'User', at: 'auth', controllers: { registrations: 'api/v1/auth/registrations' }
      devise_for :users, :controllers => { :registrations => 'users/registrations' }
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
