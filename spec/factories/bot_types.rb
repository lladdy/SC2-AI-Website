# == Schema Information
#
# Table name: bot_types
#
#  id        :bigint(8)        not null, primary key
#  invisible :boolean          not null
#  name      :string(255)      not null
#

FactoryBot.define do
  factory :bot_type do
    name "MyString"
    invisible false
  end
end
