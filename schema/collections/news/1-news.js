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
  createdBy: orion.attribute('createdBy'),
  groupsIds: orion.attribute('hasMany', {
    label: 'Grupos',
    optional: true
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'news_groupsIds_schema',
    additionalFields: ['agencyId'],
    filter: function(userId) {
      var selectors = Roles.helper(userId, 'clients.myGroups') || null;
      return { $or: selectors };
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
    filter: function(userId) {
      var selectors = Roles.helper(userId, 'clients.myBrands') || null;
      var myBrandsFilter = { $or: selectors };
      if (Meteor.isServer) {
        return myBrandsFilter;
      } else {
        var groupsIds = AutoForm.getFieldValue('groupsIds');
        return groupsIds ? { $and: [{ groupId: { $in: groupsIds } }, myBrandsFilter] } : myBrandsFilter;
      }
    }
  }),
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
  },
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
    return Brands.find({ _id: { $in: ids } });
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
