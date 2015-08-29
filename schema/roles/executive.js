ExecutiveRole = new Roles.Role('ejecutivo');

/**
 * Allow the actions of the collection
 */
ExecutiveRole.allow('collections.news.index', true); // Allows the role to see the link in the sidebar
ExecutiveRole.allow('collections.news.insert', true); // Allows the role to insert documents
ExecutiveRole.allow('collections.news.update', true); // Allows the role to update documents
ExecutiveRole.allow('collections.news.remove', false); // Allows the role to remove documents
ExecutiveRole.allow('collections.news.showCreate', true); // Makes the "create" button visible
ExecutiveRole.allow('collections.news.showUpdate', true); // Allows the user to go to the update view
ExecutiveRole.allow('collections.news.showRemove', false); // Shows the delete button on the update view

/**
 * Set the index filter.
 * This part is very important and sometimes is forgotten.
 * Here you must specify which documents the role will be able to see in the index route
 */
ExecutiveRole.helper('collections.news.indexFilter', function() {
  return {};
});

ExecutiveRole.helper('collections.news.hiddenFields', function() {
  return [];
});
