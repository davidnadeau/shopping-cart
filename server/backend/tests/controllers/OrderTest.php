<?php

/**
 * User: David Nadeau
 * Date: 15-04-03
 * Time: 1:16 PM
 * Summary: Test Order routes
 */
class OrderTest extends TestCase
{
    public function testCreateNewOrderRoute()
    {
        $data = ['order' => "{test:'test'}"];
        $response = $this->call('POST', "/api/v1/orders", $data);
        // check that the response was successful
        $this->assertTrue($response->isOk());
        $content = json_decode($response->getContent());

        // check that the new order is returned
        $this->assertFalse(empty($content->order));

        // cleanup (should have this functionality mocked)
        Order::find($content->order->id)->delete();
    }

    public function testGetAllOrders()
    {
        $response = $this->call('GET', "/api/v1/orders");
        // check that the response was successful
        $this->assertTrue($response->isOk());
    }
}