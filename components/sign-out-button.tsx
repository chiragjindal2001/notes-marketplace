"use client";

import { useNavigation } from "@/hooks/use-navigation";

export function SignOutButton() {
  const { navigate } = useNavigation();

  const handleSignOut = async () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
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
