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
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class OfficePurchase extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          recData:[],  //从后台接收到的数据
      };
      this.key=0;
      this.itemId="";
      this.num="";
      this.result={itemId:"",num:"",remark:""}
  }
  async componentDidMount(){
        var self=this;
        $.ajax({
            //url:"/goodsList",
            url:this.props.goodsInfoUrl,
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){
                if(data){
                  var data=data.data;
                  for(var i in data){
                      data[i]["key"]=data[i].itemId;   
                  }                   
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
  action(index){
     if(this.result.num>0){
        $.ajax({
            //url:"/goodsList",
            url:this.props.goodsInfoUrl,
            type:"post",
            dataType: 'json',
            data: JSON.stringify(this.result),
            contentType : 'application/json',
            success:function(data){
                if(data.data.status>0){
                  // window.location.href=this.props.jumpUrl
                }else{
                   Modal.error({
                    title: '错误信息',
                    content: '入库失败',
                  });
                }
            }.bind(self),
            error:function(){
                alert("请求失败");
            }
        });
     }else{
        Modal.error({
          title: '错误信息',
          content: '采购数量必须大于0',
        });
     }  
  }
  onScoreChange(index,value) {
      //console.log(this.state.recData);
      // console.log(index,value)
      // var itemId=this.state.recData[index].itemId;
      // this.itemId=itemId;
      // this.num=value;
      this.result.itemId=this.state.recData[index].itemId;
      this.result.num=value;
      console.log(this.result);
  }
  onRemarkChange(index,value){
      var remark;
      if((typeof value=='string')&&value.constructor==String){
        remark = value;
      }
      else{
        remark = value.target.value;
      }
      // console.log(index,remark) //传输数据方式待确认 拼接？ajax？
      this.result.remark=remark;
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
        title: '采购数量',
        dataIndex: 'num',
        key:'num',
        render:(text, record, index)=>(<InputNumber min={1} defaultValue={0} onChange={this.onScoreChange.bind(this,index)} />) 
      },{
        title: '备注',
        dataIndex: 'remark',
        key:'remark',
        render:(text, record, index)=>(<TextArea  autosize={{ minRows: 1}}  onChange={this.onRemarkChange.bind(this,index)} />) 
      },{
        title: '入库',
        render:(text,record,index)=>(<Button onClick={this.action.bind(this,index)}>入库</Button>)
      }  
    ];       
    return (
      <div>
        <Table bordered key={this.key++} pagination={false} columns={columns}  dataSource={this.state.recData} />
      </div>
    );
  }
}

if(document.getElementById("officePurchase"))
   ReactDOM.render(<OfficePurchase {...pageUrls} />, document.getElementById("officePurchase"));
export default OfficePurchase;