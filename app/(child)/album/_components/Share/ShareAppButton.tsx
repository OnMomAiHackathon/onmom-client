import Image from "next/image";

import type { AppList } from "../../types/AppList";
import base64ToBlob from "../../_utill/base64ToBlob";
import { DiaryData } from "../../types/DiaryData";
import { toast } from "sonner";

interface ShareAppButtons extends AppList {
  captureData: string;
  shareDiaryData: DiaryData | undefined;
}

export default function ShareAppButton({
  shareDiaryData,
  captureData,
  imageUrl,
  appName,
}: ShareAppButtons) {
  const shareHandler = async () => {
    const file = new File(
      [base64ToBlob(captureData, "image/jpeg")],
      "diary.jpg",
      { type: "image/jpeg", lastModified: Date.now() }
    );

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    try {
      const response = await window.Kakao.Share.uploadImage({
        file: dataTransfer.files,
      });

      if (appName === "Naver") {
        window.open(
          `https://share.naver.com/web/shareView?url=${
            response.infos.original.url
          }&title=${
            shareDiaryData
              ? shareDiaryData.title
              : "Ai가 생성한 그림 일기 이미지"
          }`
        );
      } else if (appName === "Facebook") {
        window.open(
          `http://www.facebook.com/sharer/sharer.php?u=${
            response.infos.original.url
          }&title=${
            shareDiaryData
              ? shareDiaryData.title
              : "Ai가 생성한 그림 일기 이미지"
          }`
        );
      } else if (appName === "Twitter") {
        window.open(
          `https://twitter.com/intent/tweet?text=${
            response.infos.original.url
          }${
            shareDiaryData
              ? shareDiaryData.title
              : "Ai가 생성한 그림 일기 이미지"
          }`
        );
      } else if (appName === "add-link") {
        const handleCopyLink = async () => {
          try {
            await navigator.clipboard.writeText(response.infos.original.url);
            toast.success("링크가 클립보드에 복사되었습니다!", {
              duration: 800,
            });
          } catch (err) {
            toast.error("링크 복사에 실패했습니다.");
            console.error("링크 복사 실패:", err);
          }
        };

        handleCopyLink();
      } else {
        const urlPath = response.infos.original.url.replace(
          "http://k.kakaocdn.net/",
          ""
        );

        const audioUrlPath = shareDiaryData
          ? shareDiaryData.audioUrl.replace(
              `${process.env.NEXT_PUBLIC_S3_BUCKET_ADDRESS}`,
              ""
            )
          : "";

        window.Kakao.Share.sendCustom({
          templateId: 111628,
          templateArgs: {
            imageUrl: response.infos.original.url,
            urlPath,
            audioUrlPath,
          },
        });
      }
    } catch (error) {
      console.error("사진 공유하기에서 오류가 발생하였습니다.", error);
    }
  };

  return (
    <button
      onClick={shareHandler}
      className="flex flex-col justify-center items-center hover:outline p-1 hover:outline-blue-300"
    >
      <Image
        src={`${imageUrl}`}
        alt={`${appName} 아이콘 이미지`}
        width={40}
        height={40}
        style={{ width: 40, height: 40 }}
      />
      <div className="text-xs mt-1">{appName}</div>
    </button>
  );
}
