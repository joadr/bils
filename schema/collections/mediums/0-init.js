if (Meteor.isClient) {
  orion.links.add({
    identifier: 'mediums',
    title: 'Medios',
    index: 12
  });

  orion.links.add({
    identifier: 'mediums-admin',
    title: 'Admin',
    parent: 'mediums',
    index: 1
  });
}
