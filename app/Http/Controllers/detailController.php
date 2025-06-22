<?php

namespace App\Http\Controllers;

use App\Models\API;
use Inertia\Inertia;
use App\Models\ListModel;
use Exception;
use Illuminate\Http\Request;

class detailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->input("keywords") ? $keywords = $request->input("keywords") : $keywords = "Spice and Wolf");

        // get request ke API situs https://imdb.iamidiotareyoutoo.com/// 
        $data = API::index($keywords);

        return Inertia::render('Search', ['rawData' => $data]);
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
    public function store()
    {
        // pake session 
        $data = session("temp_data");
        $data['genre'] = json_encode(($data['genre']));
        $data['images'] = json_encode(($data['images']));
        $data['videos'] = json_encode(($data['videos']));

        ListModel::create($data);

        return redirect()->back()->with('message', 'Saved');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $check_db = ListModel::where('imdbId', $id)->first();

            // jika tak ada hasil nuil
            if ($check_db) {
                $data = $check_db;

                $data["genre"] = json_decode($data["genre"]);
                $data['images'] = json_decode($data['images']);
                $data['videos'] = json_decode($data['videos']);

                $statusButton = "Added";
            } else {
                $data = API::detail($id);
                $statusButton = "Add";
            }
        } catch (Exception $e) {
            dd($e->getMessage());
        }



        // simpen data di session
        session(['temp_data' => $data]);

        return inertia::render('Detail', ['rawData' => $data, 'statusButton' => $statusButton]);
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
    public function update(string $id)
    {
        try {
            $data = API::detail($id);
            $data = ListModel::where("imdbId", $id)->update($data);
        } catch (Exception $e) {
            dd($e->getMessage());
        }

        return redirect()->back()->with('message', 'Updated');
    }

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

        return redirect()->back()->with('message', 'Deleted');
    }
}
