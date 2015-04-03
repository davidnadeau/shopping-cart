<?php

// Prefix api calls with version number. This way we can create new versions keeping api calling conversions
// without requiring a new domain
Route::group(['prefix' => 'api/v1'], function () {
    Route::get('products', 'ProductController@all');
});
