# Persona-Driven Document Intelligence - Execution Instructions

This document provides the steps to build and run the application using Docker.

## Prerequisites

- Docker must be installed and running on your system.
- You must have a command-line terminal.

## Step 1: Build the Docker Image

1.  Navigate your terminal to this directory (the `backend` folder containing this `README.md` and the `Dockerfile`).

2.  Run the following command to build the Docker image. This process will install all dependencies and pre-download the required AI model, ensuring the container can run without internet access.

    ```bash
    docker build -t persona-analyzer .
    ```

    _Note: The first build may take a few minutes. Subsequent builds will be faster due to caching._

## Step 2: Run the Docker Container

1.  Once the build is complete, start the application with the following command:

    ```bash
    docker run -p 3000:3000 --rm persona-analyzer
    ```

2.  The terminal will display logs, ending with `Server is running on port 3000`. The application is now ready to accept API requests.

## Step 3: Test the API

Use an API client like Postman or Insomnia to interact with the service.

#### To Submit a Job for Analysis:
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/analyze`
- **Body:** `form-data`
  - `persona` (key): The persona name (e.g., `Travel Planner`, `Investment Analyst`).
  - `job_to_be_done` (key): The task description.
  - `files` (key): Attach 3-10 relevant PDF files.

#### To Retrieve the Results:
- The `POST` request will return a JSON object containing an `analysisId`.
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/results/{analysisId}` (replace `{analysisId}` with the actual ID from the previous step).