import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import AdvancedDetail from './components/AdvancedDetail';

const { Cell } = ResponsiveGrid;

const Advanced = () => {
  return (
    <ResponsiveGrid>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '详情页面' }, { name: '高级详情' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <AdvancedDetail />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Advanced;
