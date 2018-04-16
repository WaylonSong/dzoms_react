/*
  组件功能：车牌号的组件
  引用时：<CarNumber {...pageUrls} errorMessage={this.errorMessage.bind(this)}  objCph={this.objCph.bind(this)} />
          函数：
          objCph(objCph){
              this.setState({objCph:objCph});
          }
          errorMessage(errorMessage){
              this.setState({errorMessage:errorMessage});
          }
*/
import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, Form, AutoComplete, Input, Icon,Row, Col,DatePicker,Checkbox,InputNumber,Radio,Select} from 'antd';
const AutoCompleteOption = AutoComplete.Option;
import SelectInfo from './SelectInfo';
const InputGroup = Input.Group;
const Option = Select.Option;
class Cph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            recData:[],  //后台请求回来的车牌号数组
            district:'黑A',
            number:''
        }     
    }
    componentDidMount(){
      /*var self=this;
      $.ajax({
            type:"get",
            url: self.props.chepaihao,
            data: JSON.stringify(self.cphPrefix),
            dataType: 'json',
            contentType : 'application/json',
            success: function(data){ 
                self.setState({
                    recData:data
                });                            
            },
            error: function(data){
               alert("失败");
            }
      }); */
    }
    districtChange(value){
      this.setState({district:value})
    }
    numberChange(value){
        /*this.setState({
          dataSource: !value || value.indexOf('@') >= 0 ? [] : [
            `${value}@gmail.com`,
            `${value}@163.com`,
            `${value}@qq.com`,
          ],
        });*/
        let self=this;
        let wholeNumber = self.state.district+value;
        var param = {number: wholeNumber}
        $.ajax({
            type:"get",
            url: self.props.chepaihao,
            data: param,
            dataType: 'json',
            contentType : 'application/json',
            success: function(data){ 
                var data2 = data.data.map(function(i){
                  if(i.indexOf('黑')>-1)
                    return i.substring(2);
                  return i;
                })
                self.setState({
                    dataSource:data2
                });                            
            },
            error: function(data){
               alert("失败");
            }
        }); 
        if(this.props.onChange){
          this.props.onChange(wholeNumber);
        }
    }
    selectInfoErrorMessage(errorMessage){
        this.setState({
            errorMessage:errorMessage
        });
        this.props.errorMessage(errorMessage);
    }
    handleChange(value){
      this.setState({
        dataSource: !value || value.indexOf('@') >= 0 ? [] : [
          `${value}@gmail.com`,
          `${value}@163.com`,
          `${value}@qq.com`,
        ],
      });
    }
    render(){    
        return(
          <InputGroup compact style={{margin:5,height:40, width:350, overflow:'hidden'}}>
            <Select defaultValue="黑A" onChange={this.districtChange.bind(this)}>
              <Option value="黑A">黑A</Option>
              <Option value="黑B">黑B</Option>
              <Option value="黑C">黑C</Option>
              <Option value="黑D">黑D</Option>
              <Option value="黑E">黑E</Option>
              <Option value="黑F">黑F</Option>
              <Option value="黑G">黑G</Option>
              <Option value="黑H">黑H</Option>
              <Option value="黑J">黑J</Option>
              <Option value="黑K">黑K</Option>
              <Option value="黑L">黑L</Option>
              <Option value="黑M">黑M</Option>
              <Option value="黑N">黑N</Option>
              <Option value="黑P">黑P</Option>
              <Option value="黑R">黑R</Option>
            </Select>
            <AutoComplete 
              dataSource={this.state.dataSource}
              style={{ width: 200 }}
              onChange={this.numberChange.bind(this)}
              value={this.props.value&&this.props.value.substring(2)}
            />
          </InputGroup>

        );    
    }
}
export default Cph;