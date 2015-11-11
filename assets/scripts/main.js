// Created by sam mok 2015(Siso brand interactive team).

"use strict";

//  limit browser drag move
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
},true);

var app = {
    preload: function () {
        app.imgPath = [
            'assets/images/bg01.jpg',
            'assets/images/bg02.jpg',
            'assets/images/bg03.jpg',
            'assets/images/bg04.jpg'
        ];
        var imgAmounts;
        var loadedAmounts = 0;
        var isLoaded = false;
        var startLoadTime = new Date().getTime();
        var endLoadTime = null;

        //  get first scene imgs
        $('.scene01 img, .scene02 img, .scene03 img').each(function () {
            var lazySrc = $(this).attr('lazy-src');
            if (lazySrc) {
                app.imgPath.push(lazySrc);
            }
        });

        imgAmounts = app.imgPath.length;

        //  load first scene imgs
        for (var i = 0; i < app.imgPath.length; i++) {
            var img = new Image();
            img.src = app.imgPath[i];

            img.onload = function () {
                loadedAmounts++;

                /* check img load progress */
                if (checkIsAllMainImagesLoaded() && isLoaded == false) {
                    goCreatingProcess();
                }
            };

            img.onerror = function (error) {
                /* check img load progress */
                if (checkIsAllMainImagesLoaded() && isLoaded == false) {
                    goCreatingProcess();
                }
            };
        }

        function goCreatingProcess () {
            isLoaded = true;

            //  set image's lazy src to real src
            $('.scene01 img, .scene02 img').each(function () {
                var lazySrc = $(this).attr('lazy-src');
                if (lazySrc) { $(this).attr('src', lazySrc) }
            });
            $('.scene02').css({'backgroundImage': 'url(' + app.imgPath[1] + ')'});
            $('.scene03').css({'backgroundImage': 'url(' + app.imgPath[2] + ')'});
            $('.scene04').css({'backgroundImage': 'url(' + app.imgPath[3] + ')'});

            setTimeout(function () {
                app.start();
            }, 500);
        }

        function checkIsAllMainImagesLoaded () {
            if (isLoaded == false) {
                var loadedRate = 0.9;
                return loadedAmounts / imgAmounts >= loadedRate;
            }
        }
    },

    create: function (){
        app.mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical',

            parallax : true,

            noSwiping: false,

            // init
            onInit: function () {
                //  init first scene
                $('.scene01').addClass('active');
                $('.arrow').fadeIn(600);

                //  lazyload images
                $('img').each(function () {
                    var lazySrc = $(this).attr('lazy-src');
                    if (lazySrc) { $(this).attr('src', lazySrc) }
                });

                $('.scene05').css({'backgroundImage': 'url(assets/images/bg05.jpg)'});
                $('.scene06').css({'backgroundImage': 'url(assets/images/bg06.jpg)'});
                $('.scene07').css({'backgroundImage': 'url(assets/images/bg07.jpg)'});
                $('.scene08').css({'backgroundImage': 'url(assets/images/bg08.jpg)'});
            },

            onTransitionStart: function (swiper) {
            },

            onTransitionEnd: function (swiper) {
                $('.scene').removeClass('active')
                    .eq(swiper.activeIndex).addClass('active');

                if (swiper.activeIndex == $('.scene').length-1) {
                    $('.arrow').fadeOut(600);
                    setTimeout(function () {
                        $('.scene08 .btn').addClass('animate');
                    }, 3000);
                } else {
                    $('.arrow').fadeIn();
                    $('.scene08 .btn').removeClass('animate');
                }
            }
        });

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();

            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);
    },

    start: function (){
        this.create();
    }
};

$(function (){
    // init app
    app.preload();
    console.log('app started success...');
});

