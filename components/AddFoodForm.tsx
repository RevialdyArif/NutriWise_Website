"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FoodItem = {
    id: string
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    timestamp: Date
}

type AddFoodFormProps = {
    onFoodAdded: (food: FoodItem) => void
    onFoodUpdated: (food: FoodItem) => void
    editingFood: FoodItem | null
    isOpen: boolean
    setOpen: (open: boolean) => void
}

export default function AddFoodForm({ onFoodAdded, onFoodUpdated, editingFood, isOpen, setOpen }: AddFoodFormProps) {
    const [foodName, setFoodName] = React.useState("")
    const [calories, setCalories] = React.useState("")
    const [protein, setProtein] = React.useState("")
    const [carbs, setCarbs] = React.useState("")
    const [fat, setFat] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const isEditing = !!editingFood

    React.useEffect(() => {
        if (editingFood) {
            setFoodName(editingFood.name)
            setCalories(editingFood.calories.toString())
            setProtein(editingFood.protein.toString())
            setCarbs(editingFood.carbs.toString())
            setFat(editingFood.fat.toString())
        }
    }, [editingFood])

    React.useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                if (!isOpen && !isEditing) {
                    resetForm()
                }
            }, 300)
        }
    }, [isOpen, isEditing])

    const resetForm = () => {
        setFoodName("")
        setCalories("")
        setProtein("")
        setCarbs("")
        setFat("")
    }

    const handleSubmit = async () => {
        if (!foodName || !calories || !protein || !carbs || !fat) {
            toast.error("Form is not complete", {
                description: "Please fill out the form completely.",
            })
            return
        }

        setLoading(true)
        try {
            const foodItem: FoodItem = {
                id: editingFood ? editingFood.id : Math.random().toString(36),
                name: foodName,
                calories: Number(calories),
                protein: Number(protein),
                carbs: Number(carbs),
                fat: Number(fat),
                timestamp: editingFood ? editingFood.timestamp : new Date(),
            }

            try {
                const method = editingFood ? "PUT" : "POST"

                const res = await fetch("/api/meals", {
                    method: method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(foodItem),
                })

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}))
                    console.error("API Error:", errorData.message || "Failed to process food item")
                }
            } catch (error) {
                console.error("API Error:", error)
                toast.warning("Failed to add food", {
                    description: "An error occurred while adding food.",
                })
            }

            if (editingFood) {
                onFoodUpdated(foodItem)
            } else {
                onFoodAdded(foodItem)
                toast.success("Successfully editing food", {
                    description: `${foodName} has successfully been edited.`,
                })
            }

            resetForm()
            setTimeout(() => {
                setOpen(false)
            }, 500)
        } catch (error) {
            console.error(error)
            toast.error("Failed to add food", {
                description: "An error occurred while adding food.",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full h-12 w-12 shadow-md fixed bottom-16 right-6 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                    <Plus className="h-6 w-6" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full max-w-lg mx-auto bg-white rounded-t-xl shadow-xl">
                <DrawerHeader className="px-6 pt-6 pb-4">
                    <DrawerTitle className="text-3xl font-bold text-primary">{isEditing ? "Edit Food" : "Add Food"}</DrawerTitle>
                    <DrawerDescription className="text-md text-muted-foreground">
                        {isEditing ? "Update the food information" : "Enter your food details below"}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 px-6 space-y-6 py-4">
                    {/* Nama Makanan */}
                    <div className="space-y-2">
                        <Label htmlFor="food-name" className="font-medium">
                            Food Name
                        </Label>
                        <Input
                            id="food-name"
                            placeholder="e.g., Ayam Panggang"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                    </div>

                    {/* Informasi Nutrisi */}
                    <h3 className="font-medium mb-3">Nutritional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="calories">Calories</Label>
                            <div className="flex">
                                <Input
                                    id="calories"
                                    type="number"
                                    placeholder="0"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    className="rounded-r-none"
                                />
                                <span className="flex items-center justify-center px-3 rounded-r-md bg-gray-100 text-sm border border-l-0 border-gray-300 text-gray-600 font-medium min-w-[50px]">
                                    kcal
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="carbs">Carbohydrates</Label>
                            <div className="flex">
                                <Input
                                    id="carbs"
                                    type="number"
                                    placeholder="0"
                                    value={carbs}
                                    onChange={(e) => setCarbs(e.target.value)}
                                    className="rounded-r-none"
                                />
                                <span className="flex items-center justify-center px-3 rounded-r-md bg-gray-100 text-sm border border-l-0 border-gray-300 text-gray-600 font-medium min-w-[50px]">
                                    g
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="protein">Proteins</Label>
                            <div className="flex">
                                <Input
                                    id="protein"
                                    type="number"
                                    placeholder="0"
                                    value={protein}
                                    onChange={(e) => setProtein(e.target.value)}
                                    className="rounded-r-none"
                                />
                                <span className="flex items-center justify-center px-3 rounded-r-md bg-gray-100 text-sm border border-l-0 border-gray-300 text-gray-600 font-medium min-w-[50px]">
                                    g
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fat">Fats</Label>
                            <div className="flex">
                                <Input
                                    id="fat"
                                    type="number"
                                    placeholder="0"
                                    value={fat}
                                    onChange={(e) => setFat(e.target.value)}
                                    className="rounded-r-none"
                                />
                                <span className="flex items-center justify-center px-3 rounded-r-md bg-gray-100 text-sm border border-l-0 border-gray-300 text-gray-600 font-medium min-w-[50px]">
                                    g
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <DrawerFooter className="px-6 py-4 mt-auto bg-white border-t">
                    <div className="flex justify-between w-full">
                        <DrawerClose asChild>
                            <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                        >
                            {loading ? "Adding..." : isEditing ? "Update Food" : "Add Food"}
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}