domready(function () {
  var main = document.getElementById('main'),
      verbs = ["manage", "write", "review", "collaborate on"],
      pageTemplate = Oz(main),
      page = {
        verb: verbs[0],
        Verb: function () {
          return (this.verb[0] || "").toUpperCase() + this.verb.slice(1);
        },
        verbId: function () {
          return uuid();
        }
      },
      nextVerbTimer,
      nextLetterTimer,
      lastVerb = page.verb,
      nextVerb;

  // rotate through verbs automatically
  function rotateVerb(secs) {
    nextVerbTimer = setTimeout(function () {
      var index = verbs.indexOf(page.verb),
          nextIndex = index + 1;

      if(nextIndex >= verbs.length) {
        nextIndex = 0;
      }

      nextVerb = verbs[nextIndex];

      rotateLetter();

      function rotateLetter() {
        nextLetterTimer = setTimeout(function () {
          if(lastVerb !== nextVerb) {
            if(page.verb.length) {
              page.verb = page.verb.slice(0, -1);
            } else {
              lastVerb = nextVerb;
            }
          } else {
            if(page.verb.length < nextVerb.length) {
              page.verb = nextVerb.slice(0, page.verb.length + 1);
            } else {
              return rotateVerb(secs);
            }
          }

          pageTemplate.update(page);
          rotateLetter();
        }, 125);
      }
    }, secs * 1000);
  }

  // listen for typing in the terminal
  pageTemplate.on('type', function (el, e) {
    var keynum = e.which || e.keyCode;

    page.verb += String.fromCharCode(keynum);

    pageTemplate.update(page);

    e.preventDefault();
  });

  // need to listen for backspace with keydown
  pageTemplate.on('keydown', function (el, e) {
    var keynum = e.which || e.keyCode;
    if(keynum === 8) {
      page.verb = page.verb.slice(0, -1);
      pageTemplate.update(page);
      e.preventDefault();
    }
  });

  pageTemplate.on('focus', function () {
    clearTimeout(nextVerbTimer);
    clearTimeout(nextLetterTimer);
  });

  // render to the page
  main.parentNode.replaceChild(pageTemplate.render(page), main);

  // start the rotation
  rotateVerb(4);
});
