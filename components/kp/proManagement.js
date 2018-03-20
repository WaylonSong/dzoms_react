import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, Form, Input, Icon,Row, Col,DatePicker,Select} from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
const FormItem = Form.Item;
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class AppModal extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            newKey:0,
            type:"",
            msg:""
            //recData:""  //从后台接收到的数据
        }   
        this.tableData="";  //传送给后台的数据
        this.key=0;
        this.departments=[];
    }
    componentDidMount(){
      var self=this;
	     $.ajax({
        url:self.props.userUrl,
        type:"get",
        dataType: 'json',
        contentType : 'application/json',
        success:function(data){
            if(data){
            	data.map(function(i){
            		self.departments.push(i.department)
            	});
                self.departments= Array.from(new Set(self.departments));
            }
        }.bind(this),
        error:function(){
            alert("请求失败");
        }             
       });   
  	}
    showAddModal(){
      this.setState({
        visible: true,
        type:"post"
      });
      
    }
    //修改
    showUpdateModal(type,id){
      var recData=this.props.recData;  
      if(id.length>1){
          Modal.error({
            title: '错误信息',
            content: '只能选择一行进行修改！',
          });    
         return;
      }else if(id.length<1){
          Modal.error({
            title: '错误信息',
            content: '请先选择一行在进行修改！',
          });    
         return;
      }
      for(var i in recData){
          if(id[0]==recData[i].id){
              var updateData=this.props.form.setFields({
                  department:{
                      value:recData[i].department,
                  },  
                  id:{
                      value:recData[i].id,
                  },
                  proName:{
                      value:recData[i].proName,
                  },
                  childProName:{
                      value:recData[i].childProName,
                  },
                  jobResponsibility:{
                      value:recData[i].jobResponsibility,
                  },
                  jobStandard:{
                      value:recData[i].jobStandard,
                  },
                  complete:{
                      value:recData[i].complete,
                  },
                  scoreStandard:{
                      value:recData[i].scoreStandard,
                  },
            });    
          }
      }
      
      this.setState({
        visible: true,
        type:"put"
      });
    }
    //删除
    delete(ids){
      var recData=[];
      if(ids.length<1){       
        Modal.error({
          title: '错误信息',
          content: '请选择要删除的行！',
        });
        return;
      }
      var that=this; 
      Modal.info({
        title: '删除项目',
        content: '确认删除之后将无法恢复该记录，确认要删除吗？',
        onOk(){
              //根据选中的id 删除对应的行 
              for(var rowNum = 0; rowNum < that.props.recData.length; rowNum++){
                var inFlag = false;
                var k = that.props.recData[rowNum].key;
                for(var i in ids){
                  if(ids[i] == k){
                    inFlag = true;
                  }
                }
                if(!inFlag){
                  recData.push(that.props.recData[rowNum]);
                }
              }
              //测试删除
              //that.props.transferMsg(recData);   
              //把选中要删除的id传给后台
              $.ajax({
                    type:"delete",
                    url: that.props.url,
                    data: JSON.stringify(ids),
                    dataType: 'json',
                    contentType : 'application/json',
                    success: function(data){                      
                      if(data.status>0){   //判断如果传回来的状态是可以删除的,就通知下面的函数更改recData
                          that.props.transferMsg(recData);                         
                      }else{
                          Modal.error({
                            title: '错误信息',
                            content: '删除失败！',
                          });
                      }
                    },
                    error: function(data){
                       alert("失败");
                    }
              });
          },
      });
   }

  addOrUpdate(id){   
      //验证并储存表单数据
      var tableData;
      var recData=this.props.recData;
      this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({ loading: false, visible: false });
            this.tableData=values;
            tableData=this.tableData; 
            //测试添加start
            // recData.splice(0,0,tableData); //添到数组最前面的位置
            // this.props.transferMsg(recData);   
            //测试添加end
          }else{
            this.setState({
              loading: false,
              visible: true
            });
            return;
          }
      });  
      //判断操作类型
      var type = this.state.type;
      var url;
      var that=this;
      for (var i in id) {
          tableData["id"] = id[i];
      }
      console.log(tableData);
      // document.cookie="department"+"="+tableData.department;
      // document.cookie="proName"+"="+tableData.proName;
      //后台处理  
        $.ajax({
              type:type,
              url: this.props.url,
              data: JSON.stringify(tableData),
              dataType: 'json',
              contentType : 'application/json',
              success: function(data){  
                  if(data.status>0){
                    // that.props.form.resetFields();    
                    //console.log("aaaa");
                    if (type == "put") {
                        for (var i in id) {
                          tableData["id"] = id[i];
                        }
                        for (var i in recData) {
                          if (tableData.id == recData[i].id) {
                            Object.assign(recData[i], tableData);                     
                          }
                        }
                        that.props.transferMsg(recData);
                        Modal.success({
                          title: '提示信息',
                          content: '更新成功！',
                        });                     
                     }else if(type=="post"){
                        tableData["id"] = data.data.id;
                        tableData["key"] = data.data.id;
                        //recData.push(tableData);
                        recData.splice(0,0,tableData); //添到数组最前面的位置
                        that.props.transferMsg(recData);
                        Modal.success({
                          title: '提示信息',
                          content: '添加成功！',
                        });                      
                     }                  
                  }else{
                       console.log(data)
                      if(type=="put"){
                          Modal.error({
                            title: '错误信息',
                            content: '更新失败！',
                          });
                      }else if(type=="post"){
                          Modal.error({
                            title: '错误信息',
                            content: '添加失败！',
                          });
                      }
                  }      
              },
              error: function(data){
                 alert("失败");
              }
        });
  } 
  handleCancel(){
      this.setState({ visible: false });
  }
  genDepartmentOptions(){
  		var departments=this.departments.map(function(i){
  			return(
  				<Option value={i}>{i}</Option>
  			);
  		});
  		return departments;
  }
  render() {
    var key = this.state.newKey;
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const { getFieldDecorator } = this.props.form;
    var br="<br>";
    return (
      <div>     
        <Button type="primary" onClick={this.showAddModal.bind(this, "post")}>
         添加项目
        </Button>
        <Button style={{marginLeft:15}}type="primary" onClick={this.showUpdateModal.bind(this,"put",this.props.rows)}>
         修改项目
        </Button>
        <Button style={{marginLeft:15}}type="primary" onClick={this.delete.bind(this,this.props.rows)}>
         删除项目
        </Button>
        <Modal
          maskClosable={false}
          visible={this.state.visible}
          width="1200"
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
            <Button type="primary" size="large" loading={this.state.loading} onClick={this.addOrUpdate.bind(this,this.props.rows)}>
              提交
            </Button>
          ]}
        >
            <Form>
                <FormItem
            	
                    label="部门"
                    style={{width:'100%',marginRight:5}}
                >
                    {getFieldDecorator('department', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                    })(
                        <Select
            							showSearch
            							style={{ width: 200 }}
            							placeholder="选择部门"
            							optionFilterProp="children"
            							filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            						>
            							 {this.genDepartmentOptions()}
            						</Select>   
                    )}
                </FormItem>
                <FormItem
                    label="项目"
                    style={{width:'16%',marginRight:5}}
                    {...formItemLayout}
                >
                    {getFieldDecorator('proName', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                    })(
                        <TextArea  autosize={{ minRows: 6}}  style={{'minHeight':200}}/>     
                    )}
                </FormItem>
                <FormItem
                    style={{width:'16%',marginRight:5}}
                    label="子项目"
                    {...formItemLayout}
                >
                    {getFieldDecorator('childProName')(
                        <TextArea  autosize={{ minRows: 6}} style={{'minHeight':200}} />
                    )}
                </FormItem>
                <FormItem
                    style={{width:'16%',marginRight:5}}
                    label="工作职责"
                    {...formItemLayout}
                >
                    {getFieldDecorator('jobResponsibility')(
                        <TextArea  autosize={{ minRows: 6}} style={{'minHeight':200}} />
                    )}
                </FormItem>
                <FormItem
                    style={{width:'16%',marginRight:5}}
                    label="工作标准"
                    {...formItemLayout}
                >
                    {getFieldDecorator('jobStandard', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                    })(
                        <TextArea  autosize={{ minRows: 6}} style={{'minHeight':200}} />
                    )}
                </FormItem>
                <FormItem
                    style={{width:'16%',marginRight:5}}
                    label="完成情况"
                    {...formItemLayout}
                >
                    {getFieldDecorator('complete', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                    })(
                        <TextArea  autosize={{ minRows: 6}} style={{'minHeight':200}} />
                    )}
                </FormItem>
                <FormItem
                    style={{width:'16%',marginRight:5}}
                    label="评分标准"
                    {...formItemLayout}
                >
                    {getFieldDecorator('scoreStandard', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                    })(
                        <TextArea  autosize={{ minRows: 6}} style={{'minHeight':200}}/>
                    )}
                </FormItem>        
            </Form>
        </Modal>
      </div>
    );
  }
}

class AppTable extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
          selectedRowKeys: [],  // Check here to configure the default column
          loading: false,
          recData:[],  //从后台接收到的数据
          newKey:0
      };
      this.key=0;
  }
  componentDidMount(){
        $.ajax({
            url:this.props.url,
            //url:"/tables",
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){
                var data=data.data;
                if(data){
                  for(var i=0;i<data.length;i++){
                      data[i]["key"]=data[i].id;   
                  }  
                  data=data.reverse();                
                  this.setState({
                      recData:data
                  }); 
                }else{
                   recData:""
                }
            }.bind(this),
            error:function(){
                alert("请求失败");
            }
      });
  }
  transferMsg(recData) {
    // console.log("transferMsg");
    // console.log(recData);
    this.setState({
      recData:recData,
      selectedRowKeys:[]
    });
  }

  onSelectChange(selectedRowKeys){
    this.setState({selectedRowKeys});
    return selectedRowKeys;
  }

  onChange(index,seq,value) {
      //console.log(index,seq,value)
      if(!this.keyPairs[index])
          this.keyPairs[index] = {inputs:[], ziping:""}
      if((typeof value=='string')&&value.constructor==String)
        this.keyPairs[index].inputs[seq] = value;
      else
        this.keyPairs[index].inputs[seq] = value.target.value;
        console.log(this.keyPairs);
  }
   spToInput(data,index){
    var subject = data+"";
    var regex = /.*?(##|#number#|#date#|\n)/g;
    var matched = null;
    var str;
    var sp;
    var lastStrLoc;
    var jsxs = [];   
    var i=0;  
    while (matched = regex.exec(subject)) {
      str = matched[0];
      sp = matched[1];
      lastStrLoc = matched.index+str.length;
      jsxs.push(<span>{str.substring(0, str.indexOf(sp))}</span>);
      switch (sp){
        case "##":
          jsxs.push(<TextArea  autosize={{ minRows: 1}} defaultValue={""} onChange={this.onChange.bind(this,index,i)}/>);
           i++;
          break;
        case "#number#":
          jsxs.push(<InputNumber min={1}  defaultValue={0} onChange={this.onChange.bind(this,index,i)}/>);
           i++;
          break;
        case "#date#":
           jsxs.push(<DatePicker  format={dateFormat}  showToday={true} />); 
           i++;
          break;
        case "\n":
          jsxs.push(<br/>);
          break; 
      }     
    }
      jsxs.push(<span>{subject.substring(lastStrLoc)}</span>);
    return jsxs;
  }
  render() {
    var filterData = new Filters().filter(this.state.recData);
    var columns = [
      {
        title: '部门',
        dataIndex: 'department',
        key:'department',
        filters: filterData.department,
        width:80,
        sorter: (a, b) => (new Sorter().sort(a.department, b.department)),
        onFilter: (value, record) => record.department.indexOf(value) === 0
      }, {
      	title: '项目',
      	dataIndex: 'proName',
      	filters: filterData.proName,
        width:80,
        sorter: (a, b) => (new Sorter().sort(a.proName, b.proName)),
        onFilter: (value, record) => record.proName.indexOf(value) === 0
      }, {
        title: '子项目',
        dataIndex: 'childProName',
        width:80,
        render: (text, record, index)=>(this.spToInput(text, index))
      }, {
        title: '工作职责',
        dataIndex: 'jobResponsibility',
        width:200,
        render: (text, record, index)=>(this.spToInput(text, index))
      }, {
        title: '工作标准',
        dataIndex: 'jobStandard',
        width:200,
        render: (text, record, index)=>(this.spToInput(text, index))
      }, {
        title: '完成情况',
        dataIndex: 'complete',
        width:300,
        render: (text, record, index)=>(this.spToInput(text, index))
      }, {
        title: '评分标准',
        dataIndex: 'scoreStandard',
        width:200,
        render: (text, record, index)=>(this.spToInput(text, index))
      }  
    ];
        
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };
    const hasSelected = selectedRowKeys.length > 0;  

    return (
      <div style={{marginBottom:50}}>
        <div style={{ marginBottom: 16 }}>       
          <WrappedProjectModal  {...pageUrls} visible={this.state.visible}  rows={this.state.selectedRowKeys} 
            recData={this.state.recData}  transferMsg={recData => this.transferMsg(recData)} />         
          <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
        </div>
        <Table key={this.key++}  scroll={{y:1000}} bordered pagination={false} rowSelection={rowSelection} columns={columns} onChange={this.onChange.bind(this)}  dataSource={this.state.recData} />
      </div>
    );
  }
}
const WrappedProjectModal = Form.create()(AppModal);
if(document.getElementById("proManagement"))
  ReactDOM.render(<AppTable {...pageUrls} />, document.getElementById("proManagement"));
export default AppTable;