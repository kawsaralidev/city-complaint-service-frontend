"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = (key: string) => {
    return searchParams.get(key) ?? "";
  };

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const clearParams = () => {
    router.push(pathname);
  };

  return {
    getParam,
    setParam,
    removeParam,
    clearParams,
  };
}
