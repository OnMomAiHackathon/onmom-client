"use client";

import { useEffect, useState } from "react";

import Diary from "./_components/Diary";
import Dimmed from "./_components/Dimmed";
import Share from "./_components/Share";

export default function AlbumPage() {
  // 공유하기 컴포넌트 관리하기
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);

  return (
    <div className="relative flex items-center justify-start w-[340px] h-[812px] mr-1 overflow-hidden">
      <Diary isOpenShare={isOpenShare} setIsOpenShare={setIsOpenShare} />
      {!isOpenShare && <Dimmed />}
      <Share isOpenShare={isOpenShare} setIsOpenShare={setIsOpenShare} />
    </div>
  );
}
