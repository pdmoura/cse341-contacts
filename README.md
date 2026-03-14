# 📇 Contacts API

A RESTful API for managing contacts with full CRUD operations, built with **Node.js**, **Express 5**, and **MongoDB**.

🔗 **Live API**: [cse341-contacts-24un.onrender.com](https://cse341-contacts-24un.onrender.com)
📖 **Swagger Docs**: [cse341-contacts-24un.onrender.com/api-docs](https://cse341-contacts-24un.onrender.com/api-docs)

---

## 📋 API Endpoints

| Method   | Endpoint          | Description               |
| -------- | ----------------- | ------------------------- |
| `GET`    | `/`               | Welcome page              |
| `GET`    | `/contacts`       | Get all contacts          |
| `GET`    | `/contacts/:id`   | Get a single contact      |
| `POST`   | `/contacts`       | Create a new contact      |
| `PUT`    | `/contacts/:id`   | Update an existing contact|
| `DELETE` | `/contacts/:id`   | Delete a contact          |

## 📦 Request / Response Example

**Contact object:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "favoriteColor": "blue",
  "birthday": "2000-01-15"
}
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB
- **Documentation**: [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) (auto-generated via [swagger-autogen](https://github.com/swagger-autogen/swagger-autogen))
- **Hosting**: Render

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pdmoura/cse341-contacts.git
   cd cse341-contacts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3000`.

### Available Scripts

| Script            | Command             | Description                                |
| ----------------- | -------------------- | ------------------------------------------ |
| `npm start`       | `node server.js`     | Start the production server                |
| `npm run dev`     | `nodemon server.js`  | Start the dev server with hot reload       |
| `npm run swagger` | `node swagger.js`    | Regenerate `swagger.json` from source code |

---

## 📁 Project Structure

```
cse341-contacts/
├── controllers/
│   └── contacts.js      # Route handlers (CRUD logic)
├── db/
│   └── connect.js       # MongoDB connection setup
├── routes/
│   ├── index.js         # Root router & welcome page
│   ├── contacts.js      # /contacts route definitions
│   └── swagger.js       # Swagger UI route setup
├── server.js            # App entry point
├── swagger.js           # Swagger auto-generation script
├── swagger.json         # Auto-generated API documentation
├── routes.rest          # REST client test file
├── .env                 # Environment variables (not committed)
└── package.json
```

---

## 📝 License

ISC
