# Practical 4 to 6 Task Management App

This folder contains the backend and frontend completed up to Practical 6.

## Folder Structure

```text
Practical-4/
  backend/
    Server.js
    models/task.js
    package.json
    .env.example
  frontend/
    index.html
    package.json
    src/
```

## Backend

```bash
cd Practical-4/backend
npm install
npm start
```

The API runs on `http://localhost:5000`.

Create a `.env` file from `.env.example` and set `MONGO_URI`.

## API Endpoints

- `GET /tasks` - list all tasks
- `GET /tasks/:id` - get a single task
- `POST /tasks` - create a task
- `PUT /tasks/:id` - update a task
- `DELETE /tasks/:id` - delete a task

Task fields:

- `title` - string, required
- `description` - string
- `completed` - boolean, defaults to `false`
- `priority` - one of `low`, `medium`, `high`
- `createdAt` - date, defaults to current date

## Frontend

The React frontend is in `frontend` and calls this backend.

```bash
cd Practical-4/frontend
npm install
npm run dev
```

Run the backend and frontend in separate terminals for the full Practical 6 flow.

## MongoDB

The current project is set to use local MongoDB:

```text
mongodb://127.0.0.1:27017/taskmanager
```

## What To Do In MongoDB Compass

Your MongoDB Compass screenshot shows that local MongoDB is already connected at:

```text
127.0.0.1:27017
```

This is correct. You do not need a MongoDB Atlas account for this project if you are using local MongoDB.

To see this project's data:

1. Open MongoDB Compass.
2. Connect to:

```text
mongodb://127.0.0.1:27017
```

3. Start the backend:

```bash
cd Practical-4/backend
npm start
```

4. Start the frontend in another terminal:

```bash
cd Practical-4/frontend
npm run dev
```

5. Open the frontend in the browser.
6. Create one task from the Task Manager page.
7. Go back to MongoDB Compass.
8. Click `Refresh`.
9. Open database:

```text
taskmanager
```

10. Open collection:

```text
tasks
```

If `taskmanager` is not visible yet, it means no task has been inserted. MongoDB creates the database only after the first task is saved.

In your screenshot, you can currently see databases like `Employees`, `HRDB`, `db-practicals`, and `learning-platform`. After creating a task in this project, a new database named `taskmanager` should appear.

## How to Find Your MongoDB Atlas Cluster

Use these steps if your database is in a MongoDB Atlas account instead of local MongoDB.

1. Open MongoDB Atlas:

```text
https://cloud.mongodb.com
```

2. Sign in with your MongoDB account.
3. Open your Project.
4. In the left menu, click `Database`.
5. Under `Database Deployments`, look for your cluster card.
6. The cluster name is shown on that card, usually like:

```text
Cluster0
```

7. Click `Connect` on that cluster.
8. Choose `Drivers`.
9. Select `Node.js`.
10. Copy the connection string. It looks like this:

```text
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

11. Your cluster name is the part after `@` and before the first dot. Example:

```text
mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/taskmanager
                       ^^^^^^^^
                       Cluster name is cluster0
```

12. Replace `<username>` and `<password>` with your database user details.
13. Add the database name `taskmanager` after `.net/` if it is not already there:

```text
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

14. Paste that full string into:

```text
Practical-4/backend/.env
```

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

15. Restart the backend:

```bash
cd Practical-4/backend
npm start
```

If Atlas does not connect, check these two Atlas settings:

- `Database Access`: create a database user and password.
- `Network Access`: add your current IP address, or temporarily allow `0.0.0.0/0` for lab testing.

No MongoDB Atlas cluster name was found inside these project files, so you need to get it from your Atlas account using the steps above.
