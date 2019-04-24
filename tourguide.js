/* framework7.debug.js */
window.TourGuidePlugin = {
  name: "tourguide",
  /* Install callback
  It will be executed right after component is installed
  Context of this callback points to Class where it was installed
  */
  install() {
    // tourguide ghost wrapper
    var tourGuideWrapperGhostEl = document.createElement("div");
    tourGuideWrapperGhostEl.setAttribute("id", "tourguide-ghost-wrapper");

    // tourguide navigation
    // tourguide navigation container
    var tourGuideNavContainerEl = document.createElement("div");
    tourGuideNavContainerEl.setAttribute("id", "tourguide-nav-container");

    // tourguide navigation left and right containers
    var tourGuideNavLeftContainerEl = document.createElement("div");
    tourGuideNavLeftContainerEl.setAttribute(
      "id",
      "tourguide-nav-left-container"
    );
    var tourGuideNavRightContainerEl = document.createElement("div");
    tourGuideNavRightContainerEl.setAttribute(
      "id",
      "tourguide-nav-right-container"
    );

    // tourguide navigation buttons
    var tourGuideNavLeftButtonEl = document.createElement("div");
    tourGuideNavLeftButtonEl.setAttribute(
      "class",
      "tourguide-nav-button tourguide-nav-button-left"
    );
    var tourGuideNavRightButtonEl = document.createElement("div");
    tourGuideNavRightButtonEl.setAttribute(
      "class",
      "tourguide-nav-button tourguide-nav-button-right"
    );

    // navigation button icon
    var tourGuideNavButtonIconEl = document.createElement("i");
    tourGuideNavButtonIconEl.setAttribute("class", "tourguide-nav-button-icon");

    // append icons to navigation buttons
    var leftButton = tourGuideNavButtonIconEl.cloneNode(true);
    var rightButton = tourGuideNavButtonIconEl.cloneNode(true);
    leftButton.classList.add("left");
    rightButton.classList.add("right");
    tourGuideNavLeftButtonEl.appendChild(leftButton);
    tourGuideNavRightButtonEl.appendChild(rightButton);

    // append navigation buttons to navigation containers
    tourGuideNavLeftContainerEl.appendChild(tourGuideNavLeftButtonEl);
    tourGuideNavRightContainerEl.appendChild(tourGuideNavRightButtonEl);

    // append nav left and right containers to nav container
    tourGuideNavContainerEl.appendChild(tourGuideNavLeftContainerEl);
    tourGuideNavContainerEl.appendChild(tourGuideNavRightContainerEl);

    // append tourguide nav container to ghost wrapper
    tourGuideWrapperGhostEl.appendChild(tourGuideNavContainerEl);

    // tour guide end button
    var tourGuideEndButtonEl = document.createElement("div");
    tourGuideEndButtonEl.setAttribute("id", "tourguide-end-button");
    tourGuideEndButtonEl.innerText = "Let's go!";

    // append tourguide end button to ghost wrapper
    tourGuideWrapperGhostEl.appendChild(tourGuideEndButtonEl);

    // tour guide wrapper
    var tourGuideWrapperEl = document.createElement("div");
    tourGuideWrapperEl.setAttribute("id", "tourguide-wrapper");

    // tour guide hole
    var tourGuideHoleEl = document.createElement("div");
    tourGuideHoleEl.setAttribute("class", "tourguide-hole");

    // append hole to tourguide wrapper
    tourGuideWrapperEl.appendChild(tourGuideHoleEl);

    // append both tourguide wrapper and ghost wrapper to body
    document.body.appendChild(tourGuideWrapperGhostEl);
    document.body.appendChild(tourGuideWrapperEl);
  },
  // extend app params with tourguide params
  params: {
    dynamicPopover: null,
    navigation: {
      enabled: true,
      position: "top"
    },
    tourGuideSteps: [
      {
        id: 1,
        selector: "#app .tourguide-left-panel-el > i",
        title: "Left sidebar",
        subtitle: "You may check all features in this app",
        image:
          "https://screentimelabs.com/wp-content/uploads/2018/03/ScreenTime-Best-Parental-Control-App-726x500.png",
        action: function() {
          console.log(`Step: ${this.id}`);
        }
      },
      {
        id: 2,
        selector:
          "#app > div.view.view-main.safe-areas > div.page.page-current > div.page-content > div:nth-child(3) > ul > li:nth-child(1) > a",
        title: "My Orders",
        subtitle: "You may check all of your orders",
        image:
          "https://screentimelabs.com/wp-content/uploads/2018/03/ScreenTime-Best-Parental-Control-App-726x500.png",
        action: function() {
          console.log(`Step: ${this.id}`);
        }
      },
      {
        id: 3,
        selector:
          "#app > div.view.view-main.safe-areas > div.page.page-current > div.page-content > div:nth-child(7) > div > div:nth-child(2) > a",
        title: "Stores Nearby",
        subtitle: "You may check all stores near you",
        image:
          "https://screentimelabs.com/wp-content/uploads/2018/03/ScreenTime-Best-Parental-Control-App-726x500.png",
        action: function() {
          console.log(`Step: ${this.id}`);
          document.getElementById("tourguide-end-button").classList.add("show");
        },
        popover: {
          position: "top"
        }
      }
    ],
    tourGuideCurrentStep: null
  },
  create: function() {
    var app = this;
    // extend app methods with tourguide methods when app instance just created
    app.tourguide = {
      start: function() {
        app.params.tourGuideCurrentStep = 0;
        app.prepareTourAndShow();
      },
      stop: function() {
        document
          .getElementById("tourguide-wrapper")
          .classList.remove("tourguide-visible");
        document
          .getElementById("tourguide-ghost-wrapper")
          .classList.remove("tourguide-visible");
        document
          .getElementById("tourguide-end-button")
          .classList.remove("show");

        /* Remove listeners */
        document.querySelector(
          "#tourguide-ghost-wrapper #tourguide-nav-left-container"
        ).onclick = null;
        document.querySelector(
          "#tourguide-ghost-wrapper #tourguide-nav-right-container"
        ).onclick = null;
        document.querySelector("#tourguide-end-button").onclick = null;

        // clean up popovers
        if (app.params.dynamicPopover) {
          app.params.dynamicPopover.close(false);
          app.params.dynamicPopover.destroy();
        }
      },
      forward: function() {
        console.log("Tourguide - Forward");
        if (
          app.params.tourGuideCurrentStep + 1 <
          app.params.tourGuideSteps.length
        ) {
          app.params.tourGuideCurrentStep += 1;
          app.prepareTourAndShow();
        }
      },
      backwards: function() {
        console.log("Tourguide - Backwards");
        if (app.params.tourGuideCurrentStep - 1 >= 0) {
          app.params.tourGuideCurrentStep -= 1;
          app.prepareTourAndShow();
        }
      }
    };
  },
  /* Initialized instance Props & Methods */
  instance: {
    prepareTourAndShow() {
      var app = this;

      // clean up popovers
      if (app.params.dynamicPopover) {
        app.params.dynamicPopover.close(false);
        app.params.dynamicPopover.destroy();
      }

      let elWidth = document
        .querySelector(
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].selector
        )
        .getBoundingClientRect().width;
      let elHeight = document
        .querySelector(
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].selector
        )
        .getBoundingClientRect().height;
      let elTop = document
        .querySelector(
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].selector
        )
        .getBoundingClientRect().top;
      let elLeft = document
        .querySelector(
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].selector
        )
        .getBoundingClientRect().left;

      let root = document.documentElement;

      root.style.setProperty("--tourguide-hole-width", elWidth + "px");
      root.style.setProperty("--tourguide-hole-height", elHeight + "px");
      root.style.setProperty("--tourguide-hole-top", elTop + "px");
      root.style.setProperty("--tourguide-hole-left", elLeft + "px");

      /* message top position */
      if (app.params.tourGuideSteps[app.params.tourGuideCurrentStep].popover) {
        let stepPopoverPosition =
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].popover
            .position;
        let popoverPosition = 0;

        switch (stepPopoverPosition) {
          case "top":
            popoverPosition = "20%";
            break;
          case "middle":
            popoverPosition = "50%";
            break;
          case "bottom":
            popoverPosition = "80%";
            break;
          default:
            // center
            popoverPosition = "50%";
            break;
        }

        root.style.setProperty("--tourguide-popover-top", popoverPosition);
      } else {
        // defaults to middle
        root.style.setProperty("--tourguide-popover-top", "50%");
      }

      /* position navigation */
      if (app.params.navigation.enabled) {
        root.style.setProperty("--tourguide-nav-button-visibility", "visible");

        if (
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].navigation
        ) {
          if (
            app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
              .navigation.position === "top"
          )
            root.style.setProperty(
              "--tourguide-nav-button-top-position",
              "flex-start"
            );
          if (
            app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
              .navigation.position === "middle"
          )
            root.style.setProperty(
              "--tourguide-nav-button-top-position",
              "center"
            );
          if (
            app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
              .navigation.position === "bottom"
          )
            root.style.setProperty(
              "--tourguide-nav-button-top-position",
              "flex-end"
            );
        }
      } else {
        root.style.setProperty("--tourguide-nav-button-top-position", "center");
      }

      document
        .getElementById("tourguide-wrapper")
        .classList.add("tourguide-visible");
      document
        .getElementById("tourguide-ghost-wrapper")
        .classList.add("tourguide-visible");

      if (
        typeof app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
          .action === "function"
      ) {
        try {
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].action();
        } catch (exception) {
          console.log(
            `Tourguide Exception - Failed to execute action in current step: ${
              app.params.tourGuideCurrentStep
            }`
          );
        }
      }

      /* Listeners */
      document.querySelector(
        "#tourguide-ghost-wrapper #tourguide-nav-left-container"
      ).onclick = app.tourguide.backwards;
      document.querySelector(
        "#tourguide-ghost-wrapper #tourguide-nav-right-container"
      ).onclick = app.tourguide.forward;
      document.querySelector("#tourguide-end-button").onclick =
        app.tourguide.stop;

      setTimeout(function() {
        // Create dynamic Popover
        app.params.dynamicPopover = app.popover
          .create({
            backdrop: false,
            closeByBackdropClick: false,
            closeByOutsideClick: false,
            closeOnEscape: false,
            targetEl:
              app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
                .selector,
            content:
              '<div class="popover tourguide-popover">' +
              '<div class="popover-inner">' +
              '<div class="block tourguide-step-container">' +
              "<img src='" +
              app.params.tourGuideSteps[app.params.tourGuideCurrentStep].image +
              "' class='tourguide-step-image' />" +
              "<p class='tourguide-step-title'>" +
              app.params.tourGuideSteps[app.params.tourGuideCurrentStep].title +
              "</p>" +
              "<p class='tourguide-step-subtitle'>" +
              app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
                .subtitle +
              "</p>" +
              "</div>" +
              "</div>" +
              "</div>",
            // Events
            on: {
              open: function(popover) {
                console.log("Popover open");
              },
              opened: function(popover) {
                console.log("Popover opened");
              }
            }
          })
          .open();
      }, 250);
    }
  }
};
