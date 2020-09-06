[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# the-tech-blog

CMS-style blog site, where developers can publish their blog posts and comment on other developers’ posts as well. This app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

This app has been deployed on Heroku at [the-tech-blog.herokuapp.com](https://the-tech-blog.herokuapp.com/).

  ## Table of Contents

  * [Demo](#demo)
  * [Packages Used](#packages)
  * [Installation](#installation)
  * [Contact](#contact)

 ## Demo

[![](http://img.youtube.com/vi/Euj7JA4A8pM/0.jpg)](http://www.youtube.com/watch?v=Euj7JA4A8pM "the-tech-blog app")

  ## Packages

  Node.js, Express.js, MySQL, Sequelize, bcrypt, express-session, connect-session-sequelize, express-handlebars, dotenv

  ## Installation

  1. To install the dependencies, type `  npm i ` at the command line.
  2. Create a `.env` file and add your database name, MySQL username, and MySQL password as follows: 
      ```
      DB_NAME='tech_blog_db'
      DB_USER='your_mysql_username'
      DB_PW='your_mysql_pw'
      SESSION_SECRET="your_top_secret"
      ```
  3. Open MySQL shell and migrate the database schema by typing `source schema.sql`
  4. Type `exit` to exit the MySQL shell
  5. Create a `.gitignore` file and the following folder and files:
      ```
      node_modules
      .DS_Store
      .env
      ```
  ## Contact
  
  Check out other projects at [PetitsPoissons](https://github.com/PetitsPoissons/).
