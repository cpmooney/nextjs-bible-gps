import React from "react";
import { Bar, ChartProps } from "react-chartjs-2";

interface Props {
  data: number[];
}

interface Counts {
    [key: string]: number;
}

const Chart: React.FC<Props> = ({ data }) => {
  const counts: Counts = {};
  data.forEach((num) => {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  });

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Count",
        data: Object.values(counts),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default Chart;