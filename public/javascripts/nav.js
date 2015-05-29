domready(function () {
  var navDom = document.getElementById('nav'),
      navTemplate = Oz(navDom),
      nav = {
        collapsed: true,
        collapse: function () {
          return this.collapsed ? 'navbar-collapse collapse' : 'navbar-collapse';
        }
      };

  navTemplate.on('collapse', function () {
    nav.collapsed = !nav.collapsed;
    navTemplate.update(nav);
  });

  // render to the page
  navDom.parentNode.replaceChild(navTemplate.render(nav), navDom);
});
