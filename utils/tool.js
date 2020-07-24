// 工具方法 封装

// =====================交互提示框==========================

// uni.showToast()方法封装 success loading
const _showToast = ({title='提示',icon='none',mask=false,duration=2000})=>{
  uni.showToast({
    title,icon,mask,duration
  })
}

// uni.showModal
const _showModal = (options = {})=>{
  let {title='小U君温馨提示',content='确定要删除吗'} = options;
  return new Promise((resolve,reject)=>{
    uni.showModal({
      title,
      content,
      success:resolve,
      fail:reject
    })
  })
}

// uni.showLoading 需主动调用 uni.hideLoading 才能关闭提示框
const _showLoading = (options = {})=>{
  let {title="加载中...",mask=false} = options;
  return new Promise((resolve,reject)=>{
    uni.showLoading({
      title,
      mask,
    })
  })
}

// uni.hideLoading() 关闭
const _hideLoading = ()=>{
	return uni.hideLoading();
}

// =====================本地存储==========================

// 获取本地存储对应key
const _getStorage = (key)=>{
  return uni.getStorageSync( key );
}

// 设置本地存储对应key
const _setStorage = (key,value)=>{
  return uni.setStorageSync( key,value );
}

// 清除全部本地存储
const _clearStorage = ()=>{
  uni.clearStorageSync();
}

// 清除指定key本地存储
const _removeStorage = ( key )=>{
  uni.removeStorageSync( key );
}






export default {
	_showToast,
	_showModal,
	_showLoading,
	_hideLoading,
	_getStorage,
	_setStorage,
	_clearStorage,
	_removeStorage,	
	
}