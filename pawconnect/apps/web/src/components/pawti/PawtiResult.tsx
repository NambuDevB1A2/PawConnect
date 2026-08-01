'use client'
import { PawtiResultData } from "@/types/pawti/pawti.type";
import Button from "@/components/common/Button";
import Typography from "../common/Typography";
import AnimalCard from "../paw/AnimalCard";
import TextArea from "../common/TextArea";
import { useRouter } from "next/navigation";
import { getAnimalDetail } from "@/services/paw/get-animal-detail.server";


interface PawtiResultProps {
    result: PawtiResultData;
}

// PawTI 결과 페이지
export default function PawtiResult({ result }: PawtiResultProps) {
    const router = useRouter();

    // const response = await getAnimalDetail(result.matchedAnimal?.id);
    
    //     if (!response) {
    //         return <NotFound/>
    //     }
    
    //     const { animals } = response;

    return (
        <div>
            <div>
                <Typography variant="title">{result.title}</Typography>
            </div>

            <div>
                <Typography variant="title">{result.keywords.join(",")}</Typography>
            </div>

            <div>
                {
                    result.representativeAnimal &&
                    // <AnimalCard animal={result.representativeAnimal} />
                    <div>
                        <Typography variant="body1">
                            {result.representativeAnimal.name}
                        </Typography>

                        <Typography variant="caption">
                            {result.representativeAnimal.breed}
                        </Typography>
                    </div>
                }
            </div>

            <div>
                {
                    result.matchedAnimal && (
                        <div>
                            <Typography variant="body1">
                                {result.matchedAnimal.name}
                            </Typography>

                            <Typography variant="caption">
                                {result.matchedAnimal.breed}
                            </Typography>
                        </div>
                    )
                }
            </div>

            <div>
                <Button variant="primary">AI 분석 보기</Button>
            </div>
            <TextArea disabled />
            <div>
                <Button variant="outline" onClick={() => 
                    router.push("/paw")}>동물 더보기</Button>

                <Button variant="outline" onClick={() => 
                    router.push("/pawlab/pawti")}>다시하기</Button>
            </div>
        </div>
    );
}
