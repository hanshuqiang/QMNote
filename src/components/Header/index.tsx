import { Layout, Grid,Input, Avatar, Image, Button } from "@arco-design/web-react";
import "./index.less";
import logoVite from "../../assets/logo.svg";
const Row = Grid.Row;
const Col = Grid.Col;
const InputSearch = Input.Search;
const Header = () => {
  return (
    <Row>
      <Col flex="200px">
        <div className="left" style={{width:'100px',marginLeft:'20px'}}>
          <Image  preview={false} width={100}   src={logoVite}></Image>
        </div>
      </Col>
      <Col flex="auto">
        <div className="center">
          <InputSearch
            className={"search"}
            allowClear
            placeholder="Enter keyword to search"
            style={{ width: 350 , }}
          />
        </div>
      </Col>
      <Col flex="100px">
        <div className={"center left"} style={{ marginRight: 30 }}>
          <Avatar
            className={"center"}
            style={{
              width: 30,
              height: 30,
              marginRight: 5,
              marginLeft: 20,
              border: "1px solid #fff",
            }}
          >
            <img
              alt="avatar"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </Avatar>
          <span style={{ color: "white" }}>admin/</span>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
