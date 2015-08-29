ClientRole = new Roles.Role('cliente');

/**
 * Allow the actions of the collection
 */
ClientRole.allow('collections.news.index', true); // Allows the role to see the link in the sidebar
ClientRole.allow('collections.news.insert', true); // Allows the role to insert documents
ClientRole.allow('collections.news.update', true); // Allows the role to update documents
ClientRole.allow('collections.news.remove', false); // Allows the role to remove documents
ClientRole.allow('collections.news.showCreate', true); // Makes the "create" button visible
ClientRole.allow('collections.news.showUpdate', true); // Allows the user to go to the update view
ClientRole.allow('collections.news.showRemove', false); // Shows the delete button on the update view

/**
 * Set the index filter.
 * This part is very important and sometimes is forgotten.
 * Here you must specify which documents the role will be able to see in the index route
 */
ClientRole.helper('collections.news.indexFilter', function() {
  return {};
});

ClientRole.helper('collections.news.hiddenFields', function() {
  return [];
});
