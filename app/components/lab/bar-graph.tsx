"use client"
import { Chart, ChartOptions, ChartData, registerables } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

interface BarGraphProps {
    labels: string[];
    values: number[];
}

export const BarGraph = (props: BarGraphProps) => {
    const { labels, values } = props;

    const data: ChartData<'bar'> = {
        labels: labels,
        datasets: [
            {
                data: values,
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
    <div className="card mt-4 bg-base-100 shadow-xl flex-grow">
      <div className="card-body">
      <Bar data={data} options={options} />
      </div>
    </div>
  );
}
