class UsersController < ApplicationController
  protect_from_forgery except: :destroy
  def index
    render json: current_user.as_json
  end
  def show
    render json: User.find(params[:id])
  end
end
