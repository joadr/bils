var fs = Npm.require('fs');
var path = Npm.require('path');
var iconv = Npm.require('iconv-lite');

FileWatch = {};

FileWatch.listen = function(directory, encoding, callback) {
  var findNextFiles = function() {
    var files = fs.readdirSync(directory);
    _.each(files, function(name) {
      var filePath = directory + '/' + name;

      try {
        if (name.slice(-'.xml'.length) !== '.xml') return;
        contents = iconv.decode(fs.readFileSync(filePath), encoding);

        if (callback(contents)) {
          fs.unlink(filePath);
        }
      } catch (e) {
        console.log(e);
        fs.unlink(filePath);
      }
    });

    Meteor.setTimeout(findNextFiles, 1000);
  }

  findNextFiles();
}
