import Image from "next/image";
import stats from "@/public/stats.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import apple from "@/public/apple.png";
import protein from "@/public/protein.png";

export default function Page() {
    return (
        <div className="container mx-auto px-6 py-4 flex flex-col items-center text-center">
            <h2 className="text-xl text-gray-500">Welcome to</h2>
            <h1 className="text-6xl font-bold text-emerald-600 mb-12">NutriWise</h1>

            <div className="grid md:grid-cols-3 gap-10 w-full max-w-6xl">
                <div className="flex flex-col items-center p-6">
                    <div className="overflow-hidden rounded-lg">
                        <Image
                            src={stats}
                            alt="stats"
                            width={400}
                            height={400}
                            className="rounded-lg transition-transform duration-300 ease-in-out transform origin-center hover:scale-105"
                        />
                    </div>
                    <p className="text-lg font-semibold mt-4 text-gray-700">
                        Ready to start a healthier journey? Track your nutrition with NutriWise!
                    </p>
                </div>

                <div className="flex flex-col items-center p-6">
                    <div className="overflow-hidden rounded-lg">
                        <Image
                            src={apple}
                            alt="apple"
                            width={400}
                            height={400}
                            className="rounded-lg transition-transform duration-300 ease-in-out transform origin-center hover:scale-110"
                        />
                    </div>
                    <p className="text-lg font-semibold mt-4 text-gray-700">
                        See the real impact of what you eat and drink
                    </p>
                </div>

                <div className="flex flex-col items-center p-6">
                    <div className="overflow-hidden rounded-lg">
                        <Image
                            src={protein}
                            alt="protein"
                            width={400}
                            height={400}
                            className="rounded-lg transition-transform duration-300 ease-in-out transform origin-center hover:scale-110"
                        />
                    </div>
                    <p className="text-lg font-semibold mt-4 text-gray-700">
                        Make informed food choices and build lasting, healthy habits
                    </p>
                </div>
            </div>

            <Link href="/diet">
                <Button className="mt-12 px-20 py-7 text-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                    Continue
                </Button>
            </Link>
        </div>
    );
}
