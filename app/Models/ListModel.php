<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListModel extends Model
{
    protected $fillable = ['type', 'titleType', 'name', 'alterName', 'image', 'description', 'rating', 'contentRating', 'year', 'datePublished', 'runtime', 'imdbId', 'genre', 'images', 'videos'];
}
