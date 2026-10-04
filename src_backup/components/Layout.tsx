import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="h-16 flex items-center justify-center font-bold text-lg text-blue-600 border-b border-gray-100">
          {collapsed ? 'B端' : 'B端管理系统'}
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
      <Layout>
        <Header style={{ padding: 0, background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '24px' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
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
              <Space className="cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <span>{userInfo?.username || 'Admin'}</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '16px',
            minHeight: 'calc(100vh - 112px)',
            background: 'transparent',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
