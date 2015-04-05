<?php

/**
 * User: David Nadeau
 * Date: 15-04-03
 * Time: 1:16 PM
 * Summary: Test product routes
 */
class ProductTest extends TestCase
{
    public function testGetAllRoute()
    {
        $response = $this->call('GET', "/api/v1/products");
        // check that the response was successful
        $this->assertTrue($response->isOk());

        $content = json_decode($response->getContent());
        // check that the response is an array
        $this->assertTrue(is_array($content->products));
        // check that the paging information is being returned
        $this->assertFalse(empty($content->paging));
    }
}