class BotTypesController < ApplicationController
  def index
    authorize! :read, BotType
    if current_user.present? && current_user.role == "admin" # is it bad to hardcode this?
      render json: BotType.all
    else
      # todo: this returns nil if nothing exists
      # todo: I'd prefer it returned an empty JSON object
      render json: BotType.find_by(invisible: false)
    end
  end
end
