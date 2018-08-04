# == Schema Information
#
# Table name: bot_types
#
#  id        :bigint(8)        not null, primary key
#  invisible :boolean          not null
#  name      :string(255)      not null
#

class BotType < ApplicationRecord
  # todo: fields shouldn't be blank
  # validates :name, :invisible, presence: true
end
