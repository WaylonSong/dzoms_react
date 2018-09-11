import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, Form, Input, Icon,Row, Col,DatePicker,Switch} from 'antd';
import Sorter from '../util/Sorter';
import Filters from '../util/Filters';
import AccidentSearchBar from './accidentSearchBar';
import queryString from 'query-string'
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
class Accident extends React.Component {
  constructor(props) {
       super(props);
       var colVisible = new Array(40)
       for(var i=1;i<11;i++){
         colVisible[i]=true;
       }
       for(var i=11;i<colVisible.length;i++){
         colVisible[i]=false;
       }
       // console.log(colVisible)
       this.state = {
          selectedRowKeys: [],  //Check here to configure the default column
          loading: false,
          recData:[],  //从后台接收到的数据
          newKey:0,
          selectedTime:"",
          colVisible:colVisible
      };
      this.key=0;
  }
  componentDidMount(){
        var self=this;
        var self=this;
        var params = '';
        if(window.location.search)
          params = window.location.search.substring(1);
        $.ajax({
            url:self.props.accidentListInfoUrl,
            type:"get",
            data:params,
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){
                if(data.status>0){
                  var newData=data.data; 
                  newData.map(function(row){
                      row["key"]=row.id;   
                      for(var col in row){
                        if(row[col] == null){
                           row[col] = "";
                        }
                      }
                  });
                  // console.log(data.data) 
                  self.setState({
                      recData:newData
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
  onTimeChange(date,dateString){
     dateString=dateString.replace('/', '-');
     this.setState({
          selectedTime:dateString
     });
  }
  // linkDetails(e,index){
  //     console.log(e.target.value,index);
  // }
  download(){
     window.location.href=this.props.downloadUrl;
  }
  switchChange(index,value){
      var newArray = Object.assign([], this.state.colVisible);
      newArray[index] = !newArray[index]
      this.setState({
          colVisible:newArray
      });
  }
  render() { 
  var filterData = new Filters().filter(this.state.recData);
  var columns = [
      {
        title: '序号',
        width:30,
        render:(text, record, index)=>(<span>{++index}</span>)
      },{
        title: '驾驶人',
        dataIndex: 'jsr',
        key:'jsr',
        width:75,
        filters:filterData.jsr,
        sorter: (a, b) => (new Sorter().sort(a.jsr, b.jsr)),
        onFilter: (value, record) => record.jsr.indexOf(value) === 0
      },{
        title: '车牌号',
        dataIndex: 'cph',
        key:'cph',
        width:75,
        filters:filterData.cph,
        sorter: (a, b) => (new Sorter().sort(a.cph, b.cph)),
        onFilter: (value, record) => record.cph.indexOf(value) === 0
      },{
        title: '分公司',
        dataIndex: 'dept',
        key:'dept',
        width:75,
        filters:filterData.dept,
        sorter: (a, b) => (new Sorter().sort(a.dept, b.dept)),
        onFilter: (value, record) => record.dept.indexOf(value) === 0
      },{
        title: '案件性质',
        dataIndex: 'ajxz',
        key:'ajxz',
        width:85,
        filters:filterData.ajxz,
        sorter: (a, b) => (new Sorter().sort(a.ajxz, b.ajxz)),
        onFilter: (value, record) => record.ajxz.indexOf(value) === 0
      },
      {
        title: '出险日期',
        dataIndex: 'cxrq',
        key:'cxrq',
        width:85,
        filters:filterData.cxrq,
        sorter: (a, b) => (new Sorter().sort(a.cxrq, b.cxrq)),
        onFilter: (value, record) => record.cxrq.indexOf(value) === 0
      },
      {
        title: '赔付金额',
        dataIndex: 'pfje',
        key:'pfje',
        width:85,
        filters:filterData.pfje,
        sorter: (a, b) => (new Sorter().sort(a.pfje, b.pfje)),
        onFilter: (value, record) => record.pfje.indexOf(value) === 0,
        render: (text)=>{return Number(text).toFixed(2)}
      }
      ,{
        title: '结案日期',
        dataIndex: 'jarq',
        key:'jarq',
        width:73,
        filters:filterData.jarq,
        sorter: (a, b) => (new Sorter().sort(a.jarq, b.jarq)),
        onFilter: (value, record) => record.jarq.indexOf(value) === 0
      }
      ,{
        title: '出险地址',
        dataIndex: 'cxdz',
        key:'cxdz',
        width:85,
        filters:filterData.cxdz,
        sorter: (a, b) => (new Sorter().sort(a.cxdz, b.cxdz)),
        onFilter: (value, record) => record.cxdz.indexOf(value) === 0
      }
      ,{
        title: '出险原因',
        dataIndex: 'cxyy',
        key:'cxyy',
        width:85,
        filters:filterData.cxyy,
        sorter: (a, b) => (new Sorter().sort(a.cxyy, b.cxyy)),
        onFilter: (value, record) => record.cxyy.indexOf(value) === 0
      } 
      ,{
        title: '出险经过',
        dataIndex: 'cxjg',
        key:'cxjg',
        width:90,
        filters:filterData.cxjg,
        sorter: (a, b) => (new Sorter().sort(a.cxjg, b.cxjg)),
        onFilter: (value, record) => record.cxjg.indexOf(value) === 0
      } 
      // ,{
      //   title: '所属部门',
      //   dataIndex: 'cxjg',
      //   key:'cxjg',
      //   width:90,
      //   filters:filterData.cxjg,
      //   sorter: (a, b) => (new Sorter().sort(a.cxjg, b.cxjg)),
      //   onFilter: (value, record) => record.cxjg.indexOf(value) === 0
      // } 
      ,{
        title: '驾驶证',
        dataIndex: 'jsz',
        key:'jsz',
        width:75,
        filters:filterData.jsz,
        sorter: (a, b) => (new Sorter().sort(a.jsz, b.jsz)),
        onFilter: (value, record) => record.jsz.indexOf(value) === 0
      },
      {
        title: '报案时间',
        dataIndex: 'basj',
        width:100,
        key:'basj',
        filters: filterData.basj,
        sorter: (a, b) => (new Sorter().sort(a.basj, b.basj)),
        onFilter: (value, record) => record.basj.indexOf(value) === 0
      }, {
        title: '结案时间',
        dataIndex: 'jasj',
        width:100,
        key:'jasj',
        filters: filterData.jasj,
        sorter: (a, b) => (new Sorter().sort(a.jasj, b.jasj)),
        onFilter: (value, record) => record.jasj.indexOf(value) === 0
      }, {
        title: '保单号',
        dataIndex: 'bdh',
        width:73,
        key:'bdh',
        filters: filterData.bdh,
        sorter: (a, b) => (new Sorter().sort(a.bdh, b.bdh)),
        onFilter: (value, record) => record.bdh.indexOf(value) === 0,
        //render:(text, record, index)=>(<a onClick={this.linkDetails.bind(this,index)}>{text}</a>)
      },{
        title: '初登日期',
        dataIndex: 'cdrq',
        key:'cdrq',
        width:85,
        filters: filterData.cdrq,
        sorter: (a, b) => (new Sorter().sort(a.cdrq, b.cdrq)),
        onFilter: (value, record) => record.cdrq.indexOf(value) === 0
      },{
        title: '报案号',
        dataIndex: 'bah',
        key:'bah',
        width:73,
        filters: filterData.bah,
        sorter: (a, b) => (new Sorter().sort(a.bah, b.bah)),
        onFilter: (value, record) => record.bah.indexOf(value) === 0
      },{
        title: '立案号',
        dataIndex: 'lah',
        key:'lah',
        width:73,
        filters: filterData.lah,
        sorter: (a, b) => (new Sorter().sort(a.lah, b.lah)),
        onFilter: (value, record) => record.lah.indexOf(value) === 0
      }
      ,{
        title: '条款',
        dataIndex: 'tk',
        key:'tk',
        width:85,
        filters:filterData.tk,
        sorter: (a, b) => (new Sorter().sort(a.tk, b.tk)),
        onFilter: (value, record) => record.tk.indexOf(value) === 0
      }
       ,{
        title: '保费',
        dataIndex: 'bf',
        key:'bf',
        width:85,
        filters:filterData.bf,
        sorter: (a, b) => (new Sorter().sort(a.bf, b.bf)),
        onFilter: (value, record) => record.bf.indexOf(value) === 0,
        render: (text)=>{return Number(text).toFixed(2)}
      }
      ,{
        title: '事故处理方式',
        dataIndex: 'sgclfs',
        key:'sgclfs',
        width:105,
        filters:filterData.sgclfs,
        sorter: (a, b) => (new Sorter().sort(a.sgclfs, b.sgclfs)),
        onFilter: (value, record) => record.sgclfs.indexOf(value) === 0
      }
      ,{
        title: '事故处理部门',
        dataIndex: 'sgclbm',
        key:'sgclbm',
        width:105,
        filters:filterData.sgclbm,
        sorter: (a, b) => (new Sorter().sort(a.sgclbm, b.sgclbm)),
        onFilter: (value, record) => record.sgclbm.indexOf(value) === 0
      }
       ,{
        title: '通赔标志',
        dataIndex: 'tpbz',
        key:'tpbz',
        width:105,
        filters:filterData.tpbz,
        sorter: (a, b) => (new Sorter().sort(a.tpbz, b.tpbz)),
        onFilter: (value, record) => record.tpbz.indexOf(value) === 0
      }
       ,{
        title: '业务来源',
        dataIndex: 'ywly',
        key:'ywly',
        width:105,
        filters:filterData.ywly,
        sorter: (a, b) => (new Sorter().sort(a.ywly, b.ywly)),
        onFilter: (value, record) => record.ywly.indexOf(value) === 0
      }
      ,{
        title: '保单归属机构',
        dataIndex: 'bdgsjg',
        key:'bdgsjg',
        width:105,
        filters:filterData.bdgsjg,
        sorter: (a, b) => (new Sorter().sort(a.bdgsjg, b.bdgsjg)),
        onFilter: (value, record) => record.bdgsjg.indexOf(value) === 0
      }
      ,{
        title: '启保日期',
        dataIndex: 'qbrq',
        key:'qbrq',
        width:105,
        filters:filterData.qbrq,
        sorter: (a, b) => (new Sorter().sort(a.qbrq, b.qbrq)),
        onFilter: (value, record) => record.qbrq.indexOf(value) === 0
      }
      ,{
        title: '终保日期',
        dataIndex: 'zbrq',
        key:'zbrq',
        width:105,
        filters:filterData.zbrq,
        sorter: (a, b) => (new Sorter().sort(a.zbrq, b.zbrq)),
        onFilter: (value, record) => record.zbrq.indexOf(value) === 0
      }
      ,{
        title: '估损金额',
        dataIndex: 'gsje',
        key:'gsje',
        width:85,
        filters:filterData.gsje,
        sorter: (a, b) => (new Sorter().sort(a.gsje, b.gsje)),
        onFilter: (value, record) => record.gsje.indexOf(value) === 0,
        render: (text)=>{return Number(text).toFixed(2)}
      },{
        title: '估计赔款',
        dataIndex: 'gjpk',
        key:'gjpk',
        width:85,
        filters:filterData.gjpk,
        sorter: (a, b) => (new Sorter().sort(a.gjpk, b.gjpk)),
        onFilter: (value, record) => record.gjpk.indexOf(value) === 0,
        render: (text)=>{return Number(text).toFixed(2)}
        
      },{
        title: '报案人',
        dataIndex: 'bar',
        key:'bar',
        width:73,
        filters:filterData.bar,
        sorter: (a, b) => (new Sorter().sort(a.bar, b.bar)),
        onFilter: (value, record) => record.bar.indexOf(value) === 0
      } ,{
        title: '报案人电话',
        dataIndex: 'bardh',
        key:'bardh',
        width:95,
        filters:filterData.bardh,
        sorter: (a, b) => (new Sorter().sort(a.bardh, b.bardh)),
        onFilter: (value, record) => record.bardh.indexOf(value) === 0
      },{
        title: '立案日期',
        dataIndex: 'larq',
        key:'larq',
        width:73,
        filters:filterData.larq,
        sorter: (a, b) => (new Sorter().sort(a.larq, b.larq)),
        onFilter: (value, record) => record.larq.indexOf(value) === 0
      }
     
      ,{
        title: '查勘员',
        dataIndex: 'cky',
        key:'cky',
        width:73,
        filters:filterData.cky,
        sorter: (a, b) => (new Sorter().sort(a.cky, b.cky)),
        onFilter: (value, record) => record.cky.indexOf(value) === 0
      },{
        title: '查勘员2',
        dataIndex: 'cky2',
        key:'cky2',
        width:73,
        filters:filterData.cky2,
        sorter: (a, b) => (new Sorter().sort(a.cky2, b.cky2)),
        onFilter: (value, record) => record.cky2.indexOf(value) === 0
      } 
      ,{
        title: '处理人代码',
        dataIndex: 'clrdm',
        key:'clrdm',
        width:73,
        filters:filterData.clrdm,
        sorter: (a, b) => (new Sorter().sort(a.clrdm, b.clrdm)),
        onFilter: (value, record) => record.clrdm.indexOf(value) === 0
      } 
      ,{
        title: '保单经办人',
        dataIndex: 'bdjbr',
        key:'bdjbr',
        width:73,
        filters:filterData.bdjbr,
        sorter: (a, b) => (new Sorter().sort(a.bdjbr, b.bdjbr)),
        onFilter: (value, record) => record.bdjbr.indexOf(value) === 0
      } 
      ,{
        title: '保单归属人',
        dataIndex: 'bdgsr',
        key:'bdgsr',
        width:73,
        filters:filterData.bdgsr,
        sorter: (a, b) => (new Sorter().sort(a.bdgsr, b.bdgsr)),
        onFilter: (value, record) => record.bdgsr.indexOf(value) === 0
      } 
      ,{
        title: '被保险人',
        dataIndex: 'bbxr',
        key:'bbxr',
        width:73,
        filters:filterData.bbxr,
        sorter: (a, b) => (new Sorter().sort(a.bbxr, b.bbxr)),
        onFilter: (value, record) => record.bbxr.indexOf(value) === 0
      } 
      ,{
        title: '厂牌型号',
        dataIndex: 'cpxh',
        key:'cpxh',
        width:85,
        filters:filterData.cpxh,
        sorter: (a, b) => (new Sorter().sort(a.cpxh, b.cpxh)),
        onFilter: (value, record) => record.cpxh.indexOf(value) === 0
      }
      ,{
        title: '上传时间',
        dataIndex: 'createTime',
        key:'createTime',
        width:90,
        filters:filterData.createTime,
        sorter: (a, b) => (new Sorter().sort(a.createTime, b.createTime)),
        onFilter: (value, record) => record.createTime.indexOf(value) === 0
      } 
  ];
    var self=this;
    var switchBox = columns.map(function(row,index){
        return(
          <Switch style={{margin:5}} size="small" checkedChildren={row.title} unCheckedChildren={row.title}  checked={self.state.colVisible[index]}  onChange={self.switchChange.bind(self,index)} />     
        )
    });      
    columns = columns.filter(function(item, index){
        return self.state.colVisible[index] == true
    });
    // console.log(columns)
    const { loading, selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length > 0;  
    return (
      <div>
        <AccidentSearchBar cphUrl={this.props.chepaihao} options={this.props.options||[{field:'id', alias:'身份证'}, {field:'name', alias:'名称2'}]} downloadUrl={this.props.downloadUrl}/>
        <div style={{clear:'both'}}>
            {switchBox}
        </div>
        <Table bordered style={{clear:'both'}} key={this.key++}  columns={columns}  dataSource={this.state.recData}  />
      </div>
    );
  }
}

if(document.getElementById("accident"))
  ReactDOM.render(<Accident  {...pageUrls} />, document.getElementById("accident"));
export default Accident;