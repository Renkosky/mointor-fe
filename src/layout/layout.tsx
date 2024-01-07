import React from 'react';
import { Avatar, Button, Nav, Layout as SemiLayout } from '@douyinfe/semi-ui';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  IconHome, IconHistogram,
  IconLive,
  IconSemiLogo,
  IconBell,
  IconHelpCircle
} from '@douyinfe/semi-icons';
export default function Layout() {
  const { Header, Sider, Content } = SemiLayout;
  const navigate = useNavigate()
  return (
    // <SemiLayout className="components-layout-demo">
    //   <Sider style={{ width: '120px', background: 'var(--semi-color-fill-2)' }}>Sider</Sider>
    //   <SemiLayout>
    //     <Header style={commonStyle}>Header</Header>
    //     <Content><Outlet /></Content>
    //     <Footer style={commonStyle}>Footer</Footer>
    //   </SemiLayout>
    // </SemiLayout>
    <SemiLayout style={{ border: '1px solid var(--semi-color-border)' }}>
      <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          defaultSelectedKeys={['Home']}
          style={{ maxWidth: 220, height: '100%' }}
          items={[
            { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
            { itemKey: 'projects', text: '项目', icon: <IconHistogram size="large" /> },
            { itemKey: 'document', text: '文档', icon: <IconLive size="large" /> },
            // { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> },
          ]}
          onClick={({ itemKey }) => navigate(`/${itemKey}`)}
          header={{
            logo: <IconSemiLogo style={{ fontSize: 36 }} />,
            text: 'Semi Design',
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