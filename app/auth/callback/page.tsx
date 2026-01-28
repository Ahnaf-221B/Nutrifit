"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthCallback() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const verifyUser = async () => {
			// 1. Get the session (this handles the #access_token from the email link)
			const {
				data: { session },
				error: sessionError,
			} = await supabase.auth.getSession();
			const user = session?.user;

			if (sessionError || !user) {
				setError("Session not found or expired.");
				toast.error("Verification failed ❌");
				setTimeout(() => router.replace("/auth/login"), 2000);
				return;
			}

			// 2. Check if the user has a completed profile
			const { data: profile, error: profileError } = await supabase
				.from("profiles")
				.select("id")
				.eq("id", user.id)
				.single();

			if (profileError || !profile) {
				// BUG FIX: New Google user or email user who didn't finish registration
				console.log("No profile found. Cleaning up auth user...");

				await fetch("/api/delete-user", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userId: user.id }),
				});

				await supabase.auth.signOut();
				toast.error("Account not found. Please register first ❌", {
					theme: "colored",
				});

				setTimeout(() => {
					router.replace(
						`${window.location.origin}/auth/register?error=not_registered`,
					);
				}, 1500);
				return;
			}

			// 3. Success!
			toast.success("Welcome to NutriFit! 🎉", { theme: "colored" });
			setTimeout(() => router.replace("/dashboard"), 1200);
		};

		verifyUser();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center flex-col px-4 bg-slate-50">
			{error ? (
				<p className="text-red-500 font-bold text-center">{error}</p>
			) : (
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-slate-600 font-medium animate-pulse text-lg">
						Finalizing your login...
					</p>
				</div>
			)}
		</div>
	);
}
