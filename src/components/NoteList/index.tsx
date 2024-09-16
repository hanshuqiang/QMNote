import {
  Space,
  Grid,
  Button,
  Tabs,
  Typography,
} from "@arco-design/web-react";
const TabPane = Tabs.TabPane;
const Row = Grid.Row;
const Col = Grid.Col;
import "./index.less";
import { useState } from "react";
interface Note {
  id: number;
  title: string;
  content: string;
}


const NodeList = () => {
  const [ notes , setNotes] = useState<Note[]>([
    { id: 1, title: 'Note 1', content: 'This is note 1' },
    { id: 2, title: 'Note 2', content: 'This is note 2' },
    { id: 3, title: 'Note 3', content: 'This is note 3' },
  ]);
  const handleAddNote = () => {
    console.log(2);
    
    const newNote: Note = {
      id: notes.length + 1,
      title: '默认文案',
      content: '默认文案' // default text
    };
    setNotes([...notes, newNote]);
  };
  return (
    <div className="p10">
      
        <Button type="outline" size={"mini"}  onClick={handleAddNote} >
          添加
        </Button>
        <Row>
          <Col>
            <Tabs className={"tabs"} type={"text"} size={"mini"} tabPosition={"left"}>
             
              {notes && notes.map((item:Note) => {
                return <TabPane key={item.id} title={item.title}></TabPane>;
              })}
             
            </Tabs>
          </Col>
        </Row>
      
    </div>
  );
};

export default NodeList;
