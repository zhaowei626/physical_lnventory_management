import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store';

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, logout } = useAppStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '首页',
    },
    {
      key: '/borrow',
      icon: <SwapOutlined />,
      label: '借用物资',
      children: [
        {
          key: '/borrow/apply',
          label: '借料申请',
        },
        {
          key: '/borrow/sign',
          label: '借料申请签字',
        },
        {
          key: '/borrow/outbound',
          label: '借料出库签章',
        },
        {
          key: '/borrow/details',
          label: '借用物资明细',
        },
        {
          key: '/borrow/settlement',
          label: '借料结算管理',
        },
      ],
    },
    {
      key: '/system',
      icon: <SettingOutlined />,
      label: '系统管理',
      children: [
        {
          key: '/system/user',
          label: '用户管理',
        },
        {
          key: '/system/role',
          label: '角色管理',
        },
        {
          key: '/system/permission',
          label: '权限管理',
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="light"
        style={{ overflow: 'auto', height: '100vh', position: 'sticky', left: 0, top: 0, bottom: 0 }}
      >
        <div className="h-16 flex items-center justify-center font-bold text-lg text-blue-600 border-b border-gray-100">
          {collapsed ? '储备' : '实物储备管理系统'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['/system']}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout style={{ display: 'flex', flexDirection: 'column' }}>
        <Header style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{ color: '#fff' }} /> : <MenuFoldOutlined style={{ color: '#fff' }} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 48,
              height: 48,
              color: '#fff',
            }}
          />
          <div>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              <Space className="cursor-pointer" style={{ color: '#fff' }}>
                <Avatar icon={<UserOutlined />} size="small" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                <span className="text-[12px]">{userInfo?.username || 'Admin'}</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '0',
            padding: '24px',
            overflow: 'auto',
            flex: 1,
            background: '#f5f5f7',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
