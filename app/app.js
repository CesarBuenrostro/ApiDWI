const app = express();
const routerRopa = require ('./routes/ropaRouter');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/palapa', routerRopa);

module.exports = app;