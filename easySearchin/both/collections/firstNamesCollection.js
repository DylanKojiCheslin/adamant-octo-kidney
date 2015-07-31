FirstNames = new Mongo.Collection("firstNames");

FirstNames.initEasySearch(['name'], {
    'limit' : 20,
    'use' : 'mongo-db'
});

//this is for the autoform package, and not relevent to easy search
FirstNames.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "First Name",
    max: 200
  }
}));
