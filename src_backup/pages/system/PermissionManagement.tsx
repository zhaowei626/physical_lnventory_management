import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface PermissionItem {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button';
  createTime: string;
  children?: PermissionItem[];
}

const mockPermissions: PermissionItem[] = [
  {
    id: '1',
    name: '系统管理',
    code: 'system',
    type: 'menu',
    createTime: '2023-10-01 10:00:00',
    children: [
      { id: '1-1', name: '用户管理', code: 'system:user', type: 'menu', createTime: '2023-10-01 10:00:00' },
      { id: '1-2', name: '角色管理', code: 'system:role', type: 'menu', createTime: '2023-10-01 10:00:00' },
      { id: '1-3', name: '权限管理', code: 'system:permission', type: 'menu', createTime: '2023-10-01 10:00:00' },
    ],
  },
  {
    id: '2',
    name: '业务管理',
    code: 'business',
    type: 'menu',
    createTime: '2023-10-02 11:00:00',
    children: [
      { id: '2-1', name: '订单管理', code: 'business:order', type: 'menu', createTime: '2023-10-02 11:00:00' },
    ],
  },
];

export const PermissionManagement: React.FC = () => {
  const [data, setData] = useState<PermissionItem[]>(mockPermissions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    const filterData = (list: PermissionItem[]): PermissionItem[] => {
      return list.filter(item => {
        if (item.id === id) return false;
        if (item.children) {
          item.children = filterData(item.children);
        }
        return true;
      });
    };
    setData(filterData([...data]));
    message.success('删除成功');
  };

  const handleEdit = (record: PermissionItem) => {
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
    form.validateFields().then(() => {
      message.success(editingId ? '修改成功' : '添加成功');
      setIsModalOpen(false);
    });
  };

  const columns: ColumnsType<PermissionItem> = [
    { title: '权限名称', dataIndex: 'name', key: 'name', width: 250 },
    { title: '权限标识', dataIndex: 'code', key: 'code', align: 'center', width: 200 },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 150,
      render: (type) => (
        <Tag color={type === 'menu' ? 'blue' : 'green'}>
          {type === 'menu' ? '菜单' : '按钮'}
        </Tag>
      ),
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center', width: 200 },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<PlusOutlined />} onClick={handleAdd}>
            新增下级
          </Button>
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
    <Card style={{ borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,21,41,.08)', marginBottom: '16px' }}>
      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增顶级权限
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        pagination={false}
      />

      <Modal title={editingId ? '编辑权限' : '新增权限'} open={isModalOpen} onOk={handleModalOk} onCancel={() => setIsModalOpen(false)} destroyOnClose>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="权限名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="code" label="权限标识" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
