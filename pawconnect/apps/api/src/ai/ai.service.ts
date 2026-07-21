import { Injectable } from '@nestjs/common';
import { CreatePersonalityAnalysisDto } from './dto/create-personality-analysis.dto';
import { PersonalityAnalysisResultDto } from './dto/personality-analysis-result.dto.ts';

@Injectable()
export class AiService {

    async analysis(dto: CreatePersonalityAnalysisDto,): Promise<PersonalityAnalysisResultDto> {
        {
            // AI 호출
            // 성향 분석
            // 추천 이유
            // 입양 체크포인트
            // 응원 메시지
            return {
                personality: '',
                matchingReason: '',
                adoptionTip: '',
                aiComment: '',
            };
        }
    }
