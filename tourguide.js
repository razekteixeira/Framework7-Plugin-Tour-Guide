/*jslint browser: true*/
/*global console, Framework7, alert, Dom7, Template7*/

/**
 * A plugin for Framework7 to help you with a tour guide within your app
 *
 * @module Framework7/prototype/plugins/tourguide
 * @author www.timo-ernst.net
 * @license MIT
 */
Framework7.prototype.plugins.tourguide = function (app) {
  'use strict';
  // Variables in module scope
  var $$ = Dom7,
    t7 = Template7, 
    defaultTourGuideTemplate, 
    TourGuide;
    
  /**
   * Represents the tour guide
   *
   * @class
   * @memberof module:Framework7/prototype/plugins/tourguide
   */
  TourGuide = function (tourSteps, options, currentStep) {
    
    // Private properties
    var self = this,
            defaults = {
               previousButton: false, 
               nextButtonText: 'Next', 
               endTourButtonText: 'Done', 
               previousButtonText: 'Previous', 
               template: defaultTourGuideTemplate, 
               customCSS: 'tour-guide-popover'
            }, 
            template, 
            options = options || {}, 
            tourSteps = tourSteps || [], 
            currentStep = currentStep || 0;
    
    function setDefaultTemplate () {
        defaultTourGuideTemplate = '<div class="popover popover-step-tutorial {{#if options.customCSS}}{{options.customCSS}}{{/if}}">' + 
                                        '<div class="popover-angle"></div>' + 
                                        '<div class="popover-inner">' + 
                                            '<div class="tour-guide-container-wrapper">' + 
                                                '<div class="tour-guide-header-wrapper"><p class="tour-guide-header">{{header}}</p></div>' + 
                                                '<div class="tour-guide-message-wrapper"><p class="tour-guide-message">{{message}}</p></div>' + 
                                            '</div>' + 
                                            '<div class="tour-guide-toolbar-wrapper">' + 
                                                '<div class="toolbar">' + 
                                                    '<div class="toolbar-inner">' + 
                                                        '<div class="row tour-guide-buttons-row">' + 
                                                            '{{#if options.previousButton}}' + 
                                                                '<div class="col-50">' + 
                                                                    '<a href="#" class="button tour-guide-button tour-guide-previous-button" {{#unless options.enablePreviousButton}}disabled="disabled"{{/unless}}>{{options.previousButtonText}}</a>' + 
                                                                '</div>' + 
                                                            '{{/if}}' +
                                                            '<div class="col-{{#if options.previousButton}}50{{else}}100{{/if}}">' + 
                                                              '<a href="#" class="button tour-guide-button tour-guide-next-button">{{#if options.lastStep}}{{options.endTourButtonText}}{{else}}{{options.nextButtonText}}{{/if}}</a>' + 
                                                            '</div>' +  
                                                        '</div> ' + 
                                                    '</div>' + 
                                                '</div>' + 
                                            '</div>' + 
                                        '</div>' + 
                                    '</div>';
    };
    
    self.setMoveForwardAction = function () {
        // Click handler to move forward on tour
        $$(document).on('click', '.tour-guide-next-button', function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          e.stopPropagation();
          
            currentStep++;
            
            if (tourSteps.length === currentStep) {
              console.log('No more steps');
            }
            else {
                console.log('Next step');
            }
            
            self.showTour(tourSteps, currentStep);
        });
    };
    
    self.setMoveBackwardAction = function () {
        // Click handler to move forward on tour
        $$(document).on('click', '.tour-guide-previous-button', function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          e.stopPropagation();
          console.log('previous step');
          
            currentStep--;
            
            self.showTour(tourSteps, currentStep);
        });
    };
    
    self.moveFoward = function ()
    {
        if (+currentStep === tourSteps.length)
        {
            console.log('Last step, cannot move forward.');
            return;
        }
        
        currentStep++;
            
        if (tourSteps.length === currentStep) {
          console.log('No more steps');
        }
        else {
            console.log('Next step');
        }

        self.showTour(tourSteps, currentStep);
    };
    
    self.moveBackward = function ()
    {
        if (+currentStep === 0)
        {
            console.log('First step, cannot move backwards.');
            return;
        }
        
        currentStep--;
            
        if (tourSteps.length === currentStep) {
          console.log('No more steps');
        }
        else {
            console.log('Next step');
        }

        self.showTour(tourSteps, currentStep);
    };
    
    /**
     * Shows the tour guide
     *
     * @public
     * @memberof module:Framework7/prototype/plugins/tourguide
     */
    self.showTour = function () {
        setTimeout(function () {
            try {
                // close previous modal if exists
                app.closeModal();

                // terminate tour
                if (currentStep === (tourSteps.length)) {
                    if (typeof tourSteps[currentStep] !== 'undefined' && 
                        tourSteps[currentStep] !== null && 
                        typeof tourSteps[currentStep].action !== "undefined" && 
                        tourSteps[currentStep].action !== null && 
                        typeof tourSteps[currentStep].action === "function") {
                        tourSteps[currentStep].action();
                    }
                    
                    currentStep = 0;

                    return;
                }

                if (typeof tourSteps[currentStep].action !== "undefined" && 
                        tourSteps[currentStep].action !== null && 
                        typeof tourSteps[currentStep].action === "function") {
                    tourSteps[currentStep].action();
                }
                
                /*
                 * popover arguments:
                 *  - tourStep html
                 *  - tourStep element
                 *  - removeOnClose
                 *  - animated
                 *  - closeByOutside
                 */
                app.popover(tourSteps[currentStep].html, tourSteps[currentStep].element, true, true, false);
            }
            catch (framework7NotReadyException) {
                console.log("Framework7 is not ready yet");
                console.log(framework7NotReadyException);
            }
        }, 100);
    };
    
    /**
     * Sets the options that were required
     *
     * @private
     */
    function applyOptions() {
      var def;
      options = options || {};
      for (def in defaults) {
        if (typeof options[def] === 'undefined') {
          options[def] = defaults[def];
        }
      }
    }
    
    /**
     * Compiles the template
     *
     * @private
     */
    function compileTemplate() {
      if (!options.template) {
        // Cache compiled templates
        if (!app._compiledTemplates.tourguide) {
          app._compiledTemplates.tourguide = t7.compile(defaultTourGuideTemplate);
        }
        template = app._compiledTemplates.tourguide;
      } else {
        template = t7.compile(options.template);
      }
    }
    
    self.prepareSteps = function () {
        for (var step in tourSteps) {
            var context = {};
            
            if (tourSteps[step].header) {
                context.header = tourSteps[step].header;
            }
            
            if (tourSteps[step].message) {
                context.message = tourSteps[step].message;
            }
            
            if (options.previousButton && 
                    step > 0) {
                options.enablePreviousButton = true;
            }
            
            if (+step === tourSteps.length-1)
            {
                options.lastStep = true;
            }
            
            context.options = options;
            
            try {
                tourSteps[step].html = template(context);
            }
            catch (TemplateNotDefinedException) {
                console.log('Failed to compile template with context');
                console.log(TemplateNotDefinedException);
            }
        }
    };

    /**
     * Initialize the instance
     *
     * @method init
     */
    (function () {
        // define default template
        setDefaultTemplate();
        // Compile template
        compileTemplate();
        // apply options
        applyOptions();
        // Prepare steps
        self.prepareSteps();
        // set move forward action
        self.setMoveForwardAction();
        // set move backwards action
        self.setMoveBackwardAction();
      
    }());
    
    // Return instance
    return self;
  };
  
  app.tourguide = function (tourSteps, options, currentStep) {
    return new TourGuide(tourSteps, options, currentStep);
  };
  
};
