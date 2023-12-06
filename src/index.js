const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./database/models')
const path = require('path');
const ensureLoggedIn = require('./middleware/ensureLogin');
require('dotenv').config();
require('./auth/passport');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swagger_options = require('./config/swagger.config');

const router = require('./routes')
const urlController = require('./controllers/url.controller');

const PORT = process.env.PORT;

const secret = process.env.SECRET;

swagger_options.apis.push(path.join(__dirname, 'routes', '*.js'));
const openapiSpecification = swaggerJsdoc(swagger_options);

const sessionStore = new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 60 * 60 * 300,
    expiration: 60 * 60 * 300
});
sessionStore.sync()

const corsOptions = {
    origin: `localhost:${PORT}`
}

const app = express();


app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join('src', 'views'));


app.set('trust proxy', 1); //trust first proxy

app.use(session({
    store: sessionStore,
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 250 }  //15mins
}));

app.use(passport.initialize());
app.use(passport.session());


/**
 * @swagger
 * /:
 *   get:
 *     description: Home route
 *     responses:
 *       200:
 *         description: Returns a welcome message.
 */
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'welcome'
    })
});

app.get('/:short', urlController.getUrl);

app.use('/api', router)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, {explorer: true}));

app.use('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'invalid route'
    })
});

app.use((error, req, res, next) => {
    const status = error.status || 500
    res.status(status).json({
        status: false,
        message: error.message
    })
});

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
});