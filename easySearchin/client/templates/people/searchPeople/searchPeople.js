Template.searchPeople.events({

"submit .ageLimitFormArea": function(e){

  e.preventDefault();

    var possibleLowerLimit = 0;
    var possibleUpperLimit = 0;

    possibleLowerLimit = parseInt(event.target.lowerQuantity.value);
    possibleUpperLimit = parseInt(event.target.upperQuantity.value);


  EasySearch.changeProperty('peopleIndex', 'lowerLimit', possibleLowerLimit);
  EasySearch.changeProperty('peopleIndex', 'upperLimit', possibleUpperLimit);

  var instance = EasySearch.getComponentInstance({
    index: 'peopleIndex'
  });

  instance.paginate(1);
  instance.triggerSearch();
  }
});
