const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 5000;
const pg = require("pg");
const Pool = pg.Pool;
require('dotenv').config()
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:mthobisi@localhost:5432/users';
var pool;
if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });
} else {
    pool = new Pool({
        connectionString,
        ssl: false
    });
}
// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// enable the static folder...
app.use(express.static('public'));
// add more middleware to allow for templating support
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

let counter = 0;
const shopper = require('./avo-shopper')(pool);
app.get('/', async function(req, res) {
    var data = await shopper.topFiveDeals();
    console.log(data)
    res.render('index', {
        data
    });
});
app.get('/add/:type', async function(req, res) {
    var type = req.params.type;
    if (type == 'deal') {
        var shops = await shopper.listShops()
        res.render('adddeal', { shops })
    } else if (type == 'shop') {
        res.render('addshop')
    }
});

app.post('/newshop', async function(req, res) {
    var shopName = req.body.shop;
    console.log(shopName);
    await shopper.createShop(shopName)
    res.redirect('/')
});
app.post('/newdeal', async function(req, res) {
    var price = req.body.price;
    var qty = req.body.qty;
    var shop = req.body.shop;
    var shopId = await shopper.getShopId(shop);
    await shopper.createDeal(shopId, qty, price);
    res.redirect('/')
});
app.get('/deals', async function(req, res) {
    var shops = await shopper.listShops()
    res.render('deals', { shops })
});
app.get('/shop/:shopName', async function(req, res) {
    var shopName = req.params.shopName;
    var shopId = await shopper.getShopId(shopName);
    var data = await shopper.dealsForShop(shopId);
    console.log(data)
    res.render('specshop', { data, shopName });
});
app.post('/amount', async(req, res) => {
    var amount = Number(req.body.amount);
    var data = await shopper.recommendDeals(amount);
    console.log(data)
    res.render('amount', { data });
});
// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
    console.log(`AvoApp started on port ${PORT}`)
});