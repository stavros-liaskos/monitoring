<?php
$monitored_app_version = 0;
$monitored_app_id = 0;
$debug_level = 1;

class response_protocol {
    public $id;
    public $version;
    public $apacheStatus;
    public $phpStatus;

    public function __toString() {
        return '(id)'.(string)$this->id.'(/id)  (version)'.(string)$this->version.'(/version)  (apacheStatus)'.$this->apacheStatus.'(/apacheStatus)  (phpStatus)'.$this->phpStatus.'(/phpStatus)';
//        return '(apacheStatus)'.$this->apacheStatus.'(/apacheStatus)';
    }
}


function validateApache() {
    return true;
}

function validatePHP() {
    return $_SERVER["SERVER_SOFTWARE"] == 'Apache';
}


// init response obj 
function client_heartbeat_test() {
    $response_protocol_obj = new response_protocol;

    $response_protocol_obj->id = 0;
    $response_protocol_obj->version = 0;
    $response_protocol_obj->apacheStatus = validateApache();
    $response_protocol_obj->phpStatus = validatePHP();

    return json_encode($response_protocol_obj);
}

function main() {
    $response_protocol = client_heartbeat_test();
    echo $response_protocol;
}
main();

