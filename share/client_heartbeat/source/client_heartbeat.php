// init response obj 
function client_heartbeat_test() {
    $response_protocol_obj = new response_protocol;

    $response_protocol_obj->id = 0;
    $response_protocol_obj->version = 0;
    $response_protocol_obj->apacheStatus = validateApache();
    $response_protocol_obj->phpStatus = validatePHP();

    return json_encode($response_protocol_obj);
}

