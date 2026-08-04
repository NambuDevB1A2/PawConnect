
// AI 내용 줄바꿈 함수(마침표 기준)
export function formatAIResponseText(text: string) {
    if(!text) return "";

    return text
        .replace(/([.!?])\s+(?=[가-힣A-Za-z])/g,"$1\n")
        .trim();
    // .split(".")
    // .filter(Boolean)
    // .map(sentence => sentence.trim() + ".")
    // .join("\n");
}
