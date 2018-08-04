# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

case Rails.env
when "development"
  # do development seeding here    
  BotType.create!(name: 'DefaultBot', visible: false)
  User.create!(role: 'admin',
               email: 'admin@example.com',
               password: '123456',
               created_at: '2018-08-04 09:18:25',
               updated_at: '2018-08-04 09:18:25',
               username: 'admin' )
  User.create!(role: 'user',
               email: 'user@example.com',
               password: '123456',
               created_at: '2018-08-04 09:18:25',
               updated_at: '2018-08-04 09:18:25',
               username: 'user' )
when "production"
  # do production seeding here
end
