"use client";

import React, { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Group() {
  const [code, setCode] = useState<string[]>(Array(5).fill(""));
  const [selectedRole, setSelectedRole] = useState<"자식" | "부모" | null>(
    null
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value.toUpperCase();
      setCode(newCode);

      if (value !== "" && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleRoleSelect = (role: "자식" | "부모") => {
    setSelectedRole(role);
  };

  const getRoleButtonClass = (role: "자식" | "부모") => {
    const baseClass = "font-bold rounded-[22px] px-3 py-3 ";
    const unselectedClass =
      "bg-[#FFFFFF] border border-[#FF6411] text-[#FF6411] text-xs ";
    const selectedClass = "bg-[#FFECD6] text-[#FF6411] text-xs ";

    return (
      baseClass + (selectedRole === role ? selectedClass : unselectedClass)
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length === 5 && selectedRole) {
      console.log("Submitted Code:", fullCode);
      console.log("Selected Role:", selectedRole);
      // Add your submission logic here
    } else {
      console.log("Please fill in all fields and select a role");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto w-full min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="text-center">
          <h2 className="font-bold text-xl text-black tracking-tight leading-5 mt-30">
            가족분에게 참여 코드를 받았나요?
          </h2>
          <p className="text-xs pt-2 text-[#838383] tracking-tight leading-5">
            그룹 참여 코드 5자리를 입력해주세요
          </p>
        </div>

        <div className="mt-16 px-8 flex justify-between">
          {code.map((char, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={char}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-12 h-12 text-center text-2xl border-b-2 border-gray-300 focus:outline-none focus:border-[#FF6411] uppercase"
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-[14px] pt-7 text-[#838383] tracking-tight leading-5">
            코드는 초대자에게 발송됩니다.
          </p>
          <div className="flex text-[14px] justify-center text-center pt-2">
            <p className="font-bold text-black">그룹을 생성하고 싶다면?</p>
            <Link href="create-group">
              <p className="font-bold text-[#FFC46C] pl-2">그룹 만들기</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mt-16">
          <button
            type="button"
            onClick={() => handleRoleSelect("자식")}
            className={getRoleButtonClass("자식")}
          >
            자식으로 참여
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("부모")}
            className={getRoleButtonClass("부모")}
          >
            부모님으로 참여
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="flex justify-center items-center rounded-[22px] bg-[#FF7B00] px-36 py-2 text-[#FFFFFF] font-bold disabled:opacity-50"
          >
            확인
          </button>
        </div>
      </form>
    </main>
  );
}
