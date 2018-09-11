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
class EditableCell extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value: this.props.value,
        editable: false,
      }
      this.value="";
  }
  
  handleChange(e){
    const value = e.target.value;
    this.setState({ value });
    this.value=value;
  }
  check(e){
    var updateStorageObj={};
    updateStorageObj[this.props.recData[this.props.index].itemId]=this.value
    $.ajax({
        url:this.props.updateStorageUrl,
        type:"POST",
        dataType: 'json',
        data: JSON.stringify(updateStorageObj),
        contentType : 'application/json',
        success:function(data){
            if(data.status>0){
                this.setState({editable: false});
                if (this.props.onChange) {
                  this.props.onChange(this.state.value);
                }
            }else{
                Modal.error({
                    title: '错误信息',
                    content: data.message,
                });
            }
        }.bind(this),
        error:function(){
            alert("请求失败");
        }
    });    
  }
  edit(){
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange.bind(this)}
                onPressEnter={this.check.bind(this)}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check.bind(this)}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit.bind(this)}
              />
            </div>
        }
      </div>
    );
  }
}
class YunyingbuPurchase extends React.Component {
 constructor(props) {
      super(props);
      this.state = {
          recData:[],  //从后台接收到的数据
          updateStorageIndex:""
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
     let {itemId, num, itemRemarks, itemTotalNum} = modifying;
     let reqData = {num, itemRemarks, itemId};
      var self=this;
      if(num < 1){
        Modal.error({title:"库存数量填写错误", content:"入库数量不能为0！"});
        return
      }
     $.ajax({
          //url:"/goodsList",
          url:self.props.goodsPurchaseUrl,
          type:"post",
          dataType: 'json',
          data:JSON.stringify(reqData),
          contentType : 'application/json',
          success:function(data){
              if(data.status > 0){
                Modal.info({
                  title: '提示',
                  content: (
                    <div>
                      <p>入库成功！</p>
                    </div>
                  ),
                  onOk() {},
                });
                self.fetchData();
              }else{
                Modal.info({
                  title: '提示',
                  content: (
                    <div>
                      <p>入库失败！</p>
                    </div>
                  ),
                  onOk() {},
                });
              }
          }.bind(self),
          error:function(){
              alert("请求失败");
          }
      });   
  }
  onScoreChange(record,value) {
    var newData = [...this.state.recData];
    var modifying = newData.find((item)=>{return item.itemId == record.itemId});
    modifying.num = value;
    this.setState({ recData: newData });
  }
  onRemarkChange(record,value){
      var remark;
      if((typeof value=='string')&&value.constructor==String){
        remark = value;
      }
      else{
        remark = value.target.value;
      }
      var newData = [...this.state.recData];
      var modifying = newData.find((item)=>{return item.itemId == record.itemId});
      modifying.itemRemarks = remark;
      this.setState({ recData: newData });
  }
  //可编辑框 onchange
  
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
        sorter: (a, b) => (new Sorter().sort(a.itemTotalNum, b.itemTotalNum)),
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
        render:(text, record)=>(<InputNumber min={0} value={text} onChange={this.onScoreChange.bind(this, record)} />) 
      },
      {
        title: '备注',
        dataIndex: 'itemRemarks',
        key:'itemRemarks',
        render:(text, record)=>{return <TextArea  autosize={{ minRows: 1}} value={text} onChange={this.onRemarkChange.bind(this, record)} />} 
      },
      {
        title: '采购',
        render:(text,record)=>(<Button onClick={this.action.bind(this, record)}>入库</Button>)
      }  
    ];       
    return (
      <div>
        <Table bordered key={this.key++}  columns={columns} pagination={true} dataSource={this.state.recData} />
      </div>
    );
  }
}
const WrappedYunyingbuPurchase = Form.create()(YunyingbuPurchase);
if(document.getElementById("yunyingbuPurchase"))
   ReactDOM.render(<WrappedYunyingbuPurchase {...pageUrls} />, document.getElementById("yunyingbuPurchase"));
export default YunyingbuPurchase;