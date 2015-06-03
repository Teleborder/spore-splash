domready(function () {
  var documentationDom = document.getElementById('documentation'),
      nav = document.getElementById('documentation-nav'),
      documentationTemplate = Oz(documentationDom),
      documentation = {
        docNavAbsolute: false,
        docNavClass: function () {
          var c = nav.className || "";
          c = c.split(" ");
          if(this.docNavAbsolute) {
            if(c.indexOf('absolute') === -1) {
              c.push('absolute');
            }
          } else {
            if(c.indexOf('absolute') !== -1) {
              c.splice(c.indexOf('absolute'), 1);
            }
          }
          return c.join(" ");
        }
      };

  // render to the page
  documentationDom.parentNode.replaceChild(documentationTemplate.render(documentation), documentationDom);

  // initialize moving nav menu
  window.addEventListener('scroll', docNav);
  docNav();

  // initialize nav anchors
  visibleElements([
    'installation',
    'creatingASpore',
    'migratingToSpore',
    'copyingEnvironments',
    'settingEnvironmentVariables',
    'runningAnApp',
    'readingEnvironmentVariables',
    'creatingNewEnvironments',
    'creatingDeployments',
    'permissions',
    'versionControl',
    'security',
    'otherIssues'
  ], documentation, documentationTemplate, 0.2);


  function docNav() {
    nav = document.getElementById('documentation-nav');
    documentationDom = document.getElementById('documentation');

    // 60 is the fixed top of documentation-nav, defined in documentation.css
    // plus the padding on the bottom to not make it pop
    var navOffset = scrollY() + 93 + nav.clientHeight;
    documentation.docNavAbsolute = navOffset > (posY(documentationDom) + documentationDom.clientHeight);
    documentationTemplate.update(documentation);
  }
});
