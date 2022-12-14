import * as React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import CreateRecruitment from './recruitlist/CreateRecruitment';
import RecruitmentStatus from './recruitlist/RecruitmentStatus';

export default function MuiTab() {
  const [value, setValue] = React.useState('0');

  const handleChange = React.useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <TabContext value={value}>
      <Box style={{ width: '50%' }}>
        {/* <Typography sx={{ fontSize: 22 }}>1</Typography> */}
        <Tabs value={value} onChange={handleChange}>
          <Tab style={{ width: '50%' }} label='모집 현황' value={'0'} />
          <Tab style={{ width: '50%' }} label='모집 만들기' value={'1'} />
        </Tabs>
        <TabPanel style={{ bacground: 'blue' }} value={'0'}>
          <RecruitmentStatus />
        </TabPanel>
        <TabPanel value={'1'}>
          <CreateRecruitment />
        </TabPanel>
      </Box>
    </TabContext>
  );
}
