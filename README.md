# E-commerce-Back-End
Module 13 - Object-Relational Mapping (ORM) Challenge

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This application is the back end of an e-commerce site. It provides REST APIs for Creating, Retrieving, Updating and Deleting (CRUD) data from the database. It is implemented by using Express.js, MySQL and Sequelize.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Demo](#demo)
* [License](#license) 

## Installation
1. Start with cloning this repo:
    ```
    $ git clone https://github.com/heidiwu3388/E-commerce-Back-End.git
    $ cd E-commerce-Back-End
    ```
2. Install all dependencies
    ```
    $ npm install

    ```
3. Set up the environment variables:
    - rename ```.env.EXAMPLE``` to ```.env```
    - edit ```.env``` to include your database's user name and password
    ```
    DB_NAME='ecommerce_db'
    DB_USER=''
    DB_PASSWORD=''

    ```

4. Create database
    ```
    $ mysql -u root -p
    ```
    ```
    mysql> source ./db/schema.sql
    mysql> quit
    ```
5. Seed the database (optional)
    ```
    $ npm run seed
    ```
6. run the application
    ```
    $ npm start
    ```

## Usage
- While the server is running, it is ready for any REST client to make the API calls.
- The front end is not included in this project, but the APIs can be called by using a REST client of your choice (such as Insomnia and Postman).
- The following endpoints are provided:
    - Tags
        - GET All Tags
            - GET http://localhost:3001/api/tags
        - GET Tag by Id
            - GET http://localhost:3001/api/tags/:id
        - CREATE Tag
            - POST http://localhost:3001/api/tags
            - the request body should look like this:
                ```
                {
                    "tag_name": "sports"
                }
                ```
        - UPDATE Tag
            - PUT http://localhost:3001/api/tags/:id
            - the request body should look like this:
                ```
                {
                    "tag_name": "sports"
                }
                ```
        - DELETE Tag
            - DELETE http://localhost:3001/api/tags/:id

    - Categories
        - GET All Categories
            - GET http://localhost:3001/api/categories
        - GET Category by Id
            - GET http://localhost:3001/api/categories/:id
        - CREATE Category
            - POST http://localhost:3001/api/categories
            - the request body should look like this:
                ```
                {
                    "category_name": "balls"
                }
                ```
        - UPDATE Category
            - PUT http://localhost:3001/api/categories/:id
            - the request body should look like this:
                ```
                {
                    "category_name": "balls"
                }
                ```
        - DELETE Category
            - DELETE http://localhost:3001/api/categories/:id
    - Products
        - GET All Products
            - GET http://localhost:3001/api/products
        - GET Product by Id
            - GET http://localhost:3001/api/products/:id
        - CREATE Product
            - POST http://localhost:3001/api/products
            - the request body should look like this:
                ```
                {
                    "product_name": "tennis shoes",
                    "price": 100.00,
                    "stock": 13,
                    "category_id": 5,
                    "tagIds": [6,7]
                }
                ```
        - UPDATE Product
            - PUT http://localhost:3001/api/products/:id
            - the request body should look like this:
                ```
                {
                    "product_name": "tennis shoes",
                    "price": 100.00,
                    "stock": 13,
                    "category_id": 5,
                    "tagIds": [6,7]
                }
                ```
        - DELETE Product
            - DELETE http://localhost:3001/api/products/:id

## Demo
- please refer to this video [https://youtu.be/bmIpaltNOr4](https://youtu.be/bmIpaltNOr4) for a demo of all the features provided by this application.

## License

This project is licensed under the terms of the [MIT](https://opensource.org/licenses/MIT) license.
    