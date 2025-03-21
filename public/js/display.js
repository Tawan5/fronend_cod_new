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

// ฟังก์ชันสำหรับอัปเดตกราฟ
async function fetchData() {
    const response = await fetch("/get-esp32-data");
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
        console.log("❌ ไม่มีข้อมูลจากเซ็นเซอร์");
        return;
    }

    const labels = data.map((item) =>
        new Date(item.created_at).toLocaleTimeString()
    );
    const temperatures = data.map((item) => item.temperature);
    const humidities = data.map((item) => item.humidity);
    const lightIntensities = data.map((item) => item.LightIntensity);
    const weights = data.map((item) => item.weight);

    updateChart(tempChart, [...labels].reverse(), [...temperatures].reverse());
    updateChart(humidityChart, labels, humidities);
    updateChart(
        lightChart,
        [...labels].reverse(),
        [...lightIntensities].reverse()
    );
    updateChart(weightChart, labels, weights);
    updateAllStatusChart(
        labels,
        temperatures,
        humidities,
        lightIntensities,
        weights
    );
}

function updateChart(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

function updateAllStatusChart(labels, temp, hum, light, weight) {
    labels.reverse();
    allStatusChart.data.labels = labels;
    allStatusChart.data.datasets[0].data = temp;
    allStatusChart.data.datasets[1].data = hum;
    allStatusChart.data.datasets[2].data = light;
    allStatusChart.data.datasets[3].data = weight;
    allStatusChart.update();
}

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
                    fill: false,
                },
            ],
        },
        options: {
            responsive: false,
            scales: {
                x: {
                    reverse: true,
                },
            },
        },
    });
};

const tempChart = createChart("tempChart", "อุณหภูมิ (°C)", "red");
const humidityChart = createChart("humidityChart", "ความชื้น (%)", "blue");
const lightChart = createChart("lightChart", "ความเข้มแสง", "yellow");
const weightChart = createChart("weightChart", "น้ำหนัก (g)", "cyan");

const allStatusChart = new Chart(
    document.getElementById("allStatusChart").getContext("2d"),
    {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "อุณหภูมิ (°C)",
                    borderColor: "red",
                    data: [],
                },
                {
                    label: "ความชื้น (%)",
                    borderColor: "blue",
                    data: [],
                },
                {
                    label: "ความเข้มแสง",
                    borderColor: "yellow",
                    data: [],
                },
                {
                    label: "น้ำหนัก (g)",
                    borderColor: "cyan",
                    data: [],
                },
            ],
        },
        options: {
            responsive: true,
        },
    }
);

setInterval(fetchData, 5000);
