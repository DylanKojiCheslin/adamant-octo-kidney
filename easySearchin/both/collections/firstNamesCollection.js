FirstNames = new Mongo.Collection("firstNames");
FirstNames.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "First Name",
    max: 200
  }
}));

FirstNames.initEasySearch(['name'], {
    'limit' : 20,
    'use' : 'mongo-db'
});
