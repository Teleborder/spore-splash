(function (window) {
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

  window.checkvisible = function checkvisible( elm, amt ) {
    amt = amt || 0.4;
    return (scrollY() + (viewPortHeight() * amt)) > posY(elm);
  };
})(window);
