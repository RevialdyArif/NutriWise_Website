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

export default function AddFoodForm({ onFoodAdded }: { onFoodAdded: () => void }) {
    const [foodName, setFoodName] = React.useState("")
    const [calories, setCalories] = React.useState("")
    const [protein, setProtein] = React.useState("")
    const [carbs, setCarbs] = React.useState("")
    const [fat, setFat] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)

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
            const res = await fetch("/api/meals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: foodName,
                    calories: Number(calories),
                    protein: Number(protein),
                    carbs: Number(carbs),
                       fat: Number(fat),
                }),
            })

            if (!res.ok) throw new Error("Failed to add food")

            toast.success("Successfully added food", {
                description: `${foodName} has been added to your list.`,
            })

            onFoodAdded()
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
        <Drawer open={open} onOpenChange={setOpen}>
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
                    <DrawerTitle className="text-3xl font-bold text-primary">Add Food</DrawerTitle>
                    <DrawerDescription className="text-md text-muted-foreground">
                        Enter your food details below
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
                            {loading ? "Adding..." : "Add Food"}
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}