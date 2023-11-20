import { Chart, ChartOptions, ChartData, registerables } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

interface TestPickerProps {
    max: number;
    weight: number;
    attempts: number;
}

const TestPicker = (props: TestPickerProps) => {
    const { max, weight, attempts } = props;
    const pickedArray: number[] = [];
    pickedArray.length = max;
    pickedArray.fill(0); 

    for (let i = 0; i < attempts; i++) {
        const picked = weightedRandomPicker(max, weight);
        pickedArray[picked]++;
    }

    const data: ChartData<'bar'> = {
        labels: Array.from({ length: max }, (_, i) => i),
        datasets: [
            {
                data: pickedArray,
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

const weightedRandomPicker = (max: number, weight: number) => {
    const randomNumber = Math.random() ** weight;
    return Math.floor(randomNumber * (max + 1));
}

const TestPickerPage = () => {
    return (
        <div>
            <TestPicker max={100} weight={2} attempts={10000} />
        </div>
    )
}

export default TestPickerPage;