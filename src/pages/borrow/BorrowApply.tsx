import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Row, Col, InputNumber, message, Tooltip, Modal, DatePicker, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SearchOutlined, ReloadOutlined, FileAddOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface MaterialItem {
  id: string;
  companyName: string;
  storageLoc: string;
  storageLocDesc: string;
  materialCode: string;
  materialDesc: string;
  matClassMajor: string;
  matClassMedium: string;
  matClassMinor: string;
  inventoryQty: number;
  unit: string;
  amount: number;
  specialInvFlag: string;
  factory: string;
}

const mockData: MaterialItem[] = [
  {
    id: '1',
    companyName: '沈阳公司',
    storageLoc: 'R102',
    storageLocDesc: '沈阳中心仓库',
    materialCode: '500123456',
    materialDesc: '10kV电力电缆',
    matClassMajor: '电缆',
    matClassMedium: '电力电缆',
    matClassMinor: '10kV',
    inventoryQty: 5000,
    unit: '米',
    amount: 250000.50,
    specialInvFlag: '无',
    factory: '1100',
  },
  {
    id: '2',
    companyName: '大连公司',
    storageLoc: 'R2A5',
    storageLocDesc: '大连备用仓库',
    materialCode: '500987654',
    materialDesc: '配电变压器',
    matClassMajor: '变压器',
    matClassMedium: '配电变压器',
    matClassMinor: '10kV/0.4kV',
    inventoryQty: 50,
    unit: '台',
    amount: 1500000.00,
    specialInvFlag: '项目暂存',
    factory: '1000',
  },
  {
    id: '3',
    companyName: '鞍山公司',
    storageLoc: 'R3B1',
    storageLocDesc: '鞍山高新仓库',
    materialCode: '500223344',
    materialDesc: '复合绝缘子',
    matClassMajor: '绝缘子',
    matClassMedium: '复合绝缘子',
    matClassMinor: '35kV',
    inventoryQty: 1200,
    unit: '片',
    amount: 144000.00,
    specialInvFlag: '无',
    factory: '1200',
  },
  {
    id: '4',
    companyName: '抚顺公司',
    storageLoc: 'R4C2',
    storageLocDesc: '抚顺市东部库',
    materialCode: '500445566',
    materialDesc: '高压隔离开关',
    matClassMajor: '开关',
    matClassMedium: '高压开关',
    matClassMinor: '10kV',
    inventoryQty: 350,
    unit: '组',
    amount: 525000.00,
    specialInvFlag: '寄存寄售',
    factory: '1300',
  },
  {
    id: '5',
    companyName: '本溪公司',
    storageLoc: 'R5D3',
    storageLocDesc: '本溪城郊备品库',
    materialCode: '500667788',
    materialDesc: '避雷器',
    matClassMajor: '保护设备',
    matClassMedium: '避雷器',
    matClassMinor: '10kV氧化锌',
    inventoryQty: 800,
    unit: '只',
    amount: 120000.00,
    specialInvFlag: '无',
    factory: '1400',
  },
  {
    id: '6',
    companyName: '丹东公司',
    storageLoc: 'R6E4',
    storageLocDesc: '丹东边境中转库',
    materialCode: '500889900',
    materialDesc: '架空导线',
    matClassMajor: '导线',
    matClassMedium: '钢芯铝绞线',
    matClassMinor: 'LGJ-240/30',
    inventoryQty: 15000,
    unit: '千米',
    amount: 300000.00,
    specialInvFlag: '寄存寄售',
    factory: '1500',
  },
  {
    id: '7',
    companyName: '锦州公司',
    storageLoc: 'R7F5',
    storageLocDesc: '锦州港区仓库',
    materialCode: '500112233',
    materialDesc: '智能电能表',
    matClassMajor: '计量设备',
    matClassMedium: '电能表',
    matClassMinor: '单相智能',
    inventoryQty: 5000,
    unit: '块',
    amount: 750000.00,
    specialInvFlag: '项目暂存',
    factory: '1600',
  },
  {
    id: '8',
    companyName: '营口公司',
    storageLoc: 'R8G6',
    storageLocDesc: '营口开发区库',
    materialCode: '500334455',
    materialDesc: '电力金具',
    matClassMajor: '金具',
    matClassMedium: '连接金具',
    matClassMinor: 'U型挂环',
    inventoryQty: 20000,
    unit: '件',
    amount: 100000.00,
    specialInvFlag: '无',
    factory: '1700',
  },
  {
    id: '9',
    companyName: '阜新公司',
    storageLoc: 'R9H7',
    storageLocDesc: '阜新矿区专库',
    materialCode: '500556677',
    materialDesc: '接地网材料',
    matClassMajor: '接地材料',
    matClassMedium: '铜覆钢',
    matClassMinor: '扁钢',
    inventoryQty: 3000,
    unit: '米',
    amount: 150000.00,
    specialInvFlag: '无',
    factory: '1800',
  },
  {
    id: '10',
    companyName: '辽阳公司',
    storageLoc: 'R0I8',
    storageLocDesc: '辽阳市中心库',
    materialCode: '500778899',
    materialDesc: '跌落式熔断器',
    matClassMajor: '保护设备',
    matClassMedium: '熔断器',
    matClassMinor: '10kV跌落式',
    inventoryQty: 400,
    unit: '具',
    amount: 80000.00,
    specialInvFlag: '项目暂存',
    factory: '1900',
  },
];

const companyOptions = [
  '辽宁省公司',
  '沈阳公司',
  '大连公司',
  '鞍山公司',
  '抚顺公司',
  '本溪公司',
  '丹东公司',
  '锦州公司',
  '营口公司',
  '阜新公司',
  '辽阳公司',
  '盘锦公司',
  '铁岭公司',
  '朝阳公司',
  '葫芦岛公司'
];

export const BorrowApply: React.FC = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [borrowQtys, setBorrowQty] = useState<Record<string, number>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRowKey, setEditingRowKey] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const handleSearch = () => {
    message.success('执行查询操作');
  };

  const handleReset = () => {
    form.resetFields();
    message.info('重置查询条件');
  };

  const handleGenerate = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要借用的物资');
      return;
    }
    
    // 检查已选物资是否都填写了借用数量
    const missingQty = selectedRowKeys.some(key => !borrowQtys[key as string]);
    if (missingQty) {
      message.warning('已选物资请填写借用数量');
      return;
    }

    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    modalForm.validateFields().then((values) => {
      message.success(`成功生成借料申请！项目名称：${values.projectName}`);
      setIsModalVisible(false);
      modalForm.resetFields();
      setSelectedRowKeys([]);
      setBorrowQty({});
      setEditingRowKey(null);
    }).catch(() => {
      // 表单验证失败
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    modalForm.resetFields();
    setEditingRowKey(null);
  };

  const handleBorrowQtyChange = (value: number | null, record: MaterialItem) => {
    let validValue = value;
    if (value && value > record.inventoryQty) {
      validValue = record.inventoryQty;
      message.warning(`借用数量不能超过库存数量 (${record.inventoryQty})`);
    }

    setBorrowQty(prev => ({
      ...prev,
      [record.id]: validValue || 0
    }));

    if (validValue && validValue > 0) {
      // 如果输入了有效数量，且当前行未被选中，则将其选中
      if (!selectedRowKeys.includes(record.id)) {
        setSelectedRowKeys((prevKeys) => [...prevKeys, record.id]);
      }
    } else {
      // 如果清空了数量，取消选中该行
      if (selectedRowKeys.includes(record.id)) {
        setSelectedRowKeys((prevKeys) => prevKeys.filter(key => key !== record.id));
      }
    }
  };

  const columns: ColumnsType<MaterialItem> = [
    { title: '序号', key: 'index', width: 60, align: 'center', render: (_, __, index) => index + 1 },
    { title: '单位名称', dataIndex: 'companyName', key: 'companyName', width: 90, ellipsis: true },
    { title: '库存地点', dataIndex: 'storageLoc', key: 'storageLoc', width: 80, ellipsis: true },
    { 
      title: '库存地点描述', 
      dataIndex: 'storageLocDesc', 
      key: 'storageLocDesc', 
      width: 110,
      ellipsis: true,
      render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    },
    { title: '物料编码', dataIndex: 'materialCode', key: 'materialCode', width: 90, ellipsis: true },
    { 
      title: '物料描述', 
      dataIndex: 'materialDesc', 
      key: 'materialDesc', 
      width: 120,
      ellipsis: true,
      render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    },
    { title: '物料大类', dataIndex: 'matClassMajor', key: 'matClassMajor', width: 80, ellipsis: true },
    { title: '物料中类', dataIndex: 'matClassMedium', key: 'matClassMedium', width: 80, ellipsis: true },
    { title: '物料小类', dataIndex: 'matClassMinor', key: 'matClassMinor', width: 80, ellipsis: true },
    { title: '库存数量', dataIndex: 'inventoryQty', key: 'inventoryQty', width: 80, align: 'right', ellipsis: true },
    { title: '单位', dataIndex: 'unit', key: 'unit', width: 60, align: 'center', ellipsis: true },
    { 
      title: '金额(元)', 
      dataIndex: 'amount', 
      key: 'amount', 
      width: 100, 
      align: 'right', 
      ellipsis: true, 
      render: (val) => val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
    },
    { title: '特殊标识', dataIndex: 'specialInvFlag', key: 'specialInvFlag', width: 80, ellipsis: true },
    { 
      title: '借用数量', 
      key: 'borrowQty', 
      width: 100, 
      align: 'center',
      render: (_, record) => (
        <InputNumber 
          min={1} 
          max={record.inventoryQty}
          placeholder="输入" 
          value={borrowQtys[record.id]}
          style={{ width: '100%', borderRadius: '6px' }} 
          onChange={(value) => handleBorrowQtyChange(value, record)}
        />
      )
    },
    { 
      title: '工厂', 
      dataIndex: 'factory', 
      key: 'factory', 
      width: 100,
      ellipsis: true,
      render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const inputStyle = { borderRadius: '11px', background: '#fafafc', border: '1px solid #e5e5ea' };
  const selectStyle = { borderRadius: '11px' }; // AntD Select applies border differently, we use className/style combination

  const modalColumns: ColumnsType<MaterialItem> = [
    { title: '序号', key: 'index', width: 60, align: 'center', render: (_, __, index) => index + 1 },
    { title: '库存地点', dataIndex: 'storageLoc', key: 'storageLoc' },
    { title: '物料编码', dataIndex: 'materialCode', key: 'materialCode' },
    { title: '物料描述', dataIndex: 'materialDesc', key: 'materialDesc' },
    { title: '库存数量', dataIndex: 'inventoryQty', key: 'inventoryQty', align: 'right' },
    { title: '单位', dataIndex: 'unit', key: 'unit', align: 'center' },
    { 
      title: '借用数量', 
      key: 'borrowQty', 
      align: 'center',
      render: (_, record) => {
        const isEditing = editingRowKey === record.id;
        if (isEditing) {
          return (
            <Space>
              <InputNumber 
                min={1} 
                max={record.inventoryQty}
                value={borrowQtys[record.id]}
                onChange={(value) => handleBorrowQtyChange(value, record)}
                style={{ width: '80px', borderRadius: '6px' }} 
              />
              <Button 
                type="link" 
                icon={<CheckOutlined />} 
                onClick={() => setEditingRowKey(null)}
                size="small"
              >
                保存
              </Button>
            </Space>
          );
        }
        return (
          <Space>
            <span>{borrowQtys[record.id]}</span>
            <Tooltip title="编辑数量">
              <Button 
                type="text" 
                icon={<EditOutlined className="text-gray-400 hover:text-blue-500" />} 
                onClick={() => setEditingRowKey(record.id)}
                size="small"
              />
            </Tooltip>
          </Space>
        );
      }
    },
  ];

  const modalTabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '基础信息',
      children: (
        <div className="py-2">
          <Form form={modalForm} layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="expectedDate" label="预计耗用日期" rules={[{ required: true, message: '请选择预计耗用日期' }]}>
                  <DatePicker style={{ width: '100%', borderRadius: '8px' }} placeholder="请选择日期" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="projectName" label="项目名称" rules={[{ required: true, message: '请输入项目名称' }]}>
                  <Input placeholder="请输入项目名称" style={{ borderRadius: '8px' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="receiver" label="接料人" rules={[{ required: true, message: '请输入接料人' }]}>
                  <Input placeholder="请输入接料人" style={{ borderRadius: '8px' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="customerName" label="客户报装名">
                  <Input placeholder="请输入客户报装名(选填)" style={{ borderRadius: '8px' }} />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name="comprehensiveStation" label="综合材料站" rules={[{ required: true, message: '请选择综合材料站' }]}>
                  <Select placeholder="请选择综合材料站" style={{ borderRadius: '8px' }}>
                    <Select.Option value="station1">沈阳综合材料站</Select.Option>
                    <Select.Option value="station2">大连综合材料站</Select.Option>
                    <Select.Option value="station3">鞍山综合材料站</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="remark" label="借用说明" rules={[{ required: true, message: '请输入借用说明' }]}>
                  <Input.TextArea placeholder="请输入借用说明" rows={3} style={{ borderRadius: '8px' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ),
    },
    {
      key: '2',
      label: '物料清单',
      children: (
        <div className="py-2">
          <Table
            columns={modalColumns}
            dataSource={mockData.filter(item => selectedRowKeys.includes(item.id))}
            rowKey="id"
            pagination={{
              defaultPageSize: 10,
              showTotal: (total) => `共 ${total} 条记录`,
            }}
            size="small"
            bordered
            style={{ fontFamily: '"SF Pro Text", sans-serif' }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* 查询区域 */}
      <Card style={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
        <Form form={form} layout="vertical" initialValues={{ companyName: '辽宁省公司' }}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item name="companyName" label="单位名称">
                <Select style={selectStyle}>
                  {companyOptions.map((company) => (
                    <Select.Option key={company} value={company}>
                      {company}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="storageLoc" label="库存地点">
                <Input placeholder="请输入库存地点" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="storageLocDesc" label="库存地点描述">
                <Input placeholder="请输入库存地点描述" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="materialCode" label="物料编码">
                <Input placeholder="请输入物料编码" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="materialDesc" label="物料描述">
                <Input placeholder="请输入物料描述" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="matClassMajor" label="物料大类">
                <Input placeholder="请输入物料大类" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="matClassMedium" label="物料中类">
                <Input placeholder="请输入物料中类" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="matClassMinor" label="物料小类">
                <Input placeholder="请输入物料小类" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <div className="flex justify-end items-end h-full pb-[24px]">
                <Space size="middle">
                  <Button onClick={handleReset} icon={<ReloadOutlined />} style={{ borderRadius: '8px' }}>
                    重置
                  </Button>
                  <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />} style={{ borderRadius: '8px', backgroundColor: '#0071e3' }}>
                    查询
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 结果展示区域 */}
      <Card style={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
        <div className="flex justify-end mb-4">
          <Button 
            type="primary" 
            icon={<FileAddOutlined />} 
            onClick={handleGenerate}
            style={{ borderRadius: '8px', backgroundColor: '#0071e3' }}
          >
            生成借料申请
          </Button>
        </div>

        <style>
          {`
            .custom-pagination-table .ant-pagination {
              width: 100%;
            }
            .custom-pagination-table .ant-pagination-total-text {
              margin-right: auto !important;
            }
          `}
        </style>
        <Table
          className="custom-pagination-table"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: mockData.length,
            onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
            showSizeChanger: false,
            showTotal: (total) => (
              <Space>
                <span>共 {total} 条记录</span>
                <Select
                  value={pagination.pageSize}
                  onChange={(size) => setPagination({ current: 1, pageSize: size })}
                  options={[
                    { value: 10, label: '10 条/页' },
                    { value: 20, label: '20 条/页' },
                    { value: 50, label: '50 条/页' },
                    { value: 100, label: '100 条/页' },
                  ]}
                  size="small"
                />
              </Space>
            ),
          }}
          style={{ fontFamily: '"SF Pro Text", sans-serif' }}
        />
      </Card>

      <Modal
        title={<span style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 600 }}>生成借料申请</span>}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText="确定"
        cancelText="取消"
        okButtonProps={{ style: { borderRadius: '8px', backgroundColor: '#0071e3' } }}
        cancelButtonProps={{ style: { borderRadius: '8px' } }}
        destroyOnClose
      >
        <Tabs defaultActiveKey="1" items={modalTabItems} />
      </Modal>
    </div>
  );
};
