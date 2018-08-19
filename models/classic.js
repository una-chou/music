import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {

  getLatest(sCallBack){
    this.request({
      url: "classic/latest",
      success: (res) => {
        sCallBack(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index, nextOrPervious, sCallBack){
    let key = nextOrPervious == "next" ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url: "classic/" + index + "/" + nextOrPervious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallBack(res)
        }
      })
    }
    else {
      sCallBack(classic)
    }
  }

  isFirst(index){
    return index == 1 ? true : false
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false
  }

  _setLatestIndex(index){
    wx.setStorageSync("index", index)
  }

  _getLatestIndex(){  
    let index = wx.getStorageSync("index")
    return index
  }

  _getKey(index){
    let key = "classic-" + index
    return key
  }
}

export {ClassicModel}