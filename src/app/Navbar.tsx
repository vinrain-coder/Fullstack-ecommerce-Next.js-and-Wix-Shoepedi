import Link from "next/link";
import logo from "../assets/logo.png";
import Image from "next/image";
import { getCart } from "../wix-api/cart";
import { getWixServerClient } from "../lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";

export default async function Navbar() {
  const cart = await getCart(getWixServerClient());

  return (
    <header className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto p-5 flex items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Shoepedi Logo" width={40} height={40} />
          <span className="text-xl font-bold">Shoepedi</span>
        </Link>
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
