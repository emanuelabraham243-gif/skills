import type { Metadata } from "next";
import { Suspense } from "react";
import AccountForm from "@/components/AccountForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Login / Register",
  description: "Sign in to see pricing on our full inventory.",
};

export default function AccountPage() {
  return (
    <div className="container-page max-w-lg py-10 sm:py-14">
      <SectionHeading eyebrow="Account" title="Login / Register" description="Sign in to see pricing across our inventory." />
      <div className="mt-8">
        <Suspense fallback={<div className="h-64 rounded-2xl border border-line bg-surface" />}>
          <AccountForm />
        </Suspense>
      </div>
    </div>
  );
}
