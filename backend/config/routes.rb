Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :reservations, except: [:new, :edit]
      resource :reservation_masters, only: [:show]
      resources :tables, only: [:create, :index, :show, :update, :destroy] 
      resources :notifications, only: [:index, :show]

      namespace :admin do
        resources :users
        resources :notifications
      end
      namespace :auth do
        post   "login",   to: "sessions#create"
        delete "logout",  to: "sessions#destroy"
        get    "session", to: "sessions#show"
        post   "signup",  to: "registrations#create"
      end

      namespace :mypage do
        resources :mypages, only: [:create, :show, :update] do
          collection do
            get :me
          end
        end        
      end

      namespace :customer do
        resources :customers, only: [:create, :index, :show, :update, :destroy] do
          collection do
            get :stats
            get :search
          end
        end
      end

      namespace :setting do
        namespace :standard_code do
          resources :standard_mastas do
            collection do
              get :next_code
              get :count

            end
            resources :standard_list_mastas, only: [:index, :create, :update, :show, :destroy]
              
          end
        end
        
        namespace :shop do
          resource :shop_info, only: [:show, :create, :update]
        end
      end
      end
  end
end
