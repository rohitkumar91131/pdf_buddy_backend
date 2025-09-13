# PDF Buddy Backend
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/rohitkumar91131/pdf_buddy_backend)

This repository contains the backend service for PDF Buddy, an application designed for managing, viewing, and annotating PDF documents. It's built with Node.js, Express, and MongoDB, providing a RESTful API for user authentication, file management, and handling PDF highlights.

## Features

-   **User Authentication**: Secure signup and login functionality using JWT (JSON Web Tokens) and password hashing with `bcryptjs`.
-   **PDF Management**: Upload, retrieve, rename, and delete PDF files. Files are stored on the server and linked to user accounts.
-   **PDF Highlighting**: Create, view, update, and delete text highlights within PDF documents. Each highlight can include comments.
-   **Personalized Storage**: Uploaded PDFs are stored in user-specific directories on the server for organization and privacy.

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: `jsonwebtoken`, `bcryptjs`
-   **File Uploads**: `multer`
-   **Middleware**: `cors`, `cookie-parser`
-   **Environment Variables**: `dotenv`

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v14 or later)
-   npm
-   MongoDB instance (local or cloud-based like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/rohitkumar91131/pdf_buddy_backend.git
    cd pdf_buddy_backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    # Server Configuration
    PORT=8000
    FRONTEND_URL=http://localhost:3000

    # MongoDB Connection
    MONGO_URI=your_mongodb_connection_string

    # JWT Configuration
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Run the server:**
    ```sh
    node server.js
    ```
    The server will start on the port specified in your `.env` file and connect to your MongoDB database.

## API Endpoints

The API is structured into three main resources: Authentication, PDFs, and Highlights.

### Authentication (`/auth`)

| Method | Endpoint      | Protection | Description                                      |
| :----- | :------------ | :--------- | :----------------------------------------------- |
| `POST` | `/signup`     | Public     | Registers a new user.                            |
| `POST` | `/login`      | Public     | Logs in an existing user and sets an HTTP-only cookie. |
| `GET`  | `/verify`     | Private    | Verifies the user's authentication token.        |
| `POST` | `/logout`     | Private    | Clears the authentication cookie to log the user out. |

### PDFs (`/pdfs`)

All routes are protected and require a valid authentication token unless otherwise specified.

| Method | Endpoint                                 | Protection | Description                                                  |
| :----- | :--------------------------------------- | :--------- | :----------------------------------------------------------- |
| `POST` | `/upload`                                | Private    | Uploads a new PDF file. Expects `multipart/form-data`.       |
| `GET`  | `/`                                      | Private    | Retrieves a list of all PDFs owned by the authenticated user.  |
| `GET`  | `/:name`                                 | Private    | Serves the specified PDF file for viewing.                   |
| `GET`  | `/send_id/:name`                         | Public     | Gets the database `_id` of a PDF by its name.                |
| `GET`  | `/check_name_in_user_dashboard/:name`    | Private    | Checks if a PDF with the given name already exists in the user's dashboard. |
| `PATCH`| `/:id`                                   | Private    | Edits the name of a PDF.                                     |
| `DELETE`| `/:id`                                  | Private    | Deletes a PDF record and its corresponding file from the server. |

### Highlights (`/highlights`)

| Method | Endpoint  | Protection | Description                                        |
| :----- | :-------- | :--------- | :------------------------------------------------- |
| `POST` | `/`       | Public     | Adds one or more new highlights to a specific PDF. |
| `GET`  | `/:pdfId` | Public     | Retrieves all highlights associated with a PDF.    |
| `PUT`  | `/:id`    | Public     | Updates the comment on a specific highlight.       |
| `DELETE`| `/:id`    | Public     | Deletes a specific highlight.                      |

## Project Structure

.
├── config/
│   └── db.js            # MongoDB connection logic
├── controllers/
│   ├── AuthController.js      # Logic for user authentication
│   ├── PdfController.js       # Logic for PDF file operations
│   └── highlightController.js # Logic for highlight operations
├── middlewares/
│   ├── authMiddleware.js  # JWT token verification
│   └── multerStorage.js   # Multer configuration for file uploads
├── models/
│   ├── Highlight.js     # Mongoose schema for highlights
│   ├── PdfModel.js        # Mongoose schema for PDF metadata
│   └── UserModel.js       # Mongoose schema for users
├── routes/
│   ├── AuthRoutes.js      # Defines authentication endpoints
│   ├── PdfRoutes.js       # Defines PDF management endpoints
│   └── highlightRoutes.js # Defines highlight management endpoints
├── uploads/               # Directory for storing user-uploaded PDFs (auto-created)
├── package.json
└── server.js            # Main application entry point
