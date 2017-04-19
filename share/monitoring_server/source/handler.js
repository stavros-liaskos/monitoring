// helper function to create a valid cross-browsere xmlhttrequest
function createCORSRequest(method, url) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);
    }
    else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    }
    else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
    }
    return xhr;
}

// handles "false" statuses -> by sending sms
function notification_handler(response) {
    var status_model = current_heartbeat_status_model.getCheck_status_model();

    if (response.errorMsg !== "xmlHttpRequest failed!") {
        if (!status_model.getApacheStatus())
            send_sms("apache down");

        if (!status_model.getPhpStatus())
            send_sms("php down");
    }
}

// compare versions
function versionValidator(monitored_app_protocol_version) {
    return monitored_app_protocol_version === current_protocol_version;
}

// handle ajax response for the current heartbeat_status_model
function handleAjaxResponse(response) {
    // validate response
//    response.apacheStatus = response !== false;

    // add version to the response obj
    response.version = current_heartbeat_status_model.getVersion();

    // version validator
    if (versionValidator(response.version)) {
        if (debug_level) {
            console.log('\n\nResponse : \n');
            console.log(response);
        }
        // update heartbeat_status_model
        current_heartbeat_status_model.updateCheckStatusModel(response);

        // call the notification handler
        notification_handler(response);
    }
    else {
        response.errorMsg("Version mismatch");
        // update heartbeat_status_model
        current_heartbeat_status_model.updateCheckStatusModel(response);
        console.log('\nVersion mismatch: Model name : ' + current_heartbeat_status_model.getName() + ', Model Version : ' + current_heartbeat_status_model.getVersion() + ', Current Version : ' + current_protocol_version + '\n');
    }
}

// create cors request and do the request. On success call handleAjaxResponse
function request_status() {
    var response_obj = {},
        request;

    request = require('request');
    request(current_heartbeat_status_model.getHeartbeat_url(), function (error, response, body) {
        if (error) { // handle error
            console.log("Error", error);  // Print the error if one occurred
            // update response obj
            response_obj.apacheStatus = current_heartbeat_status_model.getCheck_status_model().getApacheStatus();
            response_obj.phpStatus = current_heartbeat_status_model.getCheck_status_model().getPhpStatus();
            response_obj.currentStatus = false;
            response_obj.errorMsg = error;

            if (debug_level)
                console.log(response_obj);
            handleAjaxResponse(response_obj);
        }
        else if (response && response.statusCode === 200) { // handle response (at least apache is working)
            // parse response
            var responseText = response.body;
            var response_protocol_obj;

            try { // handle valid response (get a response_protocol obj)
                response_protocol_obj = JSON.parse(responseText);
                // update response obj
                response_obj.phpStatus = response_protocol_obj.phpStatus;
                response_obj.apacheStatus = response_protocol_obj.apacheStatus;
                response_obj.currentStatus = response_obj.apacheStatus && response_obj.phpStatus;
                response_obj.errorMsg = "None";
            }
            catch (e) { // handle response with anything but a response_protocol obj. Example: send response to any valid url and get back the body of html
                if (e instanceof SyntaxError) {
                    // update response obj
                    response_obj.phpStatus = false;
                    response_obj.apacheStatus = true;
                    response_obj.currentStatus = true;
                    response_obj.errorMsg = "Response Protocol error. PHP not tested!";
                }
            }

            if (debug_level)
                console.log(response_obj);
            handleAjaxResponse(response_obj);
        }
        else { // should never be here, but implemented to support any fail at the server
            console.log("Undefined error at request");
            // update response obj
            response_obj.apacheStatus = current_heartbeat_status_model.getCheck_status_model().getApacheStatus();
            response_obj.phpStatus = current_heartbeat_status_model.getCheck_status_model().getPhpStatus();
            response_obj.currentStatus = false;
            response_obj.errorMsg = "Undefined error. Status :" + response.statusCode;

            if (debug_level)
                console.log(response_obj);
            handleAjaxResponse(response_obj);
        }
    });
}
