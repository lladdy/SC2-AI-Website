class BotTypesController < ApplicationController
  def index
    authorize! :read, BotType
    if current_user.present? && current_user.role == "admin" # is it bad to hardcode this?
      render json: BotType.all
    else
      render json: BotType.where(invisible: false)
    end
  end
end
