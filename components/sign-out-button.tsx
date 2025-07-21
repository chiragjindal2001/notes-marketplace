"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
    >
      Sign Out
    </button>
  );
}
