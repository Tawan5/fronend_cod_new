// // history.js
// document.addEventListener("DOMContentLoaded", function() {
//     const { labels, temperature, humidity, weight, light } = window.historyData;

//     // ฟังก์ชันสำหรับสร้างกราฟ
//     const createChart = (elementId, label, data, yAxisLabel) => {
//         new Chart(document.getElementById(elementId).getContext('2d'), {
//             type: 'line',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: label,
//                     data: data,
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                     tension: 0.3,
//                     fill: true
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         display: true,
//                         position: 'top'
//                     }
//                 },
//                 scales: {
//                     y: {
//                         title: {
//                             display: true,
//                             text: yAxisLabel
//                         },
//                         beginAtZero: false
//                     }
//                 }
//             }
//         });
//     };

//     // สร้างกราฟทั้งหมด
//     createChart('weightChart', 'น้ำหนัก (g)', weight, 'น้ำหนัก (g)');
//     createChart('tempChart', 'อุณหภูมิ (°C)', temperature, 'อุณหภูมิ (°C)');
//     createChart('humidityChart', 'ความชื้น (%)', humidity, 'ความชื้น (%)');
//     createChart('lightChart', 'แสง (Lux)', light, 'แสง (Lux)');
// });

// history.js
document.addEventListener("DOMContentLoaded", function () {
    const { labels, temperature, humidity, weight, light } = window.historyData;

    // ฟังก์ชันสำหรับสร้างกราฟ
    const createChart = (elementId, label, data, yAxisLabel, borderColor, backgroundColor) => {
        new Chart(document.getElementById(elementId).getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: yAxisLabel
                        },
                        beginAtZero: false
                    }
                }
            }
        });
    };

    // สร้างกราฟทั้งหมด พร้อมกำหนดสี
    createChart('weightChart', 'น้ำหนัก (g)', weight, 'น้ำหนัก (g)', 'rgb(76, 210, 255)', 'rgba(0, 191, 255, 0.2)'); // สีฟ้า
    createChart('tempChart', 'อุณหภูมิ (°C)', temperature, 'อุณหภูมิ (°C)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 0.2)'); // สีแดง
    createChart('humidityChart', 'ความชื้น (%)', humidity, 'ความชื้น (%)', 'rgb(18, 46, 202)', 'rgba(54, 162, 235, 0.2)'); // สีน้ำเงิน
    createChart('lightChart', 'แสง (Lux)', light, 'แสง (Lux)', 'rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 0.2)'); // สีเหลือง
});
