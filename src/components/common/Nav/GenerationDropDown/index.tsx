import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { IcNewDropdown } from '@/assets/icons';
import { DoSoptLogo, GoSoptLogo } from '@/assets/icons/SoptLogos';
import { useRecoilGenerationSSR } from '@/hooks/useRecoilGenerationSSR';

import {
  StDropdownGeneration,
  StGenerationDropdown,
  StSelectedGeneration,
  StWrapper,
} from './style';

const GENERATION_INFO = [
  {
    generation: '33',
    logo: <DoSoptLogo />,
    slogan: 'DO',
  },
  {
    generation: '32',
    logo: <GoSoptLogo />,
    slogan: 'GO',
  },
];

function GenerationDropDown() {
  const router = useRouter();

  const [currentGeneration, setCurrentGeneration] = useRecoilGenerationSSR();
  const [isDropdownOn, setIsDropdownOn] = useState<boolean>(false);

  const [selectedGenerationInfo, setSelectedGenerationInfo] = useState({
    logo: <DoSoptLogo />,
    slogan: 'DO',
  });

  const handleSelectedGeneration = (
    selectedGeneration: string,
    logo: EmotionJSX.Element,
    slogan: string,
  ) => {
    setCurrentGeneration(selectedGeneration);
    setSelectedGenerationInfo({ logo: logo, slogan: slogan });
    setIsDropdownOn(false);
    const pathSegments = router.asPath.split('/');
    if (pathSegments[pathSegments.length - 1].match(/^\d+$/)) {
      router.push('/attendanceAdmin/session');
    }
  };
  return (
    <StWrapper>
      <StSelectedGeneration onClick={() => setIsDropdownOn(!isDropdownOn)}>
        {selectedGenerationInfo.logo}
        <div>
          <h1>
            {currentGeneration}기 <IcNewDropdown />
          </h1>
          <h2>{selectedGenerationInfo.slogan} SOPT</h2>
        </div>
      </StSelectedGeneration>
      {isDropdownOn && (
        <StGenerationDropdown>
          <div>
            {GENERATION_INFO.map((info) => {
              const { generation, logo, slogan } = info;

              return (
                <StDropdownGeneration
                  key={generation}
                  onClick={() =>
                    handleSelectedGeneration(generation, logo, slogan)
                  }>
                  {logo}
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
