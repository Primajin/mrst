/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function (Drupal, $) {
  'use strict';

  // To understand behaviors, see https://www.drupal.org/node/2269515
  Drupal.behaviors.mrst = {
    attach: function (context, settings) {
      // Execute code once the DOM is ready. $(handler) not required
      // within Drupal.behaviors.
      if (!document.body.classList.contains('jQuery')) {
        document.body.classList.add('jQuery');
        //show CookieBar
        $('.cookie-message').cookieBar({closeButton: '.close-cookie-bar'});

        //add back to top link
        $('<a href="#skip">' +
          '<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>' +
          '<path d="M0 0h24v24H0z" fill="none"/>' +
          '</svg></a>').appendTo(document.body);

        //add menu
        var $menuContainer = $('#block-mrst-main-menu');
        if ($menuContainer && $menuContainer.length) {
          if (document.body.classList.contains('with-subnav')) {
            $menuContainer.find('a').each(function () {
              var $this = $(this);
              if ($this.attr('href').charAt(0) === '#') {
                $this.attr('href', '/' + $this.attr('href'));
              }
            });
          }

          var $menuToggle = $(
            '<div class="toggle-menu"><span class="ham"></span></div>').
            on('click', function () {
              $(this).toggleClass('active');
              $menu.toggleClass('active');
            });

          $menuToggle.insertAfter($menuContainer);

          var $menu = $('<div class="mobile-menu"></div>').
            append($('nav').find('.menu').clone());
          $menu.find('a').on('click', function () {
            $menu.removeClass('active');
            $menuToggle.removeClass('active');
          });

          $menu.insertAfter($menuContainer);
        }

        //share buttons
        if (document.body.classList.contains('section-produkt')) {
          var pageUrl = window.location.href;
          var description = $('.product__subtitle').text();
          var imageUrl = window.location.origin + $('.content').find('img').attr('src').replace('styles/product_detail_page/public/', '');

          $('<div class="soc-shr-container">' +
            '<h3>Dieses Produkt teilen:</h3>' +
            '<a target="_blank" class="fabo" href="https://www.facebook.com/sharer.php?u=' + pageUrl +
            '"><svg viewBox="0 0 1792 1792"><path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759H734V905H479V609h255V391q0-186 104-288.5T1115 0q147 0 228 12z"/></svg></a>' +
            '<a target="_blank" class="pnt" href="https://pinterest.com/pin/create/button/?url=' + pageUrl + '&description=' + description + '&media=' +
            imageUrl +
            '"><svg viewBox="0 0 1792 1792"><path d="M1664 896q0 209-103 385.5T1281.5 1561 896 1664q-111 0-218-32 59-93 78-164 9-34 54-211 20 39 73 67.5t114 28.5q121 0 216-68.5t147-188.5 52-270q0-114-59.5-214T1180 449t-255-63q-105 0-196 29t-154.5 77-109 110.5-67 129.5T377 866q0 104 40 183t117 111q30 12 38-20 2-7 8-31t8-30q6-23-11-43-51-61-51-151 0-151 104.5-259.5T904 517q151 0 235.5 82t84.5 213q0 170-68.5 289T980 1220q-61 0-98-43.5T859 1072q8-35 26.5-93.5t30-103T927 800q0-50-27-83t-77-33q-62 0-105 57t-43 142q0 73 25 122l-99 418q-17 70-13 177-206-91-333-281T128 896q0-209 103-385.5T510.5 231 896 128t385.5 103T1561 510.5 1664 896z"/></svg></a>' +
            '<a target="_blank" class="bird" href="https://twitter.com/share?text=' + description +
            '"><svg viewBox="0 0 1792 1792"><path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5T1369.5 1125 1185 1335.5t-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5T285 1033q33 5 61 5 43 0 85-11-112-23-185.5-111.5T172 710v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5T884 653q-8-38-8-74 0-134 94.5-228.5T1199 256q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"/></svg></a>' +
            '<a target="_blank" class="emil" href="mailto:?subject=' + description + '&body=Schauen Sie, was ich gerade entdeckt habe: ' + pageUrl +
            '"><svg viewBox="0 0 1792 1792"><path d="M1664 1504V736q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5T897 1280h-2q-48 0-102.5-24.5T706 1207t-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5H160q-13 0-22.5 9.5T128 416q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5T852 1143t43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5T1664 453zm128-37v1088q0 66-47 113t-113 47H160q-66 0-113-47T0 1504V416q0-66 47-113t113-47h1472q66 0 113 47t47 113z"/></svg></a>' +
            '</div>').appendTo('.product-details');
        }

        //animate scrolling for anchor links
        if (document.body.classList.contains('home')) {
          $('a[href^="#"]').on('click', function (e) {
            var href = $(this).attr('href');
            $('html, body').animate({
              scrollTop: $(href).offset().top
            }, 'slow');
            e.preventDefault();
          });
        }

        //owl carousel
        var forward = '<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';
        var backward = '<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
        $('.owl-carousel').owlCarousel({
          autoplay: false,
          loop: true,
          margin: 20,
          nav: false,
          navText: [backward, forward],
          responsiveClass: true,
          responsive: {
            0: {
              autoplay: true,
              items: 1
            },
            576: {
              autoplay: true,
              items: 2
            },
            768: {
              autoplay: true,
              items: 3,
              margin: 30
            },
            1024: {
              items: 4,
              loop: false,
              margin: 40,
              nav: true
            },
            1200: {
              items: 5,
              loop: false,
              margin: 40,
              nav: true
            }
          }
        });

        //blog
        if (document.body.classList.contains('section-blog') || document.body.classList.contains('section-tags') ||
          document.body.classList.contains('page-rezepte')) {
          var $pager = $('.pager__items');
          if ($pager && $pager.length) {
            //pager
            //remove first page link - if on first page nothing happens
            $pager.find('.pager__item--first').remove();

            var $activePageListItem = $pager.find('.pager__item--active');

            //get current active page
            var activePage;
            if ($activePageListItem && $activePageListItem.length) {
              activePage = parseInt($activePageListItem.children('a').attr('href').replace(/^\D+/g, ''), 10) + 1;
            }
            var pagesLength = activePage;

            //remove last page link - if on last page pagesLength must be activePage
            var $lastPageListItem = $pager.find('.pager__item--last');
            if ($lastPageListItem && $lastPageListItem.length) {
              pagesLength = parseInt($lastPageListItem.children('a').attr('href').replace(/^\D+/g, ''), 10) + 1;
              $lastPageListItem.remove();
            }

            var $pagerItems = $pager.find('.pager__item');
            if (activePage && pagesLength) {
              $pagerItems.first().after('<li>Seite ' + activePage + ' / ' + pagesLength + '</li>');
            }

            //remove the rest of the pager items
            $pagerItems.not('.pager__item--next').not('.pager__item--previous').remove();
            if (
              document.body.classList.contains('page-tags-rezepte') ||
              document.body.classList.contains('page-rezepte') ||
              document.body.classList.contains('page-tags-susses') ||
              document.body.classList.contains('page-tags-herzhaftes')
            ) {
              $pagerItems.filter('.pager__item--previous').find('[aria-hidden]').text('« mehr Rezepte');
              $pagerItems.filter('.pager__item--next').find('[aria-hidden]').text('mehr Rezepte »');
            }

            var $wholePager = $('.pager');
            $wholePager.clone().prependTo($wholePager.parent());
          }

          var $tagDescription = $('.tag-description');
          if ($tagDescription && $tagDescription.length) {
            var $stupidWrapper = $tagDescription.closest('.views-element-container');
            $tagDescription.prependTo('#block-mrst-content');
            $stupidWrapper.remove();
          }

          var $recipeMenu = $('.recipe-menu');
          if ($recipeMenu && $recipeMenu.length) {
            $recipeMenu.find('a[href="' + window.location.pathname + '"]').parent().addClass('active');
          }
        }

        if (
          document.body.classList.contains('page-rezepte') ||
          document.body.classList.contains('page-tags-rezepte') ||
          document.body.classList.contains('page-tags-susses') ||
          document.body.classList.contains('page-tags-herzhaftes')
        ) {
          var $contentArea = $('#content-area');
          if ($contentArea && $contentArea.length) {

            $contentArea.find('#block-rezeptemenu').before('<div id="block-einleitung"><h2><span>Mrs Ts Rezeptbuch</span></h2>' +
              '<p>Delikatessen mit Tee selbst zaubern? Kein Problem!</p>' +
              '<p>In Mrs Ts Rezeptbuch sammeln wir Kreationen und Rezepte, die Ihr ganz einfach nachmachen könnt.<br>' +
              'Wir wünschen viel Spaß beim Ausprobieren und lasst es Euch schmecken!</p></div>');
          }
        }
      }
      // $(window).on('load', function () {
      //   // Execute code once the window is fully loaded.
      // });

      // $(window).on('resize', function () {
      //   // Execute code when the window is resized.
      // });

      $(window).on('scroll', function () {
        // Execute code when the window scrolls.
        var $scrollTop = $('a[href="#skip"]');
        $scrollTop.attr('title', 'Zum Anfang der Seite springen');
        if (document.body.classList.contains('jQuery') && $(this).scrollTop() > 300) {
          $scrollTop.addClass('visible');
        } else {
          $scrollTop.removeClass('visible');
        }
      });
    }
  };
})(Drupal, jQuery);
