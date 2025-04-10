<?php

namespace App\Http\Controllers;

use App\Models\Esp32Data;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        $data = Esp32Data::orderBy('created_at', 'asc')->take(50)->get();

        return view('history', [
            'labels' => $data->pluck('created_at')->map(fn($d) => $d->format('H:i')),
            'temperature' => $data->pluck('temperature'),
            'humidity' => $data->pluck('humidity'),
            'weight' => $data->pluck('weight'),
            'light' => $data->pluck('LightIntensity'),
        ]);
    }
}
