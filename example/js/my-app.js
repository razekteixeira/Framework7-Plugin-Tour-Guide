var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left', 
    popoverCloseByOutside: false
});

/* Initialize views */
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});

initTourGuide = function ()
{
    var tourSteps = [], 
            options = {
                previousButton: true
            };
    
    tourSteps.push({
        step: 0, 
        header: '1st Tour Step', 
        message: 'This is our first tour step.<br />Please click "next" or "back" to move forward and backwards respectively', 
        element: "body > div.views > div > div.toolbar > div > a:nth-child(1)", 
        action: function ()
        {
            console.log('Started guided tour');
        }
    });
        
    tourSteps.push({
        step: 1, 
        header: '2nd Tour Step', 
        message: 'This is our seconds tour step.<br />You can use icons and images too! Wow!<br /><br /> F7 Icon:<br /> <i class="icon icon-back"></i><br /><br />Image:<br /> <div style="background-image: url(http://cdn.framework7.io/i/logo-new.png); width: 100px; height: 100px; background-size: cover; margin: 0 auto";></div><br />Please click "next" or "back" to move forward and backwards respectively', 
        element: "body > div.views > div > div.navbar > div > div.right > a", 
        action: null
    });
    
    tourSteps.push({
        step: 2, 
        header: 'HEADER 2', 
        message: 'Congratulations! You have finished your Tour Guide tutorial. Enjoy it :D', 
        element: "body > div.views > div > div.navbar > div > div.right > a", 
        action: function ()
        {
            console.log('Step 2');
            console.log('Last step on guided tour');
        }
    });
    
    tourguide = myApp.tourguide(tourSteps, options);
};