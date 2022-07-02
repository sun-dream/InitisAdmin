import axios from 'axios'
// 下载文件（可解决跨域下载问题）
export async function downloadFile (fileUrl, fileName) {
  if (!fileUrl) { return }
  const res = await axios({
    method: 'get',
    url: fileUrl,
    responseType: 'blob'
  })
  const newUrl = window.URL.createObjectURL(res.data)
  const a = document.createElement('a')
  a.href = newUrl
  a.download = fileName
  a.click()
  a.remove()
  // 在资源下载完成后 可以人工清除createObjectURL 占用的缓存资源
  window.URL.revokeObjectURL(newUrl)
}

export function copyText (data) {
  // 存储传递过来的数据
  const OrderNumber = data
  // 创建一个input 元素
  // createElement() 方法通过指定名称创建一个元素
  const newInput = document.createElement('input')
  // 讲存储的数据赋值给input的value值
  newInput.value = OrderNumber
  // appendChild() 方法向节点添加最后一个子节点。
  document.body.appendChild(newInput)
  // 选中input元素中的文本
  // select() 方法用于选择该元素中的文本。
  newInput.select()
  // 执行浏览器复制命令
  //  execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令
  document.execCommand('Copy')
  // 清空输入框
  newInput.remove()
}
