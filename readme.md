# MERN TS AUTH
Basically just the typescript version of [Brad Traversy's thing](https://github.com/hylandtechoutreach/mern-auth-ts).

## Usage
- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables
Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
DB_NAME = your db name
FRONTEND_URL = http://localhost:3000/

```

Change the `JWT_SECRET` to what you want

### Install Dependencies (frontend & backend)
```
npm install
cd frontend
npm install
```

### Run
```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy
```
# Create frontend prod build
cd frontend
npm run build
```
