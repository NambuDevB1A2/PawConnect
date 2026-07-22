import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Section from "@/components/common/Section";
import Typography from "@/components/common/Typography";
import ProfileImageUploader from "@/components/uploader/ProfileImageUploader";
import styles from "@/styles/mypage/info.module.css"

export default function Info() {
    return (
        <div className={styles.wrapper_info}>
            <Section className={styles.section_info} titleText="내 정보">

                <div className={styles.box_info}>
                    <div className={styles.box_uploader}>
                        <ProfileImageUploader/>
                    </div>

                    <div className={styles.box_input}>
                        <Input labelText="이메일"/>
                        <Input labelText="닉네임"/>

                        <div className={styles.box_password}>
                            <Typography weight="bold">비밀번호</Typography>
                            <Button size="small">변경하기</Button>
                        </div>
                    </div>
                </div>
                
                <Button className={styles.btn_save} size="small">저장하기</Button>
            </Section>
        </div>
    );
}