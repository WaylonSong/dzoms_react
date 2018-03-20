import { Table,DatePicker, Select, Layout, Form, Card, Row, Col, Icon, Input, Button,InputNumber, message } from 'antd';
const FormItem = Form.Item;
const {Content} = Layout;

import Sorter from '../util/Sorter';
// const { MonthPicker, RangePicker } = DatePicker;
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class DriverKpCalcParams extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data:{}
    };
  }
  componentDidMount() {
    var self = this;
    $.ajax({
        type:"GET",
        url:"/DZOMS/ky/driverKp/calcParams",
        success: function(data){
          if(data.status>0){
             self.setState({
              data:data.data
             })
          }
        },
        error: function(data){
             message.error('尚未设置过评分标准');
        }
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
         $.ajax({
              type:"POST",
              url:"/DZOMS/ky/driverKp/calcParams",
              data: JSON.stringify(values),
              dataType: 'json',
              contentType : 'application/json',
              success: function(data){
                if(data.status>0){
                   message.success('设置成功！');
                }
              },
              error: function(data){
                   message.error('设置出错！');
                 
              }
          });
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    var self = this;
    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Content style={{padding:50}}>
        <h2 style={{font:'bold',fontSize:'18px',textAlign:'center', margin:20}}>驾驶员百分考核子项分数设置</h2>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Card key={'zj_card'} style={{width: '100%'}} title='租金迟交分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`zj_total`} label="小分上限" >
                {getFieldDecorator('zj_total', {
                  initialValue: self.state.data.zj_total || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`zj_0`} label="单次分数" >
                {getFieldDecorator('zj_0', {
                  initialValue: self.state.data.zj_0 || 5,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>

          <Card key={'insurance_card'} style={{width: '100%'}} title='保险迟交分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`insurance_total`} label="小分上限" >
                {getFieldDecorator('insurance_total', {
                  initialValue: self.state.data.insurance_total || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`insurance_0`} label="单次分数" >
                {getFieldDecorator('insurance_0', {
                  initialValue: self.state.data.insurance_0 || 5,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>

          <Card key={'law_card'} style={{width: '100%'}} title='法律投诉分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`law_total`} label="小分上限" >
                {getFieldDecorator('law_total', {
                  initialValue: self.state.data.law_total || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`law_0`} label="单次分数" >
                {getFieldDecorator('law_0', {
                  initialValue: self.state.data.law_0 || 5,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>

          <Card key={'ts_card'} style={{width: '100%'}} title='投诉分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`ts_total`} label="小分上限" >
                {getFieldDecorator('ts_total', {
                  initialValue: self.state.data.ts_total || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>


          <Card key={'sg_card'} style={{width: '100%'}} title='事故管理分数设置' bordered={true} >
            <Row >
            <FormItem key={`sg_total`} label="小分上限" >
              {getFieldDecorator('sg_total', {
                initialValue: self.state.data.sg_total || 50,
                rules: [{ required: true, message: '不能为空！' }],
              })(
                <InputNumber min={0} max={100}/>
              )}分
            </FormItem>
            </Row>
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`sg_2`} label="严重事故（单次）" >
                {getFieldDecorator('sg_2', {
                  initialValue: self.state.data.sg_2 || 10,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`sg_1`} label="一般事故（单次）" >
                {getFieldDecorator('sg_1', {
                  initialValue: self.state.data.sg_1 || 5,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`sg_0`} label="轻微事故（单次）" >
                {getFieldDecorator('sg_0', {
                  initialValue: self.state.data.sg_0 || 1,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>
          <Card key={'wz_card'} style={{width: '100%'}} title='电子违章分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`wz_total`} label="小分上限" >
                {getFieldDecorator('wz_total', {
                  initialValue: self.state.data.wz_total || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`wz_0`} label="单次分数" >
                {getFieldDecorator('wz_0', {
                  initialValue: self.state.data.wz_0 || 5,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>
          <Card key={'lj_card'} style={{width: '100%'}} title='路检路查分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`lj_total`} label="小分上限" >
                {getFieldDecorator('lj_total', {
                  initialValue: self.state.data.lj_total || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`lj_0`} label="单次分数" >
                {getFieldDecorator('lj_0', {
                  initialValue: self.state.data.lj_0 || 5,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>
          <Card key={'lh_card'} style={{width: '100%'}} title='例会分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`lh_total`} label="小分上限" >
                {getFieldDecorator('lh_total', {
                  initialValue: self.state.data.lh_total || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`lh_0`} label="单次分数" >
                {getFieldDecorator('lh_0', {
                  initialValue: self.state.data.lh_0 || 5,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>
          <Card key={'score2_card'} style={{width: '100%'}} title='加分项分数设置' bordered={true} >
            <Row style={{marginTop:10}}>
            <Col xs={{ span: 12}} lg={{ span: 8}}>
              <FormItem key={`score2`} label="总分上限" >
                {getFieldDecorator('score2', {
                  initialValue: self.state.data.score2 || 50,
                  rules: [{ required: true, message: '不能为空！' }],
                })(
                  <InputNumber min={0} max={100}/>
                )}分
              </FormItem>
            </Col>
            </Row>
          </Card>
          <Row>
            <Col xs={{ span: 12}} lg={{ span: 12}}>
              <Card key={'hd_card'} title='参加活动设置' bordered={true} >
                <Row style={{marginTop:10}}>
                <Col xs={{ span: 12}} lg={{ span: 12}}>
                  <FormItem key={`hd_total`} label="小分上限" >
                    {getFieldDecorator('hd_total', {
                      initialValue: self.state.data.hd_total || 50,
                      rules: [{ required: true, message: '不能为空！' }],
                    })(
                      <InputNumber min={0} max={100}/>
                    )}分
                  </FormItem>
                </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 12}}>
              <Card key={'mt_card'} title='媒体表扬分数设置' bordered={true} >
                <Row style={{marginTop:10}}>
                <Col xs={{ span: 12}} lg={{ span: 12}}>
                  <FormItem key={`mt_total`} label="小分上限" >
                    {getFieldDecorator('mt_total', {
                      initialValue: self.state.data.mt_total || 50,
                      rules: [{ required: true, message: '不能为空！' }],
                    })(
                      <InputNumber min={0} max={100}/>
                    )}分
                  </FormItem>
                </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 12}} lg={{ span: 12}}>
              <Card key={'praise_card'} style={{width: '100%'}} title='表彰分数设置' bordered={true} >
                <Row style={{marginTop:10}}>
                <Col xs={{ span: 12}} lg={{ span: 12}}>
                  <FormItem key={`praise_total`} label="小分上限" >
                    {getFieldDecorator('praise_total', {
                      initialValue: self.state.data.praise_total || 50,
                      rules: [{ required: true, message: '不能为空！' }],
                    })(
                      <InputNumber min={0} max={100}/>
                    )}分
                  </FormItem>
                </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={{ span: 12}} lg={{ span: 12}}>
              <Card key={'pay_card'} style={{width: '100%'}} title='二维码支付分数设置' bordered={true} >
                <Row style={{marginTop:10}}>
                <Col xs={{ span: 12}} lg={{ span: 12}}>
                  <FormItem key={`pay_total`} label="小分上限" >
                    {getFieldDecorator('pay_total', {
                      initialValue: self.state.data.pay_total || 50,
                      rules: [{ required: true, message: '不能为空！' }],
                    })(
                      <InputNumber min={0} max={100}/>
                    )}分
                  </FormItem>
                </Col>
                <Col xs={{ span: 12}} lg={{ span: 12}}>
                  <FormItem key={`pay_0`} label="单次分数" >
                    {getFieldDecorator('pay_0', {
                      initialValue: self.state.data.pay_0 || 5,
                      rules: [{ required: true, message: '不能为空！' }],
                    })(
                      <InputNumber min={0} max={100}/>
                    )}分
                  </FormItem>
                </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <div style={{textAlign:'center'}}>
          <Button type="primary" style={{width:200, margin:30}} onClick={this.handleSubmit.bind(this)}>
            提交
          </Button></div>
        </Form>
      </Content>
    );
  }
  

  /*render(){
    return(
    <Content>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
    </Content>
    );
  }*/
}
const DriverKpCalcParamsForm = Form.create()(DriverKpCalcParams);

if(document.getElementById("DriverKpCalcParams"))
   ReactDOM.render(<DriverKpCalcParamsForm />, document.getElementById("DriverKpCalcParams"));