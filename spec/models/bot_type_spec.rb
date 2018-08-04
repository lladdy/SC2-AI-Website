# == Schema Information
#
# Table name: bot_types
#
#  id      :bigint(8)        not null, primary key
#  name    :string(255)      not null
#  visible :boolean          not null
#

require 'rails_helper'

RSpec.describe BotType, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
