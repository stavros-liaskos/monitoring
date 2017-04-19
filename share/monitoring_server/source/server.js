"use strict";

function server_start() {
    var express = require('express');
    var app = express();
    var path = require('path');
    var express_handlebars = require('express-handlebars');

    /*
     app.use('/', express.static(__dirname + '/../../monitoring_client/build'));
     app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname + '/../../monitoring_client/build/index.html'));
     //res.send(req);
     });
     app.use('/', function (req, res, next) {
     express.static(__dirname + '/../../monitoring_client/build');
     var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
     console.log('Client IP:', ip);
     next();
     });
     */
    // registers template engine
    app.engine('handlebars', express_handlebars({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, '/../../monitoring_client/build/views/')
    }));
    // use handlebars as view engine
    app.set('view engine', 'handlebars');
    // use this path for the "views" dir
    app.set('views', path.join(__dirname, '/../../monitoring_client/build/views/'));

    var options = {
        dotfiles: 'ignore', etag: false,
        extensions: ['html'],
        index: false
    };
    // serve static content
    app.use(express.static(path.join(__dirname, '/../../monitoring_client/build/'), options));
    // renders the template with the given variables and a helper function
    app.get('/', function (req, res) {
        res.render('monitored_apps_status', {
            monitored_apps_list: heartbeat_statuses_model.getHeartbeat_statuses_model_list(),
            helpers: {
                /* helper function to stringify the Object so we view the content. Usage {{json monitored_apps_list}}*/
                json: function (context) {
                    return JSON.stringify(context);
                }
            }
        });
    });

    app.listen(3000, function () {
        console.log('\nServer listening at port: 3000\n\n');
        // init monitored_apps_model
        monitored_apps_model = new Monitored_apps_model();
        if (debug_level) {
            console.log('\n\nMonitored_apps_model: \n');
            console.log(monitored_apps_model.getMonitored_apps_list());
        }
        // init heartbeat_statuses_model
        heartbeat_statuses_model = new Heartbeat_statuses_model(monitored_apps_model.getMonitored_apps_list());
        if (debug_level) {
            console.log('\n\nHeartbeat_statuses_model\n');
            console.log(heartbeat_statuses_model.getHeartbeat_statuses_model_list());
        }

        if (debug_level === 2) {
            var firstElem = heartbeat_statuses_model.getHeartbeat_statuses_model_list()[0];
            console.log('\n\nHeartbeat_status_model: 1 \n');
            console.log(firstElem);

            firstElem.updateCheckStatusModel({apacheStatus: true, phpStatus: true});
            console.log('\n\nHeartbeat_status_model: 1, updated \n');
            console.log(heartbeat_statuses_model.getHeartbeat_statuses_model_list());
        }

        // pass array with Heartbeat_status_model to timer to start setting requests periodically
        timer(heartbeat_statuses_model.getHeartbeat_statuses_model_list());
    });
}
server_start();
