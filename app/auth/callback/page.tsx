"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
	const router = useRouter();

	useEffect(() => {
		const handleOAuth = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user) {
				// redirect to dashboard
				router.push("/dashboard");
			} else {
				router.push("/login");
			}
		};

		handleOAuth();
	}, []);

	return <p>Logging in with Google...</p>;
}
