Template.step_one.helpers({
  goal: function(){
    if (Session.get('goal') == undefined) return '';
    return Session.get('goal') + " lbs";
  },
  days: function(){
    if(Session.get('days') ==undefined) return '';
    return Session.get('days') + " days";
  }
});
Template.step_one.rendered = function(){
  $('#weightLoss').slider({
    min: 0,
    max: 50,
    slide: function(e, ui){
      Session.set('goal', ui.value);
    }
  });
  $('#timeFrame').slider({
    min: 10,
    max: 365,
    slide: function(e, ui){
      Session.set('days', ui.value);
    }
  });
};
