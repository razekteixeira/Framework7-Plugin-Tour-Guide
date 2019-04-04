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

    console.log("asdasdasd");
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
    tourGuideEndButtonEl.innerText = "Começar :)";

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
    navigation: {
      position: "middle"
    },
    tourGuideSteps: {
      1: {
        id: 1,
        selector: "#view-home > div > div.navbar > div > div.left > a > i",
        title: "Left sidebar",
        subtitle: "You may check all features in this app",
        image:
          "https://www.patternfly.org/pattern-library/navigation/vertical-navigation/img/navigation-vertical-responsive3.png",
        action: function() {
          console.log("OH MY FUCKING GOD!");
        }
      },
      2: {
        id: 2,
        selector:
          "#view-home > div > div.page-content > div.my-orders-row.row > div > a > div",
        title: "My Orders",
        subtitle: "You may check all of your orders",
        image:
          "https://www.patternfly.org/pattern-library/navigation/vertical-navigation/img/navigation-vertical-responsive3.png",
        action: function() {
          console.log("OH MY FUCKING GOD!");
        }
      },
      3: {
        id: 2,
        selector:
          "#framework7-root > div.safe-areas.views.tabs > div.toolbar.tabbar.toolbar-bottom.tabbar-labels > div > a:nth-child(2)",
        title: "Stores Nearby",
        subtitle: "You may check all stores near you",
        image:
          "https://www.patternfly.org/pattern-library/navigation/vertical-navigation/img/navigation-vertical-responsive3.png",
        action: function() {
          document.getElementById("tourguide-end-button").classList.add("show");
        }
      }
    },
    tourGuideCurrentStep: null
  },
  create: function() {
    var app = this;
    // extend app methods with tourguide methods when app instance just created
    app.tourguide = {
      start: function() {
        app.params.tourGuideCurrentStep = 1;
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
      },
      forward: function() {
        console.log("Tourguide - Forward");
        if (
          app.params.tourGuideCurrentStep + 1 <=
          Object.keys(app.params.tourGuideSteps).length
        ) {
          /* remove effect on previous selector */
          document
            .querySelector(
              app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
                .selector
            )
            .classList.remove("pulse");

          app.params.tourGuideCurrentStep += 1;
          app.prepareTourAndShow();
        }
      },
      backwards: function() {
        console.log("Tourguide - Backwards");
        if (app.params.tourGuideCurrentStep - 1 > 0) {
          /* remove effect on previous selector */
          document
            .querySelector(
              app.params.tourGuideSteps[app.params.tourGuideCurrentStep]
                .selector
            )
            .classList.remove("pulse");

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

      /* position navigation */
      if (app.params.navigation.position === "top")
        root.style.setProperty(
          "--tourguide-nav-button-top-position",
          "flex-start"
        );
      if (app.params.navigation.position === "middle")
        root.style.setProperty("--tourguide-nav-button-top-position", "center");
      if (app.params.navigation.position === "bottom")
        root.style.setProperty(
          "--tourguide-nav-button-top-position",
          "flex-end"
        );

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

      /* effect on current selector */
      document
        .querySelector(
          app.params.tourGuideSteps[app.params.tourGuideCurrentStep].selector
        )
        .classList.add("pulse");

      /* Listeners */
      document.querySelector(
        "#tourguide-ghost-wrapper #tourguide-nav-left-container"
      ).onclick = app.tourguide.backwards;
      document.querySelector(
        "#tourguide-ghost-wrapper #tourguide-nav-right-container"
      ).onclick = app.tourguide.forward;
      document.querySelector("#tourguide-end-button").onclick =
        app.tourguide.stop;
    }
  }
};
