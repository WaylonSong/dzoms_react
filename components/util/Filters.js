/*
  组件功能：准备筛选的数据项
*/
import StringUtil from './StringUtil';

class Filters{
    filter(recData){
        var filterData={}; //要进行筛选的数据
        if(recData){
          recData.map(item=>{
            for(var key in item){
                if(filterData[key]){
                  filterData[key].push(item[key]);
                  filterData[key]= Array.from(new Set(filterData[key]));
                }else{
                  filterData[key]=[item[key]];
                  filterData[key]= Array.from(new Set(filterData[key]));
                }
            }                           
          });
        }
        console.log(filterData)
        for(var i in filterData){
          for(var j in filterData[i]){
              filterData[i][j]={text:StringUtil.safeGet(filterData[i][j]),value:StringUtil.safeGet(filterData[i][j])};
          }    
        }
        return filterData;
    }
}
export default Filters;