import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Modal, Button} from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
import StringUtil from '../util/StringUtil';
import SearchBar from '../common/SearchBar';
const confirm = Modal.confirm;
class OfficeHistory extends React.Component {
 constructor(props) {
      super(props);
      this.state = {
          recData:[],  //从后台接收到的数据
      }
  }
  agree(id){
    var self = this;
    let params = {id:id}
    confirm({
      title: '领用确认',
      content: '确定领用此物品么？',
      onOk() {
        $.ajax({
            url:self.props.agreeUrl,
            type:"post",
            dataType: 'json',
            data: JSON.stringify(params),
            contentType : 'application/json',
            success:function(data){
                if(data&&data.status > 0){
                  self.fetchData();
                }else{
                   Modal.error({
                    title: '错误信息',
                    content: '领用失败',
                  });
                }
            }.bind(self),
            error:function(){
              Modal.error({
                title: '错误信息',
                content: '系统不可用',
              });
            }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  deny(id){
    var self = this;
    let params = {id:id}
    confirm({
      title: '驳回确认',
      content: '确定领用此物品么？',
      onOk() {
        $.ajax({
            //url:"/goodsList",
            url:self.props.denyUrl,
            type:"post",
            dataType: 'json',
            data: JSON.stringify(params),
            contentType : 'application/json',
            success:function(data){
                if(data&&data.status > 0){
                  self.fetchData();
                }else{
                   Modal.error({
                    title: '错误信息',
                    content: '驳回失败',
                  });
                }
            },
            error:function(){
              Modal.error({
                title: '错误信息',
                content: '系统不可用',
              });
            }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  fetchData(){
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
  async componentDidMount(){
      this.fetchData();
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
        onFilter: (value, record) => record.personName.indexOf(value) === 0,
        render:(text)=>{return StringUtil.safeGet(text)}
      }, {
        title: '部门',
        dataIndex: 'department',
        key:'department',
        filters: filterData.department,
        sorter: (a, b) => (new Sorter().sort(a.department, b.department)),
        onFilter: (value, record) => record.department.indexOf(value) === 0,
        render:(text)=>{return StringUtil.safeGet(text)}
      },{
        title: '物品名称',
        dataIndex: 'itemName',
        key:'itemName',
        filters: filterData.itemName,
        sorter: (a, b) => (new Sorter().sort(a.itemName, b.itemName)),
        onFilter: (value, record) => record.itemName.indexOf(value) === 0,
        render:(text)=>{return StringUtil.safeGet(text)}
      }, {
        title: '领取数量',
        dataIndex: 'count',
        key:'count',
        filters: filterData.count,
        sorter: (a, b) => (new Sorter().sort(a.count, b.count)),
        onFilter: (value, record) => record.count.indexOf(value) === 0,
        render:(text)=>{return StringUtil.safeGet(text)}
      },{
        title: '申请时间',
        dataIndex: 'applyTime',
        key:'applyTime',
        filters: filterData.applyTime,
        sorter: (a, b) => (new Sorter().sort(a.applyTime, b.applyTime)),
        onFilter: (value, record) => record.applyTime.indexOf(value) === 0,
        render:(text)=>{return StringUtil.safeGet(text)}
      },{
        title: '操作',
        dataIndex: 'state',
        key:'state',
        render: (text,record)=>{if(record.state == 1) return (<span>已领用</span>);return (<div><Button onClick={this.agree.bind(this, record.id)} type="primary" style={{marginRight:10}}>同意</Button><Button onClick={this.deny.bind(this, record.id)} >驳回</Button></div>)}
      },{
        title: '领用时间',
        dataIndex: 'time',
        key:'time',
        filters: filterData.time,
        sorter: (a, b) => (new Sorter().sort(a.time, b.time)),
        onFilter: (value, record) => record.time.indexOf(value) === 0,
        render:(text)=>{return StringUtil.safeGet(text)}
      }
    ];       
    return (
      <div>
        <SearchBar options={this.props.options||[{field:'personName', alias:'姓名'}, {field:'department', alias:'部门'}]} downloadUrl={this.props.downloadUrl}/>
        <Table  key={this.key++} pagination={true} columns={columns}  dataSource={this.state.recData} />
      </div>
    );
  }
}
if(document.getElementById("officeHistory"))
   ReactDOM.render(<OfficeHistory {...pageUrls} />, document.getElementById("officeHistory"));
export default OfficeHistory;