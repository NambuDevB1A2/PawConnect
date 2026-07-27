import Typography from "@/components/common/Typography";
import { getAnimals } from "@/services/paw/animal";

export default async function Page() {
    // 동물 목록 데이타 가져와서 data에 넣기
    const data = await getAnimals();

    return (
        <div>
            <Typography variant="heading"> 보호 동물 </Typography>
            {/* 검색 및 필터 구간 */}

            {/* 보호동물 목록 구간 */}
            {data.animals.map((animal)=>(
                <div key={animal.id}>
                    {animal.name}
                </div>
            ))}
        </div>        
    );
}