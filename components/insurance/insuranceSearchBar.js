import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../common/FilterItem'
import queryString from 'query-string'
import Cph from '../util/cph';
import { Form, Button, Row, Col, DatePicker, Input, InputNumber, Cascader, Switch, Select, Icon} from 'antd'
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
const pageSize = 20;
const { RangePicker } = DatePicker
const formItemLayout = {
        /*labelCol: { span: 14 },
        wrapperCol: { span: 14 },*/
    };
const InsuranceSearchBar = ({
  options,
  downloadUrl,
  cphUrl,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const query = queryString.parse(window.location.search)||'';
  options = options||[{field:'cph', alias:'车牌号'}]
  var queryField = "";
  for(let i in options){
    if(typeof query[options[i].field] != "undefined")
      queryField = (options[i].field)
  }
  const handleFields = (fields) => {
    const { createTime, field, value, bxzq} = fields
    if (createTime&&createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    if (bxzq&&bxzq.length) {
      fields.bxzq = [bxzq[0].format('YYYY-MM-DD'), bxzq[1].format('YYYY-MM-DD')]
    }
    return fields
  }

	const cphChange = (value)=>{}


  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    search(fields)
  }

  const download = () => {
    window.open(downloadUrl+window.location.search)
  }

  const search = (fields) => {
    var params = getParams(fields)
    window.location = window.location.pathname + "?" + queryString.stringify(params);
  }

  const getParams = (fields) => {
    var params = {}
    for(let i in query){
      params[i] = query[i];
    }
    for(var i in options){
      delete params[options[i].field]
    }
    if(typeof(fields['field'])!='undefined')
      params[fields['field']] = fields['value']
    delete fields['field']
    delete fields['value']
    params = {...params, page:1, ...fields, pageSize }
    return params;
  }


  const handleReset = () => {
    const fields = getFieldsValue()
    console.log(fields);
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit();
  }

  const handleChange = (key) => (values) => {
    console.log(key)
  }
  return (
    <Row gutter={24}>
      <Form layout="inline" style={{marginBottom:20}}>
      		<FormItem
            >
                {getFieldDecorator('cph', {initialValue:query['cph']})(
        		<Cph chepaihao={cphUrl} value={query['cph']}/>
                )}
            </FormItem>
            <FormItem 
                label="保单号:"
                style={{marginLeft:-100,width:210}}
                {...formItemLayout}
            >
                {getFieldDecorator('bdh', {initialValue:query['bdh']})(
              <Input style={{width:'119%'}}/>
            )}
            </FormItem>
            <FormItem
                label="上传日期:"
            >
                {getFieldDecorator('createTime', {initialValue:query['createTime']&&query['createTime'].map((i)=>{return moment(i)})||''})(
              <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange('createTime')}/>
            )}
            </FormItem>
            <FormItem
                label="保险止期:"
            >
                {getFieldDecorator('bxzq', {initialValue:query['bxzq']&&query['bxzq'].map((i)=>{return moment(i)})||''})(
              <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange('bxzq')}/>
            )}
            </FormItem>
            <Button size="large" type={'primary'} style={{marginRight: 10}} onClick={handleSubmit}>查询</Button>
        	<Button size="large" onClick={handleReset} style={{marginRight: 10}} >清空</Button>
        	<Button type="primary" shape="circle" icon="download" onClick={download}/>
        </Form>
       
    </Row>
  )
}
InsuranceSearchBar.propTypes = {
  // onAdd: PropTypes.func,
  // isMotion: PropTypes.bool,
  // switchIsMotion: PropTypes.func,
  // form: PropTypes.object,
  // filter: PropTypes.object,
  // onFilterChange: PropTypes.func,
}

export default Form.create()(InsuranceSearchBar)

