# Project Setup and Execution Guide

This guide provides comprehensive instructions for setting up and running the frontend application. The provided Bash script automates tasks such as virtual environment creation, database initialization (test and live), and application execution. Additionally, Docker Compose can be used to streamline the deployment of the entire service stack.

Prerequisites
Ensure the following software is installed on your system before proceeding:

- git
- npm (Node.js package manager)
- Docker
- bash

# Cloning the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/darliedcjw/JA-IMS-Frontend.git
```

# Running the Frontend Locally

To run the frontend code locally, follow these steps:

1. Navigate to the `JA-IMS-Frontend` directory:

```bash
cd JA-IMS-Frontend
```

2. Use the RunDev.sh script to:

- Install Node.js packages.
- Build the application using Vite for production.
- Run a preview of the production build.
  Execute the script with:

```bash
bash BashScripts/RunDev.sh
```

The frontend application can be accessed via via `http://localhost:8080`

# [Optional] Running Services via Docker

If you prefer a quick way to deploy all services (JA-IMS-Frontend, JA-IMS-Backend, and MySQL Database), you can use Docker Compose. Note that this method is not recommended if you plan to run integration tests locally, as it bypasses unit testing (only applicable to backend application's unittest).

**Steps**:

1. Use Docker Compose to start the service stack:

```bash
docker compose -f Docker/docker-compose.yml up
```

2. Once deployed, access the `JA-IMS-Frontend` and `JA-IMS-Backend` service via your browser at:

- `JA-IMS-Frontend` Service - `http://localhost:8080`
- `JA-IMS-Backend` Service - `http://localhost:2000`

This method provides a fast and easy way to compose and run all services in a containerized environment.

# Notes

The local setup (RunDev.sh) is recommended for development purposes, as it includes integration tests. This can be easily adapted for CI/CD integration (e.g. AWS CodeBuild) to Kubernetes deployment.

The Docker Compose method is ideal for quickly deploying all services in testing environments without running integration tests.
