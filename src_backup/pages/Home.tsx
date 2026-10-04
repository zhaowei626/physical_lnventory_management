import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Statistic, List, Typography, Button } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FileTextOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';

const { Title, Text } = Typography;

const statsData = [
  { title: '总访问量', value: 112893, icon: <UserOutlined className="text-blue-500 text-2xl" /> },
  { title: '总销售额', value: 12560, icon: <DollarOutlined className="text-green-500 text-2xl" />, prefix: '¥' },
  { title: '订单数', value: 893, icon: <ShoppingCartOutlined className="text-orange-500 text-2xl" /> },
  { title: '新增文档', value: 128, icon: <FileTextOutlined className="text-purple-500 text-2xl" /> },
];

const activities = [
  { title: 'Admin 登录了系统', time: '10 分钟前' },
  { title: '张三 提交了新的审批', time: '1 小时前' },
  { title: '系统 完成了每日备份', time: '2 小时前' },
  { title: '李四 更新了权限配置', time: '昨天' },
];

export const Home: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        title: { text: '最近7天访问量', textStyle: { fontSize: 14, fontWeight: 'normal' } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
        yAxis: { type: 'value' },
        series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', smooth: true, areaStyle: {} }],
      };
      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div>
      <Card style={{ marginBottom: '16px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
        <Title level={4} style={{ margin: 0 }}>欢迎回来，Admin！</Title>
        <Text type="secondary">今天又是充满活力的一天，祝您工作顺利！</Text>
      </Card>

      <Row gutter={16} style={{ marginBottom: '16px', display: 'flex' }}>
        {statsData.map((item, index) => (
          <Col span={6} key={index} style={{ display: 'flex' }}>
            <Card style={{ width: '100%', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
              <Statistic
                title={item.title}
                value={item.value}
                prefix={item.prefix}
                valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
              />
              <div className="absolute right-6 top-6">{item.icon}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ display: 'flex' }}>
        <Col span={16} style={{ display: 'flex' }}>
          <Card
            title="数据统计"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,21,41,.08)', marginBottom: '16px' }}
          >
            <div ref={chartRef} style={{ height: '300px', width: '100%' }} />
          </Card>
        </Col>
        <Col span={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <Card
            title="快捷操作"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,21,41,.08)', marginBottom: '16px' }}
          >
            <div className="grid grid-cols-2 gap-4">
              <Button type="dashed" icon={<PlusOutlined />} block>新增用户</Button>
              <Button type="dashed" icon={<FileTextOutlined />} block>报表导出</Button>
              <Button type="dashed" icon={<ShoppingCartOutlined />} block>订单管理</Button>
              <Button type="dashed" icon={<SettingOutlined />} block>系统设置</Button>
            </div>
          </Card>
          <Card
            title="系统动态"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,21,41,.08)', flex: 1, marginBottom: '16px' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={activities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="text-sm">{item.title}</span>}
                    description={<span className="text-xs text-gray-400">{item.time}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
