import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { FieldError } from 'react-hook-form';

import {
  StContentWrapper,
  StInputLabel,
} from '@/components/bannerAdmin/CreateBannerModal';
import CalendarInputForm from '@/components/bannerAdmin/form/Calendar';
import FormController from '@/components/bannerAdmin/form/FormController';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

const DateRangeField = () => {
  return (
    <StContentWrapper>
      <StInputLabel>
        <span>노출 일자</span>
        <RequiredIcon />
      </StInputLabel>
      <StDateFieldWrapper>
        <StDateField>
          <FormController
            name="dateRange"
            render={({ field, formState: { errors } }) => {
              const dateError = errors as
                | {
                    dateRange?: FieldError[];
                  }
                | undefined;
              return (
                <CalendarInputForm
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  selectedDateFieldName={field.name}
                  error={
                    (dateError?.dateRange as FieldError[])?.[0]?.message ||
                    (dateError?.dateRange as FieldError[])?.[1]?.message
                  }
                  dateType="startDate"
                />
              );
            }}
          />
        </StDateField>
        <StDateDash>-</StDateDash>
        <StDateField>
          <FormController
            name="dateRange"
            render={({ field }) => (
              <CalendarInputForm
                selectedDate={field.value}
                setSelectedDate={field.onChange}
                selectedDateFieldName={field.name}
                dateType="endDate"
              />
            )}
          />
        </StDateField>
      </StDateFieldWrapper>
    </StContentWrapper>
  );
};

export default DateRangeField;

const StDateDash = styled.span`
  font: ${fontsObject.LABEL_3_14_SB};
`;

const StDateFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray500};
  gap: 1.2rem;
`;

const StDateField = styled.div`
  position: relative;

  width: 100%;
  max-width: 205px;
`;
