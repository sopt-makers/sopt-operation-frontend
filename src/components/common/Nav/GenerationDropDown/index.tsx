import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { IcNewDropdown } from '@/assets/icons';
import { useRecoilGenerationSSR } from '@/hooks/useRecoilGenerationSSR';
import { GENERATION_INFO } from '@/utils/nav';

import {
  StDropdownGeneration,
  StGenerationDropdown,
  StSelectedGeneration,
  StWrapper,
} from './style';

function GenerationDropDown() {
  const router = useRouter();

  const [currentGeneration, setCurrentGeneration] = useRecoilGenerationSSR();
  const [isDropdownOn, setIsDropdownOn] = useState<boolean>(false);

  const handleSelectedGeneration = (selectedGeneration: string) => {
    setCurrentGeneration(selectedGeneration);
    setIsDropdownOn(false);
    const pathSegments = router.asPath.split('/');
    if (pathSegments[pathSegments.length - 1].match(/^\d+$/)) {
      router.push('/attendanceAdmin/session');
    }
  };

  return (
    <StWrapper>
      <StSelectedGeneration
        onClick={() => setIsDropdownOn(!isDropdownOn)}
        onBlur={() => setIsDropdownOn(false)}>
        <div>
          <h1>
            {currentGeneration}기 <IcNewDropdown />
          </h1>
        </div>
      </StSelectedGeneration>
      {isDropdownOn && (
        <StGenerationDropdown>
          <div>
            {GENERATION_INFO.map((info) => {
              const { generation, slogan } = info;

              return (
                <StDropdownGeneration
                  key={generation}
                  onClick={() => handleSelectedGeneration(generation)}>
                  <div>
                    <h1>{generation}기</h1>
                    <h2>{slogan} SOPT</h2>
                  </div>
                </StDropdownGeneration>
              );
            })}
          </div>
        </StGenerationDropdown>
      )}
    </StWrapper>
  );
}

export default GenerationDropDown;
