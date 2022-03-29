# canteen_api

A Final Project From a node js Trainee at Infodevelopers Pvt Ltd.

# Running
download the project or clone the branch and install all dependencies using npm install or yarn install
Make a database In postgres named canteen
# migrations
Run The migrations 
using npm
npx sequelize-cli db:migrate
using yarn
yarn sequelize-cli db:migrate
# Seders
Run the Seeders For Initial roles and Initial admin
using npm 
npx sequelize-cli db:seed:all
using yarn
yarn sequelize-cli db:seed:all
This Seeding will add two role admin and user in the system 
and a default admin with credential email:- seedadmin@gmail.com
passord:- testuserpassword
