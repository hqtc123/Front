/**
 * Created by simu-hq on 2014/9/15.
 */

var _ajax = function (url, data, type, callback) {
    jQuery.ajax({
        type: type,
        url: GlobalConstants.serverRoot + url,
        data: data,
        dataType: 'json',
        success: callback
    })
}

// 接口 方法
apiPost = function (url, data, callback) {
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    _ajax(url, data, "post", callback);
}

apiGet = function (url, data, callback) {
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    _ajax(url, data, "get", callback);
}


