# == Schema Information
#
# Table name: bots
#
#  id          :bigint(8)        not null, primary key
#  author      :string(255)      not null
#  executable  :string(255)
#  match_count :integer          default(0), not null
#  name        :string(255)      not null
#  race        :string(255)      not null
#  win_count   :integer          default(0), not null
#  bot_type_id :bigint(8)
#  owner_id    :bigint(8)
#
# Indexes
#
#  fk_rails_6f2cf3be8b  (bot_type_id)
#  fk_rails_f93a12e463  (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (bot_type_id => bot_types.id)
#  fk_rails_...  (owner_id => users.id)
#

FactoryBot.define do
  factory :bot do
    name { "#{Faker::Pokemon.unique.name} bot" }
    author { Faker::GameOfThrones.unique.character }
    race { %w[Terran Protoss Zerg Random].sample }
  end
end
