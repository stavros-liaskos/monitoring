var concat = require('concat-files');

concat(['./monitoring_server/source/globals.js',
        './monitoring_server/source/handler.js',
        './monitoring_server/source/server.js',
        './monitoring_server/source/monitored_apps_model.js',
        './monitoring_server/source/heartbeat_status_model.js',
        './monitoring_server/source/sms.js',
        './monitoring_server/source/timer.js'],
    './monitoring_server/source/output.js', function (err) {
        if (err) throw err;
        console.log('done');
    });