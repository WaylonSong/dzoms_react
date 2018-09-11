import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Input, Icon,Row, Col,InputNumber,DatePicker } from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class MonthSummarySheet extends  React.Component{
  constructor(props) {
       super(props);
       this.state = {
         recData:[]
      };
  }
  componentDidMount(){
      var self=this;
      $.ajax({
            url:self.props.monthSummarySheetUrl,
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){ 
               if(data.status>0){
                   if(data){ 
                    var data=data.data;
                    for(var i=0;i<data.length;i++){
                        data[i]["key"]=i+1;
                        var kpScore = data[i].kpScore;
                        var plusOrMinusPoints = data[i].plusOrMinusPoints;
                        Object.assign(data[i], kpScore,plusOrMinusPoints);
                        // for(var j in data[i]){ //数据类型转换，数字类型筛选的时候会报错
                        //     data[i][j]=String(data[i][j]);
                        // }
                    }
                    self.setState({
                        recData:data,
                    });
                  }else{ 
                     recData:""
                  }
               }else{
                   return;
               }              
            }.bind(self),
            error:function(){
                alert("请求失败");
            }
      });
  }
  
  render() {
    var filterData = new Filters().filter(this.state.recData);
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    var recData=this.state.recData;
    // console.log(filterData)
    const columns = [
      {
        title: '序号',
        width:150,
        dataIndex: 'key',
        // filters: filterData.key,
        sorter: (a, b) => (new Sorter().sort(a.key, b.key)),
        // onFilter: (value, record) => record.key.indexOf(value) === 0,
      }, 
      {
        title: '部门',
        width:170,
        dataIndex: 'department',
        // filters: filterData.department,
        sorter: (a, b) => (new Sorter().sort(a.department, b.department)),
        // onFilter: (value, record) => record.department.indexOf(value) === 0,
      },
      {
        title: '姓名',
        width:170,
        dataIndex: 'name',
        // filters: filterData.name,
        sorter: (a, b) => (new Sorter().sort(a.name, b.name)),
        // onFilter: (value, record) => record.name.indexOf(value) === 0,
      },{
        title: '考核得分',
        dataIndex: 'kpScore',
        children: [
          {
             title:"合计",
              width:170,
             dataIndex:"total",
             // filters: filterData.total,
             sorter: (a, b) => (new Sorter().sort(a.total, b.total)),
             // onFilter: (value, record) => record.total.indexOf(value) === 0,
          },{
             title:"临时工作",
              width:170,
             dataIndex:"lsxgz", 
             // filters: filterData.lsxgz,
             sorter: (a, b) => (new Sorter().sort(a.lsxgz, b.lsxgz)),
             // onFilter: (value, record) => record.lsxgz.indexOf(value) === 0,
          },{
             title:"日常工作",
              width:170,
             dataIndex:"rcgz", 
             // filters: filterData.rcgz,
             sorter: (a, b) => (new Sorter().sort(a.rcgz, b.rcgz)),
             // onFilter: (value, record) => record.rcgz.indexOf(value) === 0,
          },{
             title:"行为规范",
              width:170,
             dataIndex:"xwgf", 
             // filters: filterData.xwgf,
             sorter: (a, b) => (new Sorter().sort(a.xwgf, b.xwgf)),
             // onFilter: (value, record) => record.xwgf.indexOf(value) === 0,
          }
        ],
      },
      {
        title: '备注',
              width:800,
        dataIndex: 'remarks',
        // filters: filterData.remarks,
        // sorter: (a, b) => (new Sorter().sort(a.remarks, b.remarks)),
        // onFilter: (value, record) => record.remarks.indexOf(value) === 0,
      }
    ];
    return (
      <div  >
          <div id="header">
              <h2>月度绩效考核汇总表</h2>
          </div>
          <div style={{marginLeft:200, marginBottom:10}}>
                <Button type="primary" style={{width:200}}><a href={this.props.exportUrl}>导出</a></Button>
              </div>
          <Table  style={{width:1200,margin:'0 auto'}}  bordered  columns={columns} dataSource={this.state.recData} />            
      </div>
    );
  }
}
if(document.getElementById("monthSummarySheet")){
  ReactDOM.render(<MonthSummarySheet {...pageUrls} />, document.getElementById("monthSummarySheet"));
}
export default MonthSummarySheet;