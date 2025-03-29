// // นาฬิกา
// function updateDateTime() {
//     const now = new Date();

//     const dateOptions = {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         weekday: "long",
//     };
//     const dateString = now.toLocaleDateString("th-TH", dateOptions);

//     const timeString = now.toLocaleTimeString("th-TH", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//     });

//     document.getElementById("current-date").textContent = dateString;
//     document.getElementById("current-time").textContent = timeString;
// }

// setInterval(updateDateTime, 1000);
// updateDateTime();

// // ฟังก์ชันสำหรับอัปเดตกราฟ
// async function fetchData() {
//     const response = await fetch("/get-esp32-data");
//     const data = await response.json();

//     if (!Array.isArray(data) || data.length === 0) {
//         console.log("❌ ไม่มีข้อมูลจากเซ็นเซอร์");
//         return;
//     }

//     // เรียงข้อมูลตามเวลา (เก่าสุด -> ใหม่สุด)
//     data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//     // ตัดวินาทีออกจากเวลา
//     const labels = data.map((item) =>
//         new Date(item.created_at).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
//     );

//     const temperatures = data.map((item) => item.temperature);
//     const humidities = data.map((item) => item.humidity);
//     const lightIntensities = data.map((item) => item.LightIntensity);
//     const weights = data.map((item) => item.weight);

//     updateChart(tempChart, labels, temperatures);
//     updateChart(humidityChart, labels, humidities);
//     updateChart(lightChart, labels, lightIntensities);
//     updateChart(weightChart, labels, weights);
//     updateAllStatusChart(labels, temperatures, humidities, lightIntensities, weights);
// }

// function updateChart(chart, labels, data) {
//     chart.data.labels = labels;
//     chart.data.datasets[0].data = data;
//     chart.update();
// }

// const updateAllStatusChart = (labels, temperatures, humidities, lightIntensities, weights) => {
//     allStatusChart.data.labels = labels;
//     allStatusChart.data.datasets[0].data = temperatures;
//     allStatusChart.data.datasets[1].data = humidities;
//     allStatusChart.data.datasets[2].data = lightIntensities;
//     allStatusChart.data.datasets[3].data = weights;
//     allStatusChart.update();
// };

// const createChart = (id, label, color) => {
//     return new Chart(document.getElementById(id).getContext("2d"), {
//         type: "line",
//         data: {
//             labels: [],
//             datasets: [
//                 {
//                     label,
//                     data: [],
//                     borderColor: color,
//                     fill: true,
//                     tension: 0.3, // เพิ่มความโค้งของเส้นกราฟ
//                     pointRadius: 1,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: "เวลา",
//                     },
//                     reverse: false, // กำหนดให้แกน x ไล่จากซ้ายไปขวา
//                 },
//                 y: {
//                     title: {
//                         display: true,
//                         text: label,
//                     },
//                 },
//             },
//         },
//     });
// };

// const tempChart = createChart("tempChart", "อุณหภูมิ (°C)", "red");
// const humidityChart = createChart("humidityChart", "ความชื้น (%)", "blue");
// const lightChart = createChart("lightChart", "ความเข้มแสง", "yellow");
// const weightChart = createChart("weightChart", "น้ำหนัก (g)", "cyan");

// const allStatusChart = new Chart(document.getElementById("allStatusChart").getContext("2d"), {
//     type: "line",
//     data: {
//         labels: [],
//         datasets: [
//             { label: "อุณหภูมิ (°C)", data: [], borderColor: "red", fill: false },
//             { label: "ความชื้น (%)", data: [], borderColor: "blue", fill: false },
//             { label: "ความเข้มแสง (lux)", data: [], borderColor: "yellow", fill: false },
//             { label: "น้ำหนัก (g)", data: [], borderColor: "green", fill: false },
//         ],
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 title: { display: true, text: "เวลา" },
//                 ticks: { autoSkip: true, maxTicksLimit: 100 }, // ปรับให้ไม่แสดงทุกค่าป้องกันความหนาแน่นเกินไป
//             },
//             y: {
//                 title: { display: true, text: "ค่าเซ็นเซอร์" },
//             },
//         },
//     },
// });

// setInterval(fetchData, 5000);

// นาฬิกา
function updateDateTime() {
    const now = new Date();
    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    };
    const dateString = now.toLocaleDateString("th-TH", dateOptions);
    const timeString = now.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    document.getElementById("current-date").textContent = dateString;
    document.getElementById("current-time").textContent = timeString;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ฟังก์ชันสำหรับดึงข้อมูลเซ็นเซอร์
async function fetchData(limit = 100) {
    try {
        const response = await fetch(`/get-esp32-data?limit=${limit}`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            console.log("❌ ไม่มีข้อมูลจากเซ็นเซอร์");
            return;
        }

        // เรียงข้อมูลตามเวลา (เก่าสุด -> ใหม่สุด)
        data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        // ตัดวินาทีออกจากเวลา
        const labels = data.map((item) =>
            new Date(item.created_at).toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );

        const temperatures = data.map((item) => item.temperature);
        const humidities = data.map((item) => item.humidity);
        const lightIntensities = data.map((item) => item.LightIntensity);
        const weights = data.map((item) => item.weight);

        updateChart(tempChart, labels, temperatures);
        updateChart(humidityChart, labels, humidities);
        updateChart(lightChart, labels, lightIntensities);
        updateChart(weightChart, labels, weights);
        updateAllStatusChart(
            labels,
            temperatures,
            humidities,
            lightIntensities,
            weights
        );
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
    }
}

// ฟังก์ชันอัปเดตกราฟ
function updateChart(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

// อัปเดตกราฟทั้งหมด
const updateAllStatusChart = (
    labels,
    temperatures,
    humidities,
    lightIntensities,
    weights
) => {
    allStatusChart.data.labels = labels;
    allStatusChart.data.datasets[0].data = temperatures;
    allStatusChart.data.datasets[1].data = humidities;
    allStatusChart.data.datasets[2].data = lightIntensities;
    allStatusChart.data.datasets[3].data = weights;
    allStatusChart.update();
};

// ฟังก์ชันสร้างกราฟ
const createChart = (id, label, color) => {
    return new Chart(document.getElementById(id).getContext("2d"), {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label,
                    data: [],
                    borderColor: color,
                    fill: true,
                    tension: 0.3, // เพิ่มความโค้งของเส้นกราฟ
                    pointRadius: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: "เวลา" },
                    reverse: false, // กำหนดให้แกน x ไล่จากซ้ายไปขวา
                },
                y: {
                    title: { display: true, text: label },
                },
            },
        },
    });
};

// สร้างกราฟแต่ละตัว
const tempChart = createChart("tempChart", "อุณหภูมิ (°C)", "red");
const humidityChart = createChart("humidityChart", "ความชื้น (%)", "blue");
const lightChart = createChart("lightChart", "ความเข้มแสง", "yellow");
const weightChart = createChart("weightChart", "น้ำหนัก (g)", "cyan");

// กราฟรวมทุกค่า
const allStatusChart = new Chart(
    document.getElementById("allStatusChart").getContext("2d"),
    {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "อุณหภูมิ (°C)",
                    data: [],
                    borderColor: "red",
                    fill: false,
                },
                {
                    label: "ความชื้น (%)",
                    data: [],
                    borderColor: "blue",
                    fill: false,
                },
                {
                    label: "ความเข้มแสง (lux)",
                    data: [],
                    borderColor: "yellow",
                    fill: false,
                },
                {
                    label: "น้ำหนัก (g)",
                    data: [],
                    borderColor: "green",
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: "เวลา" },
                    ticks: { autoSkip: true, maxTicksLimit: 100 },
                },
                y: {
                    title: { display: true, text: "ค่าเซ็นเซอร์" },
                },
            },
        },
    }
);

// ฟังก์ชันเมื่อเปลี่ยนช่วงเวลา
document.getElementById("timeRange").addEventListener("change", function () {
    const selectedValue = this.value;
    console.log(`📡 ดึงข้อมูล ${selectedValue} ค่า`);
    fetchData(selectedValue);
});

// อัปเดตข้อมูลทุก 5 วินาที (ค่าเริ่มต้นใช้ 100 ค่า)
setInterval(() => {
    const selectedValue = document.getElementById("timeRange").value || 100;
    fetchData(selectedValue);
}, 5000);

// โหลดข้อมูลครั้งแรก
fetchData(100);
