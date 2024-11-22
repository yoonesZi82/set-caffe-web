"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
  datasets: [
    {
      label: "فروش اخیر",
      data: [
        65000, 59000, 80000, 81000, 56000, 55000, 12000, 20000, 30000, 40000,
        50000, 60000,
      ],
      fill: false,
      backgroundColor: "#4b382a",
      borderColor: "#4b382a",
      pointBackgroundColor: "#d2b48c",
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "داده‌های فروش",
      color: "#4b382a",
      font: {
        size: 20,
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        title: (tooltipItems) => tooltipItems[0].label,
        label: (tooltipItem) =>
          `${
            tooltipItem.dataset.label
          }: ${tooltipItem.raw.toLocaleString()} تومان`,
      },
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 14,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "#4b382a",
      },
      ticks: {
        color: "#4b382a",
        font: {
          size: 14,
        },
      },
    },
    y: {
      grid: {
        color: "#4b382a",
      },
      ticks: {
        color: "#4b382a",
        font: {
          size: 14,
        },
      },
    },
  },
};

const SaleChart = () => {
  return <Line data={data} options={options} />;
};

export default SaleChart;
