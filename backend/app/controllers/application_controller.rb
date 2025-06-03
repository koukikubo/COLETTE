class ApplicationController < ActionController::API
    include DeviseTokenAuth::Concerns::SetUserByToken
    include DeviseHackFakeSession

    wrap_parameters format: []
    protected

    def configure_permitted_parameters
        # signup（sign_up_params）で confirm_success_url を許可する
        devise_parameter_sanitizer.permit(:sign_up, keys: [:confirm_success_url])
    end
end
