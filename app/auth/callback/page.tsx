"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthCallback() {
	const router = useRouter();

	useEffect(() => {
		const handleAuth = async () => {
			try {
				// 1. Manually check for the 'code' parameter in the URL
				const params = new URLSearchParams(window.location.search);
				const code = params.get("code");

				if (code) {
					// 🛑 ESSENTIAL: This converts the URL code into a real session on the live site
					const { error: exchangeError } =
						await supabase.auth.exchangeCodeForSession(code);
					if (exchangeError) throw exchangeError;
				}

				// 2. Fetch the user now that the session should be established
				const {
					data: { user },
					error: userError,
				} = await supabase.auth.getUser();

				if (userError || !user) {
					throw new Error("User session could not be established.");
				}

				// 3. STRICT GATEKEEPER: Check if the user exists in your PROFILES table
				const { data: profile, error: profileError } = await supabase
					.from("profiles")
					.select("id")
					.eq("id", user.id)
					.maybeSingle();

				if (profileError) throw profileError;

				if (!profile) {
					// ❌ GHOST USER DETECTED: They have a Google account but NO NutriFit profile
					console.warn("Unregistered Google account. Deleting from Auth...");

					// Trigger your API to remove them from Supabase Auth entirely
					await fetch("/api/delete-user", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ userId: user.id }),
					});

					// Clear local session so they are truly logged out
					await supabase.auth.signOut();

					toast.error(
						"Please sign up first to create your fitness profile! ❌",
						{
							theme: "colored",
							autoClose: 3000,
						},
					);

					// Redirect back to register page
					router.replace("/auth/register?error=not_registered");
					return;
				}

				// ✅ SUCCESS: Profile exists, proceed to dashboard
				toast.success("Welcome back to NutriFit! 🎉");
				router.replace("/dashboard");
			} catch (err: any) {
				console.error("Auth Exception:", err.message);
				router.replace("/auth/login?error=auth_failed");
			}
		};

		handleAuth();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center flex-col bg-white">
			<div className="w-12 h-12 border-4 border-[#FF6600] border-t-transparent rounded-full animate-spin"></div>
			<p className="mt-4 text-gray-600 font-medium animate-pulse">
				Syncing with NutriFit Cloud...
			</p>
		</div>
	);
}
