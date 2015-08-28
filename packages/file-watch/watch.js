var fs = Npm.require('fs');
var path = Npm.require('path');
var iconv = Npm.require('iconv-lite');

FileWatch = {};

FileWatch.listen = function(directory, encoding, callback) {
  var timer = Meteor.setInterval(function() {

  }, 1000);



  try {
    var files = fs.readdirSync(directory);
    _.each(files, function(name) {
      if (name.slice(-'.xml'.length) !== '.xml') return;

      console.log(name);

      var filePath = directory + '/' + name;
      contents = iconv.decode(fs.readFileSync(filePath), encoding);

      if (callback(contents)) {
        fs.unlink(filePath);
      }
    });
  } catch (e) {
    console.log(e);
  }

}
