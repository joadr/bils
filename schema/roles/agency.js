AgencyRole = new Roles.Role('agency');

/**
 * Allow the actions of the collection
 */
AgencyRole.allow('collections.agencies.index', true); // Allows the role to see the link in the sidebar
AgencyRole.allow('collections.agencies.insert', false); // Allows the role to insert documents
AgencyRole.allow('collections.agencies.update', true); // Allows the role to update documents
AgencyRole.allow('collections.agencies.remove', false); // Allows the role to remove documents
AgencyRole.allow('collections.agencies.showCreate', false); // Makes the "create" button visible
AgencyRole.allow('collections.agencies.showUpdate', true); // Allows the user to go to the update view
AgencyRole.allow('collections.agencies.showRemove', false); // Shows the delete button on the update view

/**
 * Set the index filter.
 * This part is very important and sometimes is forgotten.
 * Here you must specify which documents the role will be able to see in the index route
 */
AgencyRole.helper('collections.agencies.indexFilter', function() {
  return { adminsIds: this.userId };
});

AgencyRole.helper('collections.agencies.hiddenFields', function() {
  return ['adminsIds'];
});
