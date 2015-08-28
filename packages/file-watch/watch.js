var fs = Npm.require('fs');
var path = Npm.require('path');

FileWatch = {};

FileWatch.listen = function(directory, callback) {
  var timer = Meteor.setInterval(function() {

  }, 1000);


  try {
    var files = fs.readdirSync(directory);
    _.each(files, function(name) {
      if (name.slice(-'.xml'.length) !== '.xml') return;

      console.log(name);

      var filePath = directory + '/' + name;
      var contents = fs.readFileSync(filePath, 'utf8');

      if (callback(contents)) {
        fs.unlink(filePath);
      }
    });
  } catch (e) {
    console.log(e);
  }

}
