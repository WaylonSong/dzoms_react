import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, Form, Input, Icon,Row, Col,DatePicker,InputNumber} from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class Goods extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          recData:[],  //从后台接收到的数据
      };
  }
  componentDidMount(){
        this.fetchData();
  }
  fetchData(){
    var self=this;
    $.ajax({
          //url:"/goodsList",
          url:self.props.goodsInfoUrl,
          type:"get",
          dataType: 'json',
          contentType : 'application/json',
          success:function(data){
              if(data){
                var data = data.data;
                for(var i in data){
                    data[i]["key"]=data[i].itemId;   
                    data[i]["num"]=0;   
                }  
                console.log(data);                 
                self.setState({
                    recData:data
                }); 
              }else{
                 recData:""
              }
          }.bind(self),
          error:function(){
              alert("请求失败");
          }
      });
  }
  action(record){
     var newData = [...this.state.recData];
     var modifying = newData.find((item)=>{return item.itemId == record.itemId});
     let {itemId, num, itemTotalNum} = modifying;
     console.log(num)
     if(num < 1){
        Modal.error({title:"库存数量填写错误", content:"领用数量不能为0！"});
        return
     }else if(num > itemTotalNum){
        Modal.error({title:"领用数量填写错误", content:"领用数量不能大于库存数量！"});
        return
     }
     let reqData = {num, itemId};
     var self=this;
     $.ajax({
          //url:"/goodsList",
          url:self.props.goodsIssueUrl,
          type:"post",
          dataType: 'json',
          data:JSON.stringify(reqData),
          contentType : 'application/json',
          success:function(data){
              if(data&&data.status > 0){
                Modal.info({
                  title: '提示',
                  content: (
                    <div>
                      <p>领用成功！</p>
                    </div>
                  ),
                  onOk() {},
                });
                self.fetchData();
              }else{
                Modal.error({
                  title: '提示',
                  content: (
                    <div>
                      <p>领用失败！</p>
                    </div>
                  ),
                  onOk() {},
                });
              }
          }.bind(self),
          error:function(){
              Modal.error({
                  title: '提示',
                  content: (
                    <div>
                      <p>系统故障，领用失败！</p>
                    </div>
                  ),
                  onOk() {},
                });
          }
      });   
  }

  onScoreChange(record,value) {
    var newData = [...this.state.recData];
    var modifying = newData.find((item)=>{return item.itemId == record.itemId});
    modifying.num = value;
    this.setState({ recData: newData });
  }
  render() { 
    var filterData = new Filters().filter(this.state.recData);
    var columns = [
      {
        title: '名称',
        dataIndex: 'itemName',
        key:'itemName',
        filters: filterData.itemName,
        sorter: (a, b) => (new Sorter().sort(a.itemName, b.itemName)),
        onFilter: (value, record) => record.itemName.indexOf(value) === 0
      }, {
        title: '型号',
        dataIndex: 'itemType',
        key:'itemType',
        filters: filterData.itemType,
        sorter: (a, b) => (new Sorter().sort(a.itemType, b.itemType)),
        onFilter: (value, record) => record.itemType.indexOf(value) === 0
      }, {
        title: '库存',
        dataIndex: 'itemTotalNum',
        key:'itemTotalNum',
        filters: filterData.itemTotalNum,
        sorter: (a, b) => (new Sorter().sort(a.itemTotalNum, b.itemTotalNum)),
        onFilter: (value, record) => record.itemTotalNum.indexOf(value) === 0
      },{
        title: '单价',
        dataIndex: 'itemPurchasingPrice',
        key:'itemPurchasingPrice',
        filters: filterData.itemPurchasingPrice,
        sorter: (a, b) => (new Sorter().sort(a.itemPurchasingPrice, b.itemPurchasingPrice)),
        onFilter: (value, record) => record.itemPurchasingPrice.indexOf(value) === 0
      },{
        title: '领用数量',
        dataIndex: 'num',
        key:'num',
        render:(text, record, index)=>(<InputNumber min={0} value={record.num} onChange={this.onScoreChange.bind(this,record)} />) 
      },{
        title: '操作',
        render:(text,record,index)=>(<Button onClick={this.action.bind(this,record)}>领用</Button>)
      }  
    ];       
    return (
      <div>
        <Table  key={this.key++}  pagination={true} columns={columns}  dataSource={this.state.recData} />
      </div>
    );
  }
}

if(document.getElementById("officeIssue"))
   ReactDOM.render(<Goods {...pageUrls} />, document.getElementById("officeIssue"));
export default Goods;