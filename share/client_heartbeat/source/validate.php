function validateApache() {
    return true;
}

function validatePHP() {
    return $_SERVER["SERVER_SOFTWARE"] == 'Apache';
}


