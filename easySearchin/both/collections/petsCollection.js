Pets = new Mongo.Collection("pets");

EasySearch.createSearchIndex('petsIndex', {
  'collection': Pets,
  'field': ['petName', 'petType'],
  'limit': 10,
  'props': {
    'lowerPetAgeLimit' : 0,
    'upperPetAgeLimit' : 0,
    'typeFilter' : [],
    'genderFilter' : [],

  },
  'query': function(searchString) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    if (this.props.lowerLimit) {
      query.petAge = {$gt: this.props.lowerPetAgeLimit};
    }
    if (this.props.upperLimit) {
      query.petAge = {$lt: this.props.upperPetAgeLimit};
    }
    if (this.props.typeFilter) {
      query.petType = { $in: this.props.typeFilter}
    }
    if (this.props.genderFilter) {
      query.petGender = {$in: this.props.genderFilter}
    }
    return query;
  }
});

//this is for the autoform package, and not relevent to easy search
Pets.attachSchema(new SimpleSchema({
  petName: {
    type: String,
    label: "Pets Name",
    max: 200
  },
  petType: {
    type: String,
    label: 'Famly name',
    allowedValues: ['Dog', 'Cat', 'Fist', 'Turtle']
  },
  petGender: {
    type: String,
    allowedValues: ['Male', 'Female'],
  },
  petAge: {
    type: Number,
    label: 'age',
    min: 0,
    max: 125
  }
}));
