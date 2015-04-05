<?php
/**
 * User: David Nadeau
 * Date: 15-04-03
 * Time: 1:16 PM
 * Summary: Handle all HTTP requests for orders
 */
class OrderController extends \BaseController
{

    /**
     * Create a new order. Order data storage in json column.
     *
     * @return Response - Newly created order
     */
    public function store()
    {
        // create a new order record
        $order = new Order();
        $order->data = Input::get('order');
        $order->save();

        return Response::json([
            'error' => false,
            'order' => $order
        ], 200);
    }
    public function index()
    {
        return Order::all();
    }
}