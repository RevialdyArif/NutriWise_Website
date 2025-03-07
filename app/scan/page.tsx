"use client";

import { useState, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";

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
    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const startScanning = () => {
        toast.loading("Scanning barcode...");
        const codeReader = new BrowserMultiFormatReader();
        codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
            if (result) {
                setBarcode(result.getText());
                fetchProductData(result.getText());
                codeReader.reset();
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
                try {
                    toast.loading("Scanning Barcode...");
                    const codeReader = new BrowserMultiFormatReader();
                    const result = await codeReader.decodeFromImageUrl(reader.result as string);
                    setBarcode(result.getText());
                    fetchProductData(result.getText());
                    toast.dismiss();
                } catch (err) {
                    setError("Gagal membaca barcode dari gambar.");
                    toast.error("Gagal membaca barcode dari gambar.");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchProductData = async (barcode: string) => {
        setError(null);
        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
            const data = await response.json();
            if (data.status === 1) {
                setProduct(data.product);
                toast.success("Produk ditemukan!");
            } else {
                setProduct(null);
                setError("Produk tidak ditemukan. Coba barcode lain.");
                toast.error("Produk tidak ditemukan.");
            }
        } catch (err) {
            setError("Terjadi kesalahan. Coba lagi nanti.");
            toast.error("Terjadi kesalahan dalam mengambil data.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-xl text-center mt-12">
            <Toaster />
            <h2 className="text-2xl font-bold text-black">Scan atau Unggah Barcode</h2>
            <p className="text-md text-gray-500 mb-6">Gunakan kamera atau unggah gambar barcode.</p>

            <video ref={videoRef} className="w-full border rounded-lg shadow-lg"></video>
            <Button onClick={startScanning} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-3">Mulai Scan</Button>
            <div className="flex items-center justify-center my-6">
                <div className="w-1/3 border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 font-semibold">OR</span>
                <div className="w-1/3 border-t border-gray-300"></div>
            </div>
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="mt-4 w-full" />

            {barcode && (
                <p className="text-lg font-medium text-gray-700 mt-4">📌 Barcode: {barcode}</p>
            )}

            {error && <p className="text-red-500 text-lg font-semibold mt-4">{error}</p>}

            {product && (
                <div className="mt-8 p-6 border rounded-xl bg-gray-50 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mt-6">{product.product_name || "Nama Produk Tidak Diketahui"}</h3>
                    <p className="text-lg text-gray-600">Merek: {product.brands || "Tidak diketahui"}</p>
                    {product.image_url && <img src={product.image_url} alt="Product" className="mt-4 mb-12 w-full rounded-lg" />}
                    <div className={`p-4 rounded-lg text-white text-xl font-bold text-center ${nutriScoreColors[product.nutriscore_grade] || "bg-gray-400"}`}>
                        Nutri-Score: {product.nutriscore_grade?.toUpperCase() || "N/A"}
                    </div>
                    <div className={`p-4 rounded-lg text-white text-xl font-bold text-center mt-2 ${novaGroupColors[product.nova_group] || "bg-gray-400"}`}>
                        NOVA Group: {product.nova_group || "N/A"}
                    </div>
                    <div className={`p-4 rounded-lg text-white text-xl font-bold text-center mt-2 ${ecoScoreColors[product.ecoscore_grade] || "bg-gray-400"}`}>
                        Green Score: {product.ecoscore_grade?.toUpperCase() || "N/A"}
                    </div>
                    <h4 className="mt-6 text-xl font-semibold">Informasi Nutrisi:</h4>
                    <ul className="text-lg text-gray-700">
                        <li>🔥 Energi: {product.nutriments?.energy || "N/A"} kcal</li>
                        <li>🥩 Protein: {product.nutriments?.proteins || "N/A"} g</li>
                        <li>🍞 Karbohidrat: {product.nutriments?.carbohydrates || "N/A"} g</li>
                        <li>🛢 Lemak: {product.nutriments?.fat || "N/A"} g</li>
                        <li>🍬 Gula: {product.nutriments?.sugars || "N/A"} g</li>
                        <li>🧂 Garam: {product.nutriments?.salt || "N/A"} g</li>
                    </ul>
                </div>
            )}
        </div>
    );
} 
