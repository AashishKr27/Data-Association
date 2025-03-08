# Data Association Project

## Overview

The **Data Association Project** is a web application built using **Node.js, Express, MongoDB, and EJS**.<br>
It allows users to register, log in, create posts, like/unlike posts, and edit their posts.<br>
The project demonstrates authentication, authorization, and database relationships using **Mongoose ODM**.

## Features

- User Registration & Login
- JWT-based Authentication
- Create, Edit, and Delete Posts
- Like and Unlike Posts
- Profile Management
- Session Handling with Cookies
- Secure Password Hashing with Bcrypt

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, TailwindCSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT), Bcrypt

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/data-association-project.git
   cd data-association-project
   ```
2. Install dependencies:
   ```bash
   npm init -y
   npm i ejs express mongoose bcrypt cookie-parser jsonwebtoken
   ```
3. Run the application:
   ```bash
   npx nodemon app.js
   ```
4. Open the browser and visit:
   ```
   http://localhost:3000
   ```

## Project Structure

```
|-- models/
|   |-- user.js        # User schema
|   |-- post.js        # Post schema
|
|-- views/
|   |-- index.ejs      # Home page
|   |-- login.ejs      # Login page
|   |-- profile.ejs    # User profile & posts
|   |-- edit.ejs       # Edit post
|
|-- public/            # Static files (CSS, JS, etc.)
|-- app.js             # Main application file
|-- package.json       # Dependencies & scripts
```

## API Endpoints

### User Routes

- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /logout` - Logout the user

### Post Routes

- `POST /post` - Create a new post
- `GET /edit/:id` - Edit a post
- `POST /update/:id` - Update a post
- `GET /like/:id` - Like or unlike a post

## Dependencies

```json
{
  "bcrypt": "^5.1.1",
  "cookie-parser": "^1.4.7",
  "ejs": "^3.1.10",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.10.1"
}
```

## Future Enhancements

- Implement comment functionality
- Add profile picture upload
- Improve UI/UX with more animations

## License

This project is licensed under the **MIT License**.