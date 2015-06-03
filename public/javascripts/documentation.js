domready(function () {
  var documentationDom = document.getElementById('documentation'),
      documentationTemplate = Oz(documentationDom),
      documentation = {
        collapsed: true,
        collapse: function () {
          return this.collapsed ? 'documentationbar-collapse collapse' : 'documentationbar-collapse';
        }
      };

  window.addEventListener('scroll', visibleElements);

  documentationTemplate.on('collapse', function () {
    documentation.collapsed = !documentation.collapsed;
    documentationTemplate.update(documentation);
  });

  // render to the page
  documentationDom.parentNode.replaceChild(documentationTemplate.render(documentation), documentationDom);

  // initialize menu sections
  visibleElements();


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
