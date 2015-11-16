FirstNames = new Mongo.Collection("firstNames");

EasySearch.createSearchIndex('firstNamesIndex', {
  'collection': FirstNames,
  'field': ['name'],
  'limit': 10,
});

FirstNames.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "First Name",
    max: 200
  }
}));
