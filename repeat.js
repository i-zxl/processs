
//repeat
const repeat = function (list, result = [], count) {
  if (list.length === 0) {
    return result;
  }
  // 每组的请求个数
  let send = list.splice(0, count);
  return Promise.all(send.map((i) => {
    return httpRequest(i);
  })).then(function (fetchResult) {
    // 如果组内请求只要有一个错误就从新再拼接到请求列表
    if (fetchResult[0].code != 0 || fetchResult[1].code != 0) {
      list.concat(send);
    } else {
      fetchResult = fetchResult.map(function (item) {
        return item.result.data
      })
      result = result.concat(fetchResult)
    }
    return repeat(list, result, count)
  })
}
