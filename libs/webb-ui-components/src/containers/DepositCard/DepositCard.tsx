import { Typography } from '../../typography';
import { forwardRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  AmountInput,
  BridgeInputGroup,
  Button,
  ChainInput,
  InfoItem,
  ShieldedAssetInput,
  TokenInput,
} from '../../components';
import { DepositCardProps } from './types';

export const DepositCard = forwardRef<HTMLDivElement, DepositCardProps>(
  (
    {
      amountInputProps = {},
      bridgingTokenProps,
      buttonProps = {},
      className,
      destChainProps = {},
      feePercentage,
      feeToken,
      sourceChainProps = {},
      token,
      tokenInputProps = {},
      ...props
    },
    ref
  ) => {
    const { amount, fee } = useMemo(() => {
      return {
        amount: !amountInputProps.amount
          ? '--'
          : `${amountInputProps.amount} ${token ?? ''}`,
        fee: !feePercentage
          ? '--'
          : `${
              parseFloat(amountInputProps.amount ?? '0') * feePercentage * 0.01
            } ${feeToken ?? ''}`,
      };
    }, [amountInputProps.amount, feePercentage, feeToken, token]);

    return (
      <div
        {...props}
        className={twMerge(
          'flex flex-col justify-between max-w-[518px]',
          className
        )}
        ref={ref}
      >
        <div className="space-y-4">
          <BridgeInputGroup className="flex flex-col space-y-2">
            <ChainInput {...sourceChainProps} chainType="source" />

            <div className="flex space-x-2">
              <TokenInput
                {...tokenInputProps}
                className="grow shrink-0 basis-1"
              />

              {bridgingTokenProps && (
                <TokenInput
                  {...bridgingTokenProps}
                  title="Bridging Token"
                  className="grow shrink-0 basis-1"
                />
              )}
            </div>
          </BridgeInputGroup>

          <BridgeInputGroup className="flex flex-col space-y-2">
            <ChainInput {...destChainProps} chainType="dest" />
            <AmountInput {...amountInputProps} />
          </BridgeInputGroup>

          {/** Info */}
          <div className="flex flex-col space-y-1">
            <InfoItem
              leftTextProps={{
                title: 'Depositing',
                variant: 'utility',
                info: 'Depositing',
              }}
              rightContent={amount}
            />

            <InfoItem
              leftTextProps={{
                title: `Fees ${feePercentage ? `(${feePercentage}%)` : ''}`,
                variant: 'utility',
                info: 'Fees',
              }}
              rightContent={fee}
            />
          </div>
        </div>

        <Button
          {...buttonProps}
          isFullWidth
          className={twMerge('justify-center', buttonProps.className)}
        >
          {typeof buttonProps.children === 'string' ? (
            <Typography variant="body1" fw="bold" className="!text-inherit">
              {buttonProps.children}
            </Typography>
          ) : (
            buttonProps.children ?? 'Deposit'
          )}
        </Button>
      </div>
    );
  }
);
