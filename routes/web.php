<?php

use Illuminate\Support\Facades\Route;
use App\Models\Esp32Data;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\HistoryController;

Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');

Route::get('setting', function () {
    return view('setting');
})->name('setting');

Route::get('login', function () {
    return view('login');
})->name('login');

Route::get('/display', function () {
    return view('display');
})->name('display');

// Route::get('/get-esp32-data', function () {
//     return response()->json(Esp32Data::latest()->take(100)->get());
// })->name('get-esp32-data');

Route::get('/get-esp32-data', function (Request $request) {
    $limit = $request->query('limit', 100); // ดึงค่าจาก URL ถ้าไม่มีให้ใช้ 100
    return response()->json(Esp32Data::latest()->take($limit)->get());
})->name('get-esp32-data');


Route::get('/history', function () {
    return view('history'); // ชี้ไปที่ไฟล์ resources/views/history.blade.php
})->name('history');

Route::get('/user-page', function () {
    return view('user-page');
})->name('user-page');

Route::fallback(function(){
    return"ไม่พบหน้าเว็บ";
});

//------------------------------------- esp32 controller -------------------------------------

// เส้นทางหลัก
Route::get('/', function () {
    $data = Esp32Data::latest()->take(100)->get(); // ดึงข้อมูล 10 รายการล่าสุด
    return view('welcome', ['data' => $data]);
})->name('home');

// เส้นทางสำหรับ esp32-data
Route::get('/esp32-data', function () {
    $data = Esp32Data::latest()->take(100)->get(); // ดึงข้อมูล 10 รายการล่าสุด
    return view('esp32-data', ['data' => $data]);
})->name('esp32-data');

Route::get('/history', [HistoryController::class, 'index'])->name('history');

//------------------------------------- ดาวน์โหลดข้อมูลเป็นไฟล์ CSV -------------------------------------

Route::get('/download-csv', function () {
    $data = Esp32Data::all(); // ดึงข้อมูลทั้งหมด

    $filename = "esp32_data_" . now()->format('Y-m-d_H-i-s') . ".csv";
    $handle = fopen('php://temp', 'w');

    // หัวข้อคอลัมน์
    fputcsv($handle, ['ID', 'Temperature', 'Humidity', 'LightIntensity', 'Weight', 'Created At']);

    // ข้อมูลจากฐานข้อมูล
    foreach ($data as $row) {
        fputcsv($handle, [
            $row->id,
            $row->temperature,
            $row->humidity,
            $row->LightIntensity,
            $row->weight,
            $row->created_at,
        ]);
    }

    rewind($handle);
    $csv = stream_get_contents($handle);
    fclose($handle);

    return Response::make($csv, 200, [
        'Content-Type' => 'text/csv',
        'Content-Disposition' => 'attachment; filename="' . $filename . '"',
    ]);
})->name('download-csv');