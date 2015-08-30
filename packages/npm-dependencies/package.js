Package.describe({
  name: 'npm-dependencies',
  version: '1.0.0',
});

Npm.depends({
  'excel-export': '0.4.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['meteor-platform']);

  api.addFiles('export.js', 'server');

  api.export('Excel', 'server');
  //api.export();
});
