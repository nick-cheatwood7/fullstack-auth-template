import Image from "next/image";
import Link from "next/link";
import { api } from "../../utils/api";
import AccountDropdown from "../auth/AccountDropdown";

export default function Navbar() {
  const { data, isError, isLoading } = api.auth.me.useQuery();

  function renderAuthButtons() {
    if (isError || (isLoading && !data)) {
      return <Link href="/login">Login</Link>;
    }
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return <AccountDropdown name={data.name ?? data.username} />;
    }
  }

  return (
    <header className="flex flex-row items-center justify-between bg-slate-800 px-6 py-2 text-white">
      <div>
        <Link href="/" className="flex items-center justify-around space-x-2">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          <span className="text-lg font-semibold">Auth Template</span>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-around">
        {/* Nav */}
        <div className="mr-4 space-x-4">
          <Link href="/about">About</Link>
          <Link href="/admin">Admin</Link>
        </div>
        {/* Auth buttons */}
        {renderAuthButtons()}
      </div>
    </header>
  );
}
