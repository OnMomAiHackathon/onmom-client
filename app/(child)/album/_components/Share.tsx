"use client";

import { SetStateAction, Dispatch, useState, useEffect } from "react";

import type { AppList } from "../Types/AppList";
import type { GroupMemberList } from "../Types/GroupMemberList";
import type { DiaryData } from "../Types/DiaryData";

import CloseIcon from "@/public/icons/icon-close.svg";
import ShareAppButton from "./Share/ShareAppButton";
import ShareTargetCard from "./Share/ShareTargetCard";
import Script from "next/script";

interface ShareProps {
  isOpenShare: boolean;
  setIsOpenShare: Dispatch<SetStateAction<boolean>>;
  shareDiaryData: DiaryData | undefined;
}

interface CaptureDataProps {
  captureData: string;
}

export default function Share({
  shareDiaryData,
  captureData,
  isOpenShare,
  setIsOpenShare,
}: ShareProps & CaptureDataProps) {
  const [appList, setAppList] = useState<AppList[]>([
    { imageUrl: "/images/naver.png", appName: "Naver" },
    { imageUrl: "/images/kakao.png", appName: "Kakao" },
    { imageUrl: "/images/facebook.png", appName: "Facebook" },
    { imageUrl: "/images/add-link.png", appName: "add-link" },
  ]);

  const [groupMemberList, setGroupMemberList] = useState<GroupMemberList[]>([
    {
      imageUrl: "/images/profile-img1.png",
      nickName: "큰 딸",
      targetName: "김윤서",
    },
    {
      imageUrl: "/images/profile-img2.png",
      nickName: "작은 딸",
      targetName: "나혜원",
    },
  ]);

  const closeHandler = () => {
    setIsOpenShare(false);
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY || "");
          console.log("Kakao SDK loaded");
        }}
      ></Script>
      <div
        className={`absolute z-50 w-full bottom-0 flex flex-col h-2/3 transition-transform duration-500 ease-in-out transform ${
          isOpenShare ? "-translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={closeHandler}
            className="hover:bg-opacity-80 flex justify-center items-center rounded-full bg-white w-7 h-7 m-3"
          >
            <CloseIcon></CloseIcon>
          </button>
        </div>
        <div className="bg-white w-full h-full p-6 rounded-t-[20px] shadow-inner">
          <div className="flex justify-center">
            <div className="font-bold">공유하기</div>
          </div>

          <div className="flex justify-between py-5">
            {appList.map((app, idx) => {
              return (
                <ShareAppButton
                  shareDiaryData={shareDiaryData}
                  captureData={captureData}
                  key={`${idx}_app`}
                  imageUrl={app.imageUrl}
                  appName={app.appName}
                />
              );
            })}
          </div>

          <div className="flex flex-col border-t">
            {groupMemberList.map((member, idx) => {
              return (
                <ShareTargetCard
                  key={`${idx}_member`}
                  imageUrl={member.imageUrl}
                  nickName={member.nickName}
                  targetName={member.targetName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
