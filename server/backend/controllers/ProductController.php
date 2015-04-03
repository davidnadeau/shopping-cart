<?php
/**
 * User: David Nadeau
 * Date: 15-04-03
 * Time: 1:16 PM
 * Summary: Handle all HTTP requests for products
 */
class ProductController extends \BaseController
{

    /**
     * Get a paginated list of all the products.
     *
     * @return Response - paginated product list along with paging information
     */
    public function all()
    {
        // paginated object containing the product list and paging information
        $paginatedProductList = Product::paginatedList();
        // get just the product list from the paginated object
        $productList = $paginatedProductList->getCollection();

        return Response::json([
            'error' => false,
            'products' => $productList,
            'paging' => [
                'current_page' => $paginatedProductList->getCurrentPage(),
                'last_page' => $paginatedProductList->getLastPage(),
                'per_page' => $paginatedProductList->getPerPage(),
                'total' => $paginatedProductList->getTotal()
            ]
        ], 200);
    }
}