define(
    [
        'ko',
        'jquery',
        'Magento_Checkout/js/model/quote',
        'mage/storage',
        'mage/url',
        'Magento_Checkout/js/action/get-totals',
    ],
    function(
        ko,
        $,
        quote,
        storage,
        urlBuilder,
        getTotalsAction
    ) {
        'use strict';

        return function (isLoading, payment) {
            var serviceUrl = urlBuilder.build('paymentfee/checkout/totals');
            return storage.post(
                serviceUrl,
                JSON.stringify({payment: payment})
            ).done(
                function(response) {
                    if(response) {
                        var deferred = $.Deferred();
                        isLoading(false);
                        getTotalsAction([], deferred);
                    }
                }
            ).fail(
                function (response) {
                    isLoading(false);
                    var error = JSON.parse(response.responseText);
                    console.log(error);
                }
            );
        }
    }
);
