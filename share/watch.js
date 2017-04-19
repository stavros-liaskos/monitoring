var watch = require('watch');

watch.createMonitor('./source', function (monitor) {
    monitor.files['./source/timer.js'] // Stat object for my zshrc.
    monitor.on("created", function (f, stat) {
        // Handle new files
    })
    monitor.on("changed", function (f, curr, prev) {
        // Handle file changes
        console.log("poka")
    })
    monitor.on("removed", function (f, stat) {
        // Handle removed files
    })
    monitor.stop(); // Stop watching
})