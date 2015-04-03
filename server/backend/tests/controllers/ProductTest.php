<?php
/**
 * User: David Nadeau
 * Date: 15-04-03
 * Time: 1:16 PM
 * Summary: Test product routes
 */
class ProductTest extends TestCase {
    public function testGetAllRoute()
    {
        $response = $this->call('GET', "/api/v1/products");
        $content = $response->getContent();
        $products = $content->products;
        $paging = $content->paging;
        // check that the response is an array
        $this->assertTrue(is_array($products));
        // check that the paging information is being returned
        $this->assertFalse(empty($paging));
        $this->assertTrue($response->isOk());
    }
}