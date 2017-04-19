#!/bin/bash

function provisioning {
	sudo apt-get update

	sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
	sudo apt-get install -y nodejs

	sudo npm install -g npm@^3.8.8
        echo NPM SUCCEED INSTALLED!

	sudo npm install -g grunt-cli@^1.2.0
        echo GRUNT-CLI SUCCESSFULLY INSTALLED!

	sudo npm install -g jshint
        echo JSHINT SUCCESSFULLY INSTALLED!

    sudo npm install -g uglify-js
        echo UGLIFYJS SUCCESSFULLY INSTALLED!
}
provisioning
