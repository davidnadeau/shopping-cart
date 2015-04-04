<?php
/**
 * User: David Nadeau
 * Date: 15-04-03
 * Time: 1:16 PM
 * Summary: Enable sql orm for products table, and hold common sql queries for products table.
 */
class Product extends Eloquent
{
    const PAGE_SIZE = 50;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'products';

    public function scopePaginatedList($query)
    {
        return $query->paginate(self::PAGE_SIZE);
    }

    // ensure that the price is being passed as a float instead of being converted to
    // a string when being serialized
    public function getPriceAttribute($value)
    {
        return (float)$value;
    }
}