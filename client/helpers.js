Template.registerHelper('nl2br', function(text) {
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
  return new Spacebars.SafeString(nl2br);
});

Template.registerHelper('dateFormat', function(date, format) {
  return moment(date).format(format);
});
