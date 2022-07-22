
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