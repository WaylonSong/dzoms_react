import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Input, Icon,Row, Col,InputNumber,DatePicker,Modal } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class Performance extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
          selectedRowKeys: [],  // Check here to configure the default column
          loading: false,
          recData:[],  //从后台接收到的数据
          newKey:1,
          evaluateName:"",
          message:"",
          totalZiping:"",
          regectReason:""
      };
       this.keyPairs = {};
       this.key=0;
       this.totalZiping=0;
  }
  componentDidMount(){
        $.ajax({
            url: this.props.selfEvaluateUrl,
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){
                var data=data.data;
                // console.log(data)
                var evaluateName="";
                if(data){ 
                  for(var i=0;i<data.length;i++){
                      data[i]["key"]=data[i].id;
                      evaluateName=data[0].evaluateName
                  }
                  var regectReason="";
                  for(var i in data){
                    if(!this.keyPairs[data[i].id]){
                      this.keyPairs[data[i].id] = {inputs:"", score:""};
                      this.keyPairs[data[i].id].score=data[i].childProValue;
                    }
                    if(data[i].reason){
                        regectReason=" * 退回理由："+data[i].reason;
                    }
                  } 
                  var sum=0;
                  for(var i in this.keyPairs){
                      sum+=parseFloat(this.keyPairs[i].score);
                  }   
                  this.setState({
                      recData:data,
                      evaluateName:evaluateName,
                      totalZiping:sum,
                      regectReason:regectReason
                  });                 
                }else{ 
                   recData:[]
                }
            }.bind(this),
            error:function(){ 
                alert("请求失败");
            }
      });
  }
  
  start(){
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange(selectedRowKeys){
    this.setState({selectedRowKeys});
    return selectedRowKeys;
  }
  onScoreChange(index,value) {
      if(!value){
         value=0;
      }
      index=this.state.recData[index].id;    
      if(!this.keyPairs[index])
        this.keyPairs[index] = {inputs:"", score:""}
      this.keyPairs[index].score = value;
      var sum=0;
      for(var i in this.keyPairs){
          sum+=parseFloat(this.keyPairs[i].score);
      } 
      this.setState({
         totalZiping:sum
      }); 
  }
  onChange(index,seq,value) {
      index=this.state.recData[index].id;    
      if(!this.keyPairs[index]){
          this.keyPairs[index] = {inputs:"", score:""}
      }
      if((typeof value=='string')&&value.constructor==String)
        this.keyPairs[index].inputs[seq] = value;
      else
        this.keyPairs[index].inputs[seq] = value.target.value;
  }

  ondateChange(index,seq,date,dateString){
      index=this.state.recData[index].id;    
      //console.log(dateString);
       if(!this.keyPairs[index])
          this.keyPairs[index] = {inputs:"", score:""}
      this.keyPairs[index].inputs[seq] = dateString;
      //console.log(this.keyPairs);
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
      console.log(index,value)
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
      //console.log(str.substring(0, str.indexOf(sp)));
      jsxs.push(<span>{str.substring(0, str.indexOf(sp))}</span>);
      //console.log(sp);
      switch (sp){
        case "##":
          jsxs.push(<TextArea  autosize={{ minRows: 1}} defaultValue={""} onChange={this.onChange.bind(this,index,i)}/>);
          i++;
          break;
        case "#number#":
          jsxs.push(<InputNumber   defaultValue={0} onChange={this.onChange.bind(this,index,i)}/>);
          i++;
          break;
        case "#date#":
          jsxs.push(<DatePicker  format={dateFormat}  showToday={true} onChange={this.ondateChange.bind(this,index,i)} />); 
          i++;
          break;
        case  "\n":
          jsxs.push(<br/>);
          break; 
      }   
    }
      jsxs.push(<span>{subject.substring(lastStrLoc)}</span>);
    return jsxs;
  }

  submit(){
      //console.log(this.props.jumpUrl)
      var result={};
      result["selfEvaluate"]=this.keyPairs;
      result["evaluateName"]=this.state.evaluateName;
      var total=0;
      for(var i in result.selfEvaluate){
          total+=result.selfEvaluate[i].score
      }
      result["total"]=total;
      // console.log(result);
      var self=this;
      //发给后台的数据
      $.ajax({
            type:"post",
            url: self.props.selfEvaluateUrl,
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
    var recData=this.state.recData;
    var maxValue=[];
    for(var i in recData){
       maxValue.push(recData[i].childProValue);        
    }
    const columns = [
      {
        title: '项目',
        dataIndex: 'proName',
        width:80,
      }, {
        title: '子项目',
        dataIndex: 'childProName',
        width:80,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title: '分数',
        dataIndex: 'childProValue',
        width:50,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title: '工作职责',
        dataIndex: 'jobResponsibility',
        width:200,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title: '工作标准',
        dataIndex: 'jobStandard',
        width:200,
        render: (text, record, index)=>(this.spToInput(text, index))
      },{
        title: '完成情况',
        dataIndex: 'complete',
        children: [{
           title:"个人",
           dataIndex:"personal",
           width:240,
           render:(text, record, index)=>(<TextArea  autosize={{ minRows: 4, maxRows: 10 }}  onChange={this.onCompleteChange.bind(this,index)}/>)  
        },{
           title:"部门",
           dataIndex:"department", 
           width:240,
           render:(text, record, index)=>(<TextArea disabled={true}  autosize={{ minRows: 4, maxRows: 10 }} />)  
        },{
           title:"考评组",
           dataIndex:"kpGroup",
           width:240,
           render:(text, record, index)=>(<TextArea disabled={true}  autosize={{ minRows: 4, maxRows: 10 }} />)  
        }],
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width:180,
        render:(text, record, index)=>(<TextArea  autosize={{ minRows: 4, maxRows: 10 }}  onChange={this.onRemarkChange.bind(this,index)} />)  
      },
      {
        title: '评分标准',
        dataIndex: 'scoreStandard',
        width:200,
        render:(text, record, index)=>(this.spToInput(text, index))
      },{
        title:'评分',
        dataIndex: 'pingfen',
        children: [{
           title:"自评",
           dataIndex:"score",
           width:30,
           render:(text, record, index)=>(<InputNumber defaultValue={0} onChange={this.onScoreChange.bind(this,index)} />)  
        },{
           title:"部门",
           dataIndex:"bumen",
           width:30, 
           render:(text, record, index)=>(<InputNumber  disabled={true}/>)  
        },{
           title:"考评组",
           dataIndex:"pfgroup",
           width:30,
           render:(text, record, index)=>(<InputNumber  disabled={true}/>)  
        }],
      } 
    ];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };
    const hasSelected = selectedRowKeys.length > 0;  
    var i=0;
    return (
      <div style={{marginBottom:100}}>
          <div id="header">
             <h2>{this.state.evaluateName}</h2>
          </div> 
          <div style={{ marginBottom: 16 ,height:20}}>              
              <span style={{ marginLeft: 8 ,float:'left'}}>{hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}</span>
              <p style={{float:'right',padding:'5px',color:'red'}}>{this.state.regectReason?this.state.regectReason:''}</p>
          </div>
          <Table scroll={{ x: 1200 }} bordered rowSelection={rowSelection}  pagination={false} columns={columns}  dataSource={this.state.recData} />            
          <div style={{margin:'10px 0'}}>
              <span style={{float:'right'}}>自评总分：{this.state.totalZiping?this.state.totalZiping:0}</span>
          </div>
          <div style={{clear:'both'}}></div>
          <div style={{margin:'10px 0'}}>
              <Button type="primary" style={{margin:'0 0 0 15px',float:'right',padding:'6px 30px'}} onClick={this.submit.bind(this)}>提交</Button>
          </div>
      </div>
    );
  }
}
if(document.getElementById("personalPerformance"))
   ReactDOM.render(<Performance {...pageUrls}/>, document.getElementById("personalPerformance"));
export default Performance;