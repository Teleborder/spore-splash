(function (window) {
  window.visibleElements = function visibleElements(sections, ctx, template, amt) {

    var listener = function () {
      sections.forEach(function (section) {
        var id = dasherize(section),
            el = document.getElementById(id);

        ctx[section] = el && checkvisible(el, amt);
        ctx[section + 'Active'] = ctx[section + 'Active'] || activeFn(section);

        // set all other sections to false if this one is highlighted
        // this means that we have to go in order - last one wins
        if(ctx[section]) {
          sections.forEach(function (s) {
            if(section !== s) {
              ctx[s] = false;
            }
          });
        }
      });

      updateState(sections.filter(function (section) {
        return ctx[section];
      })[0]);

      template.update(ctx);
    };

    window.addEventListener('scroll', listener);
    listener();
  };

  function updateState(activeSection) {
    if(!activeSection) return;
    var hash = '#' + dasherize(activeSection);
    if(window.location.hash === hash) return;
    if(window.history.replaceState) {
      window.history.replaceState(null, null, hash);
    }
  }

  function activeFn(section) {
    return function () {
      return this[section] ? 'active' : '';
    };
  }

  function dasherize(str) {
    while(str.match(/(.[A-Z])/)) {
      str = str.replace(/(.[A-Z])/g, function (g) {
        return g[0].toLowerCase() + '-' + g[1].toLowerCase();
      });
    }

    return str;
  }
})(window);
