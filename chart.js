"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import * as echarts from "echarts"
import AddFoodForm from "@/components/AddFoodForm"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const InfoCard = ({ label, value, bgColor, textColor }) => (
  <div className={`p-4 ${bgColor} ${textColor} rounded-lg shadow-md text-center`}>
    <p className="text-lg font-semibold">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
)

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
)

const getWeekDates = (currentDate = new Date()) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const currentDay = currentDate.getDay()
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
  const mondayDate = new Date(currentDate)
  mondayDate.setDate(mondayDate.getDate() + mondayOffset)

  return days.map((_, index) => {
    const date = new Date(mondayDate)
    date.setDate(date.getDate() + index)
    return date.toISOString().split("T")[0]
  })
}

const AnalyticsChart = () => {
  const chartRef = useRef(null)

  const [foods, setFoods] = useState([])
  const [totalCalories, setTotalCalories] = useState(0)
  const [totalProtein, setTotalProtein] = useState(0)
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalFat, setTotalFat] = useState(0)
  const [dailyData, setDailyData] = useState([])

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingFood, setEditingFood] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [foodToDelete, setFoodToDelete] = useState(null)
  const weekDates = useMemo(() => getWeekDates(), [])

  const recalculateTodayTotals = () => {
    const todayDate = new Date().toISOString().split("T")[0]
    const todayMeals = foods.filter(
      (meal) => meal.createdAt && new Date(meal.createdAt).toISOString().split("T")[0] === todayDate,
    )

    const newTotalProtein = todayMeals.reduce((sum, meal) => sum + meal.protein, 0)
    const newTotalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0)
    const newTotalFat = todayMeals.reduce((sum, meal) => sum + meal.fat, 0)
    const newTotalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0)

    setTotalCalories(newTotalCalories)
    setTotalProtein(newTotalProtein)
    setTotalCarbs(newTotalCarbs)
    setTotalFat(newTotalFat)
  }

  const recalculateChartData = () => {
    const mealsByDate = weekDates.reduce((acc, date) => {
      acc[date] = 0
      return acc
    }, {})

    foods.forEach((meal) => {
      if (meal.createdAt) {
        const mealDate = new Date(meal.createdAt).toISOString().split("T")[0]
        if (mealDate in mealsByDate) {
          mealsByDate[mealDate] += meal.calories
        }
      }
    })

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const newChartData = weekDates.map((date, index) => ({
      day: days[index],
      maxCalories: 2500,
      caloriesConsumed: mealsByDate[date] || 0,
      date,
    }))

    setDailyData(newChartData)
  }

  const handleFoodUpdated = async (updatedFood) => {
    try {
      const res = await fetch("/api/meals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFood),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("API Error:", errorData.message || "Failed to update food")
      }

      setFoods((prevFoods) => prevFoods.map((food) => (food.id === updatedFood.id ? updatedFood : food)))
      setEditingFood(null)
      setIsDrawerOpen(false)

      setTimeout(() => {
        recalculateTodayTotals()
        recalculateChartData()
      }, 0)
      toast.success("Food updated successfully!", {
        description: `${updatedFood.name} has been updated.`,
      })
    } catch (error) {
      console.error("Error updating food:", error)
      // Still update the UI even if the API call fails
      setFoods((prevFoods) => prevFoods.map((food) => (food.id === updatedFood.id ? updatedFood : food)))
      setEditingFood(null)
      setIsDrawerOpen(false)

      toast.warning("Food updated in UI only", {
        description: "Changes may not persist after refresh.",
      })
    }
  }

  const handleEditFood = (food) => {
    console.log("Edit button clicked!", food)
    setEditingFood(food)
    setIsDrawerOpen(true)
  }

  const handleDeleteClick = (id) => {
    setFoodToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!foodToDelete) return

    try {
      const res = await fetch("/api/meals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: foodToDelete }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("API Error:", errorData.message || "Failed to delete food")
      }

      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodToDelete))
      setDeleteConfirmOpen(false)
      setFoodToDelete(null)

      setTimeout(() => {
        recalculateTodayTotals()
        recalculateChartData()
      }, 0)

      toast.success("Food deleted successfully!")
    } catch (error) {
      console.error("Error deleting food:", error)
      // Still update the UI even if the API call fails
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodToDelete))
      setDeleteConfirmOpen(false)
      setFoodToDelete(null)

      toast.warning("Food deleted in UI only", {
        description: "Changes may not persist after refresh.",
      })
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setFoodToDelete(null)
  }

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch("/api/meals")
        if (!res.ok) return
        const meals = await res.json()

        const todayDate = new Date().toISOString().split("T")[0]
        const todayMeals = meals.filter(
          (meal) => meal.createdAt && new Date(meal.createdAt).toISOString().split("T")[0] === todayDate,
        )

        const totalProtein = todayMeals.reduce((sum, meal) => sum + meal.protein, 0)
        const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0)
        const totalFat = todayMeals.reduce((sum, meal) => sum + meal.fat, 0)
        const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0)

        setTotalCalories(totalCalories)
        setTotalProtein(totalProtein)
        setTotalCarbs(totalCarbs)
        setTotalFat(totalFat)
        setFoods(meals)

        const mealsByDate = weekDates.reduce((acc, date) => {
          acc[date] = 0
          return acc
        }, {})

        meals.forEach((meal) => {
          if (meal.createdAt) {
            const mealDate = new Date(meal.createdAt).toISOString().split("T")[0]
            if (mealDate in mealsByDate) {
              mealsByDate[mealDate] += meal.calories
            }
          }
        })

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        const chartData = weekDates.map((date, index) => ({
          day: days[index],
          maxCalories: 2500,
          caloriesConsumed: mealsByDate[date] || 0,
          date,
        }))

        setDailyData(chartData)
      } catch (error) {
        console.error("Error fetching meals:", error)
        toast.error("Failed to load your meals")
      }
    }

    fetchMeals()
  }, [weekDates])

  useEffect(() => {
    if (chartRef.current && dailyData.length > 0) {
      const chart = echarts.init(chartRef.current)
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
      }

      chart.setOption(option)

      const handleResize = () => {
        chart.resize()
      }

      window.addEventListener("resize", handleResize)
      return () => {
        chart.dispose()
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [dailyData])

  return (
    <div className="w-full max-w-5xl p-4 md:p-8 bg-white rounded-2xl shadow-lg relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Daily Nutrition Overview</h2>

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
        <InfoCard label="Daily Goal" value="2500 kcal" bgColor="bg-blue-100" textColor="text-blue-700" />
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
                new Date(food.createdAt).toISOString().split("T")[0] === new Date().toISOString().split("T")[0],
            )
            .map((food) => (
              <li key={food.id} className="border p-3 mb-6 bg-gray-100 rounded-md shadow flex flex-col">
                <div className="font-semibold flex flex-row items-center justify-between">
                  {food.name} - {food.calories} Calories
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-blue-500 hover:bg-blue-50"
                      onClick={() => handleEditFood(food)}
                    >
                      <Edit size={20} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDeleteClick(food.id)}
                    >
                      <Trash2 size={20} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <div className="space-x-2 md:space-x-4 text-sm font-semibold">
                  <span className="text-emerald-600">{food.protein}g Protein</span>
                  <span className="text-sky-600">{food.carbs}g Carbs</span>
                  <span className="text-amber-600">{food.fat}g Fat</span>
                </div>
                {food.createdAt && (
                  <div className="text-xs text-gray-500 mt-1">Added: {new Date(food.createdAt).toLocaleString()}</div>
                )}
              </li>
            ))}
        </ul>
      </div>

      <AddFoodForm
        onFoodAdded={(newFood) => {
          const newFoodDate = new Date(newFood.createdAt).toISOString().split("T")[0]
          const todayDate = new Date().toISOString().split("T")[0]

          if (newFoodDate === todayDate) {
            setFoods((prev) => [...prev, newFood])
            setTotalCalories((prev) => prev + newFood.calories)
            setTotalProtein((prev) => prev + newFood.protein)
            setTotalCarbs((prev) => prev + newFood.carbs)
            setTotalFat((prev) => prev + newFood.fat)
          } else {
            setFoods((prev) => [...prev, newFood])
          }

          if (weekDates.includes(newFoodDate)) {
            setDailyData((prevData) =>
              prevData.map((data, index) =>
                weekDates[index] === newFoodDate
                  ? {
                      ...data,
                      caloriesConsumed: data.caloriesConsumed + newFood.calories,
                    }
                  : data,
              ),
            )
          }
        }}
        onFoodUpdated={handleFoodUpdated}
        editingFood={editingFood}
        isOpen={isDrawerOpen}
        setOpen={setIsDrawerOpen}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Meal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this meal? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AnalyticsChart

