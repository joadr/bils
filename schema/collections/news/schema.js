News.attachSchema({
  createdBy: orion.attribute('createdBy'),
  mediumId: orion.attribute('hasOne', {
    label: 'Medio'
  }, {
    collection: Mediums,
    titleField: 'name',
    publicationName: 'news_mediumId_schema',
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
  codeMessageExists: {
    type: Boolean,
    label: 'Existe mensaje clave',
    optional: true
  },
  spokesmans: {
    type: [String],
    label: 'Voceros',
    optional: true
  },
  codeMessage: {
    type: [String],
    label: 'Mesajes secretos',
    optional: true
  }
});