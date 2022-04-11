# megastar

This project is website for transport company with REST API for client application. On the page clients can check current timetable with selected next departure and dynamic remaining time, browse gallery of photos and send emails to company by form. REST API uses JWT for authentication and provides CRUD operations on data in MongoDB.

## Demo

Demo page is available in this location:

[https://megastar.kamilzak.pl/](https://megastar.kamilzak.pl)

## Built with

-   **express**
-   **handlebars**
-   **mongoose**
-   **vue**
-   **sass**
-   **webpack**

## Data models

-   **Line** is a connection between cities with departure times. Every departure can have foreclosures, which is described in Foreclosure model. Departure only can use Foreclosures which exists in database.
-   **Foreclosure** is object that includes excluded days of week, dates or intervals of dates. Foreclosure can be used in departure times of Line to exclude this departure in selected days of year. Foreclosure which is used in any Line can't be deleted.
-   **Album** is data model for gallery of photos. Includes name of gallery and list of photos.
-   **User** is a pair of login and password which can be used to authentication to API. Password is hashed by bcrypt.

## Features

-   **Rendering pages** - pages are rendering by [express](https://www.npmjs.com/package/express) with [handlebars](https://www.npmjs.com/package/handlebars) template engine.

-   **Generating bundles** - bundles of JavaScript and CSS files are generating by [webpack](https://www.npmjs.com/package/webpack) with support for **scss** and **vue**.

-   **Data schema** - created by [mongoose](https://www.npmjs.com/package/mongoose) library with mongoDB.

-   **Client side interactivity** - simple client site interactivities like scroll animations, timetable remaining time, gallery or contact form are made by [vue](https://www.npmjs.com/package/vue).

-   **Environment variables** - can be provided to appliaction by .env file, which is optional. When file don't exists application uses default values.

-   **REST API** - available on _/api_ endpoint. API requires authentication excluding read endpoints.

-   **Custom order of mongo documents** - documents in collections are finding in custom order which user can define by api requests. This feature was made by creating custom mongoose plugin.

-   **Uploading photos** - functionality for uploading photos which can be used in albums. For this feature application using [multer](https://www.npmjs.com/package/multer). Photos are scaled down and have generated thumb by [sharp](https://www.npmjs.com/package/sharp).

-   **Generating PDF** - timetable of line can be downloaded as PDF file. This is made by [pdfkit](https://www.npmjs.com/package/pdfkit) library.

-   **Sending emails** - emails are sending by [nodemailer](https://www.npmjs.com/package/nodemailer). Data for SMTP server should be in .env file.

-   **Linting and formating** - project includes configuration for [ESLint](https://www.npmjs.com/package/eslint) linter and [Prettier](https://www.npmjs.com/package/prettier) code formatter. This project includes this packages for use them in pre commit hook by [husky](https://www.npmjs.com/package/husky).

-   **Automatic deployment** - Project uses [Github Actions](https://github.com/features/actions) for automation deployment on VPS server.

## Development

In development mode bundles are generated and served by express from memory by webpack-dev-middleware and webpack-hot-middleware. If any _.js_ or _.hbs_ file changes server restarts and reload web prowser by _reload_ library. Emails are sending by fake SMTP server [https://ethereal.email](https://ethereal.email)

```
login: yolanda.jerde64@ethereal.email
password: zRdJeNt6mUxrmf9rte
```

By default application uses database _megastar_ on local mongoDB. To change it set variable in _.env_ file like in _example.env_

To run development server type:

```sh
npm run dev

```

By default server starts at 5555 port. To change default port you can set PORT in _.env_ file like in _example.env_

To delete all data and insert example data to database type:

```sh
npm run initdata
```

# Production

Before production start of application if there aren't bundles in _public_ folder or any file in src/resources has been changed, build application executing:

```sh
npm run build
```

Copy _example.env_ as _.env_ and provide environment variables for production:

-   port
-   secrets for JWT
-   mongodb connection data
-   smtp server for sending emails
-   contact mail

If bunldes are generated succesfully and _.env_ file is configured, start application in production mode:

```sh
npm start
```
