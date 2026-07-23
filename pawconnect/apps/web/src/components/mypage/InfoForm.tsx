import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Section from "@/components/common/Section";
import Typography from "@/components/common/Typography";
import ProfileImageUploader from "@/components/uploader/ProfileImageUploader";
import styles from "@/styles/mypage/info.module.css"
import { User } from "@/types/user.type";

interface InfoFormProps {
    user?: User;
}

export default function InfoForm({
    user
}: InfoFormProps) {
    return (
        <Section className={styles.wrapper_info} titleText="내 정보 입력">

            <div className={styles.box_info}>
                <div className={styles.box_uploader}>
                    <ProfileImageUploader
                        name="imgProfile" 
                        labelText="프로필 이미지"
                        //errorText={state.imgProfileError}
                        />
                </div>

                <div className={styles.box_input}>
                    <Input 
                        name="email" defaultValue={user?.email}
                        labelText="이메일"
                        helperText="이메일을 입력해주세요"
                        //errorText={state.emailError}
                        />
                    <Input 
                        name="nickname" defaultValue={user?.nickname}
                        labelText="닉네임"
                        helperText="닉네임을 입력해주세요(공백 또는 특수문자 불가 2~16자)"
                        // errorText={clientErrors.nickname ?? state.nicknameError}
                        // onChange={handleNicknameChange}
                        />
                    <div className={styles.box_password}>
                        <Typography weight="bold">비밀번호</Typography>
                        <Button className={styles.btn_password}>변경하기</Button>
                    </div>
                </div>
            </div>
            
            <Button className={styles.btn_save} type="submit">
                저장하기
            </Button>
        </Section>
    );
}