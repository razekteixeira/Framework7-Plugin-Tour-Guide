# Framework7 Plugin Tour Guide

## Brief description
A plugin that takes advantage of Framework7 Popover elements to display a tour guide through your application.

## Screenshots

### Main Screen
<img src="https://github.com/razekteixeira/Framework7-Plugin-Tour-Guide/blob/master/example/assets/screens/Main%20Screen.png" width="250">

### First Step
<img src="https://github.com/razekteixeira/Framework7-Plugin-Tour-Guide/blob/master/example/assets/screens/First%20Step.png" width="250">

### Second Step
<img src="https://github.com/razekteixeira/Framework7-Plugin-Tour-Guide/blob/master/example/assets/screens/Second%20Step.png" width="250">

### Last Step
<img src="https://github.com/razekteixeira/Framework7-Plugin-Tour-Guide/blob/master/example/assets/screens/Last%20Step.png" width="250">

## Setup

1) Copy tourguide.css and tourguide.js to your project and reference them:

```html
<link rel="stylesheet" href="tourguide.css">
<script src="tourguide.js"></script>
```
2) Define tour steps

```javascript
var tourSteps = [
    {
        step: 0, 
        header: '1st Tour Step', 
        message: 'This is our first tour step.<br />Please click "next" or "back" to move forward and backwards respectively', 
        element: "body > div.views > div > div.toolbar > div > a:nth-child(1)", 
        action: function ()
        {
            console.log('Started guided tour');
            console.log('Step 0');
        }
    }, 
    {
        step: 1, 
        header: '2nd Tour Step', 
        message: 'This is our seconds tour step.<br />You can use icons and images too! Wow!<br /><br /> F7 Icon:<br /> <i class="icon icon-back"></i><br /><br />Image:<br /> <div style="background-image: url(http://cdn.framework7.io/i/logo-new.png); width: 100px; height: 100px; background-size: cover; margin: 0 auto";></div><br />Please click "next" or "back" to move forward and backwards respectively', 
        element: "body > div.views > div > div.navbar > div > div.right > a", 
        action: function ()
        {
            console.log('Step 1');
        }
    }, 
    {
        step: 2, 
        header: '3rd and Final Step', 
        message: 'Congratulations! You have finished your Tour Guide tutorial. Enjoy it :D', 
        element: "body > div.views > div > div.navbar > div > div.right > a", 
        action: function ()
        {
            console.log('Step 2');
            console.log('Last step on guided tour');
        }
    }];
```

Parameters

- *step* Set a step id for this tour step
- *header* Set the tour step header (plain text, HTML, ...)
- *message* Set the tour step message (plain text, HTML, ...)
- *element* Set the element where you want to point the tour step (CSS Selector)
- *action* Define a function to execute some code snippet on current tour step or null if you don't want to do anything

3) Initialize & options

```javascript
var myApp = new Framework7();
var options = {...};
            
var tourguide = myApp.tourguide(tourSteps, options);
```

Available options (if not set, default will be used)

- **previousButton** // optional, defaults to false
- **nextButtonText** // optional next button text, defaults to 'Next'
- **endTourButtonText** // optional endTourButtonText, defaults to 'Done'
- **previousButtonText** // optional previousButtonText, defaults to 'Previous'
- **template** // optional template for tour step, defaults to the defaultTourGuideTemplate
- **customCSS** // optional css class, defaults to 'tour-guide-popover'

## API

The following methods are available on a tourguide instance

```javascript
tourguide.moveForward();         // moves to next step
tourguide.moveBackward();        // moves to previous step if allowed
```

## Credits

Developed by www.cesarteixeira.pt

Please contribute ;)
