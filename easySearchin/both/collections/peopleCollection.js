People = new Mongo.Collection("people");

EasySearch.createSearchIndex('people', {
  'collection': People, // instanceof Meteor.Collection
  'field': ['givenName', 'famlyName', 'age'] // array of fields to be searchable
  }
);

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
