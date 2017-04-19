function Monitored_app_model() {
    var _this = this;
    var id,
        official_url = "",
        heartbeat_url = "",
        name = "",
        version;

    /* Setters */
    this.setId = function (id) {
        _this.id = id;
    };

    this.setOfficial_url = function (official_url) {
        _this.official_url = official_url;
    };

    this.setHeartbeat_url = function (heartbeat_url) {
        _this.heartbeat_url = heartbeat_url;
    };

    this.setName = function (name) {
        _this.name = name;
    };

    this.setVersion = function (version) {
        _this.version = version;
    };

    /* Getters */
    this.getId = function () {
        return _this.id;
    };

    this.getOfficial_url = function () {
        return _this.official_url;
    };

    this.getHeartbeat_url = function () {
        return _this.heartbeat_url;
    };

    this.getName = function () {
        return _this.name;
    };

    this.getVersion = function () {
        return _this.version;
    };
}


function Monitored_apps_model() {
    var _this = this;
    var monitored_apps_list = [];

    this.setMonitored_apps_list = function (monitored_apps_list) {
        _this.monitored_apps_list = monitored_apps_list;
    };

    this.getMonitored_apps_list = function () {
        return _this.monitored_apps_list;
    };

    /* Functions */
    this.init = function () {
        var apps_list = [];

        var json = require('./monitored_apps_list.json');

        json.monitored_apps_list.forEach(function (el) {
            var monitored_app_model = new Monitored_app_model();
            monitored_app_model.setId(el.id);
            monitored_app_model.setOfficial_url(el.official_url);
            monitored_app_model.setHeartbeat_url(el.heartbeat_url);
            monitored_app_model.setName(el.name);
            monitored_app_model.setVersion(el.version);

            apps_list.push(monitored_app_model);
        });

        this.setMonitored_apps_list(apps_list);
    };
    this.init();
}