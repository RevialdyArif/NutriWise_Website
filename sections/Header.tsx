import { Button } from "@/components/ui/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { signOut } from "@/auth";

export default function Header() {

  return (
    <header className="bg-white shadow-lg rounded-lg w-full mb-6 mx-auto px-6 py-4">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} className="cursor-pointer" />
        </Link>
        <div className="flex items-center space-x-6 text-xl">
          <Link href="/scan" className="font-semibold text-gray-700 hover:text-emerald-600 transition">Scan Barcode</Link>
          <Link href="/analytics" className="font-semibold text-gray-700 hover:text-emerald-600 transition">Analytics</Link>
          <Link href="/personalization" className="font-semibold text-gray-700 hover:text-emerald-600 transition">Personalization</Link>
          <Link href="/about" className="font-semibold text-gray-700 hover:text-emerald-600 transition">About</Link>
          <form action={async () => {
            "use server";

            await signOut();
          }}>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
              Logout
            </Button>
          </form>
        </div>
      </nav>
    </header>
  )
}
