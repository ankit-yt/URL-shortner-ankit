import { getAllUserUrls, getCurrentUser } from "../api/user.api";
import store from "../store/store";
import { redirect } from "@tanstack/react-router";
import { isLoading, login, logout } from "../store/slice/authSlice";

export const checkAuth = async () => {
  try {
    store.dispatch(isLoading(true));

    const response = await getCurrentUser(); // Throws 401 if unauthenticated
    store.dispatch(login(response.data.user));

    // ✅ Get updated auth state
    const auth = store.getState().auth;

    if (!auth.isAuthenticated) throw redirect({ to: "/auth" });

    store.dispatch(isLoading(false));
    return true;
  } catch (e) {
    console.log("❌ Not Authenticated:", e);
    store.dispatch(isLoading(false)); // ✅ Reset loading on failure too
    throw redirect({ to: "/auth" });
  }
};

// export const checkerForHomePage = async () => {
//   try {
//     // Fetch current user if token exists
//     const response = await getCurrentUser(); // Throws 401 if not logged in

//     // Dispatch login to update Redux state
//     store.dispatch(login(response.data.user));
    

//     // After updating auth, redirect to dashboard
//     return redirect({ to: "/dashboard" });

//   } catch  {
//     // Not authenticated, so stay on homepage
//     console.log("User not authenticated");
//     store.dispatch(logout())
//     throw redirect({to:"/auth"}) // allow rendering home page
//   }
// };