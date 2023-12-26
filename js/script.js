var THEMEMASCOT = {};
(function ($) {

	"use strict";


	THEMEMASCOT.isRTL = {
		check: function () {
			if ($("html").attr("dir") === "rtl") {
				return true;
			} else {
				return false;
			}
		}
	};

	THEMEMASCOT.isLTR = {
		check: function () {
			if ($("html").attr("dir") !== "rtl") {
				return true;
			} else {
				return false;
			}
		}
	};

	//Update Header Style and Scroll to Top
	function headerStyle() {
		if ($('.main-header').length) {
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.header-style-one');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				sticky_header.addClass("fixed-header animated slideInDown");
				scrollLink.fadeIn(300);
			} else {
				sticky_header.removeClass("fixed-header animated slideInDown");
				scrollLink.fadeOut(300);
			}
			if (windowpos > 1) {
				siteHeader.addClass("fixed-header");
			} else {
				siteHeader.removeClass("fixed-header");
			}
		}
	}
	headerStyle();

	//Submenu Dropdown Toggle
	if ($('.main-header li.dropdown ul').length) {
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
	}

	//Mobile Nav Hide Show
	if ($('.mobile-menu').length) {

		var mobileMenuContent = $('.main-header .main-menu .navigation').html();

		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);
		$('.mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
		});

		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
			$(this).prev('ul').slideToggle(500);
			$(this).toggleClass('active');
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function () {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	// Testimonial Carousel Two
	if ($('.testimonial-carousel-two').length) {
		$('.testimonial-carousel-two').owlCarousel({
			rtl: THEMEMASCOT.isRTL.check(),
			loop: true,
			margin: 0,
			nav: true,
			items: 1,
			smartSpeed: 700,
			autoplay: 2000,
			navText: ['<span class="fa fa-chevron-left"></span>', '<span class="fa fa-chevron-right"></span>'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				991: {
					items: 2
				},
			}
		});
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($('.dial').length) {
		$('.dial').appear(function () {
			var elm = $(this);
			var color = elm.attr('data-fgColor');
			var perc = elm.attr('value');

			elm.knob({
				'value': 0,
				'min': 0,
				'max': 100,
				'skin': 'tron',
				'readOnly': true,
				'thickness': 0.05,
				'dynamicDraw': true,
				'displayInput': false
			});

			$({ value: 0 }).animate({ value: perc }, {
				duration: 2000,
				easing: 'swing',
				progress: function () {
					elm.val(Math.ceil(this.value)).trigger('change');
				}
			});

			//circular progress bar color
			$(this).append(function () {
				// elm.parent().parent().find('.circular-bar-content').css('color',color);
				//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
			});

		}, { accY: 20 });
	}

	//Fact Counter + Text Count
	if ($('.count-box').length) {
		$('.count-box').appear(function () {

			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);

			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function () {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function () {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}

		}, { accY: 0 });
	}

	//Tabs Box
	if ($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

	// count Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
				var el = $(this);
				var percent = el.data("percent");
				$(el).css("width", percent).addClass("counted");
			}, {
			accY: -50
		}
		);
	}


	//Progress Bar
	if ($('.progress-line').length) {
		$('.progress-line').appear(function () {
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width', percent + '%');
		}, { accY: 0 });
	}

	// Scroll to a Specific Div
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1500);

		});
	}

	// Elements Animation
	if ($('.wow').length) {
		var wow = new WOW(
			{
				boxClass: 'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset: 0,          // distance to the element when triggering the animation (default is 0)
				mobile: false,       // trigger animations on mobile devices (default is true)
				live: true       // act on asynchronously loaded content (default is true)
			}
		);
		wow.init();
	}


	// Select2 Dropdown
	$('.custom-select').select2({
		minimumResultsForSearch: 7,
	});

	/* ==========================================================================
	   When document is Scrollig, do
	   ========================================================================== */

	$(window).on('scroll', function () {
		headerStyle();
	});

	/* ==========================================================================
	   When document is loading, do
	   ========================================================================== */

	// $(window).on('load', function () {
	// 	handlePreloader();
	// });

})(window.jQuery);

let btn = document.getElementById('button');
const contactForm = document.getElementById("form");
const errorElement = document.getElementById("error");

contactForm.addEventListener("submit", function (event) {
	event.preventDefault();

	const fullName = document.getElementById("fullName").value;
	const email = document.getElementById("email").value;
	const message = document.getElementById("message").value;
	const phone = document.getElementById("phone").value;
	const services = document.getElementById("services").value;
	const countryCode = document.getElementById("countryCode").value;

	if (!fullName || !email || !message || !phone || !services ) {
		errorElement.textContent = "All fields are required.";

		return;
	}
	else {

		btn.value = 'Sending.....';
	}

	if (!isValidEmail(email)) {
		errorElement.textContent = "Invalid email address.";
		btn.value = "Let's discuss"
		return;
	}

	// If all validations pass, send the email
	sendEmail(fullName, email, message, phone, services, countryCode);
});

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function sendEmail(fullName, email, message, phone, services, countryCode) {
	emailjs.send("service_u4vdakv", "template_p8kdkbc", {
		fullName: fullName,
		email: email,
		message: message,
		phone: phone,
		services: services,
		countryCode: countryCode

	}).then(
		function (response) {
			btn.value = 'Send Email';
			let inputs = document.querySelectorAll("#fullName, #email, #countryCode, #services, #message, #phone");
			inputs.forEach(input => {
				input.value = '';
			});
			errorElement.textContent = "Email sent successfully!";
		},
		function (error) {
			btn.value = 'Send Email';
			let inputs = document.querySelectorAll("#fullName, #email, #countryCode, #services, #message, #phone");
			inputs.forEach(input => {
				input.value = '';
			});
			errorElement.textContent = "Error sending email. Please try again later.";
		}
	);
}

// counter
var counted = 0;
$(window).scroll(function () {

	var oTop = $('#counter').offset().top - window.innerHeight;
	if (counted == 0 && $(window).scrollTop() > oTop) {
		$('.count').each(function () {
			var $this = $(this),
				countTo = $this.attr('data-count');
			$({
				countNum: $this.text()
			}).animate({
				countNum: countTo
			},

				{

					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}

				});
		});
		counted = 1;
	}

});


var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
	var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
	s1.async = true;
	s1.src = 'https://embed.tawk.to/6512dab50f2b18434fdab02a/1hb8qclq5';
	s1.charset = 'UTF-8';
	s1.setAttribute('crossorigin', '*');
	s0.parentNode.insertBefore(s1, s0);
})();