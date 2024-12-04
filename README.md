# Node.js App

## Description

This is a  Node.js application designed to demonstrate basic functionality. It uses Express.js to create a server and handle HTTP requests.

## Features

- RESTful APIs with GET & POST methods
- Database integration with MongoDB
- Environment variable management with `dotenv`

## Requirements

- Node.js (v16 or higher)
- MongoDB (locally or remote)
- Docker (for containerized setup)
- NPM or Yarn

## Installation 

1. Clone the repository:

    ```bash
    https://github.com/ashishBhatnagar01/iu-task.git
    cd iu-task
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file based on the `.env.example` template and fill in your environment variables:

    ```bash
    cp .env.example .env
    ```

4. Set up the MongoDB connection string in the `.env` file:

    ```env
      DATABASE_URL=
      ACCESS_KEY=
      SECRET_ACCESS_KEY=
      BUCKET_NAME=
      URL_EXPIRES_IN=
      PORT=
      NODE_ENV=
    ```

5. Run the application:

    ```bash
    npm run dev || (npm run build && npm start)
    ```

6. The app will be available at `http://localhost:<PORT_NUMBER>`.

## Usage

### API Endpoints

- **POST** `/api/post/add` - To add a post
- **GET** `/api/post/list` - List all the post with signed url of uploaded files
- **GET** `/api/tag/list` - List all the tags
- **POST** `/api/tag/add` - Add a tag

## Development

To run the app in development mode, use the following command:

```bash
npm run dev
