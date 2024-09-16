import { useState } from "react";
import UpdateElectron from "@/components/update";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.less";
import HeaderBox from "./components/Header";
import { Layout, Avatar, Button, Space } from "@arco-design/web-react";
import NodeList from "./components/NoteList";
import NoteCatalog from "./components/NoteCatalog";
import {Editor} from "./components/Editor";
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

function App() {
  
  const [count, setCount] = useState(0);
  return (
    <div className="layout-basic-demo">
      <Layout>
        <Header>
          <HeaderBox></HeaderBox>
        </Header>
        <Layout>
          <Sider
            resizeDirections={["right"]}
            style={{
              minWidth: 150,
              maxWidth: 500,
              paddingTop:5,
              paddingLeft:5
            }}
          >
           
            <Space>
              <NoteCatalog></NoteCatalog>
            </Space>
          </Sider>
          <Content>
            <Editor></Editor>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
