Template.fbSDK.created = function(){
  if(!Session.get('FB exists?')){
    Session.set('FB exists?', true);

    window.fbAsyncInit = function() {
      // init the FB JS SDK
      FB.init({
      appId      : (window.location.origin == "http://localhost:3000") ? ('163018687227482') : ('560902563947188'),
      status     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });
    // Additional initialization code such as adding Event Listeners goes here
    };
    // Load the SDK asynchronously
    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
};
