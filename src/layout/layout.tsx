import React from 'react';
import { Avatar, Button, Nav, Layout as SemiLayout } from '@douyinfe/semi-ui';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  IconHome,
  IconApps,
  IconLive,
  IconSemiLogo,
  IconBell,
  IconHelpCircle
} from '@douyinfe/semi-icons';
export default function Layout() {
  const { Header, Sider, Content } = SemiLayout;
  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log(location, 'location');
  const activeStyle = {
    color: 'var(--semi-color-primary)',
  }
  const isActived = (path: string) => {
    return pathname.includes(path) ? activeStyle : {}
  }
  return (
    <SemiLayout style={{ border: '1px solid var(--semi-color-border)' }}>
      <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          defaultSelectedKeys={['Home']}
          style={{ maxWidth: 220, height: '100%' }}
          items={[
            { itemKey: 'overview', text: <span style={isActived('overview')}>首页</span>, icon: <IconHome size="large" style={isActived('overview')} /> },
            { itemKey: 'projects', text: <span style={isActived('projects')}>项目</span>, icon: <IconApps size="large" style={isActived('projects')} /> },
            { itemKey: 'document', text: <span style={isActived('document')}>文档</span>, icon: <IconLive size="large" style={isActived('document')} /> },
            // { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> },
          ]}
          onClick={({ itemKey }) => navigate(`/${itemKey}`)}
          header={{
            logo: <IconSemiLogo style={{ fontSize: 36 }} />,
            text: '监控平台',
          }}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      <SemiLayout>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
            mode="horizontal"
            footer={
              <>
                <Button
                  theme="borderless"
                  icon={<IconBell size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Button
                  theme="borderless"
                  icon={<IconHelpCircle size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Avatar color="orange" size="small">
                  YJ
                </Avatar>
              </>
            }
          ></Nav>
        </Header>
        <Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
          }}
        >
          {/* <Breadcrumb
            style={{
              marginBottom: '24px',
            }}
            routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
          /> */}
          <Outlet />
        </Content>
        {/* <Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: 'var(--semi-color-text-2)',
            backgroundColor: 'rgba(var(--semi-grey-0), 1)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >

            <span>Copyright © 2019 ByteDance. All Rights Reserved. </span>
          </span>
          <span>
            <span style={{ marginRight: '24px' }}>平台客服</span>
            <span>反馈建议</span>
          </span>
        </Footer> */}
      </SemiLayout>
    </SemiLayout>
  );
}