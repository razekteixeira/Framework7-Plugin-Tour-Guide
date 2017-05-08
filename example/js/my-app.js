var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left', 
    popoverCloseByOutside: false
});

/* Initialize views */
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});