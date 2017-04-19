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


