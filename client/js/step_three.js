Template.step_three.selected = function(name){
    if(Session.get('selected friends') == undefined) Session.set('selected friends', []);
  if (_.contains(_.pluck(Session.get('selected friends'), 'name'), name))
    return  'product-pick';
  return '';
};
Template.step_three.friends = function(){
  if(Session.get('friends') == undefined){
    HTTP.get("https://graph.facebook.com/me/friends", {
      params: {
        access_token: Meteor.user().services.facebook.accessToken
      }
    }, function(err, res){
      Session.set('friends', res.data.data);
    });
    return [];
  } else {
    return Session.get('friends');
  }
};
Template.step_three.events({
  'click li': function(e){
    if(Session.get('selected friends') == undefined) Session.set('selected friends', []);
    var friend_name = $(e.target).text();
    var curr_friends = Session.get('selected friends');
    var friend_obj = _.findWhere(Session.get('friends'), {name: friend_name});
    if(!_.contains(_.pluck(curr_friends, 'name'), friend_name)){
      curr_friends[curr_friends.length] = friend_obj;
      Session.set('selected friends', curr_friends);
      if( undefined == Meteor.users.findOne({"services.facebook.id":friend_obj.id}))
        alert("This friend is not on Betchyu. You\'ll need to invite them to Betchyu in order for them to accept your Bet. You can do that from the Bet Page, after you Finish making this Bet.");
    } else {
      Session.set('selected friends', _.reject(curr_friends, function(e){
        return e.id == friend_obj.id;
      }));
    }
  }
});
