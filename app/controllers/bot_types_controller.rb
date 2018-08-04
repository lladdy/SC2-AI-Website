class BotTypesController < ApplicationController
  def index
    render json: BotType.all
  end
end
