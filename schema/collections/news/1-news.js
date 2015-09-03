News = new orion.collection('news', {
  pluralName: 'Noticias',
  singularName: 'Artículo',
  title: 'Noticias',
  link: {
    title: 'Noticias',
    parent: 'news',
    index: 10
  },
  tabular: {
    columns: [
      { data: 'title', title: 'Título' },
      { data: 'date', title: 'Fecha', render: function(val) { return moment(val).format('LL'); } },
      {
        data: 'isReady',
        title: 'Categorizado',
        render: function(val) {
          return val ? '<i class="fa fa-check"></i>' : '<i class="fa fa-close"></i>';
        }
      },
      {
        data: '_id',
        title: 'Acciones',
        render: function(val) {
          return '<a href="' + Router.path('collections.news.show', { _id: val }) + '" class="btn btn-xs btn-default">Ver</a> ' +
          '<a href="' + Router.path('collections.news.data', { _id: val }) + '" class="btn btn-xs btn-default">Categorizar</a> ' +
          '<a href="' + Router.path('collections.news.update', { _id: val }) + '" class="btn btn-xs btn-default">Editar</a>';
        }
      }
    ]
  }
});


News.attachSchema({
  idx: {
    type: String,
    label: 'idx',
    optional: true,
    autoform: {
      omit: true
    }
  },
  agureId: {
    type: String,
    label: 'agureId',
    optional: true,
    autoform: {
      omit: true
    }
  },
  createdBy: orion.attribute('createdBy'),
  title: {
    type: String,
    label: 'Título',
    optional: true
  },
  subtitle: {
    type: String,
    label: 'Bajada',
    optional: true
  },
  body: {
    type: String,
    label: 'Cuerpo',
    optional: true,
    autoform: {
      type: 'textarea'
    }
  },
  media: orion.attribute('images', {
    label: 'Media',
    optional: true
  }),
  date: {
    type: Date,
    label: 'Fecha',
    autoform: {
      type: 'bootstrap-datetimepicker'
    },
    optional: true
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  }
});
