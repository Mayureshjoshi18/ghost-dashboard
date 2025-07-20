# Ghost Watchlist

Ghost Watchlist is a lightweight internal dashboard built to help teams keep an eye on SaaS tools being used across the company. It listens for webhook events, logs each detection, and lets you view, filter, sort, and export the data easily.

## Tech Stack

- **Frontend:** Next.js (App Router) with Tailwind CSS
- **Backend:** Node.js with Express and SQLite
- **Database:** File-based SQLite using `better-sqlite3`
- **Extras:** Toast notifications, CSV/JSON export, responsive layout


## Running It Locally

Here’s how to get it up and running on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ghost-dashboard.git
cd ghost-dashboard
```

### 2. Install Dependencies
//for backend

```bash
cd ghost-backend
npm install
```

//for frontend

```bash
cd ../ghost-frontend
npm install
```

### 3. Start the App

Backend
```bash
npm run dev
```

Frontend
```bash
npm run dev
```


Visit http://localhost:3000 in your browser to use the dashboard.


### Test Webhook
To simulate a detection event, send a POST request to:

```bash
http://localhost:3001/webhook/new-saas
```

With a JSON body like this:

```bash
{
  "timestamp": "2025-07-19T14:32:00Z",
  "employee_email": "jane.doe@example.com",
  "service_detected": "Dropbox",
  "risk_level": "High"
}
```

### Test curl command 

```bash 
curl -X POST http://localhost:3001/webhook/new-saas \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-07-18T04:02:00Z",
    "employee_email": "jane@acme.com",
    "service_detected": "Notion",
    "risk_level": "Medium"
  }'
```


### Notes & Shortcuts
• Auth is simulated with a simple token for now
• Filtering, sorting, and export are handled entirely on the frontend for speed and simplicity
• We're using SQLite for fast setup—great for testing, but not suited for production scale
• No pagination or advanced query filters—this is meant to be lightweight and easy to work with

