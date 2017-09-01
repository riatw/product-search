
/*----------------------------------------------
 @disc	: スムーススクロール
 @param	: -
 @ret	: -
----------------------------------------------*/
(function( $ ) {
	$.smoothScroll = function ( options ) {
		var c	= $.extend ( {
			target: $( 'a[href^="#"]' ),
			speed: 300
		}, options );

		var $anchors = c.target;

		var $doc = $('html,body');

		$anchors.each( function () {
			var _this		= $(this);
			var anchorID	= _this.attr( 'href' );
			var $target;

			if ( anchorID !='#' ) {
				$target	= $( anchorID );
			}
			else {
				$target	= $('body');
			}

			_this.click( function (e) {
				var targetPositionTop	= $target.offset().top;

				$doc.stop().animate({
					scrollTop	: targetPositionTop
				},
				{
					duration	: c.speed,
					complete	: function () {
					}
				});

				return false;
			});
		});
	}
})( jQuery );