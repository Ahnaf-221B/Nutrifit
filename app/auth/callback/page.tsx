"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthCallback() {
	const router = useRouter();
	const [verifying, setVerifying] = useState(true);

	useEffect(() => {
		const handleAuth = async () => {
			try {
				// 1. Check if there is a 'code' in the URL (Production PKCE flow)
				const params = new URLSearchParams(window.location.search);
				const code = params.get("code");

				if (code) {
					// This "swaps" the URL code for a real login session
					await supabase.auth.exchangeCodeForSession(code);
				}

				// 2. Now get the user
				const {
					data: { user },
					error: userError,
				} = await supabase.auth.getUser();

				if (userError || !user) {
					throw new Error("No user found after verification.");
				}

				// 3. Check for Profile
				const { data: profile, error: profileError } = await supabase
					.from("profiles")
					.select("id")
					.eq("id", user.id)
					.maybeSingle(); // Use maybeSingle to avoid throw on empty

				if (!profile) {
					// 🛑 BUG DETECTED: User logged in with Google but has NO profile
					console.warn("Unregistered Google user detected. Cleaning up...");

					await fetch("/api/delete-user", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ userId: user.id }),
					});

					await supabase.auth.signOut();
					toast.error("Account not found. Redirecting to registration...", {
						theme: "colored",
					});
					router.replace("/auth/register?error=not_registered");
					return;
				}

				// 4. Success Case
				toast.success("Welcome back! 🎉");
				router.replace("/dashboard");
			} catch (err) {
				console.error("Auth error:", err);
				router.replace("/auth/login?error=auth_failed");
			} finally {
				setVerifying(false);
			}
		};

		handleAuth();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center flex-col bg-white">
			<div className="w-12 h-12 border-4 border-[#FF6600] border-t-transparent rounded-full animate-spin"></div>
			<p className="mt-4 text-gray-600 font-medium animate-pulse">
				Verifying secure connection...
			</p>
		</div>
	);
}
