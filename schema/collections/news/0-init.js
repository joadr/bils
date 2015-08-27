if (Meteor.isClient) {
  orion.links.add({
    identifier: 'news',
    title: 'Noticias',
    index: 14
  });

  orion.links.add({
    identifier: 'news-create',
    title: 'Cargar',
    parent: 'news',
    index: 1
  });
}
