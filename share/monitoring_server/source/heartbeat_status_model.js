function Check_status_model() {
    var _this = this;

    var apacheStatus, phpStatus, lastSuccess, lastFail, currentStatus, errorMsg = "";

    /* Setters */
    this.setApacheStatus = function (apacheStatus) {
        _this.apacheStatus = apacheStatus;
    };

    this.setPhpStatus = function (phpStatus) {
        _this.phpStatus = phpStatus;
    };

    this.setLastSuccess = function (lastSuccess) {
        _this.lastSuccess= lastSuccess;
    };

    this.setLastFail = function (lastFail) {
        _this.lastFail= lastFail;
    };

    this.setCurrentStatus = function (currentStatus) {
        _this.currentStatus = currentStatus;
    };

    this.setErrorMsg = function (errorMsg) {
        _this.errorMsg = errorMsg;
    };

    /* Getters */
    this.getApacheStatus = function () {
        return _this.apacheStatus;
    };

    this.getPhpStatus = function () {
        return _this.phpStatus;
    };

    this.getLastSuccess = function () {
        return _this.lastSuccess;
    };

    this.getLastFail = function () {
        return _this.lastFail;
    };

    this.getCurrentStatus = function () {
        return _this.currentStatus;
    };

    this.getErrorMsg = function () {
        return _this.errorMsg;
    };

    /* Functions */
    this.init = function () {
        _this.setApacheStatus(false);
        _this.setPhpStatus(false);
        _this.setLastFail("NaN");
        _this.setLastSuccess("NaN");
        _this.setCurrentStatus(false);
        _this.setErrorMsg("None");
    };

    this.init();
}

function Heartbeat_status_model(monitored_app_model) {
    var _this = this;
    var check_status_model = {};

    /* Setters */
    this.setCheck_status_model = function (check_status_model) {
        _this.check_status_model = check_status_model;
    };

    /* Getters */
    this.getCheck_status_model = function () {
        return _this.check_status_model;
    };

    /* Functions */
    /* structure of values? maybe {apacheStatus = false, phpStatus = false}*/
    this.updateCheckStatusModel = function (checkObj) {
        var moment = require('moment');
        var date;

        if (typeof checkObj !== 'undefined') {
            if (typeof  checkObj.errorMsg !== 'undefined')
                _this.getCheck_status_model().setErrorMsg(checkObj.errorMsg);
            else
                _this.getCheck_status_model().setErrorMsg("errorMsg undefined!");

            if (typeof checkObj.apacheStatus !== 'undefined')
                _this.getCheck_status_model().setApacheStatus(checkObj.apacheStatus);
            else
                _this.getCheck_status_model().setErrorMsg("apacheStatus undefined!");

            if (typeof  checkObj.phpStatus !== 'undefined')
                _this.getCheck_status_model().setPhpStatus(checkObj.phpStatus);
            else
                _this.getCheck_status_model().setErrorMsg("phpStatus undefined!");

            if (typeof  checkObj.currentStatus !== 'undefined')
                _this.getCheck_status_model().setCurrentStatus(checkObj.currentStatus);
            else
                _this.getCheck_status_model().setErrorMsg("currentStatus undefined!");

            //update currentStatus and lastSuccessRelative
            if (_this.getCheck_status_model().getCurrentStatus()) {
                _this.getCheck_status_model().setLastSuccess(moment().format("D/M/YYYY h:mm:ss"));
            }
            else { // update CurrentStatus and lastFailRelative
                _this.getCheck_status_model().setLastFail(moment().format("D/M/YYYY h:mm:ss"));
            }
        }
        else {
            _this.getCheck_status_model().setErrorMsg("No input given at updateCheckStatusModel");
        }
    };

    this.init = function (monitored_app_model) {
        // create heartbeat_status_model as a monitored_app_model
        Object.assign(_this, monitored_app_model);

        var tmp_check_status_model = new Check_status_model();
        _this.setCheck_status_model(tmp_check_status_model);
    };

    this.init(monitored_app_model);
}

function Heartbeat_statuses_model(monitored_apps_model) {
    var _this = this;
    var heartbeat_statuses_model_list = [];

    this.setHeartbeat_statuses_model_list = function (heartbeat_statuses_model_list) {
        _this.heartbeat_statuses_model_list = heartbeat_statuses_model_list;
    };

    this.getHeartbeat_statuses_model_list = function () {
        return _this.heartbeat_statuses_model_list;
    };

    this.init = function (monitored_apps_model) {
        var apps_list = [];

        monitored_apps_model.forEach(function (el) {
            var heartbeat_status_model = new Heartbeat_status_model(el);

            apps_list.push(heartbeat_status_model);
        });

        this.setHeartbeat_statuses_model_list(apps_list);
    };

    this.init(monitored_apps_model);
}