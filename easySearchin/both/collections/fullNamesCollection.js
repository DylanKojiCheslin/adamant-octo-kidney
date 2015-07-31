FullNames = new Mongo.Collection("fullNames");

FullNames.initEasySearch(['firstName', 'lastName'], {
    'limit' : 20,
    'use' : 'mongo-db'
});

//this is for the autoform package, and not relevent to easy search
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
