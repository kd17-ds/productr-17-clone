# Productr

Productr is a full-stack product management platform built using the MERN stack.  
It supports OTP-based authentication and complete product lifecycle management.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (Image Upload)
- OTP-based Authentication

---

## Authentication Flow

1. User enters email or phone number
2. Backend generates OTP
3. OTP is sent to the user
4. User verifies OTP
5. JWT token is issued and stored in HTTP-only cookies
6. All protected routes require authentication

---

## Product Features

- Create products
- Edit products
- Upload product image
- Publish / Unpublish products
- Delete products with confirmation
- View published and unpublished products
- Toast notifications for success and error states

Each product contains:
- Name
- Type
- Stock
- MRP
- Selling Price
- Brand Name
- Exchange / Return eligibility
- Image
- Publish status

---

## Pages

### Home Page
- Tabs for Published / Unpublished products
- Publish / Unpublish actions
- Delete with confirmation
- Uses shared product grid

### Products Page
- Add product modal
- Edit product modal
- Delete confirmation modal
- Publish / Unpublish actions
- Form validation
- Loading states

---

## Reusable Product Logic

All product actions are centralized using a custom hook:

```
useProductActions
```

This hook handles:
- Publish / Unpublish
- Delete product
- Loading state per product
- Toast notifications

The hook is shared across Home and Products pages.

---

## Backend API Routes

### Authentication
```
POST /api/auth/request-otp
POST /api/auth/verify-otp
```

### Products
```
POST   /api/products/add
GET    /api/products/all
GET    /api/products/:id
PUT    /api/products/:id
PATCH  /api/products/:id/publish
DELETE /api/products/:id
```

All routes are protected using authentication middleware.

---

## Project Structure

### Frontend
```
src/
├── components/
├── hooks/
├── pages/
│   ├── home/
│   ├── products/
│   └── auth/
├── contexts/
├── utils/
└── constants/
```

### Backend
```
server/
├── controllers/
├── routes/
├── middlewares/
├── models/
└── utils/
```

---

## Running the Project Locally

### Clone Repository
```
git clone <repository-url>
cd productr
```

### Run Backend
```
cd server
npm install
npm run dev
```

### Run Frontend
```
cd client
npm install
npm run dev
```

Frontend:
```
http://localhost:5173
```

Backend:
```
http://localhost:5000
```

---

## Notes

- Image upload handled using Multer
- Authentication handled via cookies
- Fully responsive UI
- Confirmation modals prevent accidental deletion

---

## Status

Feature complete and production-ready.
