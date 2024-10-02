import { Dispatch, SetStateAction } from "react";

import type { DiaryData } from "../../types/DiaryData";

import CalendarContainer from "./CalendarContainer";
import MemberGreeting from "./MemberGreeting";
import UserInterest from "./UserInterest";

interface DiaryCalendarProps {
  setIsDiaryOpen: Dispatch<SetStateAction<boolean>>;
}
interface DiaryProps {
  diariesData: DiaryData[];
  setDiariesData: Dispatch<SetStateAction<DiaryData[]>>;
  diaryIdx: number;
  setDiaryIdx: Dispatch<SetStateAction<number>>;
}

export default function Main({
  setIsDiaryOpen,
  diariesData,
  setDiariesData,
  diaryIdx,
  setDiaryIdx,
}: DiaryCalendarProps & DiaryProps) {
  return (
    <div className="mt-5">
      <MemberGreeting />
      <CalendarContainer
        diaryIdx={diaryIdx}
        setDiaryIdx={setDiaryIdx}
        diariesData={diariesData}
        setDiariesData={setDiariesData}
        setIsDiaryOpen={setIsDiaryOpen}
      />
      <UserInterest />
    </div>
  );
}
