const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const cors = require('cors');
const http = require('http');
const connectDB = require('./dbConfig');
const cryptoRouter = require('./src/routes/cryptoRoute');
const cryptoService = require('./src/services/cryptoService.js');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  allowEIO3: true
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', cryptoRouter);

// socket connection
io.on('connection', (socket) => {
  console.log("Socket connected !!!");
  socket.on('disconnect', function() {
      console.log("socket disconnected !!!");
  });
  });

// it will run every 5 mins to fetch the latest crypto detials
cron.schedule('*/1 * * * *', async () => {
  console.log('running a task every 5  minute', new Date());
  await cryptoService.updateTopCryptos();
  io.emit('coinsUpdate', new Date());
});

const runApp = async () => {
  await connectDB();

  // app listen
  server.listen(3000, () => {
    console.log(`App listening at port number : 3000`)
  });
}
// run the application
runApp();

