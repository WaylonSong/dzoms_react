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
class YearSummarySheet extends  React.Component{
  constructor(props) {
       super(props);
       this.state = {
         recData:[]
      };
  }
  componentDidMount(){
      var self=this;
      $.ajax({
            url:self.props.yearSummarySheetUrl,
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){ 
               if(data.status>0){
                   if(data){ 
                    var data=data.data;
                    for(var i=0;i<data.length;i++){
                        for(var j in data[i]){ //数据类型转换，数字类型筛选的时候会报错
                            if(data[i][j]==null){
                              data[i][j] = "无"
                            }
                        }
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
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        filters: filterData.name,
        width:170,
        sorter: (a, b) => (new Sorter().sort(a.name, b.name)),
        onFilter: (value, record) => record.name.indexOf(value) === 0,
      },
      {
        title: '部门',
        dataIndex: 'department',
        filters: filterData.department,
        width:170,
        sorter: (a, b) => (new Sorter().sort(a.department, b.department)),
        onFilter: (value, record) => record.department.indexOf(value) === 0,
      },
      {
        title: '一月',
        dataIndex: 'january',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.january, b.january)),
      },{
        title: '二月',
        dataIndex: 'february',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.february, b.february)),
      },{
        title: '三月',
        dataIndex: 'march',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.march, b.march)),
      },{
        title: '四月',
        dataIndex: 'april',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.april, b.april)),
      },{
        title: '五月',
        dataIndex: 'may',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.may, b.may)),
      },{
        title: '六月',
        dataIndex: 'june',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.june, b.june)),
      },{
        title: '七月',
        dataIndex: 'july',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.july, b.july)),
      },{
        title: '八月',
        dataIndex: 'august',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.august, b.august)),
      },{
        title: '九月',
        dataIndex: 'september',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.september, b.september)),
      },{
        title: '十月',
        dataIndex: 'october',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.october, b.october)),
      },{
        title: '十一月',
        dataIndex: 'november',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.november, b.november)),
      },{
        title: '十二月',
        dataIndex: 'december',
        width:150,
        sorter: (a, b) => (new Sorter().sort(a.december, b.december)),
      },

      {
        title: '总分',
        dataIndex: 'total',
        width:170,
        sorter: (a, b) => (new Sorter().sort(a.total, b.total)),
      },
      {
        title: '平均分',
        dataIndex: 'average',
        width:170,
        sorter: (a, b) => (new Sorter().sort(a.average, b.average)),
      }
    ];
    return (
      <div style={{marginBottom:100}}>
          <div id="header">
              <h2>年度绩效考核汇总表</h2>
          </div>
          <div style={{marginLeft:200, marginBottom:10}}>
                <Button type="primary" style={{width:200}}><a href={this.props.exportUrl} target="_blank">导出</a></Button>
              </div>
          <Table style={{width:1200,margin:'0 auto'}}  bordered columns={columns}  dataSource={this.state.recData} />            
      </div>
    );
  }
}
if(document.getElementById("yearSummarySheet")){
  ReactDOM.render(<YearSummarySheet {...pageUrls} />, document.getElementById("yearSummarySheet"));
}
export default YearSummarySheet;