import React, { useState } from 'react';
import { Input } from 'antd';
const {Search} = Input

export interface IData {
  label: string;
  value: string;
}

export default function GlobalSearch() {

  function onChange() {
  }
  return (
    <Search placeholder="请输入" onChange={onChange} style={{width:"300px"}}/>
  );
}
