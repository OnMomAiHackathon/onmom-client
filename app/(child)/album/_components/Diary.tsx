"use client";

import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { useSwipeable } from "react-swipeable";

import type { DiaryData } from "../Types/DiaryData";

import ShareIcon from "@/public/icons/icon-share-white.svg";
import DiaryCard from "./Diary/DiaryCard";
import PlayButton from "./Diary/PlayButton";

interface DiaryProps {
  diariesData: DiaryData[];
  setDiariesData: Dispatch<SetStateAction<DiaryData[]>>;
  diaryIdx: number;
  setDiaryIdx: Dispatch<SetStateAction<number>>;
}

interface ShareProps {
  isOpenShare: boolean;
  setIsOpenShare: Dispatch<SetStateAction<boolean>>;
  setShareDiaryData: Dispatch<SetStateAction<DiaryData | undefined>>;
}

interface CaptureDataProps {
  captureData: string;
  setCaptureData: Dispatch<SetStateAction<string>>;
}

export default function Diary({
  diariesData,
  setDiariesData,
  diaryIdx,
  setDiaryIdx,
  captureData,
  setCaptureData,
  isOpenShare,
  setIsOpenShare,
  setShareDiaryData,
}: DiaryProps & ShareProps & CaptureDataProps) {
  const captureRef = useRef(null);

  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [deg, setDeg] = useState<number>(0);

  const [visible, setVisible] = useState<boolean>(true);

  const shareHandler = async () => {
    setIsOpenShare(!isOpenShare);
    setShareDiaryData(diariesData[diaryIdx]);
  };

  const diaryHandler = useSwipeable({
    onSwiped: (eventData) => {
      setIsSwiping(false);

      if (deg <= -10) {
        if (diaryIdx === diariesData.length - 1) {
          setDiaryIdx(diariesData.length - 1);
        } else {
          setDiaryIdx((preState) => preState + 1);
        }
      }

      if (deg >= 10) {
        if (diaryIdx === 0) {
          setDiaryIdx(0);
        } else {
          setDiaryIdx((preState) => preState - 1);
        }
      }

      setDeg(0);
      setVisible(true);
    },
    onSwiping: (eventData) => {
      setIsSwiping(true);
      const newDeg = Math.floor(
        Math.min(Math.max(eventData.deltaX / 10, -10), 10)
      );

      if (newDeg >= 10 || newDeg <= -10) {
        setVisible(false);
      }

      setDeg(newDeg);
    },
    trackMouse: true,
  });

  const getCardColor = (idx: number) => {
    switch (idx % 3) {
      case 0:
        return "bg-album-first";
      case 1:
        return "bg-album-second";
      case 2:
        return "bg-album-third";
      default:
        return "bg-album-first";
    }
  };

  useEffect(() => {
    const captureData = async () => {
      if (captureRef.current) {
        const canvas = await html2canvas(captureRef.current, { scale: 1 });
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCaptureData(dataUrl);
      }
    };

    captureData();
  }, [setCaptureData, diaryIdx]);

  return (
    <div ref={captureRef} className="flex relative">
      <div
        {...diaryHandler}
        className={`z-30 relative origin-bottom-right transition-all duration-500 opacity-100`}
        style={{
          transform: `rotate(${deg}deg)`,
          opacity: `${visible ? "1" : "0.7"}`,
        }}
      >
        {isSwiping && (
          <div className="absolute inset-0 bg-black bg-opacity-10 z-10 rounded-[38px] ml-1"></div>
        )}
        <button
          onClick={shareHandler}
          className="z-30 rounded-full p-2.5 top-3 right-3 absolute hover:bg-brand-main_200 cursor-pointer"
        >
          <ShareIcon width={24} height={24}></ShareIcon>
        </button>
        <div
          className={`ml-1 cursor-pointer group hover:outline hover:outline-brand-main_200 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] ${getCardColor(
            diaryIdx
          )}`}
        >
          <DiaryCard
            title={diariesData[diaryIdx].title}
            createdAt={diariesData[diaryIdx].createdAt}
            imageUrl={diariesData[diaryIdx].imageUrl}
            summaryContent={diariesData[diaryIdx].summaryContent}
          />
          <div className="bg-white p-2 group:hover:border group-hover:border-t-4 group-hover:border-brand-main_200 absolute -bottom-10 left-1/2 transform -translate-x-1/2 rounded-full">
            <PlayButton
              isSwiping={isSwiping}
              isOpenShare={isOpenShare}
              audioUrl={diariesData[diaryIdx].audioUrl}
            />
          </div>
        </div>
      </div>

      <div className="drop-shadow-xl absolute z-20 origin-bottom-right rotate-[10deg]">
        <div
          className={`cursor-pointer group hover:outline hover:outline-brand-main_200 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] ${getCardColor(
            (diaryIdx + 1) % 3
          )}`}
        >
          <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm z-10"></div>
          <DiaryCard
            title={
              diaryIdx + 1 === diariesData.length
                ? ""
                : diariesData[diaryIdx + 1].title
            }
            createdAt={
              diaryIdx + 1 === diariesData.length
                ? ""
                : diariesData[diaryIdx + 1].createdAt
            }
            imageUrl={
              diaryIdx + 1 === diariesData.length
                ? ""
                : diariesData[diaryIdx + 1].imageUrl
            }
            summaryContent={
              diaryIdx + 1 === diariesData.length
                ? ""
                : diariesData[diaryIdx + 1].summaryContent
            }
          />
        </div>
      </div>
      <div className="drop-shadow-[4px_-4px_8px_rgba(0,0,0,0.3)] absolute z-10 right-20 top-5 origin-bottom-right rotate-[35deg]">
        <div
          className={`cursor-pointer group hover:outline hover:outline-brand-main_200 flex justify-center flex-col items-center relative w-[290px] h-[400px] rounded-[38px] ${getCardColor(
            (diaryIdx + 2) % 3
          )}`}
        ></div>
      </div>
    </div>
  );
}
