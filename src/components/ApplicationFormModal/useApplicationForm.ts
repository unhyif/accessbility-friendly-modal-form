import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

/**
 * 지원서 폼 데이터 인터페이스
 */
export interface ApplicationFormData {
  /** 지원자 이름 */
  name: string;
  /** 지원자 이메일 주소 */
  email: string;
  /** 추가 메시지 (선택사항) */
  message?: string;
}

/**
 * 지원서 폼을 관리하는 커스텀 훅
 * react-hook-form을 사용하여 폼 상태와 유효성 검사를 처리합니다.
 *
 * @returns UseFormReturn 객체 (폼 상태, 메서드들)
 */
export function useApplicationForm(): UseFormReturn<ApplicationFormData> {
  return useForm<ApplicationFormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    // 실시간 유효성 검사를 위해 onChange 모드 사용
    mode: 'onChange',
  });
}
