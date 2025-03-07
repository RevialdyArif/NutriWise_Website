"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const AnalyticsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          data: ["M", "T", "W", "T", "F", "S", "S"],
          axisTick: { show: false },
          axisLine: { lineStyle: { color: "#ddd" } },
          axisLabel: { color: "#444", fontSize: 12, fontWeight: "bold" },
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLabel: { color: "#444", fontSize: 12 },
        },
        grid: { left: "5%", right: "5%", top: "10%", bottom: "10%" },
        series: [
          {
            name: "Max Calories",
            type: "bar",
            data: [2500, 2500, 2500, 2500, 2500, 2500, 2500],
            barWidth: 25,
            itemStyle: { color: "#e0e0e0" },
            emphasis: { focus: "none" },
          },
          {
            name: "Calories Consumed",
            type: "bar",
            data: [1800, 1200, 1800, 1500, 1700, 1900, 2000],
            barWidth: 25,
            itemStyle: { color: "#16A34A", borderRadius: [6, 6, 0, 0] },
          },
        ],
      };

      chart.setOption(option);
      window.addEventListener("resize", chart.resize);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", chart.resize);
      };
    }
  }, []);

  return (
    <div className="w-full max-w-5xl p-4 md:p-8 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Daily Nutrition Overview
      </h2>

      {/* Chart */}
      <div ref={chartRef} className="w-full h-60 md:h-80 mt-4"></div>

      {/* Nutritional Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-6">
        <div className="p-4 bg-green-100 text-green-700 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">Calories Consumed</p>
          <p className="text-2xl font-bold">1869 kcal</p>
        </div>
        <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">Calories Remaining</p>
          <p className="text-2xl font-bold">465 kcal</p>
        </div>
        <div className="p-4 bg-blue-100 text-blue-700 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">Daily Goal</p>
          <p className="text-2xl font-bold">2500 kcal</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="mt-6">
        {/* Protein */}
        <div className="flex justify-between items-center">
          <p className="text-base md:text-lg font-medium">Protein</p>
          <p className="text-xs md:text-sm text-gray-600">46/128g</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3 md:h-4">
          <div className="bg-green-500 h-3 md:h-4 rounded-full" style={{ width: "36%" }}></div>
        </div>

        {/* Carbs */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-base md:text-lg font-medium">Carbs</p>
          <p className="text-xs md:text-sm text-gray-600">34/203g</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3 md:h-4">
          <div className="bg-blue-500 h-3 md:h-4 rounded-full" style={{ width: "20%" }}></div>
        </div>

        {/* Fat */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-base md:text-lg font-medium">Fat</p>
          <p className="text-xs md:text-sm text-gray-600">58/74g</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3 md:h-4">
          <div className="bg-yellow-500 h-3 md:h-4 rounded-full" style={{ width: "70%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
