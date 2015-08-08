FullNames = new Mongo.Collection("fullNames");

EasySearch.createSearchIndex('fullNames', {
  'collection': FullNames,
  'field': ['firstName', 'lastName'],
  'limit': 10,
  'use' : 'mongo-db',
  'props': {
    'sortBy' : 'first-name'
  },
  'sort': function() {
    if (this.props.sortBy === 'first-name') {
      return { 'firstName': 1 };
    }  else if (this.props.sortBy === 'last-name') {
      return { 'lastName': 1 };
    }
    return { 'firstName': 1 };
  },
  'query': function(searchString, opts) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    return query;
  }
});
//this is for the autoform package, and not relevent to easy-search
FullNames.attachSchema(new SimpleSchema({
  firstName: {
    type: String,
    label: "First Name",
    max: 200,
    optional: false
  },
  lastName: {
    type: String,
    label: "Last Name",
    max: 200,
    optional: false
  }
}));
