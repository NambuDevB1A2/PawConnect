'use client'
import PawtiResult from "@/components/pawti/PawtiResult";
import { PawtiResultData } from "@/types/pawti/pawti.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 결과 페이지
export default function Page() {
    const router = useRouter();
    const [result, setResult] = useState<PawtiResultData | null>(null);

    useEffect(() => {
        const data = sessionStorage.getItem("pawti-result");

        if (!data) {
            router.replace("/pawlab/pawti");
            return;
        }

        setResult(JSON.parse(data));
    }, [router]);

    if (!result) return null;

    return (
        <div>
            <PawtiResult result={result} />
        </div>
    );
}