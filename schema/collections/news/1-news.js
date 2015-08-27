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
    ]
  }
});


News.attachSchema({
  createdBy: orion.attribute('createdBy'),
  mediumId: orion.attribute('hasOne', {
    label: 'Medio'
  }, {
    collection: Mediums,
    titleField: 'name',
    publicationName: 'news_mediumId_schema',
  }),
  suplementId: orion.attribute('hasOne', {
    label: 'Suplemento'
  }, {
    collection: Suplements,
    titleField: 'name',
    additionalFields: ['mediumId'],
    publicationName: 'news_suplementId_schema',
    filter: function(userId) {
      if (Meteor.isServer) {
        return {};
      } else {
        var mediumId = AutoForm.getFieldValue('mediumId');
        return mediumId ? { mediumId: mediumId } : {};
      }
    }
  }),
  page: {
    type: String,
    label: 'Página',
    optional: true
  },
  section: {
    type: String,
    label: 'Sección',
    optional: true
  },
  title: {
    type: String,
    label: 'Título'
  },
  date: {
    type: Date,
    label: 'Fecha',
    autoform: {
      type: 'bootstrap-datetimepicker'
    }
  },
  space: {
    type: String,
    label: 'Espacio',
    optional: true
  },
  size: {
    type: String,
    label: 'Centrimetage',
    optional: true
  },
  duration: {
    type: String,
    label: 'Duración',
    optional: true
  },
  journalist: {
    type: String,
    label: 'Periodista',
    optional: true
  },
  colorType: {
    type: String,
    allowedValues: ['yes', 'no', 'not-the-case'],
    label: 'Es a color',
    autoform: {
      options: {
        'not-the-case': 'No aplica',
        yes: 'Si',
        no: 'No'
      }
    },
    optional: true
  },
  sentiment: {
    type: String,
    label: 'Sentimiento',
    optional: true
  },
  typeOfNote: {
    type: String,
    label: 'Tipo de nota',
    optional: true
  },
  opinion: {
    type: String,
    label: 'Opinión',
    optional: true
  },
  topic: {
    type: String,
    label: 'Tema',
    optional: true
  },
  relevance: {
    type: String,
    label: 'Relevancia',
    optional: true
  },
  mentionsTheBrandInTheTitle: {
    type: Boolean,
    label: 'Menciona a la marca en el título',
    optional: true
  },
  mentionsTheBrandInTheBody: {
    type: Boolean,
    label: 'Menciona a la marca en el cuerpo',
    optional: true
  },
  bransAppearsVisually: {
    type: Boolean,
    label: 'La marca aparece en la foto',
    optional: true
  },
  spokesmans: {
    type: [String],
    label: 'Voceros',
    optional: true
  },
  secretMessage0Exists: {
    type: Boolean,
    label: 'Existe mensaje secreto 0',
    optional: true
  },
  secretMessage1Exists: {
    type: Boolean,
    label: 'Existe mensaje secreto 1',
    optional: true
  },
  secretMessage2Exists: {
    type: Boolean,
    label: 'Existe mensaje secreto 2',
    optional: true
  },
  secretMessage3Exists: {
    type: Boolean,
    label: 'Existe mensaje secreto 3',
    optional: true
  },
  secretMessage4Exists: {
    type: Boolean,
    label: 'Existe mensaje secreto 4',
    optional: true
  },
  secretMessage5Exists: {
    type: Boolean,
    label: 'Existe mensaje secreto 5',
    optional: true
  },
});
