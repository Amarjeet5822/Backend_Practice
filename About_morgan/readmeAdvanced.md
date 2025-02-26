# 🚀 Advanced Morgan Usage in Express.js

## 📦 Introduction

Morgan is a powerful HTTP request logger middleware for Node.js and Express.js applications. While basic logging is useful, mastering advanced techniques like custom tokens, dynamic logging, log rotation, and integrating with third-party logging libraries elevates your application's observability.

---

## 🌟 1. Custom Tokens

Morgan allows you to create custom tokens to log specific details about incoming requests or responses.

**Example:** Log user IP and request duration

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();

// Custom token to log IP address
morgan.token('ip', (req) => req.ip);

// Custom token for response time
morgan.token('response-time', (req, res) => `${res.getHeader('X-Response-Time') || '0'}ms`);

// Use custom format
app.use(morgan(':method :url :status :ip :response-time'));

app.get('/', (req, res) => res.send('Advanced Morgan!'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

---

## 📜 2. Log Rotation

Logging to a single file can get unwieldy as logs grow. Use the `rotating-file-stream` package to implement log rotation.

**Install the package:**

```bash
npm install rotating-file-stream
```

**Setup log rotation:**

```javascript
const rfs = require('rotating-file-stream');
const path = require('path');

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

app.use(morgan('combined', { stream: accessLogStream }));
```

Logs will now be rotated daily into the `log/` directory.

---

## 🎯 3. Dynamic Logging (Conditional Logging)

You can conditionally log requests based on custom rules — like logging only failed requests.

**Example:**

```javascript
app.use(morgan('combined', {
  skip: (req, res) => res.statusCode < 400, // log only errors (status code >= 400)
}));
```

---

## 🛠️ 4. Integrating with Winston

To extend Morgan’s functionality, integrate it with `winston` — a versatile logging library.

**Install Winston:**

```bash
npm install winston
```

**Setup combined logging:**

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

// Stream logs from Morgan to Winston
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) }}));
```

---

## 📡 5. Logging to Remote Services

You can send logs to remote services like Loggly, Datadog, or Elastic Stack (ELK) for centralized log management.

**Example with Loggly:**

```javascript
const { Loggly } = require('winston-loggly-bulk');

logger.add(new Loggly({
  token: "YOUR_LOGGLY_TOKEN",
  subdomain: "YOUR_SUBDOMAIN",
  tags: ["Winston-NodeJS"],
  json: true
}));

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) }}));
```

---

## 📈 6. Asynchronous Logging

For high-performance applications, use asynchronous logging to prevent blocking the event loop.

**Example:**

```javascript
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');

const logStream = createWriteStream('async-access.log', { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));

pipeline(process.stdout, logStream, (err) => {
  if (err) console.error('Logging pipeline failed', err);
});
```

---

## ✅ Conclusion

Mastering Morgan at an advanced level involves more than just simple logging. With custom tokens, log rotation, dynamic rules, and integrations with external services or libraries like Winston, you can build a robust, scalable logging system for your Express.js applications.

Would you like to dive into monitoring dashboards next? Let me know! 🌟

