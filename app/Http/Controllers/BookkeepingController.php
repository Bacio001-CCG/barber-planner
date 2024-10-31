<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\BookkeepingRequest;

class BookkeepingController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Bookkeeping');
    }

    public function store(BookkeepingRequest $request)
    {
        throw new \Exception('Method not implemented');
    }

    public function update(BookkeepingRequest $request, $id)
    {
        throw new \Exception('Method not implemented');
    }

    public function destroy($id)
    {
        throw new \Exception('Method not implemented');
    }
}
