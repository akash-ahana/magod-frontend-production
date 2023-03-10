import React from 'react';
import ScheduleHeader from './ScheduleHeader';
import ScheduleListbody from './ScheduleListbody';
import ScheduleListtable from './ScheduleListtable';
import TryPdf from './TryPdf';

export default function ScheduleList() {
  return (
    <div>
      <TryPdf/>
        <ScheduleHeader/>
       <ScheduleListbody/>
    </div>
  )
}
