const departemen = [
    "Departemen Ilmu Penyakit Dalam",
    "Departemen Ilmu Kedokteran Jiwa",
    "Departemen Ilmu Kesehatan Kulit dan Kelamin",
    "Departemen Anatomi",
    "Departemen Radiologi",
    "Departemen Ilmu Penyakit Mata",
    "Departemen Biokimia",
    "Departemen Kardiologi",
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
                data: [32, 23, 132, 78, 312, 203, 401, 431],
            },
        ],
    });
});
