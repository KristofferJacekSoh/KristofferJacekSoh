
$(document).ready(function() {
    "use strict";

    
/*MODULAR IMAGE ANIMATION*/

    $('.bxslider').bxSlider();
    
/*EASY SETUP IMAGE ANIMATION*/    
    $('.bxslider2').bxSlider2();
    
$(window).on('resize', function(){
       $('.section-modular').height($('.bx-wrapper').height());
    }).trigger('resize');
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
        });
    

    
    
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



/*Make form elements appear when certain choices are chosen*/

$("#category").on('change', function() {
        if(this.value==="merchant"){
            $(".js--category-merchant").show();
        } else{
            $(".js--category-merchant").hide();
        }
    });

$("#category").on('change', function() {
        if(this.value==="other"){
            $(".js--category-others").show();
        } else{
            $(".js--category-others").hide();
        }
    });

$("#find-us").on('change', function() {
        if(this.value==="other"){
            $(".js--find-us-others").show();
        } else{
            $(".js--find-us-others").hide();
        }
    });
    


    var $inputs = $('input[name=email],input[name=phone]');
    $inputs.on('input', function () {
        // Set the required property of the other input to false if this input is not empty.
        $inputs.not(this).prop('required', !$(this).val().length);
    });
    
});