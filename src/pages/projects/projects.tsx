import { List, Descriptions, Rating, ButtonGroup, Button } from '@douyinfe/semi-ui';
import React, { useEffect } from 'react'
import request from '../../utils/request';
import { STATUS_CODE } from '../../constant';

export default function Projects() {
  const [projects, setProjects] = React.useState<{
    name: string, devUrl: string, uatUrl?: string,
    prodUrl?: string
  }[] | []>([])
  useEffect(() => {
    request.get('/project').then(res => {
      console.log(res);
      if (res?.code === STATUS_CODE.SUCCESS) {
        setProjects(res?.data)
      }
    })
  })

  const style = {
    border: '1px solid var(--semi-color-border)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '3px',
    paddingLeft: '20px',
    cursor: 'pointer'
  };
  return (
    <section>
      <Button type='primary' theme='solid' style={{ marginBottom: 10 }}>添加项目</Button>
      <List
        grid={{
          gutter: 12,
          span: 6,
        }}
        dataSource={projects}
        renderItem={item => (
          <List.Item style={style}>
            <div>
              <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item?.name}</h3>
              <Descriptions
                align="center"
                size="small"
                row
                data={[
                  // { key: '满意度', value: <Rating allowHalf size="small" value={item.rating} /> },
                  { key: 'DEV环境：', value: <a target='_blank' href={item?.devUrl}>{item.devUrl}</a> },
                  item.uatUrl ? { key: 'UAT环境：', value: <a target='_blank' href={item?.devUrl}>{item.uatUrl}</a> } : {},
                  item.prodUrl ? { key: 'UAT环境：', value: <a target='_blank' href={item?.devUrl}>{item.prodUrl}</a> } : {},
                ]}
              />
              <div style={{ margin: '12px 0', display: 'flex', justifyContent: 'flex-end' }}>
                <ButtonGroup theme="borderless" style={{ marginTop: 8 }}>
                  <Button>编辑</Button>
                </ButtonGroup>
              </div>
            </div>
          </List.Item>
        )}
      />
    </section>
  )
}
