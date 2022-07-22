// Default Color Table
const chartOpts = [
    {
        data: [],
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, 1)',
        borderWidth: 2,
        fill: false
    },
    {
        data: [],
        backgroundColor: 'rgba(0, 137, 132, .2)',
        borderColor: 'rgba(0, 10, 130, 1)',
        borderWidth: 2,
        fill: false
    },
    {
        data: [],
        backgroundColor: 'rgba(0,250,220,0.2)',
        borderColor: 'rgba(0, 213, 132, 1)',
        borderWidth: 2,
        fill: false
    },
    {
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: false
    },
    {
        data: [],
        backgroundColor: 'rgba(0, 250, 220, .1)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
        fill: false
    }]

function registerChart() {
    //Register chart to display if no data are present
    Chart.plugins.register({
        afterDraw: function (chart) {
            if (chart.data.datasets.length === 0) {
                var ctx = chart.chart.ctx;
                var width = chart.chart.width;
                var height = chart.chart.height;
                chart.clear();

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = "16px normal 'Helvetica Nueue'";
                ctx.fillText('No data to display', width / 2, height / 2);
                ctx.restore();
            }
        }
    });

}

function drawLineChart(elementId, labels, data) {

    const ctx = document.getElementById(elementId).getContext('2d');


    // draw empty chart
    let config = {
        type: 'line',
        data: {
            datasets: []
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (YYYY-MM)'
                    },
                    type: "time",
                    time: {
                        unit: 'hour',
                        round: 'hour',
                        displayFormats: {
                            minute: 'YYYY-MM-DD HH:mm:ss',
                            hour: 'YYYY-MM-DD HH:mm:ss',
                            day: 'YYYY-MM-DD',
                            month: 'YYYY-MM'
                        }
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage (%)'
                    },
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: "x",
                        speed: 100,
                        threshold: 100
                    },
                    zoom: {
                        enabled: true,
                        drag: false,
                        mode: "x",
                        limits: {
                            max: 10,
                            min: 0.5
                        }
                    }
                }
            }
        },
    }


//Add labels to chart
    labels.forEach(function (label, i) {
        console.log(label)

        //Add options and labels
        config.data.datasets.push(JSON.parse(JSON.stringify(chartOpts[i])));
        config.data.datasets[i].label = label;

        //Filter data by label
        let filterData = data.filter(function (el) {
            return el.label === label;
        });

        //Add data to chart under label
        filterData.forEach(function (datapoint) {

            chart.data.datasets[i].data.push({
                x: moment(datapoint.timestamp).format("YYYY-MM-DDTHH:mm:ssZ"),
                y: parseFloat(datapoint.value)
            });
        });
    });

//Draw Chart
    console.log("**********Chart Created**********");
    return new Chart(ctx, config);

}

function updateLineChart(chart, labels, data) {

    //Clear Chart
    chart.data.datasets = [];

    //Add labels to chart
    labels.forEach(function (label, i) {
        console.log(label)
        console.log(i)

        //Add options and labels
        chart.data.datasets.push(JSON.parse(JSON.stringify(chartOpts[i])));
        chart.data.datasets[i].label = label;

        //Filter data by label
        let filterData = data.filter(function (el) {
            return el.meter_id === label;
        });
        console.log('asddddddddddddddddddddd');
        console.log(filterData);
        console.log(console.log(chart.data.datasets[i]));

        //Add data to chart under label
        filterData.forEach(function (datapoint) {

            chart.data.datasets[i].data.push({
                x: moment(datapoint.timestamp).format("YYYY-MM-DDTHH:mm:ssZ"),
                y: parseFloat(datapoint.value)
            });
        });
    });

    //Update Chart
    chart.update();
    console.log("**********Chart Updated**********");

    return chart;
}

function changeType(chart, ctx, type) {

    //copy config and data
    // let configure = chart.config;
    // let dataSet = chart.data;
    //
    // chart.destroy();
    //
    // chart = new Chart(ctx, configure);
    //
    // chart.data = dataSet;
    chart.config.type = type;

    chart.update();

}

