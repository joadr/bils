var fs = Npm.require('fs');
var path = Npm.require('path');

FileWatch = {};

FileWatch.listen = function(directory, callback) {
  var timer = Meteor.setInterval(function() {
    var files = fs.readdirSync(directory);
    _.each(files, function(name) {
      if (name.slice(-'.xml'.length) !== '.xml') return;

      var filePath = directory + '/' + name;
      var contents = fs.readFileSync(filePath, 'utf8');
      if (callback(contents)) {
        fs.unlink(filePath);
      }
    });
  }, 4000);
}
