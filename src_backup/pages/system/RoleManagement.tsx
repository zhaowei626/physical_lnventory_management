import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Tree, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface RoleItem {
  id: string;
  roleName: string;
  description: string;
  createTime: string;
}

const mockRoles: RoleItem[] = [
  { id: '1', roleName: '超级管理员', description: '系统最高权限', createTime: '2023-10-01 10:00:00' },
  { id: '2', roleName: '普通管理员', description: '日常管理权限', createTime: '2023-10-02 11:00:00' },
  { id: '3', roleName: '访客', description: '仅供查看', createTime: '2023-10-03 12:00:00' },
];

const treeData = [
  {
    title: '系统管理',
    key: 'system',
    children: [
      { title: '用户管理', key: 'system:user' },
      { title: '角色管理', key: 'system:role' },
      { title: '权限管理', key: 'system:permission' },
    ],
  },
  {
    title: '业务管理',
    key: 'business',
    children: [
      { title: '订单管理', key: 'business:order' },
      { title: '商品管理', key: 'business:product' },
    ],
  },
];

export const RoleManagement: React.FC = () => {
  const [data, setData] = useState<RoleItem[]>(mockRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
    message.success('删除成功');
  };

  const handleEdit = (record: RoleItem) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handlePermission = (record: RoleItem) => {
    setEditingId(record.id);
    setCheckedKeys(['system:user', 'business:order']); // Mock checked keys
    setIsPermissionModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        setData(data.map((item) => (item.id === editingId ? { ...item, ...values } : item)));
        message.success('修改成功');
      } else {
        const newId = String(data.length + 1);
        setData([{ ...values, id: newId, createTime: new Date().toLocaleString() }, ...data]);
        message.success('添加成功');
      }
      setIsModalOpen(false);
    });
  };

  const handlePermissionOk = () => {
    message.success('权限分配成功');
    setIsPermissionModalOpen(false);
  };

  const columns: ColumnsType<RoleItem> = [
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName', align: 'center', width: 200 },
    { title: '描述', dataIndex: 'description', key: 'description', align: 'center', width: 300 },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center', width: 200 },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<SafetyCertificateOutlined />} onClick={() => handlePermission(record)}>
            权限分配
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
          新增角色
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
      />

      <Modal title={editingId ? '编辑角色' : '新增角色'} open={isModalOpen} onOk={handleModalOk} onCancel={() => setIsModalOpen(false)} destroyOnClose>
        <Form form={form} layout="vertical">
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="权限分配" open={isPermissionModalOpen} onOk={handlePermissionOk} onCancel={() => setIsPermissionModalOpen(false)} destroyOnClose>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={(keys) => setCheckedKeys(keys as React.Key[])}
          treeData={treeData}
        />
      </Modal>
    </Card>
  );
};
