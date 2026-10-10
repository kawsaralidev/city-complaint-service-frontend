"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function GoogleLoginSuccessHandler() {
  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.get("googleLogin") !== "success") {
      return;
    }

    toast.success("Google login successful");

    url.searchParams.delete("googleLogin");

    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, []);

  return null;
}
