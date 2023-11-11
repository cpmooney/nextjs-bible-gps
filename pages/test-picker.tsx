import { Chart, ChartOptions, ChartData, registerables } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

const TestPicker = () => {
    const data: ChartData<'bar'> = {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [
            {
                data: [10, 20, 30, 80],
            }
        ]
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                beginAtZero: true
            }
        }
     };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TestPicker