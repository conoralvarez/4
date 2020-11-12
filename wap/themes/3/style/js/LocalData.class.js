/*jgn edit at 2014-12-22 12:00*/
//本地存储
LocalData=function(){ 
	this.checkSupport=function(){
		try { 
			return 'localStorage' in window && window['localStorage'] !== null; 
		} catch (e) { 
			return false; 
		}
	}
	this.clear = function() {
		localStorage.clear();
	}
	this.removeItem = function(key) {
		localStorage.removeItem(key);
	}
}
//添加
LocalData.prototype.putBoolean = function (key, value) {
    localStorage.setItem(key, value + "");
}
LocalData.prototype.putString = function (key, value) {
    localStorage.setItem(key, value + "");
}
LocalData.prototype.putInt = function (key, value) {
    localStorage.setItem(key, value + "");
}
LocalData.prototype.putJSON = function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
}
// 获取
LocalData.prototype.getBoolean = function (key) {
    return "TRUE" == localStorage.getItem(key) ? true : false;
}
LocalData.prototype.getString = function (key) {
    return localStorage.getItem(key);
}
LocalData.prototype.getInt = function (key) {
    if (localStorage.getItem(key) != undefined || localStorage.getItem(key) != null) {
        return parseInt(localStorage.getItem(key));
    } else {
        return 0;
    }
}
LocalData.prototype.getJSON = function (key) {
    return JSON.parse(localStorage.getItem(key));
}
LocalData.prototype.parseJSON = function (key) {
    return eval('(' + localStorage.getItem(key) + ')');
}