"use client";

const GoogleAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex h-10 w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
    >
      {/* Google Logo */}
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
        />

        <path
          fill="#34A853"
          d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z"
        />

        <path
          fill="#FBBC05"
          d="M6.54 13.79A5.86 5.86 0 0 1 6.23 12c0-.62.11-1.22.31-1.79V7.68H3.3A9.7 9.7 0 0 0 2.25 12c0 1.56.37 3.03 1.05 4.32l3.24-2.53Z"
        />

        <path
          fill="#EA4335"
          d="M12 6.18c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.29 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 7.9 9.46 6.18 12 6.18Z"
        />
      </svg>

      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
