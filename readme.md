# Events Tracker with Management

This project is an Event Tracker, this tool has script to track page views and custom events. There is also a dashboard to view all events with two default charts

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

### 1. Set up backend

```bash
cd server
follow instructions in /server/Readme.md
```

### 2. use event tracking script
*note before following this step ensure backend is running
```bash
cd event_tracking_script/examples
view index.html in browser and track the logs
ensure backend in running on port 4000 
```

### 3. use event tracking script
*note before following this step ensure backend is running
```bash
cd client
npm i
npm run test
npm run start
```

### Things that could be improved with more time to make scalable
    -Apache Kafka can help by decoupling producer and consumer logic
    -Streaming would be beneficial for the CSV import as the data is sent in chunks  
    -Use load balancers to distribute incoming traffic across multiple servers.
    -A caching solutions like Redis or Memcached to cache frequently accessed data and reduce database read operations
    


