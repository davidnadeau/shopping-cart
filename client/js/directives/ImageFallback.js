angular.module('dnStore.shoppingCart.directives.ImageFallback', [])
	.directive('fallbackSrc', function () {
		var fallbackSrc = {
			link: function postLink(scope, iElement, iAttrs) {
				/**
				 * Show an error image if the download failed.
				 */
				iElement.bind('error', function () {
					angular.element(this).attr("src", iAttrs.fallbackSrc);
				});
			}
		};
		return fallbackSrc;
	});