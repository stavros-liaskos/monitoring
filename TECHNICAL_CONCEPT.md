### Conventions
"Monitoring" : monitoring page in xxxxxxx   
"App" : any app or apps that can be monitored

### Usability
Read more at main README.md file.  
Developer will:
1. Add subpage /heartbeat to any App
2. Add new entry for the App (array/textfile)
3. Commit (CI will deploy)

### Concept
Monitoring -> Ajax request -> App  
App -> Ajax response -> Sand

1. Monitoring will "host" status of App
2. Send SMS when something fails

### Monitoring
Monitoring is a page that hosts status of App.  
1. It will send an Ajax request every 10' to App.
2. It will send the request to a subdirectory of App /heartbeat
3. Update statuses after ajax response
4. Send sms if something is wrong
5. Array or text file, to support easier addition of new Apps
6. Format as follows: "name-of-app" : "url" (url should be for homepage and /heatbeat subdir will be added)
7. URL: https://dev.xxxxx.de/monitoring/ credentials: xxxxx:xxxx
###### Future: UI to support adding new Apps from Monitoring webpage
###### Caveats: Sync problems that my occur when using UI and CI at the same time

### App
App represents any app that will be monitored. This project has a sample app.
1. App has a subpage /heartbeat
2. /heartbeat will respond to the ajax request from Monitoring.
3. /heartbeat will have no view 
###### Future: Check App's functionality.

### Grunt
Grunt is a task runner. Will be used for concat, uglify and other tasks

### Gitlab CI
CI will deploy Monitoring to xxxxxx

### What is monitored
Actually, Apache