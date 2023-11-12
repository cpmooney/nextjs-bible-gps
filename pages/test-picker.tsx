import { Chart, ChartOptions, ChartData, registerables } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

interface TestPickerProps {
    data: number[]
}

const TestPicker = (props: TestPickerProps) => {
    const data: ChartData<'bar'> = {
        labels: props.data,
        datasets: [
            {
                data: props.data,
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

const TestPickerPage = () => {
    const data = Array.from({ length: 100 }, (_, i) => i + 1);
    return (
        <div>
            <TestPicker data={data} />
        </div>
    )
}

export default TestPickerPage;