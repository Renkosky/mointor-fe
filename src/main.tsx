import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { BrowserOptionsFieldsTypes, init } from '@skymointor/browser';
import { init as MitoInit } from '@mitojs/browser';

import * as echarts from 'echarts/core';
import { LineChart, LineSeriesOption } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;
// export const instance = init({
//   dsn: 'http://localhost:3001/report',
//   maxBreadcrumbs: 5,
//   silentConsole: false,
//   enableTraceId: true,
//   maxDuplicateCount: 1,
// } as BrowserOptionsFieldsTypes, {})

export const instance = MitoInit({
  dsn: 'http://localhost:3001/report',
  maxBreadcrumbs: 5,
  silentConsole: false,
  enableTraceId: true,
  debug: false,
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
