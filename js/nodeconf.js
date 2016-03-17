(function (window, document) {
  var menu = document.getElementById('menu'),
    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize'

  function toggleHorizontal() {
    [].forEach.call(
      menu.querySelectorAll('.transform-menu'),
      function(el) {
        el.classList.toggle('pure-menu-horizontal')
      }
    )
  }

  function toggleMenu() {
    if (menu.classList.contains('open')) {
      setTimeout(toggleHorizontal, 500)
    } else {
      toggleHorizontal()
    }

    menu.classList.toggle('open')
    document.getElementById('toggle-menu').classList.toggle('x')
  }

  function closeMenu() {
    if (menu.classList.contains('open')) {
      toggleMenu()
    }
  }

  document.getElementById('toggle-menu').addEventListener('click', function(e) {
    e.preventDefault()
    toggleMenu()
  });

  [].forEach.call(
    menu.querySelectorAll('.pure-menu-link'),
    function(el) {
      el.addEventListener('click', closeMenu)
    }
  )

  document.getElementById('brand-logo').addEventListener('click', closeMenu)

  window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu)

  // Currency convert NOK to other currencies
  window.fetch && (function() {
    var corsPrefix = window.location.href.indexOf('http://oslo.nodeconf.com/') !== 0 ? 'http://cors.io/?u=' : ''
    fetch(corsPrefix + 'https://espen.codes/api/feeds/exchange-rates')
      .then(function(res) { return res.json() })
      .then(function(res) {
        if (!res || !res.rates) {
          return
        }

        var cur = document.getElementById('currency'),
          currency = cur.dataset.currency,
          amount = Number(cur.dataset.amount)

        var text = 'That\'s about ' + Math.round(amount / res.rates[currency]) + ' US Dollars / '
        text += Math.round((res.rates.EUR * (1 / res.rates[currency])) * amount) + ' Euros.'
        cur.appendChild(document.createTextNode(text))
      })
  })()
})(this, this.document)
