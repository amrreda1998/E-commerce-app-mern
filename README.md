eCommerce Project

This is a full-featured eCommerce web application built with React, Node.js, Express, and MongoDB. It includes user authentication, a product catalog, cart functionality, and an order system with a checkout process.
Features

    User Authentication: Users can sign up, log in, and manage their session.
    Product Catalog: Users can browse and view details of products.
    Cart Management: Users can add products to their cart, adjust quantities, and view the cart summary.
    Checkout: Users can proceed to checkout to place orders.
    Order Management: Orders are stored in the database and displayed on the user’s orders page.

Tech Stack

    Frontend: React, Material-UI
    Backend: Node.js, Express
    Database: MongoDB
    Authentication: JWT (JSON Web Tokens)

Installation

  Clone the repository:

      git clone https://github.com/your-username/ecommerce-project.git
      cd ecommerce-project

Install dependencies for the backend and frontend:

      # Install backend dependencies
      cd backend
      npm install

      # Install frontend dependencies
      cd ../frontend
      npm install

Set up environment variables:

Create a .env file in the root directories of both the frontend and backend, and add the required environment variables:

  For the backend:

    makefile

    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

Start the application:

  Start the backend server:

    cd backend
    npm start


  Start the frontend development server:

    cd frontend
    npm start
    Open your browser and navigate to http://localhost:3000.

Usage

    Sign up or Log in to access the full features of the application.
    Browse products, add items to the cart, and view the cart.
    Proceed to Checkout to place an order.
    View all your Orders on the Orders page.

Folder Structure

    backend: Contains the Express server, route handlers, and data models.
    frontend: Contains the React app, including components, pages, and context providers.

API Documentation

The backend includes routes for:

    Authentication: /auth/register, /auth/login
    Products: /products - for fetching product details
    Cart: /carts - for adding, removing, and updating items in the cart
    Orders: /orders - for placing and fetching orders

Contributing

Contributions are welcome! If you have suggestions, please fork the repository and submit a pull request.
License

This project is open-source and available under the MIT License.
