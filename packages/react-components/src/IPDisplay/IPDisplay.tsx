import { Icon, Typography } from '@material-ui/core';
import { useIp } from '@webb-dapp/react-environment';
import { Pallet } from '@webb-dapp/ui-components/styling/colors';
import { FontFamilies } from '@webb-dapp/ui-components/styling/fonts/font-families.enum';
import { above } from '@webb-dapp/ui-components/utils/responsive-utils';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const IPDisplayWrapper = styled.div`
  padding: 1rem;
  ${above.sm`  padding: 2rem;`}
  max-width: 500px;
  margin: auto;
  border-radius: 20px;
  display: flex;
  align-items: center;
  ${({ theme }: { theme: Pallet }) => css`
    background: ${theme.layer1Background};
    border: 1px solid ${theme.borderColor};
    ${theme.type === 'light' ? `box-shadow: 0px 0px 14px rgba(51, 81, 242, 0.11);` : ''}
    .label-icon {
      font-size: 40px;
      color: ${theme.primary};
    }

    .tor {
      color: ${theme.primary};
    }
  `}

  .ip-text {
    font-family: ${FontFamilies.AvenirNext};

    b {
      font-family: ${FontFamilies.AvenirNext};
    }
  }

  .ip-info {
    font-family: ${FontFamilies.AvenirNext};
    color: #7c7b86;
  }
`;

type IPDisplayProps = {};

const IPDisplay: React.FC<IPDisplayProps> = () => {
  const { city, countryCode, ip } = useIp();

  function createLocationText() {
    if (city && countryCode) {
      return `${city}, ${countryCode}`;
    }
    return '';
  }

  return (
    <IPDisplayWrapper>
      <Icon className={'label-icon'} style={{ fontSize: 40 }}>
        room
      </Icon>
      <div style={{ paddingLeft: 5 }}>
        <Typography className={'ip-text'} variant={'h5'}>
          Your IP Address is:{' '}
          <b>
            {ip} {createLocationText()}
          </b>
        </Typography>
      </div>
    </IPDisplayWrapper>
  );
};

export default IPDisplay;
