var debug_level = 0, // 0: no, 1: basic, 2: dev
    monitored_apps_model,
    heartbeat_statuses_model,
    current_protocol_version = 0,
    INTERVAL_TIME = 30000,
    current_heartbeat_status_model = {}; // heartbeat status model that it's been iterated currently
