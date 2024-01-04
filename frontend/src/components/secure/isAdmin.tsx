import { useRouter } from "next/router";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function isAdmin(Component: any) {
  return function IsAdmin(props: any) {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        router.push("/signin");
      }
    }, []);

    if (!token) {
      return null;
    }

    if (token) {
      const user: any = jwtDecode(token);

      if (user.role !== "ADMIN") {
        router.push("/");
      }
    }

    return <Component {...props} />;
  };
}
