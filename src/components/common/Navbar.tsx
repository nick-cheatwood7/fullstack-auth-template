import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex flex-row items-center justify-between bg-slate-800 px-6 py-4 text-white">
      <div>
        <Link href="/" className="flex items-center justify-around space-x-2">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          <span className="text-lg font-semibold">Auth Template</span>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-around">
        <ul className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          {/* Auth buttons */}
          <Link href="/login">Login</Link>
        </ul>
      </div>
    </header>
  );
}
