Template.searchPeople.events({

"submit .ageLimitFormArea": function(e){

  e.preventDefault();

    var possibleLowerLimit = 0;
    var possibleUpperLimit = 0;

    possibleLowerLimit = parseInt(event.target.lowerQuantity.value);
    possibleUpperLimit = parseInt(event.target.upperQuantity.value);


  EasySearch.changeProperty('people', 'lowerLimit', possibleLowerLimit);
  EasySearch.changeProperty('people', 'upperLimit', possibleUpperLimit);

  var instance = EasySearch.getComponentInstance({
    index: 'people'
  });

  instance.paginate(1);
  instance.triggerSearch();
  }
});
