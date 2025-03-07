import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Header() {
  return (
    <header className="bg-white/30 border border-white/20 backdrop-blur-lg w-full mb-6 mx-auto px-6 py-4">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="logo" width={150} priority className="cursor-pointer" />
        </Link>

        {/* Mobile View */}
        <Input type="checkbox" id="menu-toggle" className="hidden peer" />
        <Label htmlFor="menu-toggle" className="md:hidden cursor-pointer">
          <Menu size={30} className="block peer-checked:hidden" />
          <X size={30} className="hidden peer-checked:block" />
        </Label>

        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link href="/scan" className="font-semibold text-black hover:text-emerald-600 transition">Scan Barcode</Link>
          <Link href="/analytics" className="font-semibold text-black hover:text-emerald-600 transition">Analytics</Link>
          <Link href="/personalization" className="font-semibold text-black hover:text-emerald-600 transition">Personalization</Link>
          <Link href="/about" className="font-semibold text-black hover:text-emerald-600 transition">About</Link>
          <form action={async () => {
            "use server";
            await signOut();
          }}>
            <Button>Logout</Button>
          </form>
        </div>

        {/* Desktop View */}
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex-col items-center space-y-4 py-4 text-lg md:hidden hidden peer-checked:flex" id="menu">
          <Link href="/scan" className="font-semibold text-black hover:text-emerald-600 transition">Scan Barcode</Link>
          <Link href="/analytics" className="font-semibold text-black hover:text-emerald-600 transition">Analytics</Link>
          <Link href="/personalization" className="font-semibold text-black hover:text-emerald-600 transition">Personalization</Link>
          <Link href="/about" className="font-semibold text-black hover:text-emerald-600 transition">About</Link>
          <form action={async () => {
            "use server";
            await signOut();
          }}>
            <Button>Logout</Button>
          </form>
        </div>
      </nav>
    </header>
  );
}
