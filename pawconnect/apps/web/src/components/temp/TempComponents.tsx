'use client';

import styles from "@/app/page.module.css"
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton";
import Input from "@/components/common/Input";
import Section from "@/components/common/Section";
import Typography from "@/components/common/Typography";
import CheckBox from '@/components/common/CheckBox';
import { CSSProperties, useContext, useState } from "react";
import Radio from "@/components/common/Radio";
import RadioGroup from "@/components/common/RadioGroup";
import Tooltip from "@/components/common/Tooltip";
import Toggle from "@/components/common/Toggle";
import { ModalContext } from "@/providers/ModalProvider";
import InputPassword from "@/components/common/InputPassword";
import Select from "@/components/common/Select";
import InputSearch from "@/components/common/InputSearch";
import TextArea from "@/components/common/TextArea";
import Pagination from "@/components/common/Pagination";
import ImageUploader from "@/components/uploader/ImageUploader";
import ProfileImageUploader from '../uploader/ProfileImageUploader';
import BannerImageUploader from "@/components/uploader/BannerUploader";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import ImageSlider from "@/components/common/ImageSlider";
import AppImage from "@/components/common/AppImage";

export default function TempComponents() {
    const wrapperStyle: CSSProperties = { margin: "20px", paddingBottom: "500px", display: "flex", flexDirection: "column", gap: "30px" };
    const boxColumnStyle: CSSProperties = { display: "flex", paddingLeft: "50px", flexDirection: "column", gap: "10px" };
    const boxRowStyle: CSSProperties = { display: "flex", paddingLeft: "50px", flexDirection: "row", alignItems: "stretch", gap: "10px" };

    const [page, setPage] = useState(3);

    const { openModal } = useContext(ModalContext);

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
            <Section titleText="내 정보 (Small 왼쪽 정렬)" size="small" align="left">
                <Input labelText="이메일" helperText="이메일을 입력해주세요" disabled value="example@email.com"></Input>
                <Input labelText="닉네임" helperText="닉네임을 입력해주세요" disabled value="유저이름여덟글자"></Input>
                <Button>버튼 primary</Button>
                <Button variant="secondary">버튼 Secondary</Button>
                <Button variant="outline">버튼 outline</Button>
            </Section>
            <Section titleText="내 정보 (large 오른쪽 정렬)" size="large" align="right">
                <Input labelText="이메일" helperText="이메일을 입력해주세요" disabled value="example@email.com"></Input>
                <Input labelText="닉네임" helperText="닉네임을 입력해주세요" disabled value="유저이름여덟글자"></Input>
                <Button>버튼 primary</Button>
                <Button variant="secondary">버튼 Secondary</Button>
                <Button variant="outline">버튼 outline</Button>
            </Section>
            <Section titleText="내 정보 (기본값 FullWidth Center)">
                <Input labelText="이메일" helperText="이메일을 입력해주세요" disabled value="example@email.com"></Input>
                <Input labelText="닉네임" helperText="닉네임을 입력해주세요" disabled value="유저이름여덟글자"></Input>
                <Button>버튼 primary</Button>
                <Button variant="secondary">버튼 Secondary</Button>
                <Button variant="outline">버튼 outline</Button>
            </Section>


            <Typography variant="subtitle">CheckBox & Radio & Toggle</Typography>
            <div style={boxColumnStyle}>
                <CheckBox text="회원가입에 필요한 정보 수집에 동의하십니까?" disabled/>
                <CheckBox text="회원가입에 필요한 정보 수집에 동의하십니까?"/>
                <CheckBox>
                    <Button variant="text">이용약관</Button>
                    <Typography>과 </Typography>
                    <Button variant="text">개인정보 처리방침</Button>
                    <Typography>에 동의합니까?</Typography>
                </CheckBox>

                <RadioGroup name="register_agreement" defaultValue="disagree_info">
                    <Radio value="disagree_info" text="회원가입에 필요한 정보 수집에 동의하십니까?" disabled/>
                    <Radio value="agree_info1" text="회원가입에 필요한 정보 수집에 동의하십니까?"/>
                    <Radio value="agree_info2" text="회원가입에 필요한 정보 수집에 동의하십니까?"/>
                    <Radio value="agree_info3" text="회원가입에 필요한 정보 수집에 동의하십니까?"/>
                    <Radio value="agree_info4" text="회원가입에 필요한 정보 수집에 동의하십니까?"/>
                    <Radio value="agree_terms">
                        <Button variant="text">이용약관</Button>
                        <Typography>과 </Typography>
                        <Button variant="text">개인정보 처리방침</Button>
                        <Typography>에 동의합니까?</Typography>
                    </Radio>
                </RadioGroup>

                <Toggle/>
                <Toggle text="야간모드 설정"/>
                <Toggle>야간모드 설정</Toggle>
            </div>


            <Typography variant="subtitle">ToolTip</Typography>
            <div style={boxRowStyle}>
                <Tooltip text="툴팁 텍스트 들어감"></Tooltip>
                <Tooltip>
                    <Badge variant="error">error</Badge>
                    <Typography variant="caption" color="disabled">이렇게 여러 개의 요소를</Typography>
                    <Typography variant="caption" color="disabled">넣을 수도 있습니다</Typography>
                </Tooltip>
                <Tooltip text="Top 툴팁" position="top"></Tooltip>
                <Tooltip text="Bottom 툴팁" position="bottom"></Tooltip>
                <Tooltip text="Left 툴팁" position="left" iconName="close"></Tooltip>
                <Tooltip text="Right 툴팁" position="right" iconName="more_vert"></Tooltip>
            </div>


            <Typography variant="subtitle">Modal</Typography>
            <div style={boxRowStyle}>
                <Button onClick={() => openModal("loginRequired")}>로그인 확인</Button>
                <Button onClick={() => openModal("confirmDelete", { onConfirm: () => console.log("삭제 완료")})}>삭제 확인</Button>
            </div>


            <Typography variant="subtitle">More</Typography>
            <div style={boxColumnStyle}>
                
            <Section size="large">
                <InputPassword/>
                <InputPassword labelText="비밀번호 재확인" helperText="비밀번호를 다시 입력해주세요"/>
                <InputSearch labelText="검색" onClick={() => {}}/>
                <InputSearch onClick={() => {}}/>
                <TextArea labelText="입양 목적" helperText="입양을 희망하는 이유를 작성해주세요" maxLength={100}/>
                <TextArea maxLength={300} disabled/>
            </Section>

            <Section size="large">
                <Select 
                    labelText="국가"
                    labelPosition="top"
                    helperText="국가를 선택하세요"
                    options={[
                        { label: "대한민국", value: "kr" },
                        { label: "미국", value: "us" },
                        { label: "일본", value: "jp" },
                    ]}
                    onChange={() => {}}
                />

                <Select 
                    labelText="국가"
                    labelPosition="left"
                    labelSize="small"
                    helperText="국가를 선택하세요"
                    options={[
                        { label: "대한민국", value: "kr" },
                        { label: "미국", value: "us" },
                        { label: "일본", value: "jp" },
                    ]}
                    onChange={() => {}}
                    disabled
                />

                <Select 
                    labelText="반려동물 양육 경험 기간"
                    helperText="선택하세요"
                    options={[
                        { label: "1년 미만", value: "lessOne" },
                        { label: "1~3년", value: "oneToThree" },
                        { label: "3~5년", value: "threeToFive" },
                        { label: "5년이상", value: "overFive" },
                    ]}
                    onChange={() => {}}
                />
            </Section>

            </div>
            

            <Typography variant="subtitle">Pagination</Typography>
            <div style={boxColumnStyle}>
                <Pagination 
                    page={page} maxPage={12} 
                    path="/paw"
                    />
            </div>


            <Typography variant="subtitle">Image Uploader</Typography>
            <div style={boxColumnStyle}>
                <div style={boxRowStyle}>
                    <ImageUploader labelText="이미지 업로드"/>
                    <ImagesUploader labelText="이미지 여러 장 업로드"/>
                </div>
                <BannerImageUploader labelText="배너 이미지 업로드"/>
                <ProfileImageUploader labelText="프로필 업로드"/>
            </div>


            <Typography variant="subtitle">Image Slider & Image Modal</Typography>
            <div>
                <ImageSlider
                    disabledDomain
                    images={[
                        "https://d12l2mexpetzlh.cloudfront.net/images/shelter/more/more_1783660168193.jpg",
                        "https://d12l2mexpetzlh.cloudfront.net/images/shelter/more/more_1783830728293.JPG",
                        "https://d12l2mexpetzlh.cloudfront.net/images/shelter/more/more_1784097651928.png",
                        "https://d12l2mexpetzlh.cloudfront.net/images/shelter/more/more_1784180215194.jpg",
                        "https://d12l2mexpetzlh.cloudfront.net/images/shelter/more/more_1783584010738.jpg",
                    ]}
                    />

                <AppImage
                // 이미지 선언시 AppImage 사용(자동 도메인 적용)
                // 도메인 없이 이미지 호출시 disabledDomain 매개변수 적용
                    src={`https://d12l2mexpetzlh.cloudfront.net/images/shelter/more/more_1783830728293.JPG`}
                    disabledDomain
                    />
            </div>

        </div>
    );
}
