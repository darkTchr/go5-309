export default function (obj) {
  //对请求进行封装 优化
  //url   method   data
  //对参数处理

  let url = obj.url || '';
  let method = obj.method || 'get';
  let data = obj.data || {};

  // 配置服务器地址
  url = 'https://www.uinav.com' + url;

  // var s = new Date()
  // d.xx
  //
  // var xhr = new XMLHttpRequest()
  // xhr.xx
  //
  // var p = new Promise()
  // p.xx

  return new Promise((resolve,reject)=>{

    // 发起请求

    mpvue.request({
      url,
      method,
      data,
      success(info){
        resolve(info.data)
      }
    })
  })
}
