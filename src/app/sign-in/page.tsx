"use client";
import Link from "next/link";
import LanguageSelector from "../components/languageselector";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function convertStyleStringToObject(styleString: string) {
  const styleObject: { [key: string]: string } = {};

  styleString.split(";").forEach((style) => {
    if (style.trim()) {
      const [property, value] = style.split(":");
      if (property && value) {
        const camelCaseProperty = property
          .trim()
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); // Convert to camelCase
        styleObject[camelCaseProperty] = value.trim();
      }
    }
  });

  return styleObject;
}

type GoogleUser = {
  name: string;
  picture: string;
  email: string;
};
export default function SignIn() {
  const router = useRouter();
  const saveUserToSupabase = async (user: GoogleUser, id_token: string) => {
    try {
      const res = await fetch("/api/auth/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          picture: user.picture,
          googleToken: id_token,
        }),
      });
      gagg;
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error saving user");
      localStorage.setItem("userId", data.user.id);
      console.log("User saved successfully:", data.user);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleSuccess = (response: CredentialResponse) => {
    const id_token = response.credential;

    if (!id_token) {
      console.error("Không có id_token");
      return;
    }

    const user: GoogleUser = jwtDecode(id_token);
    localStorage.setItem("user_name_info", user.name);
    localStorage.setItem("user_image_info", user.picture);
    localStorage.setItem("user_email_info", user.email);
    setCookie("google-videobridge-auth-token", id_token, {
      maxAge: 60 * 60 * 24 * 7,
    }); // 7 ngày

    console.log("User Info:", user);

    // Gọi API lấy data YouTube từ id_token nếu cần
    // fetchYouTubeData(id_token); // <-- bạn cần định nghĩa hàm này
    saveUserToSupabase(user, id_token);
    router.push("/dashboard");
  };
  useEffect(() => {
    const token = getCookie("google-videobridge-auth-token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center">
      <div className="max-w-[1300px] w-full relative h-full flex flex-col items-center justify-center">
        <div className="absolute top-8 flex justify-between items-center w-full">
          <Link className="flex items-center  gap-2" href="/">
            <h4 className="scroll-m-20 tracking-tight text-2xl font-black">
              Noteflow AI
            </h4>
          </Link>
          <div>
            <LanguageSelector />
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[650px]"></div>
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[380px]">
          <div className="flex flex-col gap-2 text-center">
            <div
              className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
              style={convertStyleStringToObject(
                "--sparkles-first-color: #9E7AFF; --sparkles-second-color: #FE8BBB;"
              )}
            >
              <span className="relative inline-block">
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.20872; left: 75.0162%; top: 32.4946%; transform: scale(0.0827763) rotate(84.3924deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#9E7AFF"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.658304; left: 5.80429%; top: 77.7723%; transform: scale(0.368353) rotate(104.624deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#9E7AFF"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.995263; left: 54.0374%; top: 8.97469%; transform: scale(1.1849) rotate(119.787deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#FE8BBB"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0; left: 79.8377%; top: 18.0304%; transform: scale(0) rotate(75deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#FE8BBB"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.477668; left: 54.443%; top: 93.031%; transform: scale(0.179458) rotate(96.495deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#FE8BBB"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0; left: 44.0909%; top: 60.4387%; transform: scale(0) rotate(75deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#FE8BBB"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.657605; left: 86.0666%; top: 35.2007%; transform: scale(0.452568) rotate(130.272deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#9E7AFF"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.989859; left: 57.4482%; top: 87.5466%; transform: scale(0.376311) rotate(119.544deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#9E7AFF"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.824955; left: 66.6834%; top: 47.7486%; transform: scale(0.863622) rotate(112.123deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#FE8BBB"
                  ></path>
                </svg>
                <svg
                  className="pointer-events-none absolute z-20"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  style={convertStyleStringToObject(
                    "opacity: 0.956549; left: 36.6272%; top: 57.6775%; transform: scale(0.6163) rotate(121.304deg);"
                  )}
                >
                  <path
                    d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                    fill="#FE8BBB"
                  ></path>
                </svg>
                <strong>Let AI help you take notes</strong>
              </span>
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-1">
                <div className="flex-1 h-full flex gap-1 flex-col justify-center items-center">
                  <div className="flex">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-yellow-400"
                    >
                      <path
                        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-yellow-400"
                    >
                      <path
                        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-yellow-400"
                    >
                      <path
                        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-yellow-400"
                    >
                      <path
                        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-yellow-400"
                    >
                      <path
                        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <small className="text-sm leading-none font-bold mt-1">
                    <span className="inline-block tabular-nums text-black dark:text-white tracking-wider">
                      170,000
                    </span>
                    +
                  </small>{" "}
                  <small className="text-sm font-medium leading-none">
                    <span className="text-xs">People loved</span>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              {/* <button
                  onClick={() => login()}
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8"
                >
                  <img
                    alt="icon"
                    loading="lazy"
                    width="20"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    className="mr-2"
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgoogle-icon.4a3e368d.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgoogle-icon.4a3e368d.png&amp;w=48&amp;q=75 2x"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgoogle-icon.4a3e368d.png&amp;w=48&amp;q=75"
                    style={convertStyleStringToObject("color: transparent;")}
                  />{" "}
                  Continue with Google
                </button> */}
              <GoogleOAuthProvider clientId="668441206996-3bpbdpghb2qmpfdqv4cl26p4qhmn5v4j.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
              {/* <button
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  color="white"
                  className="mr-2 size-5"
                  fill="#000"
                >
                  <path d="M481.898 355.142c-43.41-10.111-77.377-49.184-77.377-97.628 0-40.618 24.22-76.954 61.704-92.569 9.327-3.886 12.221-15.721 5.736-23.472-20.673-24.711-48.844-37.24-83.733-37.24-71.433 0-80.212 39.109-124.913 39.109-44.697 0-53.49-39.109-124.915-39.109-87.288 0-119.901 77.264-119.901 164.775C18.5 414.514 97.821 512 167.008 512c39.315 0 61.323-10.108 77.392-17.488 18.408-8.455 19.417-8.458 37.831 0C298.3 501.892 320.308 512 359.623 512c62.674 0 112.437-70.61 133.205-137.82 2.565-8.303-2.451-17.065-10.93-19.038z"></path>
                  <path d="M359.84 13.45A14.998 14.998 0 0 0 346.746.355c-1.706-.207-42.184-4.707-72.175 25.295-29.988 30-25.49 70.486-25.283 72.195a15 15 0 0 0 13.094 13.095c22.316 2.704 52.328-5.44 72.175-25.295 29.988-30 25.49-70.486 25.283-72.195z"></path>
                </svg>{" "}
                Continue with Apple
              </button> */}
            </div>
          </div>
          <p className="px-8  text-center text-xs text-muted-foreground">
            By signing in, you agree to our
            <Link
              className="hover:text-blue-400 text-foreground mx-1"
              href="/term"
            >
              Term of Use
            </Link>
            and
            <Link
              className="hover:text-blue-400 text-foreground mx-1"
              href="/privacy"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
