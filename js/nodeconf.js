(function (window, document) {
  var menu = document.getElementById('menu'),
    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

  function toggleHorizontal() {
    [].forEach.call(
      menu.querySelectorAll('.transform-menu'),
      function(el) {
        el.classList.toggle('pure-menu-horizontal');
      }
    );
  };

  function toggleMenu() {
    if (menu.classList.contains('open')) {
      setTimeout(toggleHorizontal, 500);
    } else {
      toggleHorizontal();
    }

    menu.classList.toggle('open');
    document.getElementById('toggle-menu').classList.toggle('x');
  };

  function closeMenu() {
    if (menu.classList.contains('open')) {
      toggleMenu();
    }
  }

  document.getElementById('toggle-menu').addEventListener('click', function(e) {
    e.preventDefault();
    toggleMenu();
  });

  [].forEach.call(
    menu.querySelectorAll('.pure-menu-link'),
    function(el) {
      el.addEventListener('click', closeMenu);
    }
  );

  document.getElementById('brand-logo').addEventListener('click', closeMenu)

  window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);
