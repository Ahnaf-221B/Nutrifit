"use client";
import { useSearchParams } from "next/navigation";

export default function LoginErrorMessage() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  if (!errorParam) return null;

  if (errorParam === "not_registered") {
    return (
      <p className="text-red-500 text-center mb-4">
        You are not registered. Please sign up first.
      </p>
    );
  }

  return null;
}
