import React from 'react';
import { Card, Typography } from 'antd';
import { BorrowApply } from './BorrowApply';
import { BorrowSign } from './BorrowSign';

const { Title } = Typography;

export { BorrowApply, BorrowSign };

export const BorrowOutbound: React.FC = () => (
  <Card style={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
    <Title level={4} style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 600 }}>借料出库签章</Title>
    <p>借料出库签章页面内容开发中...</p>
  </Card>
);

export const BorrowDetails: React.FC = () => (
  <Card style={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
    <Title level={4} style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 600 }}>借用物资明细</Title>
    <p>借用物资明细页面内容开发中...</p>
  </Card>
);

export const BorrowSettlement: React.FC = () => (
  <Card style={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
    <Title level={4} style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 600 }}>借料结算管理</Title>
    <p>借料结算管理页面内容开发中...</p>
  </Card>
);
