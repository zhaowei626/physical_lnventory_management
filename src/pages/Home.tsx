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
      <Card style={{ marginBottom: '16px', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
        <Title level={3} style={{ margin: 0, fontFamily: '"SF Pro Display", sans-serif', fontWeight: 600, letterSpacing: '-0.28px' }}>欢迎回来，Admin！</Title>
        <Text type="secondary" style={{ fontSize: '17px', color: 'rgba(0,0,0,0.8)' }}>今天又是充满活力的一天，祝您工作顺利！</Text>
      </Card>

      <Row gutter={16} style={{ marginBottom: '16px', display: 'flex' }}>
        {statsData.map((item, index) => (
          <Col span={6} key={index} style={{ display: 'flex' }}>
            <Card style={{ width: '100%', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
              <Statistic
                title={<span style={{ color: 'rgba(0,0,0,0.8)', fontSize: '14px' }}>{item.title}</span>}
                value={item.value}
                prefix={item.prefix}
                valueStyle={{ fontSize: '28px', fontWeight: 600, fontFamily: '"SF Pro Display", sans-serif', letterSpacing: '0.196px' }}
              />
              <div className="absolute right-6 top-6">{item.icon}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ display: 'flex' }}>
        <Col span={16} style={{ display: 'flex' }}>
          <Card
            title={<span style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 700, fontSize: '21px' }}>数据统计</span>}
            style={{ width: '100%', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', marginBottom: '16px', border: 'none' }}
          >
            <div ref={chartRef} style={{ height: '300px', width: '100%' }} />
          </Card>
        </Col>
        <Col span={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <Card
            title={<span style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 700, fontSize: '21px' }}>快捷操作</span>}
            style={{ width: '100%', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', marginBottom: '16px', border: 'none' }}
          >
            <div className="grid grid-cols-2 gap-4">
              <Button type="default" className="bg-[#fafafc] border-[1px] border-gray-200 text-[14px] text-[rgba(0,0,0,0.8)] rounded-[11px] h-[40px]" icon={<PlusOutlined />} block>新增用户</Button>
              <Button type="default" className="bg-[#fafafc] border-[1px] border-gray-200 text-[14px] text-[rgba(0,0,0,0.8)] rounded-[11px] h-[40px]" icon={<FileTextOutlined />} block>报表导出</Button>
              <Button type="default" className="bg-[#fafafc] border-[1px] border-gray-200 text-[14px] text-[rgba(0,0,0,0.8)] rounded-[11px] h-[40px]" icon={<ShoppingCartOutlined />} block>订单管理</Button>
              <Button type="default" className="bg-[#fafafc] border-[1px] border-gray-200 text-[14px] text-[rgba(0,0,0,0.8)] rounded-[11px] h-[40px]" icon={<SettingOutlined />} block>系统设置</Button>
            </div>
          </Card>
          <Card
            title={<span style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 700, fontSize: '21px' }}>系统动态</span>}
            style={{ width: '100%', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', flex: 1, marginBottom: '16px', border: 'none' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={activities}
              renderItem={(item) => (
                <List.Item style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <List.Item.Meta
                    title={<span className="text-[14px] font-sf-text">{item.title}</span>}
                    description={<span className="text-[12px] font-sf-text text-gray-400">{item.time}</span>}
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
