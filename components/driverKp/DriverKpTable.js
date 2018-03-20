import { Table,DatePicker, Select,Row,Col } from 'antd';
import Sorter from '../util/Sorter';
import { Input, Button,Switch} from 'antd';
const Search = Input.Search;
// const { MonthPicker, RangePicker } = DatePicker;
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
var sorter = new Sorter();
const date=new Date;
const year=date.getFullYear(); 
const years = [year, year-1, year-2, year-3, year-4];

const calc = (col, total, ratio, isOwner=-1)=>{
  if(isOwner == 0){
    return 0;
  }
  var score = 0;
  if(col == '0'){return 0}
  else{
    score = parseInt(col) * ratio;
  }
  score = score>total?total:score;
  return score;
}
const columns = [
{
  title: '序号',
  dataIndex: 'index',
  render:(value, record, index)=>(<span>{++index}</span>),
  width: 80,
//sorter: (a, b) => sorter.sortFgs(a.fgs, b.fgs),
  fixed: 'left',
},{
  title: '公司',
  dataIndex: 'fgs',
  filters: [
    { text: '一部', value: '一部' },
    { text: '二部', value: '二部' },
    { text: '三部', value: '三部' },
  ],
  width: 80,
  filterMultiple: false,
  onFilter: (value, record) => record.fgs.indexOf(value) === 0,
  sorter: (a, b) => sorter.sortFgs(a.fgs, b.fgs),
  fixed: 'left',
},{
  title: '姓名',
  width: 80,
  dataIndex: 'xm',
  // filters: [
  // { text: '黄嵩凯', value: '黄嵩凯' },
  //   { text: '姜雪威', value: '姜雪威' }],
  // onFilter: (value, record) => record.xm.indexOf(value) === 0,
  sorter: (a, b) => sorter.sort(a.xm, b.xm),
  fixed: 'left'
},{
  title: '参与评选',
  dataIndex: 'isNew',
  render: (text)=>{return text == 0?<span>是</span>:<span>否</span>},
  fixed: 'left',
  sorter: (a, b) => sorter.sort(a.isNew, b.isNew),
  width: 80,
},{
  title: '车主',
  filters: [
    { text: '是', value: 1 },
    { text: '否', value: 0 },
  ],
  filterMultiple: false,
  onFilter: (value, record) => record.isOwner == value,
  dataIndex: 'isOwner',
  render: (text)=>{return text == 1?<span>是</span>:<span>否</span>},
  fixed: 'left',
  width: 80,
},{
  title: '主副驾',
  dataIndex: 'zfj',
  sorter: (a, b) => sorter.sort(a.zfj, b.zfj),
  width: 100,
},{
  title: '车牌号',
  dataIndex: 'cph',
  // filters: [
  // { text: '一公司', value: '一公司' },
  //   { text: '二公司', value: '二公司' }],
  // onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => sorter.sort(a.cph, b.cph),
  width: 100,
}, {
  title: '租金迟交',
  children:[{
      title: '次数',
      dataIndex: 'zj',
      sorter: (a, b) => sorter.sort(a.zj, b.zj),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      sorter: (a, b) => sorter.sort(a.zj_score, b.zj_score),
      dataIndex: 'zj_score',
    }]
}, {
  title: '法律诉讼',
  children:[{
      title: '次数',
      dataIndex: 'law',
      sorter: (a, b) => sorter.sort(a.law, b.law),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      // sorter: (a, b) => sorter.sort(a.zj_score, b.zj_score),
      // dataIndex: 'zj_score',
      render: ()=>0
    }]
}, {
  title: '保险迟交',
  children:[{
      title: '次数',
      dataIndex: 'insurance',
      sorter: (a, b) => sorter.sort(a.insurance, b.insurance),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      // sorter: (a, b) => sorter.sort(a.zj_score, b.zj_score),
      // dataIndex: 'zj_score',
      render: ()=>0
    }]
}, {
  title: '投诉',
  children:[{
      title: '次数',
      dataIndex: 'ts',
      sorter: (a, b) => sorter.sort(a.ts, b.ts),
      width: 80,
    }, {
      title: '小分',
      dataIndex: 'ts_score',
      sorter: (a, b) => sorter.sort(a.ts_score, b.ts_score),
      width: 80,
    }]
}, {
  title: '事故',
  dataIndex: 'sg',
  // sorter: (a, b) => sorter.sort(a.sg, b.sg),
  width: 240,
  children:[{
      title: '总数',
      dataIndex: 'sg',
      sorter: (a, b) => sorter.sort(a.sg, b.sg),
      width: 80
    },{
      title: '重大事故',
      dataIndex: 'sg_2',
      sorter: (a, b) => sorter.sort(a.sg_2, b.sg_2),
      width: 80
    },{
      title: '一般事故',
      dataIndex: 'sg_1',
      sorter: (a, b) => sorter.sort(a.sg_1, b.sg_1),
      width: 80
    },{
      title: '轻微事故',
      dataIndex: 'sg_0',
      sorter: (a, b) => sorter.sort(a.sg_0, b.sg_0),
      width: 80
    },{
      title: '小分',
      dataIndex: 'sg_score',
      sorter: (a, b) => sorter.sort(a.sg_score, b.sg_score),
      width: 80,
    }, 
  ],
}, {
  title: '电子违章',
  children:[{
      title: '次数',
      dataIndex: 'wz',
      sorter: (a, b) => sorter.sort(a.wz, b.wz),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      sorter: (a, b) => sorter.sort(a.wz_score, b.wz_score),
      dataIndex: 'wz_score',
    }]
}, {
  title: '路检',
  children:[{
      title: '次数',
      dataIndex: 'lj',
      sorter: (a, b) => sorter.sort(a.lj, b.lj),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      sorter: (a, b) => a.lj_score - b.lj_score,
      dataIndex: 'lj_score',
    }]
}, {
  title: '例会缺席',
  children:[{
      title: '次数',
      dataIndex: 'lh',
      sorter: (a, b) => sorter.sort(a.lh, b.lh),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      sorter: (a, b) => sorter.sort(a.lh_score, b.lh_score),
      dataIndex: 'lh_score',
    }]
}, {
  title: '减分总评',
  dataIndex: 'score',
  sorter: (a, b) => sorter.sort(a.score, b.score),
  render:(text, record, index)=>{return record.isNew == 0?<div style={{backgroundColor:'#00FFCC'}}>{record.score}</div>:<div style={{backgroundColor:'grey'}}>{record.score}</div>},
  width: 80,
}, {
  title: '参加活动',
  children:[{
      title: '次数',
      dataIndex: 'hd',
      sorter: (a, b) => sorter.sort(a.hd, b.hd),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      sorter: (a, b) => sorter.sort(a.hd_score, b.hd_score),
      dataIndex: 'hd_score',
    }]
}, {
  title: '媒体表扬',
  children:[{
      title: '次数',
      dataIndex: 'mt',
      sorter: (a, b) => sorter.sort(a.mt, b.mt),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      sorter: (a, b) => sorter.sort(a.mt_score, b.mt_score),
      dataIndex: 'mt_score',
    }]
}, {
  title: '乘客表彰',
  children:[{
      title: '次数',
      dataIndex: 'praise',
      sorter: (a, b) => sorter.sort(a.praise, b.praise),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      sorter: (a, b) => sorter.sort(a.praise_score, b.praise_score),
      dataIndex: 'praise_score',
    }]
}, {
  title: '二维码支付',
  children:[{
      title: '次数',
      dataIndex: 'pay',
      render: (text, record) =>{return 0},
      sorter: (a, b) => sorter.sort(a.pay, b.pay),
      width: 80,
    }, {
      title: '小分',
      width: 80,
      render: (text, record) =>{return 0},
      dataIndex: 'pay_score',
    }]
}, {
  title: '加分总评',
  dataIndex: 'score2',
  sorter: (a, b) => sorter.sort(a.score2, b.score2),
  render:(text, record, index)=>{return record.isNew == 0?<div style={{backgroundColor:'red'}}>{record.score2||0}</div>:<div style={{backgroundColor:'grey'}}>{record.score2||0}</div>},
  width: 80,
}];
const data=[];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class JiaShiYuanBaiFenTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      loading:true,
      year:"",
      isPagination:{pageSize: 10}
    };
  }
  componentDidMount(){
    var self = this;
    this.handleChange(years[1])
  }
  handleChange(dateString){
    // console.log(dateString)
    var self = this;
    self.setState({
        loading:true,
        year:dateString
    });
    $.get("/DZOMS/ky/driverKp/dtoList/"+dateString,function(data){
      var records = data.data;
      self.setState({
        data:records,
        loading:false
      });
      self.originData = records;
    });
  }

  search(value){
    var result = this.originData.filter((item)=>{
      return item.xm.indexOf(value) > -1 || item.cph.indexOf(value) > -1 
    });
    this.setState({
      data:result
    })
  }
  
  reset(){
    this.setState({
      data:this.originData
    })
  }
  
  onSwitchChange(value){
      // console.log(value);
      if(value==false){
         this.setState({
            isPagination:false
         });
      }else{
         this.setState({
            isPagination:{ pageSize: 10 }
         });
      }

  }
  render(){
    var exportUrl="/DZOMS/ky/driverKp/downloadExcel/"+this.state.year||2017;
    return(
    <div>
      <div style={{font:'bold',fontSize:'18px',textAlign:'center'}}>驾驶员百分考核</div>
      <Row style={{marginTop:20, marginBottom:20}}>
        <Col lg={{ span: 3, offset: 0}} xs={{ span: 6, offset: 0}}>
          <Select
            style={{ width: '100%' }}
            placeholder="选择年份"
            defaultValue={years[1]}
            onChange={this.handleChange.bind(this)}
          >
            <Option value={years[0]}>{years[0]}</Option>
            <Option value={years[1]}>{years[1]}</Option>
            <Option value={years[2]}>{years[2]}</Option>
            <Option value={years[3]}>{years[3]}</Option>
            <Option value={years[4]}>{years[4]}</Option>
          </Select>
        </Col>
        <Col lg={{ span: 4, offset: 0}} xs={{ span: 6, offset: 0}}>
            <Search
              placeholder="输入人名或者车牌号搜索"
              onSearch={this.search.bind(this)}
              enterButton
            />
        </Col>
        {/*<Col lg={{ span: 1, offset: 0}}>
          <Button type="primary">搜索</Button>
        </Col>*/}
        <Col lg={{ span: 1, offset: 1}} xs={{ span: 2, offset: 1}}>
          <Button type="dashed" onClick={this.reset.bind(this)}>重置</Button>
        </Col>
        <Col lg={{ span: 3, offset: 1}} sm={{ span: 3, offset: 1}} md={{ span: 2, offset: 1}} xs={{ span: 3, offset: 1}}>
            <Switch checkedChildren="分页" unCheckedChildren="不分页" defaultChecked  onChange={this.onSwitchChange.bind(this)} />
        </Col>
        <Col style={{float:'right',marginRight:15}} lg={{ span: 1}} xs={{ span: 1}}>
          <Button type="primary"><a href={exportUrl}>导出</a></Button>
        </Col>
      </Row>
      <Table bordered style={{textAlign:'center'}}  scroll={{x:3000,y:600}} size="middle" columns={columns} dataSource={this.state.data} pagination={this.state.isPagination} loading={this.state.loading}
 onChange={onChange} />
    </div>
    );
  }
}

if(document.getElementById("root"))
   ReactDOM.render(<JiaShiYuanBaiFenTable />, document.getElementById("root"));