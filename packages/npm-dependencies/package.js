Package.describe({
  name: 'npm-dependencies',
  version: '1.0.0',
});

Npm.depends({

});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['meteor-platform']);

  api.addFiles('export.js', 'server');

  //api.export();
});
