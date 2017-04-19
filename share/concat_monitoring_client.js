var concat = require('concat-files');

concat(['./monitoring_client/source/js/jquery-3.2.1.min.js',
        './monitoring_client/source/css/bootstrap-3.3.7-dist/js/bootstrap.js'],
    './monitoring_client/source/output.js', function (err) {
        if (err) throw err;
        console.log('done');
    });