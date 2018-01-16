
$(document).ready(function() {
 "use strict";

/*---------------------------------
 STICKY NAV*/
    
        //makes the sticky nav appear at the top once scrolling past the main image
    $('.js--section-modular').waypoint(function (direction) {
        if (direction === "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }   
        },
        {offset: '60px;'}
    );
    
        
/*---------------------------------
 SMOOTH SCROLLING SNIPPET */
    
    
        // Select all links with hashes
    $('a[href*="#"]')
          // Remove links that don't actually link to anything
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function (event) {
            // On-page links
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
                        &&
              location.hostname === this.hostname) {
              // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              // Does a scroll target exist?
                if (target.length) {
                // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                $('html, body').animate({
                  scrollTop: target.offset().top  -40
                    }, 1000, function () {
                  // Callback after animation
                  // Must change focus!
                        var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  }
                });
              }
            }
            if($(window).width() < 768){$('.js--nav-icon').click();} //close mobile nav after clicking an option

          });

/*MOBILE NAV*/
    
        $('.js--nav-icon').click(function(){
            var nav =$('.js--main-nav');
            var icon=$('.js--nav-icon i');
            nav.slideToggle(200);

            if(icon.hasClass('ion-navicon-round')){
                icon.addClass('ion-close-round');
                icon.removeClass('ion-navicon-round');
            } else{
                icon.addClass('ion-navicon-round');
                icon.removeClass('ion-close-round');
            }
        })
    
/*MODULAR IMAGE ANIMATION*/
        

    
//Animation runs only when tab is in focus
   
    var swapInterval = 0;
    var counter = 0;
    swapInterval = setInterval(function(){counter = modularImageSwap(counter);}, 3000);
    
    var visProp = getHiddenProp();
    if (visProp) {
        var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
        $(document).bind(evtname,function(){
            
            if(!document.hidden){
               if(!swapInterval){
                   swapInterval = setInterval(function(){counter = modularImageSwap(counter);}, 3000);
               }
            } else{
                clearInterval(swapInterval);
                swapInterval=0;
            }   
        });
    }

    
/*Images fade in on scroll to reduce first load times*/
    
        $('.js--wp1').waypoint(function(direction) {
           $('.js--wp1').addClass('animated fadeIn'); 
        }, {
            offset: '100%'
        });
    
        $('.js--wp2').waypoint(function(direction) {
           $('.js--wp2').addClass('animated fadeIn'); 
        }, {
            offset: '100%'
        });


/*To fix a bug of the links not reappearing after widening the browser if they minimised with the mobile nav icon*/
        $(window).resize(function(){
            var nav =$('.js--main-nav');
            var w = $(window).width();
            if(w >= 768 && nav.is(':hidden')) {
                nav.removeAttr('style');
         }
         });
    
/*Change background-attachment to scrolling if ios is detected*/
    
        if(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)){
            $('header').css('background-attachment', 'scroll');
        }
});

var fadeInterval=null;
var fadeCounter=0;

function modularImageSwap(inCounter){
    
    var modularImageSource = [
        "resources/img/Modular1.png",
        "resources/img/Modular2.png",
        "resources/img/Modular3.png",
        "resources/img/Modular4.png",
        "resources/img/Modular5.png",
        "resources/img/Modular6.png",
        "resources/img/Modular7.png"
    ];
    
    //Time taken for animation to complete
    var animationTime = 250;
    
    /*Fade Out*/
    fadeCounter = 0;
    fadeInterval = setInterval(function(){
        $('.js--modular-img').css('opacity', (100 - fadeCounter)/100);
        $('.js--modular-img').css({"-webkit-transform":"translate("+fadeCounter+"px,0)"});
        fadeCounter+=1;
        if(fadeCounter === 100){clearInterval(fadeInterval);}
    }, animationTime/100);
    
    /*Fade In*/
    setTimeout(function(){
    $('.js--modular-img').attr('src', modularImageSource[inCounter]);
    fadeCounter = 0;
    fadeInterval = setInterval(function(){
        $('.js--modular-img').css('opacity', (fadeCounter)/100);
        $('.js--modular-img').css({"-webkit-transform":"translate("+(fadeCounter-100)+"px,0)"});
        fadeCounter+=1;
        if(fadeCounter === 100){clearInterval(fadeInterval);}
    }, animationTime/100);
    }, animationTime*2);
    
    //Return to the first image after reaching the last one
    if (inCounter === 6) {inCounter = 0;}
    else {inCounter++;}
    
    return inCounter;
}

function getHiddenProp(){
    var prefixes = ['webkit','moz','ms','o'];
    
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
    
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document) 
            return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
}


