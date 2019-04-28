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

if (process.env.PRODUCTION === 'true') {
    console.log('production mode');
} else {
    console.log('development mode');
}


const router = Router();

router.get('/hibernate', function (req, res) {
    res.end();
});

router.get('/wake', function (req, res) {

    if (process.env.PRODUCTION === 'true') {
        find(process.env.PC_IP)
            .then(device => {
                wol(device.mac).then(() => {
                    console.log('wol sent!');
                    res.end('wol sent!');
                });
            })
            .catch(err =>{
                console.error(err);
                req.end(500, 'internal server error')
            });
    } else {
        res.end('production only');
    }
});

const server = http.createServer(function (req, res) {
    console.log('recieved request: ', req.url);

    router(req, res, finalhandler(req, res));
});


server.listen(process.env.PORT, () => {
    console.log("Server listening on port", process.env.PORT);
});
