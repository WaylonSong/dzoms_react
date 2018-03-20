import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Input, Icon,Row, Col,InputNumber,DatePicker ,Modal} from 'antd';
import moment from 'moment';
import Performance from './personalPerformance';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class Managementkp extends  Performance{
  constructor(props) {
       super(props);
       this.state = {
          selectedRowKeys: [],  // Check here to configure the default column
          loading: false,
          recData:[],  //从后台接收到的数据
          newKey:1,
          recScorezp:[],
          recScorebm:[],
          recInputs:[],
          evaluateName:"",
          totalZiping:"",
          totalBumen:"",
          totalkpgroup:"",
          visible: false,
          scoreList:[]//存放部门打分
      };
       this.keyPairs = {};
       this.key=0;
       this.urlDate="";
  }
  componentDidUpdate(){
  	var trs=document.querySelectorAll('tbody tr')
  	// console.log(this.state.scoreList)
    for(var i=0;i<trs.length;i++){
      if(this.state.scoreList[i]!=null){
          if(this.state.scoreList[i]>0){
            trs[i].style.backgroundColor = "#95CFF4"; //蓝色
          }else if(this.state.scoreList[i]==0){
            trs[i].style.backgroundColor = "#fff";
          }else{
            trs[i].style.backgroundColor = "#F5B8C8"; //红色
          }
      }
    }
  }
  async componentDidMount(){
      var  self=this;
      self.urlDate=window.location.href.substring(window.location.href.lastIndexOf("/")+1);
      $.ajax({
            //url:"/bumenkaoPing",
            url:self.props.managerEvaluate,
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){ 
               if(data.status>0){
                   if(data){ 
                    var data=data.data;
                    var evaluateName="";
                    for(var i=0;i<data.length;i++){
                        data[i]["key"]=data[i].id;
                        evaluateName=data[0].evaluateName
                    }
                    var zipingSum=100;
                    var bumenSum=100;
                    var kpgroupSum=100;
                    var list=[];
                    for(var i in data){
                        if(data[i].personal){
                           zipingSum+=parseFloat(data[i].personal.score);
                        }
                        if(data[i].bumen){
                           bumenSum+=parseFloat(data[i].bumen.score);
                        }
                        if(this.props.department=="historykp"||data[i].kpgroup.complete!=null){
                            kpgroupSum+=parseFloat(data[i].kpgroup.score);
                  	   	   	list.push(data[i].kpgroup.score);
                        }else{
                  	   	   list.push(data[i].bumen.score);
                        }
                    }
                    for(var i in data){
                      if(!this.keyPairs[data[i].id]){
                         this.keyPairs[data[i].id] = {inputs:"", score:0,remarks:""};
                         this.keyPairs[data[i].id].remarks=data[i].remarks;
                         if(data[i].kpgroup.score!=null){
	                       	  this.keyPairs[data[i].id].inputs=data[i].kpgroup.complete;
	                       	  this.keyPairs[data[i].id].score=data[i].kpgroup.score;
                         }
                      }
                    }
                    zipingSum=zipingSum.toFixed(2);
                    bumenSum=bumenSum.toFixed(2);
                    kpgroupSum=kpgroupSum.toFixed(2);
                    self.setState({
                          recData:data,
                          evaluateName:evaluateName,
                          totalZiping:zipingSum,
                          totalBumen:bumenSum,
                          totalkpgroup:kpgroupSum,
                          scoreList:list
                    });

                  }else{ 
                     recData:""
                  }
               }else{
                   return;
               }              
                 
            }.bind(this),
            error:function(){
                alert("请求失败");
            }
      });
  }
  
  onScoreChange(index,value) {
      if(!value){
         value=0;
      }
      value=parseFloat(value).toFixed(2);
      index = this.state.recData[index].id;    
      if(!this.keyPairs[index]){
          this.keyPairs[index] = {inputs:"", score:""};      
      }
      this.keyPairs[index].score=value;     
      var sum=100;
      for(var i in this.keyPairs){
          sum+=parseFloat(this.keyPairs[i].score);
      }
      sum=sum.toFixed(2);
      this.setState({
          totalkpgroup:sum
      });
  }

  onCompleteChange(index,value){
      // console.log(index,value)
      index=this.state.recData[index].id;    
      if(!this.keyPairs[index]){
          this.keyPairs[index] = {inputs:"", score:""}
      }
      if((typeof value=='string')&&value.constructor==String)
        this.keyPairs[index].inputs = value;
      else
        this.keyPairs[index].inputs = value.target.value;
      // console.log(this.keyPairs)
  } 
  onRemarkChange(index,value){
      index=this.state.recData[index].id;    
  	  if((typeof value=='string')&&value.constructor==String)
        this.keyPairs[index].remarks = value;
      else
        this.keyPairs[index].remarks = value.target.value;
  }
  spToInput(data,index){
    var recInputs = this.state.recInputs;
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
        case "#number#":
        case "#date#":
          jsxs.push(<TextArea  autosize={{ minRows: 1}} defaultValue={recInputs[index][i]} disabled={!(this.props.department == "ziping")} onChange={this.onChange.bind(this,index,i)}/>);
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
  //退回处理 start
  returned(){
    this.setState({
      visible: true,
    });
  }

  handleOk(e){
    this.props.form.validateFields((err, values) => {
        values["taskId"]=this.props.managerEvaluate.substring(this.props.managerEvaluate.lastIndexOf('/')+1,this.props.managerEvaluate.length)
        console.log(values)
        if (!err) {
          var self=this;
          $.ajax({
            type:"post",
            url:self.props.regectUrl,
            data: JSON.stringify(values),
            dataType: 'json',
            contentType : 'application/json',
            success: function(data){
                self.setState({
                  visible: false,
                });
                if(data.status>0){
                    Modal.success({
                      title: '提示信息',
                      content: '回退成功！',
                    });  
                    window.location.href = self.props.jumpUrl;
                }else{
                    Modal.error({
                      title: '提示信息',
                      content: '回退失败！',
                    });
                }              
            },
            error: function(data){
               alert("失败");
            }
        });
      }
    });
  }

  handleCancel(e){
    this.setState({
      visible: false,
    });
  }
//退回处理 end
//部门退回 start
  genRejectrReason(){
    var personal;
    var bumen;
    var kpgroup;
  	for(var i in this.state.recData){
  		var self=this;
	  	if(self.state.recData[i].reason){
	     	 	if(self.state.recData[i].reason.personal){
	     	 		personal="个人退回理由："+self.state.recData[i].reason.personal;
	     	 	}
	     	 	if(self.state.recData[i].reason.bumen){
	     	 		bumen="部门退回理由："+self.state.recData[i].reason.bumen;
	     	 	}
	     	 	if(self.state.recData[i].reason.kpgroup){
	     	 		kpgroup="考评组退回理由："+self.state.recData[i].reason.kpgroup;
	     	 	}
	    }
  	}
    var reasons=[];
    reasons.push(personal,bumen,kpgroup)
    var reasonList=reasons.map(function(row){
        return(<p>{row}</p>)
    })
    return reasonList;
  }
//正常提交
  submit(){
      var result={};
      result["managerEvaluate"]=this.keyPairs;
      result["evaluateName"]=this.state.evaluateName;
      var total=100;
      for(var i in result.managerEvaluate){
          total+=parseFloat(result.managerEvaluate[i].score);
      }
      total=total.toFixed(2);
      result["total"]=total;
      //发给后台的数据
      var self=this;
      $.ajax({
            type:"post",
            url:self.props.managerEvaluate,
            data: JSON.stringify(result),
            dataType: 'json',
            contentType : 'application/json',
            success: function(data){
                if(data.status>0){
                    window.location.href = self.props.jumpUrl;
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
  }
  render() {
    var filterData = new Filters().filter(this.state.recData);
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    var recScorezp=this.state.recScorezp;
    var recScorebm=this.state.recScorebm;
    var recData=this.state.recData;
    var remarks=[]
    for(var i in recData){
       if(this.props.department != "historykp"){
       	 if(recData[i].kpgroup.score!=null){ //判断一下如果有kpgroup.score这个属性，就代表是退回状态，这时只需带着remarks即可 否则要拼接
       	 	remarks.push(recData[i].remarks); 
       	 }else{
       		remarks.push(recData[i].remarks+"\n考评组备注：");
       	 }
       }else{
       	 	remarks.push(recData[i].remarks); 
       } 
    }
    // console.log(remarks)
    var completeDefaultValue=[];
    var scoreDefaultValue=[];
    //查看历史考评或者被退回时都赋默认值
	for(var index in this.state.recData){
		if(this.props.department == "historykp"||this.state.recData[index].kpgroup.score!=null){
			// console.log(this.state.recData[index].kpgroup)
	        completeDefaultValue.push(this.state.recData[index].kpgroup.complete);
	        scoreDefaultValue.push(this.state.recData[index].kpgroup.score);
		}else{
			completeDefaultValue.push("");
	        scoreDefaultValue.push(0);
		}
	}
	// console.log(completeDefaultValue)
    const columns = [
      {
        title: '项目',
        dataIndex: 'proName',
        width:100,
        filters: filterData.proName,
        sorter: (a, b) => (new Sorter().sort(a.proName, b.proName)),
        onFilter: (value, record) => record.proName.indexOf(value) === 0
      }, {
        title: '子项目',
        dataIndex: 'childProName',
        width:110,
        filters: filterData.childProName,
        sorter: (a, b) => (new Sorter().sort(a.childProName, b.childProName)),
        onFilter: (value, record) => record.childProName.indexOf(value) === 0,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title: '工作职责',
        dataIndex: 'jobResponsibility',
        width:180,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title: '工作标准',
        dataIndex: 'jobStandard',
        width:180,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title: '完成情况',
        dataIndex: 'complete',
        children: [{
           title:"个人",
           dataIndex:"personal",
           width:240,
           render:(text, record, index)=>(<TextArea style={{color:"#757171"}} defaultValue={this.state.recData[index].personal?this.state.recData[index].personal.complete:""} autosize={{ minRows: 4, maxRows: 10 }}  disabled={true} />)  
        },{
           title:"部门",
           dataIndex:"department", 
           width:240,
           render:(text, record, index)=>(<TextArea style={{color:"#757171"}} defaultValue={this.state.recData[index].bumen?this.state.recData[index].bumen.complete:""} autosize={{ minRows: 4, maxRows: 10 }}  disabled={true} />)  
        },{
           title:"考评组",
           dataIndex:"kpGroup",
           width:240,
           render:(text, record, index)=>(<TextArea style={{color:"#757171"}} autosize={{ minRows: 4, maxRows: 10 }}  onChange={this.onCompleteChange.bind(this,index)} defaultValue={completeDefaultValue[index]} disabled={this.props.department=="historykp"?true:false}/>)  
        }],
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width:180,
        render:(text, record, index)=>(<TextArea style={{color:"#757171"}} defaultValue={recData[index].remarks} autosize={{ minRows: 4, maxRows: 10 }} disabled={this.props.department == "historykp"?true:false} onChange={this.onRemarkChange.bind(this,index)} />)  
      },
      {
        title: '评分标准',
        dataIndex: 'scoreStandard',
        width:200,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title:'评分',
        dataIndex: 'pingfen',
        children: [{
           title:"自评",
           dataIndex:"ziping",
           width:30,
           render:(text, record, index)=>(<InputNumber  defaultValue={this.state.recData[index].personal?this.state.recData[index].personal.score:""} disabled={true} />)  
        },{
           title:"部门",
           dataIndex:"bumen",
           width:30,
           render:(text, record, index)=>(<InputNumber  defaultValue={this.state.recData[index].bumen?this.state.recData[index].bumen.score:""} disabled={true} />) 
        },{
           title:"考评组",
           dataIndex:"pfgroup",
           width:30,
           render:(text, record, index)=>(<InputNumber  defaultValue={scoreDefaultValue[index]} disabled={this.props.department == "historykp"?true:false} onChange={this.onScoreChange.bind(this,index)} />) 
        }],
      }
    ];
    // (key)=>this.spToInput.bind(this,key)
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };
    const hasSelected = selectedRowKeys.length > 0;  
    const { getFieldDecorator } = this.props.form;
    return (
      <div  style={{marginBottom:100}}>
          <div id="header">
              <h2>{this.props.department=="historykp"?"个人历史绩效":this.state.evaluateName}</h2>
          </div>
          <div style={{ marginBottom: 16,height:20}}>               
              <span style={{ marginLeft: 8,float:'left',}}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
              <div  style={{paddingLeft:'10px',color:'red',float:'left'}}>{this.genRejectrReason()}</div>
          </div>
          <div style={{clear:'both'}}></div>
          <Table scroll={{ x: 1200 }} bordered pagination={false} rowSelection={rowSelection} columns={columns}  dataSource={this.state.recData} />            
          <div style={{margin:'10px 0'}}>
              <span style={{float:'right',fontSize:16,color:'red'}}>考评组总分：{this.state.totalkpgroup?this.state.totalkpgroup:100}</span>
              <span style={{float:'right',fontSize:16,color:'red'}}>部门总分：{this.state.totalBumen?this.state.totalBumen:100} &nbsp;&nbsp;</span>
              <span style={{float:'right',fontSize:16,color:'red'}}>自评总分：{this.state.totalZiping?this.state.totalZiping:100} &nbsp;&nbsp;</span>
          </div>
          <div style={{clear:'both'}}></div>
          <div style={{margin:'10px 0'}}>
              <Button type="primary" style={{float:'right',padding:'6px 30px'}} disabled={this.props.department == "historykp"?true:false} onClick={this.submit.bind(this)}>提交</Button>
              <Button type="danger" style={{margin:'0 15px',float:'right',padding:'6px 30px'}} disabled={this.props.department == "historykp"?true:false} onClick={this.returned.bind(this)}>退回</Button>
          </div>
          <Modal
            title="退回"
            style={{display:'block'}}
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
          >
              <FormItem
                  label="退回理由"
                  style={{'width':'100%'}}
                  {...formItemLayout}
              >
                {getFieldDecorator('reason', {
                      rules: [{ required: true, message: '该字段不能为空!' }],
                })( 
                    <TextArea style={{'width':'100%'}} />
                )}
              </FormItem>
          </Modal>
      </div>
    );
  }
}
const WrappedManagementkp = Form.create()(Managementkp);
if(document.getElementById("historykp")){
  ReactDOM.render(<WrappedManagementkp {...pageUrls} department="historykp"/>, document.getElementById("historykp"));
}
if(document.getElementById("managementkp")){
  ReactDOM.render(<WrappedManagementkp {...pageUrls} department="management"/>, document.getElementById("managementkp"));
}
export default Managementkp;