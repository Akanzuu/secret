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

app.post('/arkose-proxy', (req, res) => {
    const bda = req.query.bda
    const public_key = req.query.public_key
    const userbrowser = req.query.userbrowser
    const language = req.query.language
    const rnd = req.query.rnd
    const blob = req.query.data.blob
    const proxy = req.query.proxy.split(":")
    axios({
        method: 'POST',
        url: `https://roblox-api.arkoselabs.com/fc/gt2/public_key/476068BF-9607-4799-B53D-966BE98E2B81?bda=${bda}&public_key=${public_key}&userbrowser=${userbrowser}&language=${language}&rnd=${rnd}&data[blob]=${blob}`,
        headers: {
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'referer': 'https://www.roblox.com/',
            'origin': 'https://www.roblox.com',
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
        //   params: {
        //     bda: encodeURI(bda),
        //     public_key: public_key,
        //     site: "https://www.roblox.com" ,
        //     userbrowser: encodeURI(userbrowser),
        //     language: language,
        //     rnd: rnd,
        //     data: {
        //         blob: blob
        //     },
        // }
      }).then(function (response) {
          console.log(response)
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