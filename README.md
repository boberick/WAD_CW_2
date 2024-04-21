# Robert Smith Web Application Development Coursework 2

The aim of this project was to help in the development of a food donation web app for the Scottish Pantry Network. It is to help food growers reach out and donate to pantries in their area which may be looking for more fresh produce.

This project allows users to sign in and leave donations which can then be claimed by a Pantry or Admin user. Donations that haven't been claimed in a week will be deleted from the database.

## Installation

To install this project enter 'git clone git@github.com:boberick/WAD_CW_2.git'

All needed libraries and dependencies should be downloaded and installed alongside the project.

If not, here is a list of the libraries and dependencies I installed, which can be installed in the terminal using 'npm i' and then the dependency:

* bcrypt
* bootstrap
* cookie-parser
* dotenv
* express
* json-web-token
* mustache-express
* gray-nedb
* path
* jsonwebtoken

## Usage

After the project has been installed the user should register an account. This will then allow the user to start making donations. Admin and Pantry registration can only be done by an Admin, with already created Admins and Pantry's found in the adminDB.db and pantryDB.db databases respectively.

Non-logged in users can view the homepage, about page, and pantry location page. They can also use the contact page to message the admins, but must leave their email address in order to get a response.

Logged in users can create donations.

Pantry users can claim these donations.

Admin users can create new Pantry users and Admin users, and can delete mistakenly created donations.

## Contact Information

If you have any questions, please contact me at rsmith306@caledonian.ac.uk