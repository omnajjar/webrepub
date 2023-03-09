/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core';
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
} from '@material-ui/core';
import React, { PropsWithChildren, ReactNode } from 'react';

const usePanelStyles = makeStyles((_) => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    '&.Mui-expanded': {
      margin: '0 0',
      minHeight: '40px',
      '&:before': {
        opacity: '1',
      },
      '& + .MuiExpansionPanel-root:before ': {
        display: 'block',
      },
    },
  },
}));

const useSummaryStyles = makeStyles((_) => ({
  root: {
    'min-height': '36px',
    padding: 0,
  },
  content: {
    margin: '0px',
  },
}));

interface PropsSectionProps extends PropsWithChildren {
  caption: string;
  propsNames?: string[];
  summary?: (props: any) => ReactNode;
}

export const PropsSection = ({
  caption,
  propsNames,
  summary,
  children,
}: PropsSectionProps) => {
  const panelClasses = usePanelStyles({});
  const summaryClasses = useSummaryStyles({});

  const { nodeProps } = useNode((node) => ({
    nodeProps:
      propsNames &&
      propsNames.reduce<{ [key: string]: string }>((res, key: string) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));
  return (
    <ExpansionPanel classes={panelClasses}>
      <ExpansionPanelSummary classes={summaryClasses}>
        <div className='w-full px-6'>
          <Grid container direction='row' alignItems='center' spacing={3}>
            <Grid item xs={4}>
              <h5 className='text-light-gray-1 text-dark-gray text-left text-sm font-medium'>
                {caption}
              </h5>
            </Grid>
            {summary && propsNames ? (
              <Grid item xs={8}>
                <h5 className='text-light-gray-2 text-dark-blue text-right text-sm'>
                  {summary(nodeProps)}
                </h5>
              </Grid>
            ) : null}
          </Grid>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: '0px 24px 20px' }}>
        <Divider />
        <Grid container spacing={1}>
          {children}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
