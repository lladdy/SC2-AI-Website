# == Schema Information
#
# Table name: bot_types
#
#  id      :bigint(8)        not null, primary key
#  name    :string(255)      not null
#  visible :boolean          not null
#

class BotType < ApplicationRecord
  # todo: fields shouldn't be blank
  # validates :name, :visible, presence: true
end
