if (Meteor.isClient) {
  orion.links.add({
    identifier: 'clients',
    title: 'Clientes',
    index: 11,
    permission: 'collections.groups.index'
  });
}
