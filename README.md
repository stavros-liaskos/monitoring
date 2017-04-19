## Build
```
vagrant up
cd /var/www/
npm run all # builds client_heartbeat, monitoring_client, monitoring_server and starts server
```
for specific builds and a detailed explanation on the build process, read package.json.   
monitoring_client available at http://192.168.33.60:3000/  
monitoring_server output at console  
client_heartbeat snippet available at http://192.168.33.60/client_heartbeat/build/

## Deploy
monitoring_server and monitoring_client are getting deployed to xxxxx using CI.  
To build the new image and start the docker container, read section "Docker"   
To monitor a new app, add the entry at `monitored_apps_list.json` and automate the deployment by adding an entry in the CI conf(if not possible, then use ftp).

## Docker
A Node.js based docker images is used for this project.
```
docker build -t xxxxx/node_app . # builds image (relative path -> should be executed at /home/xxxxxx/1077_monitoring/
docker run -v /etc/localtime:/etc/localtime -p 10777:3000 --name 10777_monitoring -d xxxxx/node_app # starts container AND sync host timezone with container https://github.com/docker/docker/issues/3359#issuecomment-38134906
docker logs -f <container id> # get output (get container id with docker ps)(-f: follow output)
docker exec -it <container id> /bin/bash # enter the container
```
To use newly deployed files:
1. stop service
2. delete docker image AND container
3. build new image
4. start service

Failover handling: 10777_monitoring.conf has been added to /etc/init/ and started `sudo service 107777_monitoring start`
###### Link: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

## Access / Credentials
xxxxx   
xxxxx
#### Local access
```
http://192.168.33.60:3000/  # monitoring client
http://192.168.33.60/client_heartbeat/build/  # dummy response obj from client_heartbeat.php
```

## Checks
```
apacheStatus    : server status (false also when ajax request throws an error)
phpStatus       : php status (when errorMsg = "Response Protocol error" and apache=true, phpStatus is not real because it's not tested)
lastSuccess     : last time currentStatus was true
lastFail        : last time currentStatus was false
currentStatus   : true when all statuses are true
errorMsg        : simulate console.error. Used to log error messages at the UI
```
## Caveats
Request to basic auth url: see ethercalc entry at monitored_apps_list.json