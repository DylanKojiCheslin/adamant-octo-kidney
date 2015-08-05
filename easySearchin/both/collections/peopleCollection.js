People = new Mongo.Collection("people");

EasySearch.createSearchIndex('people', {
  'collection': People, // instanceof Meteor.Collection
  'field': ['givenName', 'famlyName', 'age'], // array of fields to be searchable
  'limit': 10,
  'props': {
    'lowerLimit' : 0,
    'upperLimit' : 0
  },
  'query': function(searchString, opts) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    if (this.props.lowerLimit) {
      query.people = {$gt: this.props.lowerLimit};
    }
    if (this.props.upperLimit) {
      query.people = {$lt: this.props.upperLimit};
    }
    return query;
  }
});

//this is for the autoform package, and not relevent to easy search
People.attachSchema(new SimpleSchema({
  givenName: {
    type: String,
    label: "Given name",
    max: 200
  },
  famlyName: {
    type: String,
    label: 'Famly name'
  },
  age: {
    type: Number,
    label: 'age',
    min: 0,
    max: 125
  }
}));