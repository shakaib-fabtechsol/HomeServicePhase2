import React from 'react'
import { useEffect, useState } from "react";

export default function SupportSr() {
  useEffect(() => {
    document.title = "Supports";
  }, []);
  return (
    <div>
      Support
    </div>
  )
}
