var express = require('express');
var axios = require('axios').default;

var port = process.env.PORT || 80;

var app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.status(403).end()
  });

  
app.get('/fc/gt2/public_key/:key/:proxy', (req, res) => {
    
    const proxy = req.params.proxy.split(":")
    axios({
        method: 'get',
        url: 'https://roblox-api.arkoselabs.com/fc/gt2/public_key/' + req.params.key,
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'Referer': 'https://www.roblox.com/',
            'Origin': 'https://www.roblox.com',
        },
        responseType: 'json',
        proxy: {
            protocol: 'http',
            host: proxy[0],
            port: proxy[1],
            auth: {
              username: 'edkddsdll',
              password: '45vi42o9ct0ww'
            }
          },
          params: {
            bda: encodeURI(req.query.bda),
            public_key: req.query.public_key ,
            site: "https://www.roblox.com" ,
            userbrowser: encodeURI(req.query.userbrowser) ,
            language: req.query.language ,
            rnd: req.query.rnd ,
            data: {
                blob: encodeURI(req.query.data.blob) ,
            }
        }
      }).then(function (response) {
          res.send(response.data)
        }).catch(function (error) {
            if (error.response) {
              res.send(error.response.status);
            } else if (error.request) {
              res.send(error.status);
            } else {
              res.send('Error', error.message);
            }
            res.send(error.config);
          });
  });
  

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
  });