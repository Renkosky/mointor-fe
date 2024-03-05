/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Col, Row, Tag, Tooltip } from '@douyinfe/semi-ui';
import { isEmpty, isObject } from 'lodash';
import styles from './customColumns.module.scss';
import { BREADCRUMBCATEGORYS } from 'src/constant';

interface DesPropsType {
  data: any;
}
export enum THEMECOLORS {
  blue = '#2db7f5',
  red = '#ff4d4f',
  green = 'rgb(0, 227, 150)',
  gray = '#a3a5b0',
  apexBlue = '#008FFB',
  apexGreen = '	#00E396',
}

export enum Severity {
  Else = 'else',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug',
  /** 上报的错误等级 */
  Low = 'low',
  Normal = 'normal',
  High = 'high',
  Critical = 'critical',
}
export function dataToString(data: any) {
  if (isEmpty(data)) {
    return '无';
  } else if (isObject(data)) {
    return JSON.stringify(data);
  } else {
    return data;
  }
}

export function LevelColumn(props: { level: Severity }) {
  switch (props.level) {
    case Severity.Info:
      return <Tag color="blue">{props.level}</Tag>;
    case Severity.Error:
      return <Tag color="red">{props.level}</Tag>;
    default:
      return <Tag>{props.level}</Tag>;
  }
}
export function XhrDescription(props: { row: any }) {
  // const eventInfo = useRecoilValue<Events.IEventSls | any>(atomEventInfo)
  const { row } = props;
  const { data } = row;
  const { request } = data;
  const onClickTraceId = (traceId: string) => {
    // const from_time = moment().subtract(7, 'days').format('YYYY-MM-DD')
    // const client_trace_id = traceId
    // const url = `${config.apigwLog}`
    // const remote = eventInfo.ip
    // const result = {
    //   from_time,
    //   client_trace_id,
    //   remote,
    // }
    // const str = Object.entries(result)
    //   .map(([key, value]) => {
    //     return `${key}=${value}`
    //   })
    //   .join(';')
    // window.open(`${url};${str}`)
  };
  if (row.category !== BREADCRUMBCATEGORYS.EXCEPTION) {
    return (
      <div>
        <div>
          <Row className="no-wrap-row" gutter={[0, 6]}>
            <Col>
              <span>{request?.method}</span>
            </Col>
            <Col>
              <a href={request ? request.url : data.url}>{request ? request.url : data.url}</a>
            </Col>
          </Row>
          <Row gutter={[0, 6]}>
            <Col span={24}>
              <span>请求参数:</span>
              {dataToString(request?.data)}
            </Col>
            <Col span={24}>
              <span className={(styles.status, styles.weight)}>traceId:</span>
              <Tooltip content="点击跳转到对应接口网关服务">
                <Button style={{ padding: 0 }} onClick={() => onClickTraceId(request?.traceId)}>
                  {request?.traceId}
                </Button>
              </Tooltip>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <span className={(styles.status, styles.weight)}>message:</span>
                  {data.message}
                </Col>
                <Col span={12}>接口耗时:{data.elapsedTime}ms</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  return (
    <div className={[styles.xhrError, styles.weight].join(' ')}>Error： Network Error 接口耗时{data.elapsedTime}ms</div>
  );
}
export function ConsoleDescription(props: DesPropsType) {
  const { data } = props;
  return (
    <div className={[styles.clg, styles.description].join(' ')}>
      <div className={styles.print}>{data.args.join('')}</div>
      <div className={styles.level}>
        <span className={styles.weight}>type:</span>
        <span>console.{data.level}</span>
      </div>
      <div className={styles.args}>
        <span className={styles.weight}>arguments:</span>
        <span>{JSON.stringify(data.args)}</span>
      </div>
    </div>
  );
}
export function ClickDescription(props: DesPropsType) {
  return <div className={(styles.click, styles.weight)}>{props.data}</div>;
}
export function RouteDescription(props: DesPropsType) {
  const { data } = props;
  return (
    <div className={[styles.route, styles.description].join(' ')}>
      <div>
        <span className={styles.weight}>from:</span>
        {data.from}
      </div>
      <div>
        <span className={styles.weight}>to:</span>
        {data.to}
      </div>
      {data.message && (
        <div>
          <span className={styles.weight}>message:</span>
          {data.message}
        </div>
      )}
    </div>
  );
}
export function VueDescriptiopn(props: DesPropsType) {
  const { data } = props;
  return (
    <div className={[styles.route, styles.description].join(' ')}>
      <div className={styles.from}>
        <span className={styles.weight}>组件名:</span>
        {data.componentName}
      </div>
      <div className={styles.to}>
        <span className={styles.weight}>错误信息:</span>
        {data.message}
      </div>
    </div>
  );
}
export function UnhandledrejectionDescription(props: DesPropsType) {
  const { data } = props;
  return <div>{data.message ? `reason:${data.message}` : ''}</div>;
}

export function CodeErrorDescription(props: DesPropsType) {
  const { data } = props;
  const { stack } = data;
  return (
    <div>
      <Row gutter={[0, 10]}>错误信息:{data.message}</Row>
      {Array.isArray(stack)
        ? stack.map((item, index) => {
            return (
              <Row key={index}>
                <Col span={8}>
                  <span className={styles.weight}>func:</span>
                  {item.func}
                </Col>
                <Col span={16}>
                  <span className={styles.weight}>args:</span>
                  {item.args}
                </Col>
                <Col span={8}>
                  <span className={styles.weight}>line:</span>
                  {item.line}
                </Col>
                <Col span={16}>
                  <span className={styles.weight}>column:</span>
                  {item.column}
                </Col>

                <Col span={24}>
                  <span className={styles.weight}>file url:</span>
                  {item.url}
                </Col>
              </Row>
            );
          })
        : 'Error Stack为空'}
    </div>
  );
}
export function CustomerDescription(props: DesPropsType) {
  const { data } = props;
  return (
    <Row>
      <Col>
        <span className={styles.weight}>message:</span>
        {dataToString(data)}
      </Col>
    </Row>
  );
}

export function ResourceDescription(props: DesPropsType) {
  const { data } = props;
  return (
    <Row gutter={[0, 6]}>
      <Col span={24}>
        <span className={(styles.status, styles.weight)}>页面地址:</span>
        {data.url}
      </Col>
      <Col span={24}>
        <span className={(styles.status, styles.weight)}>name:</span>
        {data.name}
      </Col>
      <Col span={24}>
        <span className={(styles.status, styles.weight)}>message:</span>
        {data.message}
      </Col>
    </Row>
  );
}
