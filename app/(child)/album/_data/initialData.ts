import { DiaryData } from "../types/DiaryData";

export const initialDiaryData: DiaryData[] = [
  {
    title: "노인회관에서 고스톱 한판",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-01",
    diaryEntryId: 789,
    summaryContent:
      "오늘은 말복이라고 노인정에서 삼계탕을 줬어 짭조롬하니 정말 맛있더라고~~ 기찬 할배랑 고스톱도 치고 수다도 떨고 왔단다. 다음달에 손녀 결혼식한다 그러네 우리 손녀는 언제쯤 할려나",
    imageUrl: "/images/test1.png",
    audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
    dailyAnswers: [
      {
        id: 1,
        questionText: "약은 드셨나요?",
        answerText: "응 먹었어",
        createdAt: "2024-08-27",
      },
    ],
  },
  {
    title: "노인회관에서 즐거운 추억",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-02",
    diaryEntryId: 790,
    summaryContent:
      "오늘은 노인회관에 가서 바둑을 뒀어. 오늘은 말자 할매도 왔더라고 요새 통 안보였는데 오랜만에 만나서 반가웠단다. 요즘 날씨가 많이 더워서 돌아다니기가 힘든데 노인회관은 그래도 에어컨이 잘 나와서 너무 좋아.",
    imageUrl: "/images/test2.png",
    audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
    dailyAnswers: [
      {
        id: 1,
        questionText: "약은 드셨나요?",
        answerText: "응 먹었어",
        createdAt: "2024-08-27",
      },
    ],
  },

  {
    title: "공원 산책",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-03",
    diaryEntryId: 790,
    summaryContent:
      "노인정에서 친해진 할배랑 같이 산책을 했어. 이 할배는 나이보다 10살은 젊어보여 정정해서 보기 좋더라. 내일은 우산 챙겨야겠어 비가 올건지 다리가 많이 쑤시더라고",
    imageUrl: "/images/test3.png",
    audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
    dailyAnswers: [
      {
        id: 1,
        questionText: "약은 드셨나요?",
        answerText: "응 먹었어",
        createdAt: "2024-08-27",
      },
    ],
  },

  {
    title: "명절에 가족들과 모임",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-04",
    diaryEntryId: 790,
    summaryContent:
      "오늘 명절이라 오랜만에 온 가족이 모였어. 다들 편안한 옷을 입고, 거실에 둘러앉아 윷놀이를 했지. 손주도 같이 윷을 던지면서 정말 많이 웃었어. 함께 있는 시간이 너무 좋았어. 가족들이랑 같이 있으니까 집안이 더 따뜻하고 화목하게 느껴졌어. 이런 순간이 자주 있었으면 좋겠네",
    imageUrl: "/images/test4.png",
    audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
    dailyAnswers: [
      {
        id: 1,
        questionText: "약은 드셨나요?",
        answerText: "응 먹었어",
        createdAt: "2024-08-27",
      },
    ],
  },
];
