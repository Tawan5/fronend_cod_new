@extends('layout')
@section('title')
    หน้าแสดงผล
@endsection
@section('content')
    <div class="container mt-3 w-100">
        <ul class="nav border border-1 shadow-sm rounded-3 fs-3 mb-3 d-flex align-items-center">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="{{ route('welcome') }}">
                    <i class="bi bi-arrow-left-circle-fill text-dark"></i>
                </a>
            </li>
            <li class="nav-item d-flex align-items-center">
                <p class="mb-0">หน้าแสดงการทำงาน</p>
            </li>
        </ul>
        <div>
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            สถานะโดยรวม
                        </div>
                    </div>
                    <div class="w-100">
                        <div class="position-relative" style="aspect-ratio: 16/9;">
                            <canvas id="allStatusChart" class="position-absolute top-0 start-0 w-100 h-100"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 g-2 mt-2">
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        น้ำหนัก
                        <i class="bi bi-train-lightrail-front-fill"></i>
                        <div class="w-100">
                            <div class="position-relative" style="aspect-ratio: 16/6;">
                                <canvas id="weightChart" class="position-absolute top-0 start-0 w-100 h-100"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">{{-- ควบการทำงาน --}}
                <div class="card h-100 shadow-sm p-2">
                    <div class="card-body bg-primary border rounded mb-3">
                        <div class="text-strat">
                            <div class="fw-bold text-light fs-5">
                                <i class="bi bi-calendar3 text-light"></i> <span id="current-date"></span>
                            </div>
                            <div class="fw-bold fs-4 text-light">
                                <i class="bi bi-clock text-light"></i> <span id="current-time"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col text-start">
                            <span>สถานะการทำงาน</span>
                        </div>
                        <div class="col text-end">
                            <span>กำลังทำงาน</span>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col text-start">
                            <label class="form-label">เปิดปิดการทำงาน</label>
                        </div>
                        <div class="col text-end">
                            <div class="form-check form-switch d-inline-block">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                                    checked>
                            </div>
                        </div>
                    </div>
                    {{-- ระยะเวลาแสดงผล --}}
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="hour" id="hour30" autocomplete="off" checked>
                        <label class="btn btn-outline-primary" for="hour30">30 นาที</label>

                        <input type="radio" class="btn-check" name="hour" id="hour1" autocomplete="off">
                        <label class="btn btn-outline-primary" for="hour1">1 ชม.</label>

                        <input type="radio" class="btn-check" name="hour" id="hour2" autocomplete="off">
                        <label class="btn btn-outline-primary" for="hour2">2 ชม.</label>

                        <input type="radio" class="btn-check" name="hour" id="hour6" autocomplete="off">
                        <label class="btn btn-outline-primary" for="hour6">6 ชม.</label>
                    </div>
                    <div class="btn-group mt-2" role="group" aria-label="Basic radio toggle button group">
                        <a href="{{ route('download-csv') }}" class="btn btn-primary">บันทึก CSV</a>
                        <a href="{{ route('history') }}" type="button" class="btn btn-primary">ข้อมูลย้อนหลัง</a>
                        <a href="{{ route('setting') }}" type="button" class="btn btn-primary">การตั้งค่า</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-2 mt-2">
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <p>อุณหภูมิ</p>
                        <i class="bi bi-thermometer-sun"></i>
                        <div class="w-100">
                            <div class="position-relative" style="aspect-ratio: 16/6;">
                                <canvas id="tempChart" class="position-absolute top-0 start-0 w-100 h-100"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <p>ความชื้นสัมพัทธ์</p>
                        <i class="bi bi-droplet-half"></i>
                        <div class="w-100">
                            <div class="position-relative" style="aspect-ratio: 16/6;">
                                <canvas id="humidityChart" class="position-absolute top-0 start-0 w-100 h-100"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <p>ความเข้มแสง</p>
                        <i class="bi bi-brightness-high-fill"></i>
                        <div class="w-100">
                            <div class="position-relative" style="aspect-ratio: 16/6;">
                                <canvas id="lightChart" class="position-absolute top-0 start-0 w-100 h-100"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- โหลด Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- โหลดไฟล์ display.js -->
    <script src="{{ asset('js/display.js') }}"></script>
@endsection
