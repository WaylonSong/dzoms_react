import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Modal} from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
import SearchBar from '../common/SearchBar';
class YunyingbuHistory extends React.Component {
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
        title: '物品名称',
        dataIndex: 'itemName',
        key:'itemName',
        filters: filterData.itemName,
        sorter: (a, b) => (new Sorter().sort(a.itemName, b.itemName)),
        onFilter: (value, record) => record.itemName.indexOf(value) === 0
      }, {
        title: '身份证号码',
        dataIndex: 'idNumber',
        key:'idNumber',
        filters: filterData.idNumber,
        sorter: (a, b) => (new Sorter().sort(a.idNumber, b.idNumber)),
        onFilter: (value, record) => record.idNumber.indexOf(value) === 0
      },{
        title: '车牌号',
        dataIndex: 'carId',
        key:'carId',
        filters: filterData.carId,
        sorter: (a, b) => (new Sorter().sort(a.carId, b.carId)),
        onFilter: (value, record) => record.carId.indexOf(value) === 0
      },{
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
        <SearchBar options={this.props.options||[{field:'carNumber', alias:'车牌号'},{field:'idNumber', alias:'身份证'}, {field:'personName', alias:'姓名'}, {field:'itemName', alias:'物品名称'}]} downloadUrl={this.props.downloadUrl}/>
        <Table  key={this.key++} pagination={false} columns={columns}  dataSource={this.state.recData} />
      </div>
    );
  }
}
if(document.getElementById("yunyingbuHistory"))
   ReactDOM.render(<YunyingbuHistory {...pageUrls} />, document.getElementById("yunyingbuHistory"));
export default YunyingbuHistory;