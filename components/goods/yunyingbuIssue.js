import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, Form, Input, Icon,Row, Col,DatePicker,InputNumber,Select} from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
import SelectInfo from '../util/SelectInfo';
import UtilSelect from '../util/Select';
import Cph from '../util/cph';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class YunyingbuIssue extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          recData:[],  //从后台接收到的数据
          visible: false,
          cph:'',
          driversAndHistory : {drivers:[], history:[]}
      };
      this.key=0;
      this.itemId="";
  }
  loadGoodsList(){
    var self=this;
    self.setState({
        loading:true,
    });
    $.ajax({
        url:self.props.goodsList,
        type:"get",
        dataType: 'json',
        contentType : 'application/json',
        success:function(data){
            if(data.status>0){
              var data=data.data;
              for(var i in data){
                  data[i]["key"]=data[i].itemId;   
              }                   
              self.setState({
                  recData:data,
                  loading:false
              }); 
            }else{
               recData:""
            }
        }.bind(self),
        error:function(data){
           Modal.error({
              title:data.message,
              content:data.message,
           });
        }
    });
  }
  async componentDidMount(){
    this.loadGoodsList();
  }
  showAddModal(record,value){
    if(this.state.cph.length < 3){
      Modal.error({
        title: '错误',
        content: '请先填入待领用车牌号！',
      });
      return;
    }
    var itemId = record.itemId;
    this.itemId = itemId;  
    let self = this;
    $.get(this.props.driversAndHistory||"/driversAndHistory", { vehicle: this.state.cph, itemId: itemId }, function(data){
      self.setState({
        visible: true,
        driversAndHistory: data
      });
    });
    
  }
  handleCancel(){
      this.setState({ visible: false });
  }
  addOrUpdate(){   
      //验证并储存表单数据
      var result={};
      var recData=this.props.recData;
      //if(this.state.errorMessage==""){
	      this.props.form.validateFields((err, values) => {
	          if (!err) {
	            // this.setState({ loading: false, visible: false });
	            result=values;
	            result["itemId"]=this.itemId;
	            result.carNumber=this.state.cph;
              console.log(result)
              var self=this;
	            $.ajax({
	        	  //url: this.props.submitUrl+"/"+result.recipient+"/"+result.idNumber+"/"+result.carId+"/"+result.count+"/"+result.itemId,
	        	    url:self.props.submitUrl,
	              type:"POST",              
	              data: JSON.stringify(result),
	              dataType: 'json',
	              contentType : 'application/json',
	              success: function(data){  
	                if(data.status>0){  
                      self.props.form.resetFields();    
	                    Modal.success({
	                      title: '提示信息',
	                      content: '领用成功！',
	                    });
                      self.setState({ loading: false, visible: false });
	                }else{
	                    Modal.error({
	                      title:'错误信息',
	                      content:data.message,
	                    });
	                }
                  self.loadGoodsList();
              },
              error: function(data){
                 Modal.error({
                      title:'错误信息',
                      content:data.message,
                 });
              }
            });
	          }else{
	            this.setState({
	              // loading: false,
	              visible: true
	            });
	            return;
	          }
	      });  
	  // }else{
	  // 	return;
	  // }
      //刷新列表  
  } 
  onChange(value) {
  }
  selectInfoErrorMessage(errorMessage){
      this.setState({
          errorMessage:errorMessage
      });
  }
  /******************************/

  cphChange(value){
    this.setState({
      cph:value
    })
  }
  driverChange(value){
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;     
    for(var i in this.state.driversAndHistory.drivers){
      if(this.state.driversAndHistory.drivers[i].name == value){
        console.log(this.state.driversAndHistory.drivers[i].id);
        setFieldsValue({idNumber: this.state.driversAndHistory.drivers[i].id})
      }

    }
  }

  render() { 
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;     
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
        title: '领用',
        render:(text,record,index)=>(<Button onClick={this.showAddModal.bind(this,record)}>领用</Button>)
      }  
    ]; 
    var subColumns = []
    if(this.state.driversAndHistory.history.length > 0){
      let subFilter = new Filters().filter(this.state.driversAndHistory.history);
      subColumns = [
        {
          title: '名称',
          dataIndex: 'itemName',
          key:'itemName',
          filters: subFilter.itemName,
          sorter: (a, b) => (new Sorter().sort(a.itemName, b.itemName)),
          onFilter: (value, record) => record.itemName.indexOf(value) === 0
        }, {
          title: '型号',
          dataIndex: 'itemType',
          key:'itemType',
          filters: subFilter.itemType,
          sorter: (a, b) => (new Sorter().sort(a.itemType, b.itemType)),
          onFilter: (value, record) => record.itemType.indexOf(value) === 0
        }, {
          title: '领用数量',
          dataIndex: 'number',
          key:'number',
          filters: subFilter.itemTotalNum,
          sorter: (a, b) => (new Sorter().sort(a.itemTotalNum, b.itemTotalNum)),
          onFilter: (value, record) => record.itemTotalNum.indexOf(value) === 0
        },{
          title: '领用人',
          dataIndex: 'driverName',
          key:'driverName',
          filters: subFilter.driverName,
          sorter: (a, b) => (new Sorter().sort(a.driverName, b.driverName)),
          onFilter: (value, record) => record.driverName.indexOf(value) === 0
        },{
          title: '领用时间',
          dataIndex: 'time',
          key:'time',
          filters: subFilter.time,
          sorter: (a, b) => (new Sorter().sort(a.time, b.time)),
        }
      ];
    }  
    const formItemLayout = {
        /*labelCol: { span: 3 },
        wrapperCol: { span: 6 },*/
    };


    return (
      <div>
        <div><div style={{float:'left',marginTop:7, marginLeft:10, marginRight:0}}>请先填入领用车牌号：</div>
        <div><Cph chepaihao={this.props.chepaihao} value={this.state.cph} onChange={this.cphChange.bind(this)}/></div></div>
        <Table  key='yunyingbuIssue' size="default" columns={columns}  pagination={true} dataSource={this.state.recData} loading={this.state.loading}/>
        {this.state.visible&&
        <Modal
          width={1000}
          title={`发放信息 [${this.state.cph}]`}
          visible={true}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
            <Button type="primary" size="large" loading={this.state.loading} onClick={this.addOrUpdate.bind(this,this.props.rows)}>
              提交
            </Button>
          ]}
        >
          <Form layout="inline" style={{marginBottom:20}}>
                <FormItem
                    label="领用人："
                    {...formItemLayout}
                >
                    {getFieldDecorator('recipient', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                    })(
                      <Select style={{width:200}} onChange={this.driverChange.bind(this)}>
                        {this.state.driversAndHistory.drivers.map(function(i){
                          return <Select.Option value={i.name}>{i.name}</Select.Option>
                        })}
                      </Select>
                    )}
                </FormItem>
                <FormItem
                    label="身份证："
                    {...formItemLayout}
                >
                    {getFieldDecorator('idNumber', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                    })(
                      <Input/>
                    )}
                </FormItem>
                <FormItem
                    label="数量:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('count', {
                      rules: [{ required: true, message: '必须是数字!' }], initialValue:1,
                    })(
                        <InputNumber min={0}  onChange={this.onChange.bind(this)} />
                    )}
                </FormItem>
          </Form>
          近3个月领用记录{this.state.driversAndHistory.history.length}条
          <Table key='history' size="default" columns={subColumns}  pagination={false} dataSource={this.state.driversAndHistory.history}></Table>
        </Modal>}
      </div>
    );
  }
}
const WrappedYunyingbuIssue = Form.create()(YunyingbuIssue);
if(document.getElementById("yunyingbuIssue"))
   ReactDOM.render(<WrappedYunyingbuIssue {...pageUrls} />, document.getElementById("yunyingbuIssue"));
export default YunyingbuIssue;