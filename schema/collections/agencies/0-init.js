if (Meteor.isClient) {
  orion.links.add({
    identifier: 'agencies',
    title: 'Agencias',
    index: 1,
    permission: 'collections.agencies.index'
  });

  orion.links.add({
    identifier: 'agencies-create-user',
    parent: 'agencies',
    title: 'Crear Usuario',
    index: 1,
    permission: 'accounts.showCreate',
    routeName: 'accounts.create'
  });
}
