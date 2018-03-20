import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, Form, Input, InputNumber,Icon,Row, Col} from 'antd';
import Sorter from './../util/Sorter';
import Filters from './../util/Filters';
const FormItem = Form.Item;
class TaskList extends  React.Component{
  constructor(props) {
       super(props);
        this.state = {
           recResult:[],
           processName:""
       }; 
       this.key=0;     
  }

  componentDidMount(){
      var self=this;
      $.ajax({
          type: "get",
          url: this.props.taskListUrl,
          dataType: 'json',
          contentType : 'application/json',
          success: function(result){
              result.data.map(function(row){
                for(var i in row){
                    if(row[i]==null){
                       row[i]='';
                    }
                }
              });
              // console.log(result.data);
              self.setState({
                  recResult:result.data
              }); 
          },
          error: function(result){
              alert("操作失败");
          }
      });   
   }
  execute(index){
      window.location.href=this.props.executeUrl+this.state.recResult[index].id;   
  }
  render() { 
      var self=this;
      var filterData = new Filters().filter(this.state.recResult);
      var tableColData=[]
      const columns = [
      {
        title: '序号',
        dataIndex:'index',
        render:(text, record, index)=>(<span>{++index}</span>)
      }, 
      {
        title: '部门',
        dataIndex: 'department',
      },
      {
        title: '流程名称',
        dataIndex: 'processDefinitionId',      
      }, {
        title: '任务ID',
        dataIndex: 'id',
      },{
        title: '任务名称',
        dataIndex: 'name',
      },{
        title: '创建时间',
        dataIndex: 'createTime',
      },{
        title: '发起人',
        dataIndex: 'starter',
      }
      ,{
        title: '操作人',
        dataIndex: 'assignee',
      },{
        title:'执行',
        dataIndex: 'pingfen',    
        render:(text,record,index)=>(<Button onClick={this.execute.bind(this,index,text)}>执行</Button>),  
      } 
    ];
    columns.map(function(rows){
        if(rows.dataIndex&&rows.dataIndex!="index"){
            rows["key"]=rows.dataIndex;
            rows["filters"]=filterData[rows.dataIndex];
            rows["onFilter"]=(value, record) => record[rows.dataIndex].indexOf(value) === 0
            rows["sorter"]=(a, b) => (new Sorter().sort(a[rows.dataIndex], b[rows.dataIndex])) //页内排序
            // rows["sorter"]=(a, b) => (false);
        }
        tableColData.push(rows);
    });

    return (
        <div>
            <Table  pagination={false} columns={tableColData} dataSource={this.state.recResult} />
        </div>
    );
  }
}
if(document.getElementById("taskList")){
   ReactDOM.render(<TaskList  {...pageUrls}/>, document.getElementById("taskList"));
}
export default TaskList;