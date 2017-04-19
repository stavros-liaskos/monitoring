var concat = require('concat-files');

concat(['./client_heartbeat/source/const.php',
        './client_heartbeat/source/response_protocol.php',
        './client_heartbeat/source/validate.php',
        './client_heartbeat/source/client_heartbeat.php',
        './client_heartbeat/source/main.php'],
    './client_heartbeat/build/index.php', function (err) {
        if (err) throw err;
        console.log('done');
    });