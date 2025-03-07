import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white/30 border border-white/20 backdrop-blur-lg w-full mb-6 mx-auto px-8 py-4">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} priority className="cursor-pointer" />
        </Link>
        <div className="flex items-center space-x-6 text-xl">
          <Link href="/scan" className="font-semibold text-black hover:text-emerald-600 transition">Scan Barcode</Link>
          <Link href="/analytics" className="font-semibold text-black hover:text-emerald-600 transition">Analytics</Link>
          <Link href="/personalizat" className="font-semibold text-black hover:text-emerald-600 transition">Personalization</Link>
          <Link href="/about" className="font-semibold text-black hover:text-emerald-600 transition">About</Link>
          <form action={async () => {
            "use server";

            await signOut();
          }}>
            <Button>
              Logout
            </Button>
          </form>
        </div>
      </nav>
    </header>
  )
}
