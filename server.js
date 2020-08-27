const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};
app.use(cors(corsOptions))

const db = require('./app/models');
const dbConfig = require('./app/config/db.config');
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Success connecting to mongodb')
    // aux function used to create three rows in roles collection
    initial();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({
    status: 'Success',
    message: 'Template application ok'
  });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        rolename: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        rolename: "mod"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'mod' to roles collection");
      });

      new Role({
        rolename: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}