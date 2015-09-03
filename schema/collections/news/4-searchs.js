filterForSearchObject = function(searchObject) {
  if (!searchObject) return {};

  check(searchObject, {
    groupsIds: Match.Optional([String]),
    brandsIds: Match.Optional([String]),
    fromDate: Match.Optional(Date),
    toDate: Match.Optional(Date),
    filter: Match.Optional(String)
  });

  var filter = {};

  if (searchObject.groupsIds) {
    filter.groupsIds = { $in: searchObject.groupsIds };
  }

  if (searchObject.brandsIds) {
    filter.brandsIds = { $in: searchObject.brandsIds };
  }

  if (searchObject.fromDate) {
    filter.date = { $gte: searchObject.fromDate };
  }

  if (searchObject.toDate) {
    filter.date = { $lte: searchObject.toDate };
  }

  return filter;
};

SearchNewsSchema = new SimpleSchema({
  groupsIds: orion.attribute('hasMany', {
    label: 'Grupos',
    optional: true
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'search_news_groupsIds_schema',
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
    publicationName: 'search_news_brandsIds_schema',
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
  fromDate: {
    type: Date,
    label: 'Desde Fecha',
    autoform: {
      type: 'bootstrap-datetimepicker'
    }
  },
  toDate: {
    type: Date,
    label: 'Hasta Fecha',
    autoform: {
      type: 'bootstrap-datetimepicker'
    }
  },
  filter: {
    type: String,
    label: 'Filtro'
  }
});
