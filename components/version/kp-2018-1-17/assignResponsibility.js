import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Transfer, Input , Form, InputNumber,Button,Cascader,Modal} from 'antd';
class Person extends React.Component {
    constructor(props){
      super(props);
      this.state={
          personId:"",
          newOptions:""
      }
    }
    componentDidMount(){
        $.ajax({
            //url:"/person",
            url:this.props.userUrl,
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){
                console.log(data.data);
                if(data){
                  var persondata=data;
                  var options = [];
                  var children = [];    
                  for (var i in persondata) {
                    var flag = false;
                    //console.log(persondata);
                    //检验该department是否已经存在在列表中
                    var person = {
                          value: persondata[i].uname,
                          label: persondata[i].uname,
                          id: persondata[i].uid,
                        }
                    for (var j in options){
                      //如果存在 追加children
                      if (options[j].value == persondata[i].department) {
                        options[j].children.push(person); 
                        flag = true;
                        break;
                      }         
                    }
                    //如果不在 加入新的option
                    if (!flag) {
                      options.push({
                        value: persondata[i].department,
                        label: persondata[i].department,
                        children: [person],
                      });

                    }
                  }
                  this.setState({
                       newOptions:options
                  });
                }else{
                  options:""
                }
                //this.spellData(options);
            }.bind(this),
            error:function(){
                alert("请求失败");
            }             
        });   
    }

    onChange(value) {     
      var targetKeys=[];
      //console.log(value[0]);
      var department=value[0];
      var options=this.state.newOptions;
      var id="";
      for(var i in options){
          if(options[i].value==value[0]){
             for(var j in options[i].children){
                if(options[i].children[j].value==value[1]){
                  id=options[i].children[j].id;
                } 
             }
          }
      }
      this.setState({
          personId:id
      });
      //传输人的id,以及
      this.props.transferTargetkeys(targetKeys);
      this.props.transferDepartment(department);
      if(id!=""){
          this.props.changeId(id);
      }     
    }

    render(){
       //console.log(this.props.url);
        return(
            <Cascader  style={{marginBottom:15}} options={this.state.newOptions} onChange={this.onChange.bind(this)}  placeholder="职员选择" />         
        );
    }
}
class Assign extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          mockData: [],
          targetKeys: [],
          personId:"",
          recData:"",
          score:[],
          zongfen:"",
          department:""
        }
        this.keyPairs = [];
        this.data=[];
  }
  componentDidMount() {
     $.ajax({
          url:this.props.url,
          type:"get",
          dataType: 'json',
          contentType : 'application/json',
          success:function(data){
              var data=data.data;
              if(data){
                for(var i=0;i<data.length;i++){
                    data[i]["key"]=data[i].id;   
                }  
                //console.log(data);
                this.data=data;
                var mockData = data;
                var targetKeys = [];
                this.setState({ mockData, targetKeys });  
              }else{
                 recData:""
              }
          }.bind(this),
          error:function(){
              alert("请求失败");
          }             
      });   
  }
  transferTargetkeys(targetKeys){
      this.setState({
        targetKeys
      });
  }
  transferDepartment(department){
      var newMockData=[];
      this.data.map(function(i){
          if(i.department==department){
              newMockData.push(i)
          }
      });
      console.log(newMockData);
      this.setState({
          mockData:newMockData
      });
  }

  handleChange (targetKeys, direction, moveKeys) {
     this.setState({ targetKeys });
  }

  onChange(key, value){
    if(!this.keyPairs[key]){
      this.keyPairs[key]={};  
    }
    if(!value || value ==="")
      value =0;
    this.keyPairs[key] = value;  
    var  zongfen=0; 
    console.log(this.keyPairs)
    for(var i in this.keyPairs){
        if(zongfen<=100){
          zongfen+=this.keyPairs[i];  
          this.setState({
            zongfen:zongfen
          });              
        }
    } 
    if(zongfen>100){
      Modal.warning({
          title: '警告信息',
          content: '当前分配分数为:'+zongfen+'，已超过100分，请重新分配',
      });
    }  
  }
  onBlur(){
     
  }
  confirm(item){
      var result = {personId:this.state.personId, jobList:{}}
      var tranResult;
      var selectedRows = [];    
      if(this.state.targetKeys.length > 0){
          var that = this;
          this.state.targetKeys.map((item, index)=>(
            result.jobList[item]=that.keyPairs[item]
          )
         );              
      }     
      var  zongfen=0;
      for(var i in result.jobList){        
          zongfen+=result.jobList[i];                        
      }
      console.log(zongfen);

      if(result.personId===""){
          Modal.error({
            title: '错误信息',
            content: '请选择分配职员',
          });
          return;
      }else{
          if(zongfen==100){
            tranResult = result;   
            console.log(tranResult)   
            var self=this;
            $.ajax({
              type:"post",
              url:this.props.userJobUrl,
              data: JSON.stringify(tranResult),
              dataType: 'json',
              contentType : 'application/json',
              success: function(data){
                  if(data.status>0){
                      Modal.success({
                        title: '提示信息',
                        content: '分配成功！',
                        onOk() {
                          history.go(0);
                        }
                      });
                      
                  }else{
                      Modal.error({
                        title: '错误信息',
                        content: '分配失败！',
                      });
                  }
              },
              error: function(data){
                 alert("失败");
              }
            });  
        }else{
          Modal.error({
            title: '错误信息',
            content: '各项职责占比总和应为100%才能提交成功！',
          });
          return;
        }
    }   
  }

  changeId(id){
    //console.log(id);
    this.setState({
      personId:id,
      zongfen:0
    });
    this.keyPairs=[];
    //根据传过来的id 判断该人是否有分配过任务
    $.ajax({
            url:this.props.userJobUrl+"/"+id,
           // url:"/hasPersonData",
            type:"get",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){ 
              //console.log(data.data);               
              if (data.data.length>0){
                var keys = [];
                var score=[];
                for (var i in data.data) {
                   keys.push(data.data[i].key);
                   score[data.data[i].key]=data.data[i].score;
                }
                //this.hasPersonData(keys,score); //上面的组件选择完人，调用该方法    
                if (keys.length > 0) {
                  this.setState({
                    targetKeys: keys,
                    score: score
                  });
                  this.keyPairs = score;
                  var zf=0;
                  for(var i in score){
                     zf=zf+score[i];
                  }
                  this.setState({
                      zongfen:zf
                  });
                } else {
                  this.keyPairs = [];
                }
                //console.log(this.keyPairs);
              } else {
                  this.setState({
                     targetKeys: [],
                      score:[]
                  });
              }
            }.bind(this),
            error:function(){
                alert("请求失败");
            }
      }); 
    
  }
  hasPersonData(keys,score){   //该方法用于判断该人是否分配过任务       
  }
  renderItem (item)  {
      var selectedKeys = [];
      if(this.state.targetKeys.length > 0){
          this.state.targetKeys.map(function(i){
               selectedKeys.push(i);
          });
      }
      var customLabel;
      var flag = false;
      for(var i in selectedKeys){
        if(item.key == selectedKeys[i]){
          flag = true;
          break;
        }
      }
      if(flag){
        customLabel = (
          <span className="custom-item">
            <InputNumber
                defaultValue={this.state.score[item.key]}
                min={0}
                max={100}
                formatter={value => `${value}`}
                // parser={value => value.replace('%', '')}
                onBlur={this.onBlur.bind(this)}
                onChange={this.onChange.bind(this,item.key)}
                placeholder="该项评分占比"
                ref={(input) => { this.textInput = item.key; }}
            />%-
            {item.proName} / {item.childProName} / {item.jobResponsibility}
          </span>
        );  
      }else{
        customLabel = (
          <span className="custom-item">
            {item.proName} / {item.childProName} / {item.jobResponsibility}
          </span>
        );
      }    
      return {
        label: customLabel,  // for displayed item
        value: item.title,   // for title and filter matching
      };
  }
  cancel(){
     history.go(0);
  }
  render() {
    var btnstyle={
        float:"right",
        marginTop:"10px",
        marginRight:"130px"
    }
    return (
      <div>
          <Person {...pageUrls} changeId={this.changeId.bind(this)} transferTargetkeys={targetKeys=>this.transferTargetkeys(targetKeys)} transferDepartment={department=>this.transferDepartment(department)}/>
          <Transfer
            dataSource={this.state.mockData}
            listStyle={{
              width: "45%",
              minHeight: 500,
            }}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange.bind(this)}
            render={this.renderItem.bind(this)}
          />
          <div style={btnstyle}>
              <Button style={{marginRight:5}}  onClick={this.confirm.bind(this)} type="primary">提交</Button>
              <Button type="primary" onClick={this.cancel.bind(this)}>取消</Button>
          </div>  
          <div style={{float:'right','marginTop':13,'marginRight':344}}>
              <span>已分配分数：{this.state.zongfen?this.state.zongfen:0}/100</span>
          </div>     
      </div>
    );
  } 
}

if(document.getElementById("assignResponsibility"))
  ReactDOM.render(<Assign {...pageUrls}/>, document.getElementById("assignResponsibility"));
export default Assign;