var exportNews = function(type, filter) {
  /**
   * Mira, te lo deje listo.
   * Tipo puede ser excel,powerpoint,pdf.
   *
   * Filter es el filtro que tienes que ponerle a las noticias, por ejemplo
   * var noticiasAExportar = News.find(filter);
   * así se mágico.
   *
   * El cliente no va estar subscrito a todas las noticias, asique tienes que
   * hacerlo desde el servidor.
   *
   * La informacion que llena el analista esta en otra collection pero te deje un helper
   * para que lo saques facilmente: (solo para servidor)
   * var article = News.findOne();
   * var data = article.dataForUser(__userId__);
   */
  alert('Joaquin, rellenar esta funcion por favor (client/views/news/index.js)');
}


ReactiveTemplates.set('collections.news.index', 'collectionsNewsIndex');
var formDep = new Tracker.Dependency();

Template.collectionsNewsIndex.onCreated(function() {
  var self = this;
  Session.set('collectionsNewsIndexLimit', 20);

  self.autorun(function() {
    formDep.depend();
    var data = AutoForm.getFormValues('collectionsNewsIndexSearchForm');
    Session.set('collectionsNewsIndexValues', data && data.insertDoc);
  })

  self.autorun(function() {
    var limit = Session.get('collectionsNewsIndexLimit');
    var values = Session.get('collectionsNewsIndexValues');
    self.subscribe('news.search', values, limit);
    Meteor.call('countForSearch', values, function(error, response) {
      if (!error) {
        Session.set('collectionsNewsIndexCount', response);
      }
    });
  })
});

Template.collectionsNewsIndex.onRendered(function() {
  Session.set('allChecked', false);
  Session.set('selectedNews', []);
});

Template.collectionsNewsIndex.helpers({
  news: function() {
    var values = Session.get('collectionsNewsIndexValues');
    return News.find(filterForSearchObject(values, Meteor.userId()), { sort: { date: -1 } });
  },
  localCount: function() {
    var values = Session.get('collectionsNewsIndexValues');
    return News.find(filterForSearchObject(values, Meteor.userId())).count();
  },
  totalCount: function() {
    return Session.get('collectionsNewsIndexCount');
  },
  canLoadMore: function() {
    var values = Session.get('collectionsNewsIndexValues');
    var localCount = News.find(filterForSearchObject(values, Meteor.userId())).count();
    return Session.get('collectionsNewsIndexCount') != localCount;
  },
  allChecked: function() {
    return Session.get('allChecked');
  },
  checkedCount: function() {
    var count = Session.get('allChecked') ? Session.get('collectionsNewsIndexCount') : Session.get('selectedNews').length;
    if (count == 1) return '1 noticia';
    if (count > 1) return count + ' noticias';
  }
})

Template.collectionsNewsIndex.events({
  'change select': function(event, template) {
    formDep.changed();
  },
  'blur input': function(event, template) {
    formDep.changed();
  },
  'click .load-more-btn': function(event, template) {
    Session.set('collectionsNewsIndexLimit', Session.get('collectionsNewsIndexLimit') + 20);
  },
  'change .check-all': function(event, template) {
    Session.set('allChecked', event.currentTarget.checked);
  },
  'change .check-doc': function(event, template) {
    var ids = Session.get('selectedNews');
    if (event.currentTarget.checked) {
      ids.push(this._id);
      Session.set('selectedNews', ids);
    } else {
      Session.set('selectedNews', _.without(ids, this._id));
    }
  },
  'click .export-btn': function(event, template) {
    var type = $(event.currentTarget).attr('data-type');

    var values = Session.get('collectionsNewsIndexValues');
    var filter = filterForSearchObject(values, Meteor.userId());

    if (Session.get('selectedNews') && Session.get('selectedNews').length > 0) {
      filter._id = { $in: Session.get('selectedNews') };
    }

    exportNews(type, filter);
  }
});
