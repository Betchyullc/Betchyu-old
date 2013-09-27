Template.layout.events({
  'click #nextStep': function(){
    var goal = Session.get('goal');
    var days = Session.get('days');
    var product = Session.get('product');
    var friends = Session.get('selected friends');

    if (Session.get('step') == undefined)
      Session.set('step', 1);
    var step = Session.get('step');
    var allowed_to_proceed = false;
    if (step == 1){
      if (goal != undefined
         && days != undefined)
        allowed_to_proceed = true;
    } else if (step == 2) {
      if (product != undefined)
        allowed_to_proceed = true;
    } else { // step == 3
      if ( friends != undefined){
        var betId = Bets.insert({
          placer: Meteor.userId(),
          goal: goal,
          days: days,
          product: product,
          friends: friends,
          createdAt: Date()
        }, function(err, res){
          // error handling
        });
        _.each(friends, function(e, i){
          var bro = Meteor.users.findOne({"services.facebook.id":e.id});
          if (bro != undefined){
            Invites.insert({
              bet: betId,
              inviter: Meteor.user()._id,
              invitee: bro._id
            });
          } 
        });
        allowed_to_proceed = true;
        // clear all of the Challenge-specific Session data.
        Session.set('goal', undefined);
        Session.set('days', undefined);
        Session.set('product', undefined);
        Session.set('selected friends', undefined);
      }else{
        allowed_to_proceed = false;
      }
    }

    if (allowed_to_proceed)
      Session.set('step', (step + 1));
  },
  'click #allGoals': function(){
    Session.set('view', "goals");
  },
  'click #newGoal': function(){
    Session.set('view', "new goal");
    Session.set('step', 1);
  },
  'click #signout': function(){
    Meteor.logout();
  },
  'click #dashboard': function(){
    Session.set('view', 'dashboard');
  }
});
