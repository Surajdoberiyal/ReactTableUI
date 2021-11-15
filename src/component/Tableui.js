import React,{useEffect,useState} from 'react'
import { Table,Input} from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import Axios from "axios";
import '../App.css'


function Tableui () {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [value, setValue] = useState(''); 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await Axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then(
      res => {
        setloading(false);  
        setstate(
            res.data.map(row => ({
                key: row.id,
                id: row.id,
                name: row.name,
                email: row.email,
                role: row.role,
                action: row.id
          }))
        );
    }
    );
  };
  const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render:(action) => {
            return (
                <>
                <EditOutlined className="edit-icon"
                //  onClick={() => handleRemoveClick()}
                />
                <DeleteOutlined className="delete-icon"
                onClick={()=>{ deleteRow(action) }} />
                </>
            )
        }
      },
  ];  
 const deleteRow = (action)=>{
     console.log(action)
 }

  return (
    <div className="App">
      <h1>Table Frontent UI</h1>
     
      {loading ? (
        "Loading"
      ) : (
       <div>
         <Input
         placeholder="Search Name"
         value={value}
         onChange={e => { const currValue = e.target.value;
         setValue(currValue);
         const filteredData = state.filter(entry =>
          entry.name.includes(currValue) ||
          entry.email.includes(currValue) ||
          entry.role.includes(currValue) 
        );
        setstate(filteredData);
      }}
    />
        <Table
          columns={columns}
          dataSource={state}
          pagination={{ pageSize: 10 }}
          rowSelection={ true}
        />
        </div>
      )}
    </div>
  );
}
export default Tableui;