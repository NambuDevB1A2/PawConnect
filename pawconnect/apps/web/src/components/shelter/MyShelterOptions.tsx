'use client';

import IconButton from "@/components/common/IconButton";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import styles from "@/styles/shelter/ShelterCard.module.css"
import { Shelter } from "@/types/shelter/shelter.type";

interface MyShelterOptionsProps {
    shelter?: Shelter;
}

export default function MyShelterOptions({
    shelter,
}: MyShelterOptionsProps) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    if (!shelter) {
        return null;
    }
    
    const isMyShelter = user?.shelterId === shelter.id;

    const handleEdit = () => {
        router.push(`/mypage/shelter/info`);
    };

    return (
        <div className={styles.box_icons}>
            {isMyShelter &&
                <div>
                    <IconButton 
                        name="edit" 
                        color="color_default" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit();
                        }}
                    />
                </div>
            }
        </div>
    );
}