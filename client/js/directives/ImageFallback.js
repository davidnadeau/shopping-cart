angular.module('dnStore.shoppingCart.directives.ImageFallback', [])
	.directive('fallbackSrc', function () {
		var fallbackSrc = {
			link: function postLink(scope, iElement, iAttrs) {
				iElement.bind('error', function () {
					angular.element(this).attr("src", iAttrs.fallbackSrc);
				});
			}
		}
		return fallbackSrc;
	});