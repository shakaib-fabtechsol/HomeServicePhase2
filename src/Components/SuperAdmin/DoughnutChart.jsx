import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "75%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function DoughnutChart({ chartData }) {
  return (
    <div>
      <div className="max-w-[200px] mx-auto">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className="mt-3 flex flex-col gap-1">
        {chartData.labels.map((label, index) => (
          <div key={index} className="flex items-center gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <div
                className="size-2 rounded-full"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              ></div>
              <p className="text-xs">{label}</p>
            </div>
            <p className="text-xs">{chartData.datasets[0].data[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
