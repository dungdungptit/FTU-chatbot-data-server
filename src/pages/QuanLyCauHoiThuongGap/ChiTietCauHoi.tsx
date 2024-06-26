import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Descriptions, Drawer, Image, Tag } from 'antd';
import moment from 'moment';
import Animate from 'rc-animate';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TableBase from '@/components/Table';
import FormIntent from './FormCauHoi';

const { TabPane } = Tabs;
moment.locale('vi');

const Device = ({ }) => {
  // const { socket, initSocket } = useModel('socket');
  const intentModel = useModel('intent');
  const name = intentModel?.record?.intent_detail ?? '';
  const recordDevice = intentModel?.record ?? {};
  const pathname = window.location.pathname;
  const recordId = pathname.split('/')[2];

  const onClose = () => {
    intentModel.setVisibleForm(false);
  };

  const handleEdit = () => {
    intentModel.setEdit(true);
    intentModel.setVisibleForm(true);
  };

  useEffect(() => {
    if (!intentModel?.record?.id) intentModel.getDataById(recordId);
  }, []);

  // console.log(intentModel?.listTrackIp, 'socket');
  return (
    <div>
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => {
              history.back();
            }}
          >
            <b style={{ cursor: 'pointer' }}>
              <ArrowLeftOutlined />
              Quay lại
            </b>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <b>Chủ đề: {name}</b>
          </Breadcrumb.Item>
        </Breadcrumb>
        <br />
        <Button type="primary" htmlType="button" onClick={handleEdit}>
          Chỉnh sửa thông tin
        </Button>
        <br />
        <TableBase
          modelName={'intent'}
          title="Quản lý danh sách câu hỏi"
          columns={[
            {
              title: 'STT',
              dataIndex: 'index',
              width: 80,
              align: 'center',
            },
            {
              title: 'Câu hỏi',
              dataIndex: 'question',
              width: 200,
              align: 'center',
            },
          ]}
          hascreate={true}
          formType={'Drawer'}
          dependencies={[intentModel.page, intentModel.limit, intentModel.condition]}
          widthDrawer={800}
          getData={intentModel.getData}
          noCleanUp={true}
          params={{
            id: recordId,
            page: intentModel.page,
            size: intentModel.limit,
            condition: intentModel.condition,
          }}
          maskCloseableForm={true}
          otherProps={{
            scroll: {
              x: 1000,
            },
          }}
        />
        <Drawer title="Cập nhập" width={720} onClose={onClose} open={intentModel.visibleForm}>
          <FormIntent />
          <CloseOutlined
            onClick={() => {
              intentModel.setVisibleForm(false);
            }}
            style={{ position: 'absolute', top: 24, right: 24, cursor: 'pointer' }}
          />
        </Drawer>
      </Card>
    </div>
  );
};

export default Device;
