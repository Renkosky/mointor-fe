import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import request from '../../../utils/request'
import { Button, SideSheet, Table, Descriptions } from '@douyinfe/semi-ui'

import './detail.css'
import { instance } from '../../../main'
import BreadCrumbs from './breadCrumbs/breadCrumbs'
type DetailData = {
  id: number
  name: string
  type: string
  level: string
  createdAt: string
  resolved: boolean
  message: string
  breadcrumb: any[]
}

export default function Detail() {
  const location = useLocation()
  const [data, setData] = React.useState([])
  const [errorDetail, setErrorDetail] = React.useState<DetailData | null>(null)

  const getDeatil = () => {
    request.get(`/project/detail${location.search}`).then(res => {
      if (res?.code === 0) {
        setData(res.data)
      }
    })
  }
  const columns = [
    {
      title: '错误名称',
      dataIndex: 'name',
      render: (text: string) => {
        return (
          <div>
            {text}
          </div>
        );
      },
    },
    {
      title: '错误类型',
      dataIndex: 'type'
    },
    {
      title: '错误等级',
      dataIndex: 'level'
    },
    // {
    //   title: '所有者'
    // },
    // {title:'发生次数'}
    {
      title: '发生日期',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      dataIndex: 'resolved',
      render: (resolved: boolean, record: DetailData) => {
        return <div>
          <Button type='primary' onClick={() => setErrorDetail(record)}>查看</Button>
          <Button size='small' style={{ fontSize: 12 }} onClick={() => instance.log({ message: 'this is message' })}>标记为解决</Button></div>;
      },
    },
  ];

  useEffect(() => {
    getDeatil()
  }, [])

  return (
    <section>
      <Table columns={columns} dataSource={data} />
      <SideSheet visible={!!errorDetail?.id} onCancel={() => setErrorDetail(null)} size='large'>
        <Descriptions>
          <Descriptions.Item itemKey="错误名称">{errorDetail?.name}</Descriptions.Item>
          <Descriptions.Item itemKey="错误类型">{errorDetail?.type}</Descriptions.Item>
          <Descriptions.Item itemKey="错误信息">{errorDetail?.message}</Descriptions.Item>
          <Descriptions.Item itemKey="错误等级">{errorDetail?.level}</Descriptions.Item>
          <Descriptions.Item itemKey="发生日期">{errorDetail?.createdAt}</Descriptions.Item>
          <Descriptions.Item itemKey="解决状态">{errorDetail?.resolved ? '已解决' : '未解决'}</Descriptions.Item>
        </Descriptions>
        <h3>用户行为</h3>
        <BreadCrumbs data={errorDetail?.breadcrumb ?? []}></BreadCrumbs>
      </SideSheet >
    </section>
  )
}
