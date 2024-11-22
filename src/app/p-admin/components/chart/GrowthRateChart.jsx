"use client";

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

// ثبت ماژول‌های Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      label: "فروش 2023",
      data: [65000, 59000, 80000, 81000, 56000, 55000, 70000],
      backgroundColor: "#d2b48c",
    },
    {
      label: "فروش 2024",
      data: [70000, 60000, 85000, 90000, 58000, 57000, 72000],
      backgroundColor: "#C29A64",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "مقایسه فروش سالانه",
      color: "#4b382a",
      font: {
        size: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) =>
          `${
            tooltipItem.dataset.label
          }: ${tooltipItem.raw.toLocaleString()} تومان`,
      },
    },
    legend: {
      position: "top",
    },
  },
  scales: {
    x: {
      grid: {
        color: "#4b382a",
      },
      ticks: {
        font: {
          size: 14,
        },
        color: "#4b382a",
      },
    },
    y: {
      grid: {
        color: "#4b382a",
      },
      title: {
        display: true,
        text: "میزان فروش (تومان)",
        color: "#4b382a",
        font: {
          size: 16,
        },
      },
      ticks: {
        font: {
          size: 14,
        },
        color: "#4b382a",
        callback: (value) => `${value.toLocaleString()} تومان`,
      },
    },
  },
};

const GrowthRateChart = () => {
  return <Bar data={data} options={options} />;
};

export default GrowthRateChart;
