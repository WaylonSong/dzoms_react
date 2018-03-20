import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import {Table ,Transfer, Input , Form, InputNumber,Button,Cascader,Modal} from 'antd';
import Sorter from './../util/Sorter';
import Filters from './../util/Filters';
class ProcessesList extends React.Component {
  constructor(props) {
       super(props);
        this.state = {
          recResult:[]
       };   
  }

  componentDidMount(){
    var self = this;
    $.ajax({
        type: "GET",
        //url: "/ky/repository/process-definitions",//?latest=true
        url:this.props.processesListUrl,
        dataType: 'json',
        contentType : 'application/json',
        success: function(result){
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
  startForm(index){
     window.location.href =this.props.executeStartForm+this.state.recResult[index].key;     
  }
  render() {
    var self=this;
    var filterData = new Filters().filter(this.state.recResult);
    // console.log(filterData)
    const columns = [
      {
        title: '序号',
        render:(text, record, index)=>(<span>{++index}</span>)
      }
      ,{
        title: '流程名称',
        dataIndex: 'name',
        key:"name",
        // filters: filterData.name, //数据中name的值为空，就报错
        // sorter: (a, b) => (new Sorter().sort(a.name, b.name)),
        // onFilter: (value, record) => record.name.indexOf(value) === 0
       }, {
        title: '流程图预览',
        dataIndex: 'diagramResource',
        key:"diagramResource",
        filters: filterData.diagramResource,
        sorter: (a, b) => (new Sorter().sort(a.diagramResource, b.diagramResource)),
        onFilter: (value, record) => record.diagramResource.indexOf(value) === 0
      }, {
        title: '启动',
        key:'action',
        render:(text,record,index)=>(<Button onClick={this.startForm.bind(this,index)}>启动</Button>),
      }
    ];
    // columns.map(function(rows){
    //     var colName=rows.dataIndex;
    //     rows["key"]=rows.dataIndex;
    //     rows["filters"]=filterData[rows.dataIndex];
    //     rows["onFilter"]=(value, record) => record[rows.dataIndex].indexOf(value) === 0
    //     rows["sorter"]=(a, b) => (new Sorter().sort(a[rows.dataIndex], b[rows.dataIndex])) //页内排序
    //     tableColData.push(rows);
    // });
    // console.log(tableColData);
    return (
        <div>
            <Table  pagination={false} columns={columns} dataSource={self.state.recResult} />
        </div>
    );
  }
}
if(document.getElementById("processesList"))
   ReactDOM.render(<ProcessesList  {...pageUrls}/>, document.getElementById("processesList"));
export default ProcessesList;