import React from 'react';
import { Table, Tooltip } from '@douyinfe/semi-ui';
import dayjs from 'dayjs';
import {
  XhrDescription,
  ConsoleDescription,
  ClickDescription,
  RouteDescription,
  UnhandledrejectionDescription,
  CodeErrorDescription,
  CustomerDescription,
  ResourceDescription,
  LevelColumn,
  Severity,
} from '../customColumns/customColumns';
export enum BREADCRUMBTYPES {
  ROUTE = 'Route',
  CLICK = 'UI.Click',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  FETCH = 'Fetch',
  UNHANDLEDREJECTION = 'Unhandledrejection',
  VUE = 'Vue',
  REACT = 'React',
  RESOURCE = 'Resource',
  CODE_ERROR = 'Code Error',

  CUSTOMER = 'Customer',
  // wx life cycle
  APP_ON_SHOW = 'App On Show',
  APP_ON_LAUNCH = 'App On Launch',
  APP_ON_HIDE = 'App On Hide',
  PAGE_ON_SHOW = 'Page On Show',
  PAGE_ON_HIDE = 'Page On Hide',
  PAGE_ON_SHARE_APP_MESSAGE = 'Page On Share App Message',
  PAGE_ON_SHARE_TIMELINE = 'Page On Share Timeline',
  PAGE_ON_TAB_ITEM_TAP = 'Page On Tab Item Tap',

  // wx BaseEvent
  TAP = 'UI.Tap',
  TOUCHMOVE = 'UI.Touchmove',
}

function DescriptionColumn(props: any) {
  const { row } = props;
  switch (row.type) {
    case BREADCRUMBTYPES.XHR:
    case BREADCRUMBTYPES.FETCH:
      return <XhrDescription row={row}></XhrDescription>;
    case BREADCRUMBTYPES.CONSOLE:
      return <ConsoleDescription data={row.data}></ConsoleDescription>;
    case BREADCRUMBTYPES.CLICK:
    case BREADCRUMBTYPES.TAP:
      return <ClickDescription data={row.data}></ClickDescription>;
    case BREADCRUMBTYPES.ROUTE:
      return <RouteDescription data={row.data}></RouteDescription>;
    case BREADCRUMBTYPES.UNHANDLEDREJECTION:
      return <UnhandledrejectionDescription data={row.data}></UnhandledrejectionDescription>;
    case BREADCRUMBTYPES.REACT:
    case BREADCRUMBTYPES.CODE_ERROR:
      return <CodeErrorDescription data={row.data}></CodeErrorDescription>;
    case BREADCRUMBTYPES.CUSTOMER:
      return <CustomerDescription data={row.data}></CustomerDescription>;
    case BREADCRUMBTYPES.RESOURCE:
      return <ResourceDescription data={row.data}></ResourceDescription>;
    default:
      return <div>BREADCRUMBTYPES类型缺失:{row.type}</div>;
  }
}
export default function BreadCrumbs(props: any) {
  const columns = [
    {
      title: '种类',
      dataIndex: 'category',
      width: 80,
      fixed: 'left' as const,
      render: (category: string) => category,
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: string) => {
        return (
          <div>{type}</div>
          // <div className={styles.type}>
          //   <div className={styles.title}>{type}</div>
          // </div>
        );
      },
      width: 170,
    },
    {
      title: '描述',
      dataIndex: 'data',
      render: (row, record: any) => {
        return <DescriptionColumn row={record}></DescriptionColumn>;
      },
    },
    {
      title: '等级',
      dataIndex: 'level',
      render: (level: Severity) => {
        return <LevelColumn level={level}></LevelColumn>;
      },
      width: 80,
    },
    {
      title: '时间',
      dataIndex: 'time',
      render: (time: string) => {
        return (
          <Tooltip content={time}>
            <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
          </Tooltip>
        );
      },
      width: 100,
      fixed: 'right' as const,
    },
  ];
  return <Table columns={columns} dataSource={props.data}></Table>;
}
