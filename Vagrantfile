# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "scotch/box"
  config.vm.network "private_network", ip: "192.168.33.60"
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provision "file", source: "./provisioning/grunt_setup.sh", destination: "/home/vagrant/grunt_setup.sh"
  config.vm.provision "file", source: "./provisioning/package.json", destination: "/home/vagrant/package.json"

  config.vm.synced_folder "./share", "/var/www", :mount_options => ["dmode=777", "fmode=666"]

  config.vm.provision "shell", inline: <<-SHELL
    bash /home/vagrant/grunt_setup.sh
#    sudo npm install
    cd /var/www/monitoring_server && npm install
    sed -i -e 's=/var/www/public=/var/www=g' /etc/apache2/sites-available/000-default.conf
    sed -i -e 's=/var/www/public=/var/www=g' /etc/apache2/sites-available/scotchbox.local.conf
    sudo service apache2 restart
  SHELL

end


