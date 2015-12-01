News = new orion.collection('news', {
  pluralName: 'Noticias',
  singularName: 'Artículo',
  title: 'Noticias',
  link: {
    title: 'Noticias',
    index: 14
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
    prevAprove: {
    type: Boolean,
    label: 'Visualizar en Noticias',
    optional: true,
    autoform: {
      omit: false
    }
  },
  createdBy: orion.attribute('createdBy'),
  groupsIds: orion.attribute('hasMany', {
    label: 'Grupos',
    optional: true
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'news_groupsIds_schema',
    additionalFields: ['agencyId'],
    validateOnServer: false,
    filter: function(userId) {
      var selectors = Roles.helper(userId, 'clients.myGroups') || null;
      return selectors.length > 0 ? { $or: selectors } : null;
    }
  }),
  brandsIds: orion.attribute('hasMany', {
    label: 'Marcas',
    optional: true
  }, {
    collection: Brands,
    titleField: 'name',
    additionalFields: ['groupId'],
    publicationName: 'news_brandsIds_schema',
    validateOnServer: false,
    filter: function(userId) {
      var selectors = Roles.helper(userId, 'clients.myBrands') || [];
      var myBrandsFilter = { $or: selectors };
      if (Meteor.isServer) {
        return selectors.length > 0 ? myBrandsFilter : null;
      } else {
        var groupsIds = AutoForm.getFieldValue('groupsIds');
        return groupsIds ? { $and: [{ groupId: { $in: groupsIds } }, myBrandsFilter] } : myBrandsFilter;
      }
    }
  }),
  title: {
    type: String,
    label: 'Título'
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
    }
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  // page: {
  //   type: String,
  //   label: 'Pagina',
  //   optional: true
  // },
  // size: {
  //   type: String,
  //   label: 'Tamaño',
  //   optional: true
  // },
  // typeId: {
  //   label: 'Tipo de Suplemento',
  //   type: String,
  //   optional: true,
  //   allowedValues: function() {
  //     return _.pluck(SuplementsTypes.find().fetch(), '_id');
  //   },
  //   autoform: {
  //     options: function() {
  //       return SuplementsTypes.find().map(function(type) {
  //         return {
  //           value: type._id,
  //           label: type.name
  //         }
  //       });
  //     }
  //   }
  // },
  mediumId: orion.attribute('hasOne', {
    label: 'Medio',
    optional: true
  }, {
    collection: Mediums,
    titleField: 'name',
    publicationName: 'news_mediumId_schema',
  }),
    suplementId: orion.attribute('hasOne', {
    label: 'Suplemento',
    optional: true
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
  categorizedBy: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  }
});

News.helpers({
  groups: function() {
    var ids = this.groupsIds || [];
    return Groups.find({ _id: { $in: ids } });
  },
  brands: function() {
    var ids = this.brandsIds || [];
    return Brands.find({ _id: { $in: ids }});
  },
   brands2: function() {

    var ids = this.brandsIds || [];
    var agency = _.pluck(Agencies.find().fetch(), '_id');
    var group = _.pluck(Groups.find({agencyId: { $in: agency }}).fetch(), '_id');

    return Brands.find({ _id: { $in: ids }, groupId:{ $in: group }});
    
  },
  mediums: function() {
    var ids = this.mediumId;
    return Mediums.find({ _id: ids });
  },
  dataForUser: function(userId) {
    check(userId, String);
    var agency;

    if (Roles.userHasRole(userId, 'cliente')) {
      var myGroupsIds = _.pluck(Brands.find({ clientsIds: userId }).fetch(), 'groupId');
      var myAgenciesIds = _.pluck(Groups.find({ _id: { $in: myGroupsIds } }).fetch(), 'agencyId');
      agency = Agencies.findOne({ _id: { $in: myAgenciesIds } });
    } else if (Roles.userHasRole(userId, 'agencia') || Roles.userHasRole(userId, 'ejecutivo')) {
      agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    } else {
      console.log('admins no tienen agencia');
    }

    if (!agency) return;
    return NewsData.findOne({ articleId: this._id, agencyId: agency._id });
  },
  isCategorized: function(userId) {
    check(userId, String);
    var agency;

    if (Roles.userHasRole(userId, 'cliente')) {
      var myGroupsIds = _.pluck(Brands.find({ clientsIds: userId }).fetch(), 'groupId');
      var myAgenciesIds = _.pluck(Groups.find({ _id: { $in: myGroupsIds } }).fetch(), 'agencyId');
      agency = Agencies.findOne({ _id: { $in: myAgenciesIds } });
    } else if (Roles.userHasRole(userId, 'agencia') || Roles.userHasRole(userId, 'ejecutivo')) {
      agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    }

    return agency && _.contains(this.categorizedBy, agency._id);
  }
});
