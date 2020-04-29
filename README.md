## ToDoTest

### Project Setup

 - The project consists of 2 sub folders `TodoApi` and `TodoClient`.
### API Configuration

 - You should have a PHP version that is not less than 7.2.
 - Copy contents of `.env.example` to `.env`.
 - Change your database username and password.
 - Open the API directory on cmd and run `composer-install` to install all dependancies.
 - Then you can start the server.
 
### Client Configuration
 - Run `npm install`, all dependancies should be installed.
 - Then you can start the server.
 
### Database configuration and migrations

 - Download and install a PostgreSQL server. For instructions, refer to the PostgreSQL documentation on [www.postgresql.org](http://www.postgresql.org).
 - Ensure that the installation includes the PostgreSQL Unicode ODBC driver.
 - Add the PostgreSQL bin directory path to the PATH environmental variable.
 - Open command line and run the following command: _psql -U **userName**_ and enter your password if prompted to start the PostgreSQL command-line tool.
 - now run the following command CREATE DATABASE todo WITH ENCODING 'UTF8' LC_COLLATE='English_South Africa' LC_CTYPE='English_South Africa';`.
  - Now that the database has been created, you can now navigate to the `API` path on cmd and run migrations using this command `php artisan migrate`.
