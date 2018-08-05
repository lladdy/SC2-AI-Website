class BotsController < ApplicationController
#  protect_from_forgery only: :destroy
  def index
    render json: Bot.all
  end

  def show
    render json: Bot.find(params[:id])
  end

  def create
    authorize! :create, Bot
    bot = Bot.create(bot_params)
    if bot.errors.any?
      render json: bot.errors, status: :unprocessable_entity
    else
      render json: { status: :ok }
    end
  end

  def update
    @bot = Bot.find(params[:id])
    authorize! :update, @bot
    if @bot.update(bot_params)
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @bot = Bot.find(params[:id])
    authorize! :destroy, @bot
    if @bot.destroy
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  private

  def bot_params
    p = params.permit(:name, :author, :race, :file, :type)
    p[:owner_id] = current_user.id if current_user.present?
    p[:author] ||= current_user.username if current_user.present?
    return p
  end
end
