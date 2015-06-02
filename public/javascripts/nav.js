domready(function () {
  var navDom = document.getElementById('nav'),
      navTemplate = Oz(navDom),
      nav = {
        collapsed: true,
        collapse: function () {
          return this.collapsed ? 'navbar-collapse collapse' : 'navbar-collapse';
        }
      };

  window.addEventListener('scroll', visibleElements);

  navTemplate.on('collapse', function () {
    nav.collapsed = !nav.collapsed;
    navTemplate.update(nav);
  });

  // render to the page
  navDom.parentNode.replaceChild(navTemplate.render(nav), navDom);

  // initialize menu sections
  visibleElements();


  function visibleElements() {
    var sections = ['seamless', 'inSync', 'collaborate'];
    sections.forEach(function (section) {
      var el = document.getElementById(section.replace(/([a-z][A-Z])/g, function (g) {
        return g[0] + '-' + g[1].toLowerCase();
      }));
      nav[section] = el && checkvisible(el);

      nav[section + 'Active'] = function () {
        return this[section] ? 'active' : '';
      };

      // set all other sections to false if this one is highlighted
      if(nav[section]) {
        sections.forEach(function (s) {
          if(section !== s) {
            nav[s] = false;
          }
        });
      }
    });
    navTemplate.update(nav);
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
    return (scrollY() + (viewPortHeight() * 0.4)) > posY(elm)
  }
});
