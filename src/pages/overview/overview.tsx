import { Card, Col, Empty, Row, Typography } from '@douyinfe/semi-ui';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import request from 'src/utils/request';
import ReactECharts from 'echarts-for-react';
import style from './overview.module.scss'
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';
export default function Overview() {
  const { Text } = Typography;
  const [projects, setProjects] = React.useState([])
  const getMyProjects = () => {
    request.get('/project/my').then(res => {
      console.log(res);
      if (res?.code === 0) {
        setProjects(res?.data?.projects)
        localStorage.setItem('username', res?.data?.name)
      }
    })
  }

  useEffect(() => {
    getMyProjects()
  }, [])

  return (
    <section>
      <div>
        <h1>我的项目</h1>
        {projects.length ? <div className={style.projects}>
          {projects.map((project, index) => {
            return (
              <Card
                key={project?.id}
                title={project?.name}
                style={{ maxWidth: 360 }}
                headerExtraContent={
                  <Text link >
                    查看
                  </Text>
                }
              >
                <div>
                  <Text>开发环境：{project?.devUrl ? <a href={project?.devUrl}>{project?.devUrl}</a> : '-'}</Text>
                </div>
                <div>
                  <Text>测试环境：{project?.uatUrl ? project?.uatUrl : '-'}</Text>
                </div>
                <div>
                  <Text>生产环境：{project?.prodUrl ? project?.prodUrl : '-'}</Text>
                </div>
                <div>
                  <Text>描述：{project?.description ? project?.description : '-'}</Text>
                </div>
                <Row>
                  <Col span={12}>
                    {/* 未解决错误数：{project?.resolvedCount} */}
                  </Col>
                  <Col span={12} style={{ textAlign: 'end' }}>
                    {dayjs(project?.created_at).format('YYYY-MM-DD')}
                  </Col>
                  {/* <Col span={12}>
                  未解决错误数：{project?.resolvedCount}
                </Col> */}
                </Row>
              </Card>
            )
          })}
        </div> : <Empty image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
          darkModeImage={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
          title={'暂无项目'}
          description="您还没有创建项目"></Empty>}
      </div>

      <div>
        <h1>近期报错</h1>
        <ReactECharts
          style={{ height: 400, width: 800 }}
          option={{
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value',
              // splitLine: {
              //   show: false
              // }
            },

            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                areaStyle: {
                  color: 'rgba(24, 144, 255, 0.3)'
                }
              }
            ]
          }}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}

        />
      </div>
    </section>
  )
}
