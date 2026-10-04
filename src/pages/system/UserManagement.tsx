import React, { useState } from 'react';
import { Card, Table, Input, Button, Tag, Space, Modal, Form, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface UserItem {
  id: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createTime: string;
  lastLogin: string;
}

const mockData: UserItem[] = Array.from({ length: 55 }).map((_, i) => ({
  id: `${i + 1}`,
  userId: `U${String(i + 1).padStart(4, '0')}`,
  userName: `用户 ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? '管理员' : '普通用户',
  status: i % 5 === 0 ? 'inactive' : 'active',
  createTime: '2023-10-01 10:00:00',
  lastLogin: '2023-10-03 12:30:00',
}));

export const UserManagement: React.FC = () => {
  const [data, setData] = useState<UserItem[]>(mockData);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSearch = () => {
    const filtered = mockData.filter((item) => item.userName.includes(searchText) || item.userId.includes(searchText));
    setData(filtered);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
    message.success('删除成功');
  };

  const handleEdit = (record: UserItem) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        setData(data.map((item) => (item.id === editingId ? { ...item, ...values } : item)));
        message.success('修改成功');
      } else {
        const newId = String(data.length + 1);
        setData([{ ...values, id: newId, userId: `U${newId.padStart(4, '0')}`, createTime: new Date().toLocaleString(), lastLogin: '-' }, ...data]);
        message.success('添加成功');
      }
      setIsModalOpen(false);
    });
  };

  const columns: ColumnsType<UserItem> = [
    {
      title: '用户信息',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: 250,
      render: (_, record) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <span>{record.userName}</span>
          <Tag color="blue" bordered={false}>{record.userId}</Tag>
        </Space>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      width: 160,
      sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      align: 'center',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', marginBottom: '16px', border: 'none' }}>
      <div className="flex justify-between mb-4">
        <Space>
          <Input
            placeholder="搜索用户名或ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 240, borderRadius: '11px', background: '#fafafc', border: '3px solid rgba(0, 0, 0, 0.04)' }}
          />
          <Button type="default" className="bg-[#fafafc] border-[1px] border-gray-200 text-[14px] text-[rgba(0,0,0,0.8)] rounded-[11px]" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ borderRadius: '8px' }}>
          新增用户
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        pagination={{
          total: data.length,
          showTotal: (total) => `共 ${total} 条记录`,
          defaultPageSize: 10,
        }}
        style={{ fontFamily: '"SF Pro Text", sans-serif' }}
      />

      <Modal
        title={editingId ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="userName" label="用户名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="管理员">管理员</Select.Option>
              <Select.Option value="普通用户">普通用户</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="active">正常</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
