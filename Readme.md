# Groceries API
Welcome to the Groceries API! This API provides a comprehensive solution for managing grocery orders, users, and products with ease. Built with scalability and security in mind, it offers a range of features to streamline your grocery management process.

## Features
* **User Authentication:** Secure your API with Role-Based Access Control (RBAC) and JSON Web Tokens (JWT). Control access to resources based on user roles and ensure the integrity of your data.
* **Order Management:** Place multiple grocery orders effortlessly. Manage the entire order lifecycle, from creation to delivery, with intuitive APIs and robust backend support.
* **User Management:** Perform CRUD (Create, Read, Update, Delete) operations on users. Create new user accounts, retrieve user details, update user information, and deactivate or delete user accounts as needed.
* **Product Management:** Easily manage your grocery product catalog with CRUD operations. Add new products, view product details, update product information, and remove products that are no longer available.
* **Order Management:** Handle orders with ease through CRUD operations. Create new orders, view order details, update order information, and cancel or complete orders as required.

## System Requirements
1. Docker

## Getting Started
To get started with the Groceries API, follow these steps:

1. Installation: Clone this repository to your local machine and build a docker image using ```npm run docker:build```.
2. Database Setup: A temporary database url is provided in docker file. The same can be used.
3. Run the docker container: Start the docker container using ```npm run docker:run```

Explore the API: Use API documentation or interactive tools like Postman to explore and interact with the API endpoints.

# Testing Login credentials
## Admin
Email: admin@test.com
Password: admin@123
## User
Email: user@test.com
Password: user@123

The Groceries part can be tested using these credentials. Or you can use the Auth endpoints in the API section to setup your own credentials.

# API Endpoints

## For protected requests
1. You'll have to login as admin first and copy the token you receive in response.
2. Then in the request header (Authorization) provide (Bearer 'The Token')
3. Then make the request

## Auth Endpoints
POST localhost:3000/api/v1/auth/create   
Provide the following fields in the request body as JSON object   
name: string;   
email: string;   
password: string;   
passwordConfirm: string;   
role?: 'USER' | 'ADMIN'; (If not provided, defaults to USER)   
   
POST localhost:3000/api/v1/auth/login   
Provide the following fields in the request body as JSON object   
email: string;   
password: string;   
   
## User Endpoints   
GET localhost:3000/api/v1/users  (Protected, only to admin)   
    
GET localhost:3000/api/v1/users/:id  (Protected, only to admin)   
id: number; (as request parameter)   
   
## Product Endpoints
GET localhost:3000/api/v1/products   
Get all products   
   
GET localhost:3000/api/v1/products/:id   
Get a product by its id   
id: number; (as request parameter)   
   
PATCH localhost:3000/api/v1/products (Protected, only to admin)   
Provide the following fields in the request body as JSON object   
title: string;   
price: number;   
stock: number;   
stockUnit: 'NUMBER' | 'KG' | 'LITRE'; (Defaults to NUMBER if not provided)   
   
POST localhost:3000/api/v1/products/:id (Protected, only to admin)   
id: number; (as request parameter)   
Provide the following fields in the request body as JSON object   
title: string;   
price: number;   
stock: number;   
stockUnit: 'NUMBER' | 'KG' | 'LITRE'; (Defaults to NUMBER if not provided)   
   
DELETE localhost:3000/api/v1/products (Protected, only to admin)   
id: number; (as request parameter)   
   
## Orders Endpoints
GET localhost:3000/api/v1/orders (Protected, only to admin)   
Get all orders   
   
GET localhost:3000/api/v1/orders/:id  (Protected, only to admin)   
Get an order by its id   
id: number; (as request parameter)   
   
PATCH localhost:3000/api/v1/orders  (Protected, only to admin)   
Provide the following fields in the request body as JSON object or array   
productId: number;   
quantity: number;   
quantityUnit: 'NUMBER' | 'KG' | 'LITRE'; ? (Defaults to NUMBER)   
subtotal: number;   
userId: number;   
   
POST localhost:3000/api/v1/orders/:id  (Protected, available to logged in users and admin)   
id: number; (as request parameter)   
Provide the following fields in the request body as JSON object or array   
productId: number;   
quantity: number;   
quantityUnit: 'NUMBER' | 'KG' | 'LITRE'; ? (Defaults to NUMBER)   
subtotal: number;   
userId: number;   
   
DELETE localhost:3000/api/v1/orders (Protected, available to logged in users and admin)   
id: number; (as request parameter)   
