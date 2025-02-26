# 🚀 Intermediate Usage of Morgan in Express.js

## 📚 Introduction
Morgan is not just limited to basic HTTP request logging — it offers powerful customization and flexibility for more advanced use cases. Let’s explore how to level up your Morgan setup in an Express.js application.

---

## 📦 Prerequisites
Ensure you have Morgan installed:

```bash
npm install morgan
```

Or with Yarn:

```bash
yarn add morgan
```

Make sure you have Express installed and set up.

---

## 🏎️ Advanced Setup
### 1. **Logging Requests to a File with Rotation**
Instead of logging to the console, you can log HTTP requests to a file, rotating logs to prevent files from becoming too large.

**Install the rotation module:**

```bash
npm install rotating-file-stream
```

**Implementation:**

```javascript
const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

const app = express();

// Create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
});

// Setup morgan to use 'combined' format and log to file
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**What happens here:**
- Logs requests to the `logs/access.log` file.
- Rotates logs every day.

---

### 2. **Customizing Log Formats with Tokens**
You can define custom tokens and use them in your log format.

**Example:**

```javascript
morgan.token('id', (req) => req.headers['x-request-id'] || 'N/A');
morgan.token('time', () => new Date().toISOString());

app.use(morgan(':method :url :status - :response-time ms [ID: :id] [Time: :time]'));
```

**What happens here:**
- `:id`: Logs a custom request ID (from headers).
- `:time`: Logs the current timestamp.
- The final format looks like this:

```
GET / 200 - 5.432 ms [ID: abc123] [Time: 2025-02-26T08:00:00.000Z]
```

---

### 3. **Conditional Logging (Skipping Logs)**
You can skip logging certain requests — like static assets or successful requests — using the `skip` option.

**Example:**

```javascript
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400 // Only log errors (status codes 400 and above)
}));
```

**Another example:** Skip logging for specific routes (like `/health` checks):

```javascript
app.use(morgan('common', {
  skip: (req) => req.url === '/health'
}));
```

---

### 4. **Combining Multiple Morgan Instances**
You can use multiple Morgan instances for different logging strategies — for example, detailed logging to a file and minimal logging to the console.

**Example:**

```javascript
// Log all requests to file
app.use(morgan('combined', { stream: accessLogStream }));

// Log only errors to console
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400
}));
```

---

### 5. **Integrating Morgan with Winston for Advanced Logging**
Morgan can be paired with Winston (a flexible logging library) for custom log handling.

**Install Winston:**

```bash
npm install winston
```

**Implementation:**

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
```

**What happens here:**
- `combined.log`: Logs all requests.
- `error.log`: Logs only errors.

---

## ✅ Conclusion
Morgan’s intermediate features — like rotating logs, custom tokens, and conditional logging — empower you to manage and customize logging effectively. Pair it with libraries like Winston for even more flexibility.

Would you like to dive into integrating Morgan with cloud logging services like Loggly or Datadog next? Let me know! 🚀

