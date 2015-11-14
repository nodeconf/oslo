/* Scroll the background layers */

function parallaxScroll(){
  var scrolled = $(window).scrollTop();
  //$('.fotorama').css('margin-top',(0+(scrolled*.7))+'px');
  $('.fotorama').css({transform: 'translateY(' + (0+(scrolled*.7)) + 'px)'})
}


$(document).ready(function() {
if (!Modernizr.touch) { 
  parallaxScroll(); 
}

if ($(window).width() > 1000) {
  $('#navigation a').click(function(){
    var a_href = $(this).attr('href');
    $(a_href).stop().ScrollTo({
      duration: 1000
      });
  });
  
  $('.smooth-scroll').click(function(){
    var a_href = $(this).attr('href');
    $(a_href).stop().ScrollTo({
      duration: 1000
      });
  });
};
$('.mobile-nav').click(function(){
  $('#navigation ul').slideToggle('fast');
  $('#navigation ul').toggleClass('expanded');
})

$('#navigation ul').click(function(evt){
  if($(evt.currentTarget).attr('class') === 'expanded') {
    $('#navigation ul').slideToggle('fast');
    $('#navigation ul').removeClass('expanded');
  }  
})

var timeoutFadein = 0;
$('.sp0nsor-blurb').hide();
$('.sp0nsor-link').mouseenter(function () {
  var name = $(this).attr('id').split('-')[1],
      $blurb = $('#sp0nsor-blurb-' + name);

  if ($blurb.length > 0 && !$blurb.is(':visible')) {
    if (timeoutFadein !== 0) {
      clearTimeout(timeoutFadein);
    }
    $('.sp0nsor-link').removeClass('active');
    $(this).addClass('active');
    $('.sp0nsor-blurb').hide();
    $('.sp0nsor-blurb').removeClass('active');
    $blurb.show();
    setTimeout(function() {
      $blurb.addClass('active');
    }, 10);
  }
});

})

$(window).scroll(function() {      
  if (!Modernizr.touch) { 
    parallaxScroll(); 
  }
});


$(window).resize(function() {  
  if (!Modernizr.touch) { 
    parallaxScroll(); 
  }
});	

$(window).load(function () {
 if ($(window).width() > 1000) {
  $('.fotorama').fadeIn(2000);
 }
});