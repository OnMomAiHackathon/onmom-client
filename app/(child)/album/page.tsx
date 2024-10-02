"use client";

import { useState } from "react";

import type { DiaryData } from "./types/DiaryData";

import Diary from "./_components/Diary/Diary";
import Dimmed from "./_components/Dimmed";
import Share from "./_components/Share/Share";
import Main from "./_components/Main/Main";

import { initialDiaryData } from "./_data/initialData";
import BottomTabNavigationBar from "../../_components/BottomTabNavigationBar";

export default function AlbumPage() {
  const [diariesData, setDiariesData] = useState<DiaryData[]>(initialDiaryData);
  const [diaryIdx, setDiaryIdx] = useState<number>(0);
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [captureData, setCaptureData] = useState<string>("");
  const [shareDiaryData, setShareDiaryData] = useState<DiaryData>();
  const [isDiaryOpen, setIsDiaryOpen] = useState<boolean>(false);

  return (
    <div className="relative flex items-center justify-center w-[375px] h-full mr-1 overflow-hidden">
      <div className={`${isDiaryOpen ? "hidden" : ""}`}>
        <Main
          diariesData={diariesData}
          setDiariesData={setDiariesData}
          diaryIdx={diaryIdx}
          setDiaryIdx={setDiaryIdx}
          setIsDiaryOpen={setIsDiaryOpen}
        />
      </div>

      {isDiaryOpen && (
        <div className="mb-24">
          <Diary
            diariesData={diariesData}
            diaryIdx={diaryIdx}
            setDiaryIdx={setDiaryIdx}
            setShareDiaryData={setShareDiaryData}
            setCaptureData={setCaptureData}
            isOpenShare={isOpenShare}
            setIsOpenShare={setIsOpenShare}
          />
          {isOpenShare && <Dimmed />}
          <Share
            shareDiaryData={shareDiaryData}
            captureData={captureData}
            isOpenShare={isOpenShare}
            setIsOpenShare={setIsOpenShare}
          />
        </div>
      )}

      <BottomTabNavigationBar />
    </div>
  );
}
