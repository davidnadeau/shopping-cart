<?php
/**
 * User: David Nadeau
 * Date: 15-04-03
 * Time: 1:16 PM
 * Summary: Enable sql orm for orders table, and hold common sql queries for orders table.
 */
class Order extends Eloquent
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'orders';
}