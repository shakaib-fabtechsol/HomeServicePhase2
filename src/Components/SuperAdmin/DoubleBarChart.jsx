import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DoubleBarChart({ labels, Values }) {
  const maxValue = Math.max(...Values);
  const maxYAxis = maxValue * 1.2;

  const numBars = Values.length;
  const minWidth = `${30 * numBars}px`;

  const productBData = Values.map((value) => maxYAxis - value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Product A",
        data: Values,
        backgroundColor: "#0F91D2",
        barThickness: 20,
      },
      {
        label: "Product B",
        data: productBData,
        backgroundColor: "#EEF0FA",
        barThickness: 20,
        borderRadius: { topLeft: 999, topRight: 999 },
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
    },
    scales: {
      x: {
        border: { display: false },
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        border: { display: false },
        stacked: true,
        beginAtZero: true,
        max: maxYAxis,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      className="w-[99%] h-[300px]"
      style={{
        minWidth: minWidth,
      }}
    >
      <Bar data={data} width={"100%"} options={options} />
    </div>
  );
}
