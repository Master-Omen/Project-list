<?php

namespace App\Models;

use Illuminate\Support\Facades\Http;
use Illuminate\Database\Eloquent\Model;

class API extends Model
{

    // get api request from https://imdb.iamidiotareyoutoo.com/search

    public static function index($keyword)
    {
        $api_req = Http::get('https://imdb.iamidiotareyoutoo.com/search', [
            'q' => $keyword
        ])->json();

        $error = $api_req["error_code"];
        $data = $api_req["description"];

        if ($error == "404") {
            dd("URL Salah");
        } else if ($error == '401') {
            dd('API key salah atau tidak dikirim');
        } else if ($error == '500') {
            dd('Error server');
        }

        return $data;
    }

    public static function detail($id)
    {
        $data_api = Http::get('https://imdb.iamidiotareyoutoo.com/search', [
            'tt' => $id
        ])->json();

        $temp_data["titleType"] = $data_api["top"]["titleType"]["text"];
        $temp_data["type"] = $data_api["short"]["@type"];
        $temp_data["name"] = $data_api["short"]["name"];
        $temp_data["alterName"] = (isset($data_api["short"]["alternateName"]) ? $data_api["short"]["alternateName"] : "");
        $temp_data["image"] = $data_api["short"]["image"];
        $temp_data["description"] = (isset($data_api["short"]["description"]) ? $data_api["short"]["description"] : "N/A");
        $temp_data["rating"] = (isset($data_api["short"]["aggregateRating"]["ratingValue"]) ? $data_api["short"]["aggregateRating"]["ratingValue"] : 0.0);
        $temp_data["contentRating"] = (isset($data_api["short"]["contentRating"]) ? $data_api["short"]["contentRating"] : "N/A");
        $temp_data["year"] = $data_api["top"]["releaseYear"]["year"];
        $temp_data["datePublished"] = $data_api["short"]["datePublished"];
        $temp_data["runtime"] = (isset($data_api["top"]["runtime"]["displayableProperty"]["value"]["plainText"]) ? $data_api["top"]["runtime"]["displayableProperty"]["value"]["plainText"] : "0m");
        $temp_data["imdbId"] = $data_api["imdbId"];
        $temp_data["genre"] = $data_api["top"]["genres"];
        $temp_data["images"] = $data_api["main"]["titleMainImages"]["edges"] ?? ["N/A", "N/A"];
        $temp_data["videos"] = (isset($data_api["top"]["primaryVideos"]["edges"][0]["node"]) ? $data_api["top"]["primaryVideos"]["edges"][0]["node"] : "");

        return $temp_data;
    }
}
