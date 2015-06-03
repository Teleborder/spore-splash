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

  window.addEventListener('scroll', visibleElements);
  window.addEventListener('scroll', docNav);

  documentationTemplate.on('collapse', function () {
    documentation.collapsed = !documentation.collapsed;
    documentationTemplate.update(documentation);
  });

  // render to the page
  documentationDom.parentNode.replaceChild(documentationTemplate.render(documentation), documentationDom);

  // initialize
  visibleElements();
  docNav();


  function docNav() {
    nav = document.getElementById('documentation-nav');
    documentationDom = document.getElementById('documentation');

    // 60 is the fixed top of documentation-nav, defined in documentation.css
    // plus the padding on the bottom to not make it pop
    var navOffset = scrollY() + 93 + nav.clientHeight;
    documentation.docNavAbsolute = navOffset > (posY(documentationDom) + documentationDom.clientHeight);
    documentationTemplate.update(documentation);
  }


  function visibleElements() {
    var sections = [
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
    ];
    sections.forEach(function (section) {
      var id = section,
          el;

      while(id.match(/(.[A-Z])/)) {
        id = id.replace(/(.[A-Z])/g, function (g) {
          return g[0].toLowerCase() + '-' + g[1].toLowerCase();
        });
      }

      el = document.getElementById(id);
      documentation[section] = el && checkvisible(el, 0.2);

      documentation[section + 'Active'] = function () {
        return this[section] ? 'active' : '';
      };

      // set all other sections to false if this one is highlighted
      if(documentation[section]) {
        sections.forEach(function (s) {
          if(section !== s) {
            documentation[s] = false;
          }
        });
      }
    });

    documentationTemplate.update(documentation);
  }
});
