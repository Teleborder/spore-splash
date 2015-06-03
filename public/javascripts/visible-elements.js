(function (window) {
  window.visibleElements = function visibleElements(sections, ctx, template, amt) {

    var listener = function () {
      sections.forEach(function (section) {
        var id = section,
            el;

        while(id.match(/(.[A-Z])/)) {
          id = id.replace(/(.[A-Z])/g, function (g) {
            return g[0].toLowerCase() + '-' + g[1].toLowerCase();
          });
        }

        el = document.getElementById(id);
        ctx[section] = el && checkvisible(el, amt);

        ctx[section + 'Active'] = function () {
          return this[section] ? 'active' : '';
        };

        // set all other sections to false if this one is highlighted
        if(ctx[section]) {
          sections.forEach(function (s) {
            if(section !== s) {
              ctx[s] = false;
            }
          });
        }
      });

      template.update(ctx);
    }

    window.addEventListener('scroll', listener);
    listener();
  };
})(window);
