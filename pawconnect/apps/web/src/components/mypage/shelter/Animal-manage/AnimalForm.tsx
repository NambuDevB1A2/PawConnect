// 보호동물 등록/수정 같이 사용할 폼

import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { AnimalDetail } from "@/types/paw/animal-detail.type";

interface AnimalFormProps {
    mode: "create" | "edit";
    animal?: AnimalDetail;
}

export default function AnimalForm() {

    // // 등록 수정 버튼
    // const isPending = ()=> {};
    // const isEdit = !!animal;
    return (
        <div>
            {/* 등록요청 */}
            {/* <Button type="submit">
                {isPending ? "저장중..." : isEdit ? "수정하기":"등록하기"}
            </Button> */}
        </div>
    );
}

// 썸네일(사진미리보기), 업로드 안내 / 보호동물사진 미리보기, 업로드안내(확장자, 용량, 사이즈안내)

// 아래에

// 보호동물이름, 입력칸

// 동물, 드랍다운

// 품종, 드랍다운

// 성별, 드랍다운

// 나이, 추청(체크박스) 나이드랍다운

// 몸무게, 입력칸(개월수로 받음)

//  공고기간, 시작일 입력칸, 마감일 입력칸

// 동물상태, !툴팁, 상태드랍다운

// 발견장소, 입력칸

// 특이사항, 입력칸(0/100자)

// 소개말, 입력칸

// 건강상태, 입력칸(0/500자)

// 등록버튼 

// const [state, formAction, isPending] = useActionState(UpdateShelter, initialState);
//     const router = useRouter();

//     const [clientErrors, setClientErrors] = useState<{
//         shelterName?: string;
//         shelterAddress?: string;
//         shelterAddressDetail?: string;
//         shelterPhone?: string;
//     }>({});
    
//     // 실시간 타이핑 유효성 검사
//     const handleShelterAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setClientErrors((prev) => ({ ...prev, shelterAddress: validateShelterAddress(value) }));
//     };
    
//     const handleShelterAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setClientErrors((prev) => ({ ...prev, shelterAddressDetail: validateShelterAddress(value) }));
//     };
    
//     const handleShelterPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setClientErrors((prev) => ({ ...prev, shelterPhone: validateShelterPhone(value) }));
//     };

//     useEffect(() => {
//         if (!state.response) return;
        
//         if (state.response?.success) {
//             alert('정보 변경에 성공했습니다');
//             router.refresh();
//         } else {
//             alert('정보 변경 도중 오류가 발생했습니다');
//         }
//     }, [state]);
    
//     if (!shelter) {
//         return <NotFound/>;
//     }

//     return (
//         <Section className={styles.wrapper_shelter_info} titleText="보호소 정보 입력">
//             <form action={formAction} className={styles.wrapper_form}>

//                 <BannerImageUploader 
//                     name="imgBanner"
//                     wrapperClassName={styles.wrapper_image_uploader}
//                     labelText="배너 이미지"
//                     initialImageUrl={shelter?.imgBanner}
//                     errorText={state.imgBannerError}/>
                
//                 <ImagesUploader 
//                     name="imgShelter"
//                     wrapperClassName={styles.wrapper_image_uploader}
//                     labelText="보호소 이미지"
//                     initialImageUrls={shelter?.images?.map((img) => img.img)}
//                     errorText={state.imgShelterError}
//                     />

//                 <div className={styles.box_shelter_input}>
//                         <Input 
//                             name="name" defaultValue={shelter?.name}
//                             labelText="보호소 이름"
//                             disabled
//                             />
//                         <Input 
//                             name="address" defaultValue={shelter?.address}
//                             labelText="주소" 
//                             helperText="주소를 입력해주세요"
//                             errorText={clientErrors.shelterAddress ?? state.addressError}
//                             onChange={handleShelterAddress}
//                             />
//                         <Input 
//                             name="addressDetail" defaultValue={shelter?.addressDetail}
//                             labelText="상세 주소" 
//                             helperText="상세 주소를 입력해주세요"
//                             errorText={clientErrors.shelterAddressDetail ?? state.addressDetailError}
//                             onChange={handleShelterAddressDetail}
//                             />
//                         <Input 
//                             name="phone" defaultValue={shelter?.phone}
//                             labelText="전화번호" 
//                             helperText="전화번호를 입력해주세요(-없이 숫자만)"
//                             errorText={clientErrors.shelterPhone ?? state.phoneError}
//                             onChange={handleShelterPhone}
//                             />
//                         <TextArea 
//                             name="operatingHours" defaultValue={shelter?.operatingHours}
//                             labelText="운영 시간"
//                             helperText="보호소를 운영하는 시간과 요일을 입력해주세요(최대 100자)" 
//                             maxLength={100}
//                             />
//                         <TextArea 
//                             name="description" defaultValue={shelter?.description}
//                             labelText="보호소 소개말" 
//                             helperText="보호소를 소개하는 말을 입력해주세요(최대 500자)" 
//                             maxLength={500}
//                             />
//                 </div>

//                 <Button className={styles.btn_save} type="submit" disabled={isPending}>
//                     {isPending ? "저장 중..." : "저장하기"}
//                 </Button>
                
//             </form>
//         </Section>
//     );