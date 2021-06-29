import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import type { ScrollBarProps as PerfectScrollbarProps } from 'react-perfect-scrollbar';
import { Box } from '@material-ui/core';

interface ScrollbarProps extends PerfectScrollbarProps {}

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>((props, ref) => {
  const { children } = props;

  return (
    <Box ref={ref} sx={{ overflowX: 'auto' }}>
      {children}
    </Box>
  );
});

Scrollbar.propTypes = {
  children: PropTypes.node
};

export default Scrollbar;
