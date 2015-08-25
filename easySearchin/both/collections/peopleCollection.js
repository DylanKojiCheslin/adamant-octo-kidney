People = new Mongo.Collection("people");

EasySearch.createSearchIndex('peopleIndex', {
  'collection': People,
  'field': ['givenName', 'famlyName'],
  'limit': 10,
  'props': {
    'lowerLimit' : 0,
    'upperLimit' : 0
  },
  'query': function(searchString) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    if (this.props.lowerLimit) {
      query.age = {$gt: this.props.lowerLimit};
    }
    if (this.props.upperLimit) {
      query.age = {$lt: this.props.upperLimit};
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
