"use client";

import { getLoginUser } from "@/app/_utils/loginUserInfo";
import { useEffect, useState } from "react";

export default function MemberGreeting() {
  const [greetingMessage, setGreetingMessage] =
    useState<string>("안녕하세요 회원님");

  useEffect(() => {
    const loginUser = getLoginUser();
    if (loginUser) {
      setGreetingMessage(`안녕하세요 ${JSON.parse(loginUser).name}님 🖐️`);
    }
  }, []);

  return (
    <div className=" text-xl font-bold text-gray-800 mt-7 py-4 px-6">
      {greetingMessage}
    </div>
  );
}
