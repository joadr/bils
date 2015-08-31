AccountsTemplates.configure({
  showForgotPasswordLink: true
});

AccountsTemplates.configureRoute('resetPwd', {
  name: 'reset-password',
  path: 'reset-password',
  layoutTemplate: 'resetPasswordLayout'
});


Accounts.emailTemplates.resetPassword.subject = function() {
  return 'Resetear contraseña';
}
Accounts.emailTemplates.resetPassword.text = function(user, url) {
  var name = user && user.profile && user.profile.name
  return 'Hola, ' + name + '\n\nPara resetear tu contraseña, haz click en el siguente link.\n\n' + url + '\n\nGracias.\n'
}
