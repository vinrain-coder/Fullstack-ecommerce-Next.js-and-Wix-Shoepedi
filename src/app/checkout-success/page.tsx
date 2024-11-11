import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout success",
};

export default function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 px-5 py-10">
      <h1 className="text-3xl font-bold">We received your order!</h1>
      <p>A summary of your order was sent to your email address.</p>
    </main>
  );
}
