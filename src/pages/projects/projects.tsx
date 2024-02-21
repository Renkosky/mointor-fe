import { List, Descriptions, ButtonGroup, Button, Modal, Form, Toast, } from '@douyinfe/semi-ui';
import React, { useEffect, useRef } from 'react'
import request from '../../utils/request';
import { STATUS_CODE } from '../../constant';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';

export default function Projects() {
  const { Input } = Form
  const [projects, setProjects] = React.useState<{
    name: string, devUrl: string, uatUrl?: string,
    prodUrl?: string
  }[] | []>([])
  const [visible, setVisible] = React.useState(false)
  const api = useRef<FormApi>();

  const addProject = async () => {
    api.current?.validate().then(async value => {
      const res = await request.post('/project', { data: value })
      if (res?.code === STATUS_CODE.SUCCESS) {
        Toast.success('添加成功')
        setVisible(false)
        getProjects()
      } else {
        Toast.error(res?.msg)
      }
    })

  }

  const getProjects = async () => {
    request.get('/project').then(res => {
      console.log(res);
      if (res?.code === STATUS_CODE.SUCCESS) {
        setProjects(res?.data)
      }
    })
  }

  useEffect(() => {
    getProjects()
  }, [])

  const style = {
    border: '1px solid var(--semi-color-border)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '3px',
    paddingLeft: '20px',
    cursor: 'pointer'
  };
  return (
    <section>
      <Button type='primary' theme='solid' style={{ marginBottom: 10 }} onClick={() => {
        setVisible(true)
      }}>添加项目</Button>
      <List
        grid={{
          gutter: 12,
          span: 6,
        }}
        dataSource={projects}
        renderItem={item => (
          <List.Item style={style} onClick={() => {
            const obj = {}
            obj.noObj.noField = 'no field'
          }}>
            <div>
              <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item?.name}</h3>
              <Descriptions
                align="center"
                size="small"
                row
                data={[
                  // { key: '满意度', value: <Rating allowHalf size="small" value={item.rating} /> },
                  { key: 'DEV环境：', value: <a target='_blank' href={'https://magic.tarsocial.com/'}>{item.devUrl}</a> },
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
      <Modal
        title="新增项目"
        visible={visible}
        onOk={addProject}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}

      >
        <Form labelPosition='left'
          labelAlign='right'
          getFormApi={formApi => api.current = formApi}
        >
          <Input
            label={"项目名称"}
            field={"name"}
            trigger='blur'
            className="form-item"
            rules={[
              { required: true, message: '项目名为必填项' },
              // { validator: (rule, value) => value === 'semi', message: 'should be semi' },
            ]}
          />
          <Input
            label={"DEV地址"}
            field="devUrl"
            className="form-item"
            stopValidateWithError
            rules={[

            ]}
          />
          <Input
            label={"UAT地址"}
            field="uatUrl"
            className="form-item"
            stopValidateWithError
            rules={[

            ]}
          />
          <Input
            label={"PROD地址"}
            field="prodUrl"
            className="form-item"
            stopValidateWithError
            rules={[
            ]}
          />
          <Input
            label={"项目描述"}
            field="description"
            className="form-item"
            stopValidateWithError
          />
        </Form>
      </Modal>
    </section>
  )
}
