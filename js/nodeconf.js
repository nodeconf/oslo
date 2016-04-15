(function (window, document) {
  // Hamburger menu
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

  // Modal closing
  var infoModal = document.getElementById('info-modal')
  infoModal.addEventListener('click', closeModal)
  infoModal.querySelector('.wrapper').addEventListener('click', preventCloseModal)
  document.getElementById('modal-bg').addEventListener('click', closeModal)
  infoModal.querySelector('.close').addEventListener('click', closeModal)

  // Speaker info
  var speakers = {}
  var polys = document.querySelectorAll('#speakers polygon')
  var polygons = Array.prototype.slice.call(polys, 0)
  polygons.forEach(function(poly) {
    if (!poly.classList.contains('tba')) {
      poly.addEventListener('click', openSpeakerModal, false)
    }
  })

  // Modal methods
  function setModalInfo(title, subtitle, paragraphs, img) {
    infoModal.querySelector('.title').innerText = title
    infoModal.querySelector('.subtitle').innerText = subtitle
    infoModal.querySelector('img').setAttribute('src', img || 'images/blank.gif')

    var contentEl = infoModal.querySelector('.content')
    while (contentEl.firstChild) {
      contentEl.removeChild(contentEl.firstChild)
    }

    paragraphs.forEach(function (text) {
      contentEl.appendChild(createParagraph(text))
    })
  }

  function createParagraph(text) {
    var para = document.createElement('p')
    para.appendChild(document.createTextNode(text))
    return para
  }

  function openModal() {
    document.body.classList.add('modal-open')
  }

  function closeModal() {
    document.body.classList.remove('modal-open')
  }

  function preventCloseModal(e) {
    e.stopPropagation()
  }

  function openSpeakerModal(e) {
    var speaker = e.target.getAttribute('data-speaker')
    var info = speakers[speaker]

    if (!info) {
      return
    }

    setModalInfo(info.name, info.talk, info.bio, 'images/speakers/' + speaker + '.jpg')
    openModal()
  }

  // Actual speaker info
  speakers['luke-bond'] = {
    name: 'Luke Bond',
    talk: 'Deploying & Running Node.js to Production in 2016',
    bio: [
      'Luke is a server developer working at YLD.io, a London-based software engineering consultancy, working mostly with Node.js and Docker.',
      'Luke built an open-source container-based PaaS called Paz (http://paz.sh) in Node.js.'
    ]
  }

  speakers['kelsey-breseman'] = {
    name: 'Kelsey Breseman',
    talk: 'Live Coding Tessel 2: Hello World to Web-controlled Device in 20 Minutes',
    bio: [
      'Kelsey Breseman is one of the creators of Tessel and a Steering Committee member of the Tessel Project.',
      'She has a degree in neural engineering, and is interested in prosthetics, speculative fiction, circus arts, and really long walks.'
    ]
  }

  speakers['yoshua-wuyts'] = {
    name: 'Yoshua Wuyts',
    talk: 'Tiny messages for big architectures',
    bio: [
      'Yosh is a creative engineer who loves messing with computers.',
      'He\'s been an active member of the Node community for years and specializes in building little tools that achieve big things.'
    ]
  }

  speakers['alexander-pope'] = {
    name: 'Alexander Pope',
    talk: 'Thunder and lightning: the making of a future friendly yr.no',
    bio: [
      'Regardless of what Google might think, Alexander Pope does *not* write poetry; he mostly writes JavaScript and pushes pixels around.',
      'Originally of Canadian extraction, Alexander now works and lives in the wilds of Norway (Oslo), keeping one eye on the sky as he works on the weather for NRK and Yr.'
    ]
  }

  speakers['jane-kim'] = {
    name: 'Jane Kim',
    talk: 'Test Everything: My life as well tested code',
    bio: [
      'Jane Kim is a front end developer at Baublebar from Brooklyn, New York. She is usually eating too much, at karaoke, falling (not failing) gracefully, and/or dancing with herself.',
      'You can find her at a BoroJs meetup in New York City or sipping on coffee and people watching.'
    ]
  }
})(this, this.document)
