
$(document).ready(async function () {
    
    var w = window.innerWidth;
    var pagetop = $('.page-top');
    pagetop.click(function () {
        $('body,html').animate({scrollTop: 0}, 500, 'swing');
        return false;
    });

    $(window).on("resize", function () {

    }).resize();

    $(window).on('scroll', function() {
        console.log(w);
        // Pgae Top
        if ($(this).scrollTop() > 200) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });

    $('.hamburger-wrapper').on('click', function(e) {
        e.preventDefault();
        $('.hamburger-menu').toggleClass('animate');
        $('.mobile-menu-overlay').toggleClass('visible');
        $('.header-top').toggleClass('active');
        $('.main_contents').toggleClass('active');
        $('.footer').toggleClass('active');
    })
    $('.mobile-menu-overlay .menu-item > ul > li > a, .menu-btn').on('click', function (e) {
        e.preventDefault();
        $('.hamburger-menu').removeClass('animate');
        $('.mobile-menu-overlay').removeClass('visible');
        $('.header-top').toggleClass('active');
        $('.main_contents').toggleClass('active');
        $('.footer').toggleClass('active');
    })

    // Audio Volumn
    // $('#volume').draggable();
    $("#volume").slider({
        min: 0,
        max: 100,
        value: 50,
          range: "min",
        slide: function(event, ui) {
          setVolume(ui.value / 100);
        }
    });  
    

    var myaudio = new Audio(); 
      
    function setVolume(myVolume) {
      myaudio.volume = myVolume;
    }

    $(document).on('click', '.audio-item > a', function(e) {
        e.preventDefault();
        
        if($(this).hasClass('active')) {
            $(this).toggleClass('active');
            if (myaudio.paused) myaudio.play();
            else myaudio.pause();
        }
        else {
            $('.audio-item a').removeClass('active');
            $(this).addClass('active');
            myaudio.src = $(this).data("sound");
            myaudio.play();
        }
        console.log(myaudio.paused)
    });

    $('.slider-wrapper').slick({
        autoplay: false,
        infinite: true,
        arrows: true,
        dots: false,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        slidesToScroll: 1,
        centerMode: true,
        centerPadding:  '0px',
        slidesToShow: 1,
        speed: 500,
        responsive: [{
            breakpoint: 768,
            settings: {
                centerMode: false,
                slidesToShow: 1
            }
        }]
    });

    let tabs = $(".tab"); 
    $(".tab").on("click", function() { 
        $(".active").removeClass("active");
        $(this).addClass("active"); 
        const index = tabs.index(this); 
        $(".inquiry-content").removeClass("show").eq(index).addClass("show"); 
    });

    // Custom Select
    var customSelect = $(".top-select");

    customSelect.each(function() {
        var thisCustomSelect = $(this),
          options = thisCustomSelect.find("option"),
          firstOptionText = options.first().text();
  
        var selectedItem = $("<div></div>", {
          class: "selected-item"
        })
          .appendTo(thisCustomSelect)
          .text(firstOptionText);
  
        var allItems = $("<div></div>", {
          class: "all-items all-items-hide"
        }).appendTo(thisCustomSelect);
  
        options.each(function() {
          var that = $(this),
            optionText = that.text();
  
          var item = $("<div></div>", {
            class: "item",
            on: {
              click: function() {
                var selectedOptionText = that.text();
                selectedItem.text(selectedOptionText).removeClass("arrowanim");
                allItems.addClass("all-items-hide");
              }
            }
          })
            .appendTo(allItems)
            .text(optionText);
        });
      });
  
      var selectedItem = $(".selected-item"),
        allItems = $(".all-items");
  
      selectedItem.on("click", function(e) {
        selectedItem.hide();
        var currentSelectedItem = $(this),
          currentAllItems = currentSelectedItem.next(".all-items");
  
        allItems.not(currentAllItems).addClass("all-items-hide");
        selectedItem.not(currentSelectedItem).removeClass("arrowanim");
  
        currentAllItems.toggleClass("all-items-hide");
        currentSelectedItem.toggleClass("arrowanim");
  
        e.stopPropagation();
      });
  
      $(document).on("click", ".all-items .item", function() {
        selectedItem.show();
        var opened = $(".all-items:not(.all-items-hide)"),
          index = opened.parent().index();
  
        customSelect
          .eq(index)
          .find(".all-items")
          .addClass("all-items-hide");
        customSelect
          .eq(index)
          .find(".selected-item")
          .removeClass("arrowanim");
      });
    //   Custom Select End
   
});

