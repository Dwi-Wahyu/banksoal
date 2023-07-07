const departemen = [
    "Biologi Oral",
    "Biomedik",
    "Dental Material",
    "Ilmu Bedah Mulut dan Maksilofasial (Oraland Maxillofacial Surgery)",
    "Ilmu Kedokteran Gigi Anak (Pediatric Dentistry)",
    "Ilmu Kedokteran Gigi dan Mulut Masyarakat",
    "Ilmu Kedokteran Gigi Interdisiplin",
    "Ilmu Konservasi Gigi",
    "Ilmu Penyakit Mulut (Oral Medicine)",
    "Orthodonsia (Orthodontics)",
    "Patologi Mulut dan Maksilofasial",
    "Periodonsia (Periodontics)",
    "Prostodonsia (Prosthodontics)",
    "Radiologi Kedokteran Gigi (Oral and Maxillofacial Radiology)",
];
document.addEventListener("DOMContentLoaded", () => {
    echarts.init(document.querySelector("#verticalBarChart")).setOption({
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {},
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
        },
        yAxis: {
            type: "category",
            data: departemen,
        },
        series: [
            {
                type: "bar",
                data: [
                    32, 23, 132, 78, 312, 203, 401, 431, 30, 23, 23, 2, 32, 32,
                ],
            },
        ],
    });
});
