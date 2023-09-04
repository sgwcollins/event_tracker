# Events Backend

This project servers as a full e

## 📋 Requirements

- Node.js (v14+ recommended)
- MongoDB (local or remote)
- Docker(local)
- npm or yarn

## 🚀 Getting Started


### 1. Clone the repository

```bash
git clone [your-repository-url] events-tracker
cd events-tracker
```
#### Set up node express

```bash
npm i
```

#### Set up database
```bash
docker-compose build db
docker-compose up db
```

#### Seed Database(Optional)
**notes this will add 10k records the database
```bash
npm run seed
```

#### Run backend in development
```bash
cd server
npm run dev
```

#### Run backend test to ensure everything is working
```bash
cd server
npm run test
```
