function timer(heartbeat_status_model_list) {
    var curHeartbeat_status_model_list_index = 0;

    // iterate the array again and again in interval
    var ajax_request_timer = setInterval(function () {
        if (curHeartbeat_status_model_list_index >= heartbeat_status_model_list.length) {
            curHeartbeat_status_model_list_index = 0;
        }

        current_heartbeat_status_model = heartbeat_status_model_list[curHeartbeat_status_model_list_index];

        // do the request
        request_status();

        ++curHeartbeat_status_model_list_index;
    }, INTERVAL_TIME);
}
