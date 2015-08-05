Template.searchPeople.events({

"submit .ageLimitFormArea": function(e){
  e.preventDefault();

  var possibleLowerLimit = event.target.lowerQuantity.value;
  var possibleUpperLimit = event.target.upperQuantity.value;

  EasySearch.changeProperty('people', 'lowerLimit', possibleLowerLimit);
  
  EasySearch.changeProperty('people', 'upperLimit', possibleUpperLimit);

  var instance = EasySearch.getComponentInstance({
    index: 'people'
  });


  instance.paginate(1);
  instance.triggerSearch();
  }
});
