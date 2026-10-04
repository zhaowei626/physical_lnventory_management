import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { toast } from 'sonner';

const { Title } = Typography;

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useAppStore((state) => state.setUserInfo);

  const onFinish = (values: any) => {
    setLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      if (values.username === 'admin' && values.password === '123456') {
        setUserInfo({ username: 'admin', role: 'admin' });
        toast.success('登录成功！');
        navigate('/');
      } else {
        toast.error('用户名或密码错误，请使用 admin/123456');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <Card
        className="w-[400px] shadow-2xl rounded-lg"
        bodyStyle={{ padding: '32px' }}
      >
        <div className="text-center mb-8">
          <Title level={3} className="!mb-0">
            B端管理系统
          </Title>
          <p className="text-gray-500 mt-2">欢迎回来，请登录您的账号</p>
        </div>

        <Form
          name="login"
          initialValues={{ username: 'admin', password: '123456', remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名 (admin)" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码 (123456)" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a className="float-right text-blue-600 hover:text-blue-500" href="#">
              忘记密码？
            </a>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-500"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
