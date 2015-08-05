Template.searchFullNames.events({

  'change .sort-select': function(e) {
    var instance = EasySearch.getComponentInstance({
      index: 'fullNames'
    });

    EasySearch.changeProperty('fullNames', 'sortBy', $(e.target).children(':selected').data('sort'));
    EasySearch.changeLimit('fullNames', 10);

    instance.paginate(1);
    instance.triggerSearch();
  }
});
