(function() {

var options = {
	navigation: false,
	recordHistory: false,
	anchors: ['firstPage', 'secondPage', 'thirdPage'],
	menu: '.js-sub-menu',
	afterLoad: function (anchorLink, index) {
		switch (index) {
			case 1:
				$('.imgWrap').animate({
					width: '150px',
					height: '150px'
				}, 300, function () {
					$('.imgWrap').animate({
						width: '100px',
						height: '100px'
					}, 300)
				});
				break;
			case 2:
				$('.result').delay(500).animate({
					left: 0
				}, 1500);
				$('.js-intro-info').first().fadeIn(1000, function () {
					$('.js-intro-info').last().fadeIn(1000);
				});
				break;
			case 3:
				$('.intro').delay(100).animate({
					left: 0
				}, 1000);
				break;
			default:
				break;
		}
	},
	onLeave: function (index, nextIndex, direction) {
		switch (index) {
			case 1:
				break;
			case 2:
				$('.result').animate({
					left: '100%'
				}, 1500);
				$('.js-intro-info').first().fadeOut(100);
				$('.js-intro-info').last().fadeOut(100);
				break;
			case 3:
				$('.intro').animate({
					left: '-100%'
				}, 1000);
				break;
			default:
				break;
		}
	}
};


$('#fullPage').fullpage(options)
})();