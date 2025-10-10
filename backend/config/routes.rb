Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post   "login",   to: "sessions#create"
      delete "logout",  to: "sessions#destroy"
      get    "session", to: "sessions#show"
      post   "signup",  to: "registrations#create"

      resources :mypages, only: [:create, :show, :update] do
        collection do
          get :me
        end
      end

      resources :customers, only: [:create, :index, :show, :update, :destroy] do
        collection do
          get :stats
        end
      end

      resources :customer_rank, only: [:create, :index, :show, :update, :destroy] 
    end
  end
end
