# == Schema Information
#
# Table name: bot_types
#
#  id      :bigint(8)        not null, primary key
#  name    :string(255)      not null
#  visible :boolean          not null
#

FactoryBot.define do
  factory :bot_type do
    name "MyString"
    visible false
  end
end
