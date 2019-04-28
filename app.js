const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');
const find = require('local-devices');
const wol = require('wakeonlan');

const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
    throw result.error
}


let device;
find(process.env.PC_IP)
    .then(device => this.device = device)
    .catch(console.error);


const router = Router();
router.get('/hibernate', function (req, res) {
    console.log('hi');
    res.end();
});
router.get('/wake', function (req, res) {
    wol(this.device.mac).then(() => {
        console.log('wol sent!')
    });
    res.end();
});

const server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res));



    console.log('Server created')
});


server.listen(8080);
