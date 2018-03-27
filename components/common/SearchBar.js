import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from './FilterItem'
import queryString from 'query-string'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select, Icon} from 'antd'
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
const pageSize = 20;
const { RangePicker } = DatePicker
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}
const SearchBar = ({
  options,
  downloadUrl,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const query = queryString.parse(window.location.search)||'';
  options = options||[{field:'id', alias:'身份证'}, {field:'name', alias:'名称'}]
  var queryField = "";
  for(let i in options){
    if(typeof query[options[i].field] != "undefined")
      queryField = (options[i].field)
  }
  const handleFields = (fields) => {
    const { createTime, field, value} = fields
    if (createTime&&createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    search(fields)
  }

  const download = () => {
    window.open(downloadUrl)
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
    /*let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)*/

    console.log(key)
  }
  return (
    <Row gutter={24}>
        <Col {...ColProps}  xl={{ span: 8 }} md={{ span: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {getFieldDecorator('field',{initialValue:queryField||options[0].field||''})(
            <Select style={{ width: '30%' }} size="large" placeholder="选择查询属性">
              {options.map(function(item){
                return <Option key={item.field} value={item.field}>{item.alias}</Option>;
              })}
            </Select>
            )}
            {getFieldDecorator('value',{initialValue:query[queryField]||''})(
              <Search placeholder="搜索" style={{ width: '70%' }} size="large" onSearch={handleSubmit} />
            )}
          </div>
        </Col>
        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <div style={{  justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {getFieldDecorator('createTime', {initialValue:query['createTime']&&query['createTime'].map((i)=>{return moment(i)})||''})(
              <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange('createTime')}/>
            )}
          </div>
        </Col>
      <Col xl={{ span: 4 }} md={{ span: 4 }}>
        <Button size="large" type={'primary'} style={{marginRight: 10}} onClick={handleSubmit}>查询</Button>
        <Button size="large" onClick={handleReset} style={{marginRight: 10}} >清空</Button>
        <Button type="primary" shape="circle" icon="download" onClick={download}/>
      </Col>
    </Row>
  )
}
SearchBar.propTypes = {
  // onAdd: PropTypes.func,
  // isMotion: PropTypes.bool,
  // switchIsMotion: PropTypes.func,
  // form: PropTypes.object,
  // filter: PropTypes.object,
  // onFilterChange: PropTypes.func,
}

export default Form.create()(SearchBar)
