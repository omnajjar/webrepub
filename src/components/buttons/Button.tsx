import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/utils/clsxm';

const ButtonVariant = [
  'primary',
  'success',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;

type ButtonProps = {
  isLoading?: boolean;
  loadingCaption?: string;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      loadingCaption,
      variant = 'primary',
      isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'inline-flex justify-center',
              'rounded-md border',
              'border-transparent bg-indigo-600',
              'py-2 px-4',
              'text-sm font-medium',
              'text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            ],
            variant === 'success' && [
              'inline-flex justify-center',
              'rounded-md border',
              'border-transparent bg-green-600',
              'py-2 px-4',
              'text-sm font-medium',
              'text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border border-primary-500',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'light' && [
              'bg-white text-gray-700',
              'border border-gray-300',
              'hover:bg-gray-100 hover:text-dark',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-gray-900 text-white',
              'border border-gray-600',
              'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              // 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'flex items-center',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
            <span className='ml-1'>{loadingCaption}</span>
          </div>
        )}
        {LeftIcon && (
          <div>
            <LeftIcon className={leftIconClassName} />
          </div>
        )}
        {isLoading ? null : children}
        {RightIcon && (
          <div>
            <RightIcon className={rightIconClassName} />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
