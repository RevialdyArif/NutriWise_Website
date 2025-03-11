"use client";

import { useState, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Product {
    product_name?: string;
    brands?: string;
    categories?: string;
    quantity?: number;
    image_url?: string;
    nutriscore_grade?: string;
    nova_group?: number;
    ecoscore_grade?: string;
    nutriments?: {
        energy?: number;
        proteins?: number;
        carbohydrates?: number;
        fat?: number;
        sugars?: number;
        salt?: number;
    };
}


const nutriScoreColors: Record<string, string> = {
    "a": "bg-green-500",
    "b": "bg-green-400",
    "c": "bg-yellow-400",
    "d": "bg-orange-400",
    "e": "bg-red-500"
};

const novaGroupColors: Record<number, string> = {
    1: "bg-green-500",
    2: "bg-green-400",
    3: "bg-yellow-400",
    4: "bg-red-600"
};

const ecoScoreColors: Record<string, string> = {
    "a": "bg-green-500",
    "b": "bg-green-400",
    "c": "bg-yellow-400",
    "d": "bg-orange-500",
    "e": "bg-red-500"
};

export default function BarcodeScanner() {
    const [barcode, setBarcode] = useState<string>("");
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    

    const startScanning = () => {
        toast.loading("Scanning barcode...");
        const codeReader = new BrowserMultiFormatReader();

        codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result, error, controls) => {
            if (result) {
                setBarcode(result.getText());
                fetchProductData(result.getText());

                // Hentikan scanning
                controls.stop();

                // Matikan video stream
                if (videoRef.current?.srcObject) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    stream.getTracks().forEach(track => track.stop());
                    videoRef.current.srcObject = null;
                }

                toast.dismiss();
            }
        });
    };


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = async () => {
                setImagePreview(reader.result as string);
                try {
                    toast.loading("Scanning Barcode...");
                    const codeReader = new BrowserMultiFormatReader();
                    const result = await codeReader.decodeFromImageUrl(reader.result as string);
                    setBarcode(result.getText());
                    fetchProductData(result.getText());
                    toast.dismiss();
                } catch (error) {
                    console.log(error, "Error scanning barcode from image.");
                    toast.error("Error scanning barcode from image.");
                }
            };
            reader.readAsDataURL(file);
            toast.success("Image uploaded successfully.");
        }
    };

    const fetchProductData = async (barcode: string) => {
        setError(null);
        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
            const data = await response.json();
            if (data.status === 1) {
                setProduct(data.product);
                toast.success("Found product!");
            } else {
                setProduct(null);
                setError("Product not found. Please check the barcode or try again.");
                toast.error("Product not found. Please check the barcode or try again.");
            }
        } catch (error) {
            console.log(error, "Error fetching product data.");
            toast.error("Error fetching product data.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-xl text-center md:mt-12 mt-4">
            <Toaster />
            <h2 className="text-2xl font-bold text-black">Scan or Upload Barcode</h2>
            <p className="text-md text-gray-500 mb-6">Scan the barcode of the product you want to check or upload an image of the barcode.</p>

            <video ref={videoRef} className="w-full border rounded-lg shadow-lg"></video>
            <Button onClick={startScanning} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-3">Scan Barcode</Button>
            
            <div className="flex items-center justify-center my-6">
                <div className="w-1/3 border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 font-semibold">OR</span>
                <div className="w-1/3 border-t border-gray-300"></div>
            </div>
            
            <Label className="cursor-pointer bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 flex items-center gap-2 hover:bg-gray-200 transition">
                <Upload className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-semibold">Choose Image</span>
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </Label>
            
            {image && <p className="mt-2 text-gray-600">{image.name}</p>}

            {imagePreview && (
                <div className="mt-6">
                    <Image src={imagePreview} alt="Uploaded" width={800} height={500} className="w-full rounded-lg shadow-md" />
                </div>
            )}

            {barcode && (
                <p className="text-lg font-medium text-gray-700 mt-4">📌 Barcode: {barcode}</p>
            )}

            {error && <p className="text-red-500 text-lg font-semibold mt-4">{error}</p>}

            {product && (
                <div className="mt-8 p-6 border rounded-xl bg-gray-50 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mt-6">{product.product_name || "Unknown"}</h3>
                    <p className="text-lg text-gray-600"><span className="font-semibold text-black">Brand: </span>{product.brands || "Unknown"}</p>
                    <p className="text-lg text-gray-600"><span className="font-semibold text-black">Quantity: </span>{product.quantity || "Unknown"}</p>
                    <p className="text-lg text-gray-600"><span className="font-semibold text-black">Categories: </span>{product.categories || "Unknown"}</p>
                    {product.image_url && <Image src={product.image_url} alt="Product" width={800} height={500} className="mt-4 mb-12 w-full rounded-lg" />}
                    <div className={`p-4 rounded-lg text-white text-xl font-bold text-center ${nutriScoreColors[product.nutriscore_grade as keyof typeof nutriScoreColors] ?? "bg-gray-400"}`}>
                        Nutri-Score: {product.nutriscore_grade?.toUpperCase() || "N/A"}
                    </div>
                    <div className={`p-4 rounded-lg text-white text-xl font-bold text-center mt-2 ${novaGroupColors[product.nova_group as keyof typeof novaGroupColors] ?? "bg-gray-400"}`}>
                        NOVA Group: {product.nova_group || "N/A"}
                    </div>
                    <div className={`p-4 rounded-lg text-white text-xl font-bold text-center mt-2 ${ecoScoreColors[product.ecoscore_grade as keyof typeof ecoScoreColors] ?? "bg-gray-400"}`}>
                        Green Score: {product.ecoscore_grade?.toUpperCase() || "N/A"}
                    </div>
                    <h4 className="mt-6 text-xl font-semibold">Nutrients:</h4>
                    <ul className="text-lg text-gray-700">
                        <li>🔥 Energy: {product.nutriments?.energy || "N/A"} kcal</li>
                        <li>🥩 Proteins: {product.nutriments?.proteins || "N/A"} g</li>
                        <li>🍞 Carbohydrates: {product.nutriments?.carbohydrates || "N/A"} g</li>
                        <li>🛢 Fats: {product.nutriments?.fat || "N/A"} g</li>
                        <li>🍬 Sugars: {product.nutriments?.sugars || "N/A"} g</li>
                        <li>🧂 Salt: {product.nutriments?.salt || "N/A"} g</li>
                    </ul>
                </div>
            )}
        </div>
    );
} 
