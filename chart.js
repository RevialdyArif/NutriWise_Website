"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as echarts from "echarts";
import AddFoodForm from "@/components/AddFoodForm";
import { toast } from "sonner";

const InfoCard = ({ label, value, bgColor, textColor }) => (
  <div className={`p-4 ${bgColor} ${textColor} rounded-lg shadow-md text-center`}>
    <p className="text-lg font-semibold">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Progress = ({ label, value, max, color }) => (
  <div className="mt-3">
    <div className="flex justify-between items-center">
      <p className="text-base md:text-lg font-medium">{label}</p>
      <p className="text-xs md:text-sm text-gray-600">
        {value}/{max}g
      </p>
    </div>
    <div className="w-full bg-gray-300 rounded-full h-3 md:h-4">
      <div
        className={`${color} h-3 md:h-4 rounded-full`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      ></div>
    </div>
  </div>
);

const getWeekDates = (currentDate = new Date()) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDay = currentDate.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const mondayDate = new Date(currentDate);
  mondayDate.setDate(mondayDate.getDate() + mondayOffset);

  return days.map((_, index) => {
    const date = new Date(mondayDate);
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  });
}

const AnalyticsChart = () => {
  const chartRef = useRef(null);

  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [dailyData, setDailyData] = useState([]);

  const weekDates = useMemo(() => getWeekDates(), []);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch("/api/meals");
        if (!res.ok) return;
        const meals = await res.json();

        const todayDate = new Date().toISOString().split("T")[0];
        const todayMeals = meals.filter(
          (meal) =>
            meal.createdAt &&
            new Date(meal.createdAt).toISOString().split("T")[0] === todayDate
        );

        const totalProtein = todayMeals.reduce(
          (sum, meal) => sum + meal.protein,
          0
        );
        const totalCarbs = todayMeals.reduce(
          (sum, meal) => sum + meal.carbs,
          0
        );
        const totalFat = todayMeals.reduce(
          (sum, meal) => sum + meal.fat,
          0
        );
        const totalCalories = todayMeals.reduce(
          (sum, meal) => sum + meal.calories,
          0
        );

        setTotalCalories(totalCalories);
        setTotalProtein(totalProtein);
        setTotalCarbs(totalCarbs);
        setTotalFat(totalFat);
        setFoods(meals);

        const mealsByDate = weekDates.reduce((acc, date) => {
          acc[date] = 0;
          return acc;
        }, []);

        meals.forEach((meal) => {
          if (meal.createdAt) {
            const mealDate = new Date(meal.createdAt).toISOString().split("T")[0];
            if (mealDate in mealsByDate) {
              mealsByDate[mealDate] += meal.calories;
            }
          }
        });

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const chartData = weekDates.map((date, index) => ({
          day: days[index],
          maxCalories: 2500,
          caloriesConsumed: mealsByDate[date] || 0,
          date,
        }));

        setDailyData(chartData);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to load your meals");
      }
    }

    fetchMeals();
  }, [weekDates]);

  useEffect(() => {
    if (chartRef.current && dailyData.length > 0) {
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
          data: dailyData.map((d) => d.day),
          axisTick: { show: false },
          axisLine: { lineStyle: { color: "#ddd" } },
          axisLabel: { color: "#444", fontSize: 12, fontWeight: "bold" },
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLabel: { color: "#444", fontSize: 12 },
        },
        series: [
          {
            name: "Calories Consumed",
            type: "bar",
            data: dailyData.map((d) => d.caloriesConsumed),
            barWidth: 25,
            itemStyle: { color: "#16a34a" },
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
  }, [dailyData]);

  return (
    <div className="w-full max-w-5xl p-4 md:p-8 bg-white rounded-2xl shadow-lg relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Daily Nutrition Overview
      </h2>

      <div ref={chartRef} className="w-full h-60 md:h-80 mt-4"></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-6">
        <InfoCard
          label="Calories Consumed"
          value={`${totalCalories} kcal`}
          bgColor="bg-green-100"
          textColor="text-green-700"
        />
        <InfoCard
          label="Calories Remaining"
          value={`${2500 - totalCalories} kcal`}
          bgColor="bg-red-100"
          textColor="text-red-700"
        />
        <InfoCard
          label="Daily Goal"
          value="2500 kcal"
          bgColor="bg-blue-100"
          textColor="text-blue-700"
        />
      </div>

      <div className="mt-6">
        <Progress label="Protein" value={totalProtein} max={128} color="bg-green-500" />
        <Progress label="Carbs" value={totalCarbs} max={203} color="bg-blue-500" />
        <Progress label="Fat" value={totalFat} max={74} color="bg-yellow-500" />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Today&apos;s Meals</h3>
        <ul className="mt-2 space-y-2">
          {foods
            .filter(
              (food) =>
                food.createdAt &&
                new Date(food.createdAt).toISOString().split("T")[0] === new Date().toISOString().split("T")[0]
            )
            .map((food) => (
              <li key={food.id} className="border p-3 mb-6 bg-gray-100 rounded-md shadow flex flex-col">
                <div className="font-semibold">
                  {food.name} - {food.calories} Calories
                </div>
                <div className="space-x-2 md:space-x-4 text-sm font-semibold">
                  <span className="text-emerald-600">{food.protein}g Protein</span>
                  <span className="text-sky-600">{food.carbs}g Carbs</span>
                  <span className="text-amber-600">{food.fat}g Fat</span>
                </div>
                {food.createdAt && (
                  <div className="text-xs text-gray-500 mt-1">
                    Added: {new Date(food.createdAt).toLocaleString()}
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      <AddFoodForm
        onFoodAdded={(newFood) => {
          const newFoodDate = new Date(newFood.createdAt).toISOString().split("T")[0];
          const todayDate = new Date().toISOString().split("T")[0];

          if (newFoodDate === todayDate) {
            setFoods((prev) => [...prev, newFood]);
            setTotalCalories((prev) => prev + newFood.calories);
            setTotalProtein((prev) => prev + newFood.protein);
            setTotalCarbs((prev) => prev + newFood.carbs);
            setTotalFat((prev) => prev + newFood.fat);
          } else {
            setFoods((prev) => [...prev, newFood]);
          }

          if (weekDates.includes(newFoodDate)) {
            setDailyData((prevData) =>
              prevData.map((data, index) =>
                weekDates[index] === newFoodDate
                  ? { ...data, caloriesConsumed: data.caloriesConsumed + newFood.calories }
                  : data
              )
            );
          }
        }}
      />
    </div>
  );
};
export default AnalyticsChart;