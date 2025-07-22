# Task Manager System

## Overview

A collaborative task management system built with Node.js, Express, TypeORM, and PostgreSQL. The system supports user authentication, project and task management, team collaboration, notifications, and real-time updates via RabbitMQ and sockets.

## Features

-  User registration, authentication, and role-based access
-  Project creation, update, and deletion (admin only)
-  Task creation, assignment, update, and tracking
-  Team and collaboration features (tagging, attachments, comments)
-  Notification system
-  Real-time updates using RabbitMQ and sockets
-  Comprehensive API with modular controllers and routes
-  TypeScript for type safety
-  Unit and integration tests with Jest

## Tech Stack

-  **Backend:** Node.js, Express.js
-  **Database:** PostgreSQL, TypeORM
-  **Messaging:** RabbitMQ
-  **Testing:** Jest, Supertest
-  **Other:** TypeScript

## Setup Instructions

### Prerequisites

-  Node.js (v16+ recommended)
-  PostgreSQL
-  RabbitMQ

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd task-manager-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   -  Copy `.env.example` to `.env` and fill in your database, JWT secret, and RabbitMQ details.
4. Run database migrations (if any):
   ```bash
   # Example with TypeORM CLI
   npm run typeorm migration:run
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
task-manager-system/
├── src/
│   ├── app.ts                # Express app setup
│   ├── controllers/          # Route controllers (project, task, user, collaboration, etc.)
│   ├── db/
│   │   ├── entity/           # TypeORM entities
│   │   ├── migration/        # DB migrations
│   │   └── model.ts          # DataSource config
│   ├── middlewares/          # Express middlewares (auth, validation, etc.)
│   ├── rabbitMq/             # RabbitMQ sender/receiver/worker
│   ├── routes/               # Express route definitions
│   ├── services/             # Business logic (mail, notification)
│   ├── tests/                # Jest test files
│   ├── types/                # TypeScript type augmentations
│   └── utils/                # Utility functions
├── uploads/                  # File uploads
├── package.json
├── tsconfig.json
├── jest.config.ts
└── readme.md
```

### DB Diagram link

https://dbdiagram.io/d/6874b36ef413ba3508b57795

## API Endpoints (Examples)

### Authentication

-  `POST /v1/user/register` — Register a new user
-  `POST /v1/user/login` — Login and receive JWT

### Projects

-  `POST /v1/project/create` — Create a new project (admin only)
-  `GET /v1/project/:id` — Get a project by ID
-  `GET /v1/project/` — List all projects for the authenticated user
-  `PUT /v1/project/:id` — Update a project
-  `DELETE /v1/project/:id` — Delete a project

### Tasks

-  `POST /v1/task/` — Create a new task
-  `GET /v1/task/:id` — Get a task by ID
-  `GET /v1/task/` — List all tasks for the authenticated user
-  `PUT /v1/task/:id` — Update a task
-  `DELETE /v1/task/:id` — Delete a task

### Collaboration

-  `POST /v1/collaboration/` — Add a collaboration/comment to a task
-  `GET /v1/collaboration/:taskId` — Get collaborations for a task

### Teams

-  `POST /v1/team/` — Create a team
-  `GET /v1/team/:id` — Get team details

> **Note:** All protected endpoints require a valid JWT in the `Authorization` header: `Bearer <token>`
