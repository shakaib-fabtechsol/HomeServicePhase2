import React from 'react'
import TabComponent from '../../Components/TabComponent'
import All from '../../Components/Notification/All';
import { Read } from '../../Components/Notification/Read';
import Unread from '../../Components/Notification/Unread';

const Notification = () => {
    const tabData = [
        { label: "All", content: <All/> },
        { label: "Read", content: <Read/> },
        { label: "Unread", content: <Unread/> },
      ];
  return (
    <div>
        <TabComponent tabs={tabData}/>
    </div>
  )
}

export default Notification