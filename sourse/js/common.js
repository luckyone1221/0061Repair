let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			// beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".navMenu__link"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					//turn off old
					let oldActiveEl = element.closest(`.${tab}`).querySelector(`.${tab}__btn.active`);
					let oldActiveContent = tabs.Content[index].closest(`.${tab}`).querySelector(`.${tab}__content.active`);

					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active')

					//turn on new(cklicked el)
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	// modal window

	//luckyone js
	let sProjectsSlider = new Swiper('.sProjects-slider-js', {
		slidesPerView: 'auto',

		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});

	// sFamiliar
	let sFamiliarItems = document.querySelectorAll('.sFamiliar-item-js');
	for(let item of sFamiliarItems){

		let sFamiliarThumb = new Swiper(item.querySelector('.sFamiliar-thumb-js'), {
			slidesPerView: 'auto',
			spaceBetween: 12,
			//slideToClickedSlide: true,
		});

		let sFamiliarSlider = new Swiper(item.querySelector('.sFamiliar-slider-js'), {
			spaceBetween: 30,
			thumbs: {
				swiper: sFamiliarThumb,
			},

			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 3,
			},
			loop: true,
		});
	}
	//.cTabs-js(=== .tabs)
	//.cTabs-btn-js(=== .tabs__btn)
	//.cTabs-content-group-js(=== .tabs__wrap)
	//.cTabs-content-js(=== .tabs__content)
	$('.cTabs-js').each(function (){
		let Btns = this.querySelectorAll('.cTabs-btn-js')
		let contentGroups = this.querySelectorAll('.cTabs-content-group-js');

		$(Btns).click(function (){
			$(Btns).removeClass('active');
			$(this).addClass('active');

			let index = $(this).index();

			$(contentGroups).each(function (){
				let contentItems = this.querySelectorAll('.cTabs-content-js');

				$(contentItems).removeClass('active');
				contentItems[index].classList.add('active');
			})
		})
	})

	//img svg
	$('img.img-svg-js').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			} // Remove any invalid XML tags as per http://validator.w3.org


			$svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			} // Replace image with new SVG


			$img.replaceWith($svg);
		}, 'xml');
	});
	//range slider
	$(".range-slider--js").ionRangeSlider({
		from: 10,
		step: 1,
		//postfix: " ❤",
		//prefix: "+",
	});

	$('.sCalculation-open-btn-js').click(function (){
		$(this).toggleClass('active').closest('.sCalculation-item-js').find('.sCalculation-list-js').toggleClass('active');
	});
	//.sData-slider-js
	let tabsDefaultSl = {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		lazy: {
			loadPrevNext: true,
		},
		loop: true,
	}

	let sDataSliderBoxes = document.querySelectorAll('.sData-slider-box-js');
	for (let sliderBox of sDataSliderBoxes){

		let sDataSlider = new Swiper(sliderBox.querySelector('.sData-slider-js'), {
			...tabsDefaultSl,
			spaceBetween: 10,
			navigation: {
				nextEl: sliderBox.querySelector('.swiper-button-next'),
				prevEl: sliderBox.querySelector('.swiper-button-prev'),
			},
		});
	}

	//
	let sProjectSliderBoxes = document.querySelectorAll('.sProject-sliderBox-js');
	for (let sliderBox of sProjectSliderBoxes){
		let sProjectSlider = new Swiper(sliderBox.querySelector('.sProject-slider-js'), {
			...tabsDefaultSl,
			spaceBetween: 24,
			navigation: {
				nextEl: sliderBox.querySelector('.swiper-button-next'),
				prevEl: sliderBox.querySelector('.swiper-button-prev'),
			},
		});
	}
	//.sBath-slider-box-js
	let sBathSliderBoxes = document.querySelectorAll('.sBath-slider-box-js');
	for (let sliderBox of sBathSliderBoxes){
		let sBathSlider = new Swiper('.sBath-slider-js', {
			...tabsDefaultSl,
			spaceBetween: 8,

			navigation: {
				nextEl: sliderBox.querySelector('.swiper-button-next'),
				prevEl: sliderBox.querySelector('.swiper-button-prev'),
			},
		});
	}
	//
	let sTypesWrap = document.querySelector('.sTypes-slider-wrap');
	if (sTypesWrap){
		let sTypesSlider = new Swiper('.sTypes-slider-js', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			loop: true,

			navigation: {
				nextEl: sTypesWrap.querySelector('.swiper-button-next'),
				prevEl: sTypesWrap.querySelector('.swiper-button-prev'),
			},
		});
	}

	function makeDDGroup(ArrSelectors){
		for (let parentSelect of ArrSelectors){
			let parent = document.querySelector(parentSelect);
			if (parent){
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js');
				$(ChildHeads).click(function (){
					let clickedHead = this;

					$(ChildHeads).each(function (){
						if (this === clickedHead){
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function (){
								$(this).toggleClass('active');
							});
						}
						else{
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function (){
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	}
	makeDDGroup([
		'.sBathRep-dd-group-js',
		'.sFAQ-dd-group-js',
	]);
	//
	let sDescrWrap = document.querySelector('.sDescr-slider-wrap-js');
	if (sDescrWrap){
		let sDescrSlider = new Swiper('.sDescr-slider-js', {
			slidesPerView: 'auto',
			spaceBetween: 30,
			loop: true,

			navigation: {
				nextEl: sDescrWrap.querySelector('.swiper-button-next'),
				prevEl: sDescrWrap.querySelector('.swiper-button-prev'),
			},

			pagination: {
				el: sDescrWrap.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
			},
		});
	}
	//custom select
	$('.custom-select-js').select2({
		minimumResultsForSearch: Infinity,
	});
	//
	$('.sFeedBack-open-js').click(function (){
		$(this).closest('.sFeedBack-item-js').find('.sFeedBack-feedback-js').slideDown(function (){
			$(this).addClass('active');
		})
	})
	$('.sFeedBack-close-js').click(function (){
		$(this).closest('.sFeedBack-item-js').find('.sFeedBack-feedback-js').slideUp(function (){
			$(this).removeClass('active');
		})
	})
	//--open-nav
	$('.burger-js').click(function (){
		//  .js-nav
		$('.js-nav').addClass('--open-nav');
		console.log(document.querySelectorAll('.js-nav'));
		$('body').addClass('--page-open-nav');
	})
	//
	let header = document.querySelector('.ui-page__header');
	let scrollMenu = document.querySelector('.scrollmenu--js');

	if (header){
		window.addEventListener('scroll',function (){
			if (window.scrollY > header.offsetHeight){
				scrollMenu.classList.add('active');
			}
			else{
				scrollMenu.classList.remove('active');
			}
		})
	}
	//
	let sDescrSlider = new Swiper('.sDecorative-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		loop: true,

		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	//round slider
	$('.round-slider-js').roundSlider({
		min: 0,
		max: 360,

		radius: 118,
		width: 6,
		handleSize: "+24",
		handleShape: "dot",
		sliderType: "min-range",
		value: 65
	})
	.on("change", function (e) {
		console.log(e.value);
		//let smth = document.querySelectorAll('');
		//console.log(smth);
	});

	//end luckyone js

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }