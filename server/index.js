const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const { connect } = require('./db');
const customerRoutes = require('./routes/customerRoutes');
const customerDeliveryPlantRoutes = require('./routes/customerDeliveryPlantRoutes');
const dnSummaryRoutes = require('./routes/dnSummaryRoutes');
const masterRoutes = require('./routes/masterRoutes');
const dcgrRoutes = require('./routes/dcgrRoutes');
const userTypeRoutes = require('./routes/userTypeRoutes');
const userMasterRoutes = require('./routes/userMasterRoutes');
const plannedDcgr = require('./routes/plannedDcgrRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Use Helmet middleware for basic security headers
app.use(helmet());

// XSS protection middleware
app.use(xss());

// API routes
app.use('/api/customer', customerRoutes);
app.use('/api/customerDeliveryPlant', customerDeliveryPlantRoutes);
app.use('/api/dnSummary', dnSummaryRoutes);
app.use('/api/master', masterRoutes);
app.use('/api/dcgr', dcgrRoutes);
app.use('/api/userType', userTypeRoutes);
app.use('/api/userMaster', userMasterRoutes);
app.use('/api/plannedDcgr', plannedDcgr);

// Connect to the database and start the server only if successful
connect()
  .then(() => {
    const PORT = process.env.PORT || 1433;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server due to database connection error:', err);
    process.exit(1); // Exit the process with failure
  });

