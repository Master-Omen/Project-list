<?php

namespace App\Http\Controllers;

use App\Models\ListModel;
use Exception;
use Inertia\Inertia;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $queryWhere = ["name", "altername", "type", "titleType", "year", "genre", "description", "image", "rating", "imdbId"];

        try {
            $db = ListModel::select($queryWhere)->paginate(15);
        } catch (Exception $e) {
            dd($e->getMessage());
        }

        $x = 0;
        while ($x < count($db)) {
            $db[$x]["genre"] = json_decode($db[$x]["genre"]);
            $x++;
        }

        return inertia::render('List', ["rawData" => $db, "type" => "All"]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store() {}

    /**
     * Display the specified resource.
     */
    public function show($id, $order = "created_at", $sort = "desc")
    {

        $queryWhere = ["name", "altername", "type", "titleType", "year", "genre", "description", "image", "rating", "imdbId"];

        if ($id == "All") {

            try {
                $db = ListModel::select($queryWhere)->orderBy($order, $sort)->paginate(15);
            } catch (Exception $e) {
                dd($e->getMessage());
            }
        } else {
            try {
                $db = ListModel::select($queryWhere)->orderBy($order, $sort)->where('type', $id)->paginate(15);
            } catch (Exception $e) {
                dd($e->getMessage());
            }
        }

        // decode
        $x = 0;
        while ($x < count($db)) {
            $db[$x]["genre"] = json_decode($db[$x]["genre"]);
            $x++;
        }

        if ($sort != "desc") {
            $order = $order . "/" . $sort;
        }

        return inertia::render('List', ["rawData" => $db, "type" => $id, "order" => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            ListModel::where('imdbId', $id)->delete();
        } catch (Exception $e) {
            dd($e->getMessage());
        }

        return redirect()->back()->with('message', 'Deleted from List');
    }
}
