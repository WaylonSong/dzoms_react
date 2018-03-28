import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Modal} from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
import SearchBar from '../common/SearchBar';
class OfficeHistory extends React.Component {
 constructor(props) {
      super(props);
      this.state = {
          recData:[],  //从后台接收到的数据
      }
  }
  async componentDidMount(){
        console.log(this.props.goodsIssueHisInfoUrl);
        var params = '';
        if(window.location.search)
          params = window.location.search.substring(1);

        $.ajax({
            url:this.props.goodsIssueHisInfoUrl,
            type:"get",
            dataType: 'json',
            data: params,
            contentType : 'application/json',
            success:function(data){
                if(data.status>0){
                  var data=data.data;
                  for(var i in data){
                      data[i]["key"]=data[i].itemId;   
                  }                   
                  this.setState({
                      recData:data
                  }); 
                }else{
                  recData:""
                }
            }.bind(this),
            error:function(data){
                Modal.error({
                  title:'错误信息',
                  content:data.message,
                });
            }
        });
  }
  render() { 
    var filterData = new Filters().filter(this.state.recData);
    var columns = [
      {
        title: '姓名',
        dataIndex: 'personName',
        key:'personName',
        filters: filterData.personName,
        sorter: (a, b) => (new Sorter().sort(a.personName, b.personName)),
        onFilter: (value, record) => record.personName.indexOf(value) === 0
      }, {
        title: '部门',
        dataIndex: 'department',
        key:'department',
        filters: filterData.department,
        sorter: (a, b) => (new Sorter().sort(a.department, b.department)),
        onFilter: (value, record) => record.department.indexOf(value) === 0
      },{
        title: '物品名称',
        dataIndex: 'itemName',
        key:'itemName',
        filters: filterData.itemName,
        sorter: (a, b) => (new Sorter().sort(a.itemName, b.itemName)),
        onFilter: (value, record) => record.itemName.indexOf(value) === 0
      }, {
        title: '领取数量',
        dataIndex: 'count',
        key:'count',
        filters: filterData.count,
        sorter: (a, b) => (new Sorter().sort(a.count, b.count)),
        onFilter: (value, record) => record.count.indexOf(value) === 0
      },{
        title: '领用时间',
        dataIndex: 'time',
        key:'time',
        filters: filterData.time,
        sorter: (a, b) => (new Sorter().sort(a.time, b.time)),
        onFilter: (value, record) => record.time.indexOf(value) === 0
      }
    ];       
    return (
      <div>
        <SearchBar options={this.props.options||[{field:'personName', alias:'姓名'}, {field:'department', alias:'部门'}]} downloadUrl={this.props.downloadUrl}/>
        <Table  key={this.key++} pagination={false} columns={columns}  dataSource={this.state.recData} />
      </div>
    );
  }
}
if(document.getElementById("officeHistory"))
   ReactDOM.render(<OfficeHistory {...pageUrls} />, document.getElementById("officeHistory"));
export default OfficeHistory;