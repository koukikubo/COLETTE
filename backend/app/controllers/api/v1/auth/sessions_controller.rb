class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def create
    super 
  end

end
