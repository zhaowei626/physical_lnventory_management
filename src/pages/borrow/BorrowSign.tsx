import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Row, Col, message, Tooltip, Popconfirm } from 'antd';
import { SearchOutlined, ReloadOutlined, EditOutlined, FilePdfOutlined, ExportOutlined, CheckCircleOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface SignItem {
  id: string;
  borrowNo: string;
  companyName: string;
  borrower: string;
  borrowReason: string;
  outWarehouseCode: string;
  comprehensiveStation: string;
  createDate: string;
  expectedConsumeTime: string;
  borrowerSignStatus: string;
  borrowDeptSignStatus: string;
  manageDeptSignStatus: string;
  materialDeptSignStatus: string;
  postTime: string;
  postStatus: string;
}

const mockData: SignItem[] = [
  {
    id: '1',
    borrowNo: 'B202310010001',
    companyName: '辽宁省公司',
    borrower: '张三',
    borrowReason: '10kV线路改造工程紧急用料',
    outWarehouseCode: 'R102',
    comprehensiveStation: '沈阳综合材料站',
    createDate: '2023-10-01',
    expectedConsumeTime: '2023-10-05',
    borrowerSignStatus: '已签',
    borrowDeptSignStatus: '待签',
    manageDeptSignStatus: '待签',
    materialDeptSignStatus: '待签',
    postTime: '-',
    postStatus: '未过账',
  },
  {
    id: '2',
    borrowNo: 'B202310020002',
    companyName: '沈阳公司',
    borrower: '李四',
    borrowReason: '日常维护',
    outWarehouseCode: 'R2A5',
    comprehensiveStation: '大连综合材料站',
    createDate: '2023-10-02',
    expectedConsumeTime: '2023-10-10',
    borrowerSignStatus: '已签',
    borrowDeptSignStatus: '已签',
    manageDeptSignStatus: '已签',
    materialDeptSignStatus: '待签',
    postTime: '-',
    postStatus: '未过账',
  },
  {
    id: '3',
    borrowNo: 'B202310030003',
    companyName: '大连公司',
    borrower: '王五',
    borrowReason: '抢修工程',
    outWarehouseCode: 'R3B1',
    comprehensiveStation: '鞍山综合材料站',
    createDate: '2023-10-03',
    expectedConsumeTime: '2023-10-04',
    borrowerSignStatus: '已签',
    borrowDeptSignStatus: '已签',
    manageDeptSignStatus: '已签',
    materialDeptSignStatus: '已签',
    postTime: '2023-10-04 10:00:00',
    postStatus: '过账成功',
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

const statusOptions = ['全部', '待签', '已签'];
const postStatusOptions = ['全部', '未过账', '过账成功', '过账失败'];
const stationOptions = ['全部', '沈阳综合材料站', '大连综合材料站', '鞍山综合材料站'];

export const BorrowSign: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const handleSearch = () => {
    message.success('执行查询操作');
  };

  const handleReset = () => {
    form.resetFields();
    message.info('重置查询条件');
  };

  const handleSign = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要签章的借料申请');
      return;
    }
    message.success(`成功对 ${selectedRowKeys.length} 条申请进行签章`);
    setSelectedRowKeys([]);
  };

  const handleERPPost = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要过账的借料申请');
      return;
    }
    message.success(`成功对 ${selectedRowKeys.length} 条申请进行ERP过账`);
    setSelectedRowKeys([]);
  };

  const handleGeneratePDF = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要生成PDF的借料申请');
      return;
    }
    message.success(`成功生成 ${selectedRowKeys.length} 份PDF文件`);
  };

  const handleExport = () => {
    message.success('数据导出成功');
  };

  const handleDelete = (record: SignItem) => {
    message.success(`成功删除借用单号：${record.borrowNo}`);
  };

  const handleViewDetails = (record: SignItem) => {
    message.info(`查看借用单号：${record.borrowNo} 的物资明细`);
  };

  const columns: ColumnsType<SignItem> = [
    { title: '序号', key: 'index', width: 50, align: 'center', render: (_, __, index) => index + 1 },
    { title: '借用单号', dataIndex: 'borrowNo', key: 'borrowNo', width: 120, ellipsis: true },
    { title: '单位名称', dataIndex: 'companyName', key: 'companyName', width: 80, ellipsis: true },
    { title: '借料人', dataIndex: 'borrower', key: 'borrower', width: 70, ellipsis: true },
    { 
      title: '借料说明', 
      dataIndex: 'borrowReason', 
      key: 'borrowReason', 
      width: 100, 
      ellipsis: true,
      render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    },
    { title: '借出仓库', dataIndex: 'outWarehouseCode', key: 'outWarehouseCode', width: 80, ellipsis: true },
    { title: '综合材料站', dataIndex: 'comprehensiveStation', key: 'comprehensiveStation', width: 90, ellipsis: true },
    { title: '创建日期', dataIndex: 'createDate', key: 'createDate', width: 90, ellipsis: true },
    { title: '预计耗用', dataIndex: 'expectedConsumeTime', key: 'expectedConsumeTime', width: 90, ellipsis: true },
    { title: '借料人签章', dataIndex: 'borrowerSignStatus', key: 'borrowerSignStatus', width: 90, ellipsis: true },
    { title: '借料部门签章', dataIndex: 'borrowDeptSignStatus', key: 'borrowDeptSignStatus', width: 100, ellipsis: true },
    { title: '管理部门签章', dataIndex: 'manageDeptSignStatus', key: 'manageDeptSignStatus', width: 100, ellipsis: true },
    { title: '物资部门签章', dataIndex: 'materialDeptSignStatus', key: 'materialDeptSignStatus', width: 100, ellipsis: true },
    { title: '过账时间', dataIndex: 'postTime', key: 'postTime', width: 90, ellipsis: true },
    { title: '过账状态', dataIndex: 'postStatus', key: 'postStatus', width: 80, ellipsis: true },
    { 
      title: '操作', 
      key: 'action', 
      width: 80, 
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="物资明细">
            <Button 
              type="text" 
              icon={<FileTextOutlined className="text-blue-500" />} 
              onClick={() => handleViewDetails(record)}
              size="small"
              style={{ padding: 0 }}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这条申请吗？"
              onConfirm={() => handleDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="text" 
                danger
                icon={<DeleteOutlined />} 
                size="small"
                style={{ padding: 0 }}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const inputStyle = { borderRadius: '11px', background: '#fafafc', border: '1px solid #e5e5ea' };
  const selectStyle = { borderRadius: '11px' };

  return (
    <div className="space-y-4">
      {/* 查询区域 */}
      <Card style={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px', border: 'none' }}>
        <Form 
          form={form} 
          layout="vertical" 
          initialValues={{ 
            companyName: '辽宁省公司',
            borrowerSignStatus: '全部',
            borrowDeptSignStatus: '全部',
            manageDeptSignStatus: '全部',
            materialDeptSignStatus: '全部',
            postStatus: '全部',
            comprehensiveStation: '全部'
          }}
        >
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item name="borrowNo" label="借用单号">
                <Input placeholder="请输入借用单号" style={inputStyle} />
              </Form.Item>
            </Col>
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
              <Form.Item name="outWarehouseCode" label="借出仓库编码">
                <Input placeholder="请输入借出仓库编码" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="borrowerSignStatus" label="借料人签章状态">
                <Select style={selectStyle}>
                  {statusOptions.map((status) => (
                    <Select.Option key={status} value={status}>{status}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={4}>
              <Form.Item name="borrowDeptSignStatus" label="借料部门签章状态">
                <Select style={selectStyle}>
                  {statusOptions.map((status) => (
                    <Select.Option key={status} value={status}>{status}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="manageDeptSignStatus" label="管理部门签章状态">
                <Select style={selectStyle}>
                  {statusOptions.map((status) => (
                    <Select.Option key={status} value={status}>{status}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="materialDeptSignStatus" label="物资部门签章状态">
                <Select style={selectStyle}>
                  {statusOptions.map((status) => (
                    <Select.Option key={status} value={status}>{status}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="postStatus" label="过账状态">
                <Select style={selectStyle}>
                  {postStatusOptions.map((status) => (
                    <Select.Option key={status} value={status}>{status}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item name="purchaseOrderNo" label="采购订单编号">
                <Input placeholder="请输入采购订单编号" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="inboundBatchNo" label="入库批次号">
                <Input placeholder="请输入入库批次号" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="borrower" label="借料人">
                <Input placeholder="请输入借料人" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="comprehensiveStation" label="综合材料站">
                <Select style={selectStyle}>
                  {stationOptions.map((station) => (
                    <Select.Option key={station} value={station}>{station}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row>
            <Col span={24}>
              <div className="flex justify-end mt-2">
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
          <Space>
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={handleSign}
              style={{ borderRadius: '8px', backgroundColor: '#0071e3' }}
            >
              签章
            </Button>
            <Button 
              icon={<CheckCircleOutlined />} 
              onClick={handleERPPost}
              style={{ borderRadius: '8px' }}
            >
              ERP过账
            </Button>
            <Button 
              icon={<FilePdfOutlined />} 
              onClick={handleGeneratePDF}
              style={{ borderRadius: '8px' }}
            >
              生成PDF
            </Button>
            <Button 
              icon={<ExportOutlined />} 
              onClick={handleExport}
              style={{ borderRadius: '8px' }}
            >
              数据导出
            </Button>
          </Space>
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
    </div>
  );
};
