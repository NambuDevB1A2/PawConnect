import styles from "@/app/page.module.css"
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton";
import Input from "@/components/common/Input";
import Section from "@/components/common/Section";
import Typography from "@/components/common/Typography";

export default function Home() {
    const wrapperStyle = { margin: "20px", paddingBottom: "500px", display: "flex", flexDirection: "column", gap: "30px" };
    const boxColumnStyle = { display: "flex", paddingLeft: "50px", flexDirection: "column", gap: "10px" };
    const boxRowStyle = { display: "flex", paddingLeft: "50px", flexDirection: "row", alignItems: "center", gap: "10px" };

    return (
        <div style={wrapperStyle}>

            <Typography variant="subtitle">Typography</Typography>
            <div style={boxColumnStyle}>
                <Typography variant="display">Display 사람과 유기동물을 연결하는 입양 플랫폼</Typography>
                <Typography variant="heading">Heading 유기동물 입양 서비스</Typography>
                <Typography variant="title">Title 입양 가능한 친구들</Typography>
                <Typography variant="modaltitle">Modal Title 입양 신청 완료</Typography>
                <Typography variant="subtitle">Sub Title 골든 리트리버 · 2살 · 수컷 </Typography>
                <Typography variant="menutitle">Menu Title 유기 동물</Typography>
                <Typography variant="body1">Body1 보호소에서 보호 중인 유기동물을 확인하고 입양을 신청할 수 있습니다.</Typography>
                <Typography variant="body2">Body2 성향 테스트를 통해 나와 잘 맞는 유기동물을 추천받을 수 있습니다.</Typography>
                <Typography variant="body3">Body3 입양 가능 · 서울 보호소</Typography>
                <Typography variant="caption">Caption 2026.07.03</Typography>
            </div>


            <Typography variant="subtitle">Button</Typography>
            <div style={boxRowStyle}>
                <Button size="large">버튼 L</Button>
                <Button size="medium">버튼 M</Button>
                <Button size="small">버튼 S</Button>
                <Button variant="secondary">버튼 Secondary</Button>
                <Button variant="outline">버튼 outline</Button>
                <Button variant="ghost">버튼 ghost</Button>
                <Button variant="text">버튼 text</Button>
            </div>
            <div style={boxRowStyle}>
                <Button fullWidth>버튼 fulWidth</Button>
            </div>
            <div style={boxRowStyle}>
                <Button variant="success">버튼 sucess</Button>
                <Button variant="danger">버튼 danger</Button>
                <Button variant="warning">버튼 warning</Button>
                <Button disabled>버튼 disabled</Button>
            </div>


            <Typography variant="subtitle">Icon & IconButton</Typography>
            <div style={boxRowStyle}>
                <Icon name="pets"/>
                <Icon name="pets" color="primary"/>
                <Icon name="check_circle" color="success"/>
                <Icon name="info" color="secondary"/>
                <Icon name="warning" color="warning"/>
                <Icon name="error" color="error"/>
                <Icon name="calendar_clock"/>
                <Icon name="volunteer_activism" color="primary"/>
                <Icon name="list_alt_check"/>
                <Icon name="verified_user" color="secondary"/>
                
                <IconButton name="search"/>
                <IconButton name="visibility"/>
                <IconButton name="visibility_off"/>
                <IconButton name="calendar_today"/>
                <IconButton name="mail"/>
                <IconButton name="phone"/>
                <IconButton name="lock"/>
                <IconButton name="filter_list"/>
                <IconButton name="tune"/>
                <IconButton name="expand_more"/>
                <IconButton name="expand_less"/>
                
                <IconButton name="home"/>
                <IconButton name="home" disabled/>
            </div>


            <Typography variant="subtitle">Badges</Typography>
            <div style={boxRowStyle}>
                <Badge size="small">small</Badge>
                <Badge size="medium">medium</Badge>
                
                <Badge variant="success">success</Badge>
                <Badge variant="warning">warning</Badge>
                <Badge variant="completed">completed</Badge>
                <Badge variant="error">error</Badge>
                <Badge variant="info">info</Badge>
                <Badge variant="dog">dog</Badge>
                <Badge variant="cat">cat</Badge>
            </div>


            <Typography variant="subtitle">Input</Typography>
            <div style={boxColumnStyle}>
                <Input labelText="이메일" helperText="이메일을 입력해주세요"></Input>
                <Input labelText="비밀번호" helperText="비밀번호를 입력해주세요 (영문 대소문자, 특수문자 포함 6-30자)" type="password"></Input>
                <Input labelText="비밀번호 재확인" helperText="비밀번호를 다시 입력해주세요" errorText="비밀번호가 일치하지 않습니다" type="password"></Input>
                <Input labelText="보호소 이름" helperText="보호소 이름을 입력해주세요" errorText="중복되지 않습니다" errorType="correct"></Input>
                <Input labelText="닉네임" helperText="닉네임을 입력해주세요" disabled></Input>
            </div>


            <Typography variant="subtitle">Section</Typography>
            <Section titleText="내 정보">
                <Input labelText="이메일" helperText="이메일을 입력해주세요" disabled value="example@email.com"></Input>
                <Input labelText="닉네임" helperText="닉네임을 입력해주세요" disabled value="유저이름여덟글자"></Input>
            </Section>


        </div>
    );
}
