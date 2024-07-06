# 🚀 Node.js TypeScript Boilerplate

This is a boilerplate project for building Node.js applications using TypeScript. It includes a basic setup for Express.js, custom logging middleware, and route management.

## 🚀 Getting Started

To get started with this project, follow these steps:

1. Fork this repository to your GitHub account.
2. Clone the repository to your local machine:
   git clone https://github.com/your-username/todo-list-app.git

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run start:dev
   ```

   or

   ```bash
   yarn start:dev
   ```

## 🥉 Basic Level

### Tasks

- [ ] `GET` /api/events : get list of events
- [ ] `GET` /api/events/:id : get exact event
- [ ] `POST` /api/events : create a new event

## 🥈 Medium Level

### Tasks

- [ ] Registration with indication of the city
- [ ] Login
- [ ] A list of events in the user's city is displayed in `/api/events` for an authorized user

## 🥇 Hard Level

### Tasks

- [ ] Add paginations
- [ ] Sorting for `/api/events?sortBy=rating&sortDirection=desc`

### 📂 Explanation of Structure

- **`src/`**: Source code directory.
  - **`event/`**: Directory for event-related modules and components.
    - **`dtos/`**: Directory for Data Transfer Objects (DTOs).
      - **`CreateEvent.dto.ts`**: DTO for event creation.
    - **`types/`**: Directory for TypeScript types.
      - **`response.ts`**: Type definitions for API responses.
      - **`event-controller.ts`**: Type definitions for event controller.
      - **`event-router.ts`**: Type definitions for event router.
      - **`event-service.ts`**: Type definitions for event service.
  - **`auth/`**: Directory for authentication-related modules and components.
    - **`dtos/`**: Directory for Data Transfer Objects (DTOs).
      - **`Login.dto.ts`**: DTO for user login.
      - **`Register.dto.ts`**: DTO for user registration.
    - **`types/`**: Directory for TypeScript types.
      - **`auth-controller.ts`**: Type definitions for auth controller.
      - **`auth-router.ts`**: Type definitions for auth router.
      - **`auth-service.ts`**: Type definitions for auth service.
  - **`middlewares/`**: Directory for middleware functions.
    - **`auth.middleware.ts`**: Middleware for user authentication.
  - **`db.ts`**: Directory for database connection.
  - **`global-router.ts`**: File for global route definitions.
  - **`index.ts`**: Main entry point of the application.
  - **`logger.ts`**: Custom logging middleware.

## 📝 Additional Information

This setup provides a structured way to build a Node.js application using TypeScript, with clear separation of concerns and organized testing. It includes everything you need to get started quickly and scale your application efficiently.

Feel free to customize the structure and add more features as per your requirements. Happy coding! 💻
