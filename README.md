TodoApp is a development-ready Elixir Phoenix application with a **React + Inertia.js frontend**, bundled for hot reload using Docker.

## 🚀 Getting Started (Dockerized Dev Environment)

To run the application locally, you’ll need:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

> 💡 You do **not** need to install Elixir, Node.js, or PostgreSQL on your machine.

---

### ▶️ Running the App

1. **Clone the repository**

   ```bash
   git clone https://github.com/italopires/todo.git
   cd todo
   ```

2. **Start the containers (build included)**

   ```bash
   docker-compose up --build
   ```

3. Access the app in your browser:

   [http://localhost:4000](http://localhost:4000)

---

### 🔁 What happens automatically?

- Installs all Elixir and Node.js dependencies
- Runs database migrations
- Seeds the database (including creation of a default user)
- Launches Phoenix with live reload for both backend and frontend

---

### 👤 Default User (for testing)

The first user is automatically created on startup:

- **Email:** `teste_user@todo.com`
- **Password:** `teste_user`
