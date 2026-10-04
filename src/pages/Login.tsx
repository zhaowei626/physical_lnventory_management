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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card
        className="w-[400px] rounded-[12px] bg-[#1d1d1f] border-none"
        bodyStyle={{ padding: '40px' }}
      >
        <div className="text-center mb-8">
          <Title level={2} className="!mb-0 !text-white !font-sf-display tracking-tight">
            实物储备管理系统
          </Title>
          <p className="text-gray-400 mt-2 text-[14px]">欢迎回来，请登录您的账号</p>
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
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="用户名 (admin)" 
              className="bg-[#2a2a2d] border-none text-white hover:bg-[#323235] focus:bg-[#323235]" 
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />} 
              placeholder="密码 (123456)" 
              className="bg-[#2a2a2d] border-none text-white hover:bg-[#323235] focus:bg-[#323235]"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-300">记住我</Checkbox>
            </Form.Item>
            <a className="float-right text-apple-link-dark hover:text-blue-400 text-[14px]" href="#">
              忘记密码？
            </a>
          </Form.Item>

          <Form.Item className="mb-0 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-apple-blue hover:bg-[#0077ED] border-none h-[44px] text-[17px] font-sf-text font-normal rounded-[8px]"
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
