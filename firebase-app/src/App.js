import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';

const { Content, Sider } = Layout;

function getItem(label, key, icon, path) {
  return {
    key,
    icon,
    label: <Link to={path}>{label}</Link>, // Add Link directly to the label
  };
}

const items = [
  getItem('Home', '1', <PieChartOutlined />, '/'),
  getItem('Dashboard', '2', <DesktopOutlined />, '/dashboard'),
  getItem('About', '3', <UserOutlined />, '/about'),
  getItem('Settings', '4', <TeamOutlined />, '/settings'),
  getItem('Files', '5', <FileOutlined />, '/files'),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[
                { title: 'User' },
                { title: 'Bill' },
              ]}
            />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
