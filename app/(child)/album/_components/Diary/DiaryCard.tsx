import Image from "next/image";

import Frame from "@/public/icons/frame.svg";

import type { DiaryData } from "../../types/DiaryData";

type DiaryCardData = Pick<
  DiaryData,
  "title" | "createdAt" | "imageUrl" | "summaryContent"
>;

export default function DiaryCard({
  title,
  createdAt,
  imageUrl,
  summaryContent,
}: DiaryCardData) {
  return (
    <div className="relative w-[270px] h-[380px] p-2 bg-white font-yoonchildfundDaeHan select-none">
      <div className="top-[-12px] right-[-10px] absolute">
        <Frame />
      </div>
      <div className="relative flex flex-row justify-between h-[40px]">
        <div>오늘의 일기</div>
        <div>{createdAt}</div>
      </div>

      <div className="relative h-[225px] overflow-hidden rounded-lg flex-row justify-between flex select-none">
        <Image
          src={imageUrl}
          alt="그림일기 이미지"
          width={254}
          height={200}
          className="object-fill"
          crossOrigin="anonymous"
          style={{ width: 254, height: 200 }}
        ></Image>
      </div>

      <div className="relative flex flex-col mt-1">
        <div
          className="text-xs leading-[26px] h-[80px] overflow-hidden p-1"
          style={{
            maxHeight: "80px",
            overflowY: "scroll",
            scrollbarWidth: "none", // Firefox에서 스크롤바 숨기기
            msOverflowStyle: "none", // IE에서 스크롤바 숨기기
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none; // Chrome, Safari, Opera에서 스크롤바 숨기기
            }
          `}</style>
          {summaryContent}
        </div>
      </div>
    </div>
  );
}
