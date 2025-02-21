import React, {useEffect, useState} from 'react';

export default function Chatsr() {
  useEffect(() => {
    document.title = "Chat";
  }, []);
  return (
    <div>
      Chat
    </div>
  )
}
