domready(function () {
  var navDom = document.getElementById('nav'),
      navTemplate = Oz(navDom),
      nav = {
        howItWorks: false,
        howItWorksActive: function () {
          return this.howItWorks ? 'active' : '';
        },
        collapsed: true,
        collapse: function () {
          return this.collapsed ? 'navbar-collapse collapse' : 'navbar-collapse';
        }
      };

  window.addEventListener('scroll', howItWorksVisible);

  navTemplate.on('collapse', function () {
    nav.collapsed = !nav.collapsed;
    navTemplate.update(nav);
  });

  // render to the page
  navDom.parentNode.replaceChild(navTemplate.render(nav), navDom);

  // initialize
  howItWorksVisible();


  function howItWorksVisible() {
    nav.howItWorks = checkvisible(document.getElementById('how-it-works'));
    navTemplate.update(nav);
    console.log(nav);
  }


  function posY(elm) {
      var test = elm, top = 0;

      while(!!test && test.tagName.toLowerCase() !== "body") {
          top += test.offsetTop;
          test = test.offsetParent;
      }

      return top;
  }

  function viewPortHeight() {
      var de = document.documentElement;

      if(!!window.innerWidth)
      { return window.innerHeight; }
      else if( de && !isNaN(de.clientHeight) )
      { return de.clientHeight; }

      return 0;
  }

  function scrollY() {
      if( window.pageYOffset ) { return window.pageYOffset; }
      return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  }

  function checkvisible( elm ) {
    return posY(elm) < (scrollY() + (viewPortHeight() / 2));
      var vpH = viewPortHeight(), // Viewport Height
          st = scrollY(), // Scroll Top
          y = posY(elm);

      return (y > (vpH + st));
  }
});
