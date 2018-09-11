import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, Form, Input, Icon,Row, Col,DatePicker,Checkbox,InputNumber,Radio,Select} from 'antd';
import SelectInfo from '../util/SelectInfo';
import CarNumber from '../util/carNumber';
import UtilSelect from '../util/Select';
import Cph from '../util/cph';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const InputGroup = Input.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class SeatingIssue extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
          employeeJobNumber:[],
          errorMessage:"",
          objCph:"",
          errorMessage:""
      };
      this.CphValue=""; //后面的车牌号
      this.cphId="";    //车牌号ID
      this.cphPrefix=""; //车牌号前缀
      this.seatType=["xzps","xzwz","dzps","dzwz"];
      this.seatTypeObj={xzps:0, xzwz:0, dzps:0, dzwz:0};
  }
  componentDidMount(){
    
  }
  
  onCphChange(value) {
    var params = {};
    params['cph'] = value;
    this.props.form.setFieldsValue(params);
  }

  onNumChange(type,num) {
      this.seatTypeObj[type]=num;
  }
  onemployeeIdChange(value){
      //console.log('员工id:',value);
  }
  handleSubmit(e){
    e.preventDefault();
    var result={};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(this.state.errorMessage==""){ //暂时不验证车牌号
        if (!err) {
           result=values;
           result.issueType=this.seatTypeObj;
           console.log(result);
           $.ajax({
              type:"POST",
              url:this.props.submitUrl,
              data: JSON.stringify(result),
              dataType: 'json',
              contentType : 'application/json',
              success: function(data){                      
                  if(data.status>0){
                      Modal.success({
                        title: '提示信息',
                        content: '保存成功！',
                        onOk:()=>window.location.href = window.location.href,
                      });
                  }else{
                      Modal.error({
                        title: '错误信息',
                        content: '保存失败！',
                      });
                  }
              },
              error: function(data){
                 alert("失败");
              }
        }); 
        }else{
           return;
        }
      }else{
        return;
      }
    });
  }
  selectInfoErrorMessage(errorMessage){
      this.setState({
          errorMessage:errorMessage
      });
  }
  render() {
     const { getFieldDecorator } = this.props.form;
     const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
     };
     const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
     };
     const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    var assueType=(
        <span>发放类型</span>
    );
    return (
      <div>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout2}
              label="车牌号码："
              hasFeedback
            >
              {getFieldDecorator('cph', {
                rules: [{
                  required: true, message: '请输入车牌号！',
                }],
              })(
              <Cph chepaihao={this.props.chepaihao} onChange={this.onCphChange.bind(this)}/>
              )}
            </FormItem>
            <FormItem  
               {...formItemLayout}
               label={assueType}
            >
                {getFieldDecorator('issueType')(                              
                    <Row>
                      <Col span={12}>
                          <span>小座破损：</span>
                          <InputNumber  min={1} max={10} defaultValue={0} onChange={this.onNumChange.bind(this,this.seatType[0])} />
                      </Col>
                      <Col span={12}>
                          <span>小座污渍：</span>
                          <InputNumber min={1} max={10} defaultValue={0} onChange={this.onNumChange.bind(this,this.seatType[1])} />
                      </Col>
                      <Col span={12}>
                          <span>大座破损：</span>
                          <InputNumber min={1} max={10} defaultValue={0} onChange={this.onNumChange.bind(this,this.seatType[2])} />
                      </Col>
                      <Col span={12}>
                          <span>大座污渍：</span>
                          <InputNumber min={1} max={10} defaultValue={0} onChange={this.onNumChange.bind(this,this.seatType[3])} />
                      </Col>
                    </Row>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="员工工号："
              hasFeedback
            >
              {getFieldDecorator('employeeId', {
                rules: [{
                  required: true, message: '员工工号不能为空!',
                }],
              })(
                  <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="请输入员工工号"
                      optionFilterProp="children"
                      onChange={this.onemployeeIdChange.bind(this)}
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                      <Option value="001">001</Option>
                      <Option value="002">002</Option>
                      <Option value="003">003</Option>
                      <Option value="004">004</Option>
                      <Option value="005">005</Option>
                  </Select>
              )}
            </FormItem>   
            <FormItem {...tailFormItemLayout}>
               <Button type="primary" htmlType="submit" size="large">提交</Button>
            </FormItem>    
          </Form>
      </div>
    );
  }
}
const WrappedSeatingIssue = Form.create()(SeatingIssue);
if(document.getElementById("seatingIssue"))
  ReactDOM.render(<WrappedSeatingIssue  {...pageUrls}/>, document.getElementById("seatingIssue"));
export default SeatingIssue;