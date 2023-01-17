import * as React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import CreateRecruitment from './recruitlist/CreateRecruitment';
import RecruitmentStatus from './recruitlist/RecruitmentStatus';
import { BasicButton } from './button';

export default function MuiTab({
  value,
  currentRecruitmentHandleLocation,
  markerData,
  handleChange,
  selectData,
  handleClick,

  page,
  setRecruitsData,
  handleCreateClick,
  position,
}) {
  return (
    <TabContext value={value}>
      <Box style={{ width: '50%' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab style={{ width: '50%' }} label='모집 현황' value={'0'} />
          <Tab style={{ width: '50%' }} label='모집 만들기' value={'1'} />
        </Tabs>
        <TabPanel style={{ bacground: 'blue' }} value={'0'}>
          <RecruitmentStatus
            setRecruitsData={setRecruitsData}
            currentRecruitmentHandleLocation={currentRecruitmentHandleLocation}
            handleClick={handleClick}
            markerData={markerData}
            currentPage={page}
          />
        </TabPanel>
        <TabPanel value={'1'}>
          <CreateRecruitment
            position={position}
            handleCreateClick={handleCreateClick}
            selectData={selectData}
          />
        </TabPanel>
      </Box>
    </TabContext>
  );
}
