import React, { Fragment, useState, useEffect } from 'react';
import { MainLayout, Header } from '@bigbinary/neetoui/layouts';
import { Toastr, Tab, Avatar, Tooltip, Button, PageLoader, Input, Label, Switch, Pane } from '@bigbinary/neetoui';

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

var toString = Object.prototype.toString;

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isFile(val) {
  return toString.call(val) === '[object File]';
}

function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

function merge() {
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}

function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

var buildURL = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

var transformData = function transformData(data, headers, fns) {
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code
    };
  };

  return error;
};

var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

var cookies = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

var isAbsoluteURL = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var isURLSameOrigin = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  function resolveURL(url) {
    var href = url;

    if (msie) {
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type'];
    }

    var request = new XMLHttpRequest();

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    request.timeout = config.timeout;

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response);
      request = null;
    };

    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));
      request = null;
    };

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request));
      request = null;
    };

    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
      request = null;
    };

    if (utils.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          delete requestHeaders[key];
        } else {
          request.setRequestHeader(key, val);
        }
      });
    }

    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    adapter = xhr;
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }

    return data;
  }],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults;

function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData(config.data, config.headers, config.transformRequest);
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults_1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

var mergeConfig = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }

    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, mergeDeepProperties);
  return config;
};

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

Axios.prototype.request = function request(config) {
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
var Axios_1 = Axios;

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel;

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

var isAxiosError = function isAxiosError(payload) {
  return typeof payload === 'object' && payload.isAxiosError === true;
};

function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);
  utils.extend(instance, Axios_1.prototype, context);
  utils.extend(instance, context);
  return instance;
}

var axios = createInstance(defaults_1);
axios.Axios = Axios_1;

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;
axios.isAxiosError = isAxiosError;
var axios_1 = axios;
var _default = axios;
axios_1["default"] = _default;

var axios$1 = axios_1;

var users = "/api/v1/users";
var createTeamMember = function createTeamMember(payload) {
  return axios$1.post(users, payload);
};
var getActiveMembers = function getActiveMembers() {
  return axios$1.get(users + "?active=true");
};
var getInactiveMembers = function getInactiveMembers() {
  return axios$1.get(users + "?inactive=true");
};
var setActivationStatus = function setActivationStatus(id, status) {
  return axios$1.put(users + "/" + id + "?active=" + status);
};

var Container = function Container(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full overflow-y-hidden bg-white"
  }, children);
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
}

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

var _xfBase = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});

var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */
var bind$1 = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind$1(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var toString$1 = Object.prototype.toString;
var _isArguments = function () {
  return toString$1.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString$1.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
};

// cover IE < 9 keys issues
var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
} : function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
};
var keys = /*#__PURE__*/_curry1(_keys);

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */
var reduce = /*#__PURE__*/_curry3(_reduce);

function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
}

function _cloneRegExp(pattern) {
                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */
var type = /*#__PURE__*/_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':
      return copy({});
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return _cloneRegExp(value);
    default:
      return value;
  }
}

/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */
var clone = /*#__PURE__*/_curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
});

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */
var not = /*#__PURE__*/_curry1(function not(a) {
  return !a;
});

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
var reverse = /*#__PURE__*/_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
}

function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

function _containsWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
var identical = /*#__PURE__*/_curry2(function identical(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !_containsWith(function (b, aItem) {
    return !_containsWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);

  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
var equals = /*#__PURE__*/_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

function _contains(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

var XFilter = /*#__PURE__*/function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;
  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, keys(filterable)) :
  // else
  _filter(pred, filterable);
}));

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var reject = /*#__PURE__*/_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function (obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return (/^\d+$/.test(k)
        );
      }, keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
var toString$2 = /*#__PURE__*/_curry1(function toString(val) {
  return _toString(val, []);
});

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */
var empty = /*#__PURE__*/_curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() :
  // else
  void 0;
});

/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */
var invoker = /*#__PURE__*/_curry2(function invoker(arity, method) {
  return curryN(arity + 1, function () {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString$2(target) + ' does not have a method named "' + method + '"');
  });
});

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */
var isEmpty = /*#__PURE__*/_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */
var join = /*#__PURE__*/invoker(1, 'join');

var showToastrError = function showToastrError(errorObj) {
  var _errorObj$data, _errorObj$data2;

  var message;

  if (typeof errorObj === "string") {
    message = errorObj;
  } else if (Array.isArray(errorObj)) {
    message = join("\n", errorObj);
  } else if (Array.isArray(errorObj === null || errorObj === void 0 ? void 0 : errorObj.errors)) {
    message = join("\n", errorObj.errors);
  } else if (errorObj !== null && errorObj !== void 0 && errorObj.data && errorObj !== null && errorObj !== void 0 && (_errorObj$data = errorObj.data) !== null && _errorObj$data !== void 0 && _errorObj$data.error) {
    message = errorObj.data.error;
  } else if (errorObj !== null && errorObj !== void 0 && errorObj.data && errorObj !== null && errorObj !== void 0 && (_errorObj$data2 = errorObj.data) !== null && _errorObj$data2 !== void 0 && _errorObj$data2.errors) {
    message = join("\n", errorObj.data.errors);
  } else {
    message = "Something went wrong";
  }

  Toastr.error({
    error: message
  });
};
var showToastrSuccess = function showToastrSuccess(message) {
  Toastr.success(message);
};
var isPresent = compose(not, isEmpty);

var SubNavBar = function SubNavBar(_ref) {
  var activeTab = _ref.activeTab,
      setActiveTab = _ref.setActiveTab,
      tabs = _ref.tabs;
  return /*#__PURE__*/React.createElement(Tab, {
    className: "mb-2"
  }, tabs.map(function (tab, index) {
    return /*#__PURE__*/React.createElement(Tab.Item, {
      key: index,
      onClick: function onClick() {
        return setActiveTab(tab.value);
      },
      icon: tab.icon,
      active: tab.value === activeTab
    }, tab.label);
  }));
};

var UsersTable = function UsersTable(_ref) {
  var loading = _ref.loading,
      userData = _ref.userData,
      handleStatusChange = _ref.handleStatusChange;
  return /*#__PURE__*/React.createElement(Fragment, null, !loading ? /*#__PURE__*/React.createElement(Fragment, null, !userData ? /*#__PURE__*/React.createElement("p", {
    className: "p-6 text-gray"
  }, "No team members") : /*#__PURE__*/React.createElement("table", {
    className: "nui-table nui-table--avatar nui-table--hover nui-table--actions"
  }, /*#__PURE__*/React.createElement("tbody", null, userData.map(function (user) {
    var fullName = user.first_name + " " + user.last_name;
    var userRole = user.role;
    return /*#__PURE__*/React.createElement("tr", {
      key: user.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center justify-start text-gray-800"
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: 32,
      className: "mr-3",
      contact: {
        name: fullName
      }
    }), fullName)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center justify-center"
    }, !user.active && userRole !== "super_admin" && /*#__PURE__*/React.createElement(Tooltip, {
      content: "Activate",
      position: "bottom"
    }, /*#__PURE__*/React.createElement(Button, {
      style: "icon",
      icon: "ri-shield-line ri-lg",
      onClick: function onClick(e) {
        e.stopPropagation();
        handleStatusChange(user === null || user === void 0 ? void 0 : user.id, "true");
      }
    })), user.active && userRole !== "super_admin" && /*#__PURE__*/React.createElement(Tooltip, {
      content: "Deactivate",
      position: "bottom"
    }, /*#__PURE__*/React.createElement(Button, {
      style: "icon",
      icon: "ri-shield-check-line ri-lg",
      onClick: function onClick(e) {
        e.stopPropagation();
        handleStatusChange(user === null || user === void 0 ? void 0 : user.id, "false");
      }
    })))));
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "w-full h-60"
  }, /*#__PURE__*/React.createElement(PageLoader, null)));
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var validate = createCommonjsModule(function (module, exports) {
  (function (exports, module, define) {

    var validate = function validate(attributes, constraints, options) {
      options = v.extend({}, v.options, options);
      var results = v.runValidations(attributes, constraints, options);

      if (results.some(function (r) {
        return v.isPromise(r.error);
      })) {
        throw new Error("Use validate.async if you want support for promises");
      }

      return validate.processValidationResults(results, options);
    };

    var v = validate;

    v.extend = function (obj) {
      [].slice.call(arguments, 1).forEach(function (source) {
        for (var attr in source) {
          obj[attr] = source[attr];
        }
      });
      return obj;
    };

    v.extend(validate, {
      version: {
        major: 0,
        minor: 13,
        patch: 1,
        metadata: null,
        toString: function toString() {
          var version = v.format("%{major}.%{minor}.%{patch}", v.version);

          if (!v.isEmpty(v.version.metadata)) {
            version += "+" + v.version.metadata;
          }

          return version;
        }
      },
      Promise: typeof Promise !== "undefined" ? Promise : null,
      EMPTY_STRING_REGEXP: /^\s*$/,
      runValidations: function runValidations(attributes, constraints, options) {
        var results = [],
            attr,
            validatorName,
            value,
            validators,
            validator,
            validatorOptions,
            error;

        if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
          attributes = v.collectFormValues(attributes);
        }

        for (attr in constraints) {
          value = v.getDeepObjectValue(attributes, attr);
          validators = v.result(constraints[attr], value, attributes, attr, options, constraints);

          for (validatorName in validators) {
            validator = v.validators[validatorName];

            if (!validator) {
              error = v.format("Unknown validator %{name}", {
                name: validatorName
              });
              throw new Error(error);
            }

            validatorOptions = validators[validatorName];
            validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);

            if (!validatorOptions) {
              continue;
            }

            results.push({
              attribute: attr,
              value: value,
              validator: validatorName,
              globalOptions: options,
              attributes: attributes,
              options: validatorOptions,
              error: validator.call(validator, value, validatorOptions, attr, attributes, options)
            });
          }
        }

        return results;
      },
      processValidationResults: function processValidationResults(errors, options) {
        errors = v.pruneEmptyErrors(errors, options);
        errors = v.expandMultipleErrors(errors, options);
        errors = v.convertErrorMessages(errors, options);
        var format = options.format || "grouped";

        if (typeof v.formatters[format] === 'function') {
          errors = v.formatters[format](errors);
        } else {
          throw new Error(v.format("Unknown format %{format}", options));
        }

        return v.isEmpty(errors) ? undefined : errors;
      },
      async: function async(attributes, constraints, options) {
        options = v.extend({}, v.async.options, options);

        var WrapErrors = options.wrapErrors || function (errors) {
          return errors;
        };

        if (options.cleanAttributes !== false) {
          attributes = v.cleanAttributes(attributes, constraints);
        }

        var results = v.runValidations(attributes, constraints, options);
        return new v.Promise(function (resolve, reject) {
          v.waitForResults(results).then(function () {
            var errors = v.processValidationResults(results, options);

            if (errors) {
              reject(new WrapErrors(errors, options, attributes, constraints));
            } else {
              resolve(attributes);
            }
          }, function (err) {
            reject(err);
          });
        });
      },
      single: function single(value, constraints, options) {
        options = v.extend({}, v.single.options, options, {
          format: "flat",
          fullMessages: false
        });
        return v({
          single: value
        }, {
          single: constraints
        }, options);
      },
      waitForResults: function waitForResults(results) {
        return results.reduce(function (memo, result) {
          if (!v.isPromise(result.error)) {
            return memo;
          }

          return memo.then(function () {
            return result.error.then(function (error) {
              result.error = error || null;
            });
          });
        }, new v.Promise(function (r) {
          r();
        }));
      },
      result: function result(value) {
        var args = [].slice.call(arguments, 1);

        if (typeof value === 'function') {
          value = value.apply(null, args);
        }

        return value;
      },
      isNumber: function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
      },
      isFunction: function isFunction(value) {
        return typeof value === 'function';
      },
      isInteger: function isInteger(value) {
        return v.isNumber(value) && value % 1 === 0;
      },
      isBoolean: function isBoolean(value) {
        return typeof value === 'boolean';
      },
      isObject: function isObject(obj) {
        return obj === Object(obj);
      },
      isDate: function isDate(obj) {
        return obj instanceof Date;
      },
      isDefined: function isDefined(obj) {
        return obj !== null && obj !== undefined;
      },
      isPromise: function isPromise(p) {
        return !!p && v.isFunction(p.then);
      },
      isJqueryElement: function isJqueryElement(o) {
        return o && v.isString(o.jquery);
      },
      isDomElement: function isDomElement(o) {
        if (!o) {
          return false;
        }

        if (!o.querySelectorAll || !o.querySelector) {
          return false;
        }

        if (v.isObject(document) && o === document) {
          return true;
        }

        if (typeof HTMLElement === "object") {
          return o instanceof HTMLElement;
        } else {
          return o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
        }
      },
      isEmpty: function isEmpty(value) {
        var attr;

        if (!v.isDefined(value)) {
          return true;
        }

        if (v.isFunction(value)) {
          return false;
        }

        if (v.isString(value)) {
          return v.EMPTY_STRING_REGEXP.test(value);
        }

        if (v.isArray(value)) {
          return value.length === 0;
        }

        if (v.isDate(value)) {
          return false;
        }

        if (v.isObject(value)) {
          for (attr in value) {
            return false;
          }

          return true;
        }

        return false;
      },
      format: v.extend(function (str, vals) {
        if (!v.isString(str)) {
          return str;
        }

        return str.replace(v.format.FORMAT_REGEXP, function (m0, m1, m2) {
          if (m1 === '%') {
            return "%{" + m2 + "}";
          } else {
            return String(vals[m2]);
          }
        });
      }, {
        FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
      }),
      prettify: function prettify(str) {
        if (v.isNumber(str)) {
          if (str * 100 % 1 === 0) {
            return "" + str;
          } else {
            return parseFloat(Math.round(str * 100) / 100).toFixed(2);
          }
        }

        if (v.isArray(str)) {
          return str.map(function (s) {
            return v.prettify(s);
          }).join(", ");
        }

        if (v.isObject(str)) {
          if (!v.isDefined(str.toString)) {
            return JSON.stringify(str);
          }

          return str.toString();
        }

        str = "" + str;
        return str.replace(/([^\s])\.([^\s])/g, '$1 $2').replace(/\\+/g, '').replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, function (m0, m1, m2) {
          return "" + m1 + " " + m2.toLowerCase();
        }).toLowerCase();
      },
      stringifyValue: function stringifyValue(value, options) {
        var prettify = options && options.prettify || v.prettify;
        return prettify(value);
      },
      isString: function isString(value) {
        return typeof value === 'string';
      },
      isArray: function isArray(value) {
        return {}.toString.call(value) === '[object Array]';
      },
      isHash: function isHash(value) {
        return v.isObject(value) && !v.isArray(value) && !v.isFunction(value);
      },
      contains: function contains(obj, value) {
        if (!v.isDefined(obj)) {
          return false;
        }

        if (v.isArray(obj)) {
          return obj.indexOf(value) !== -1;
        }

        return value in obj;
      },
      unique: function unique(array) {
        if (!v.isArray(array)) {
          return array;
        }

        return array.filter(function (el, index, array) {
          return array.indexOf(el) == index;
        });
      },
      forEachKeyInKeypath: function forEachKeyInKeypath(object, keypath, callback) {
        if (!v.isString(keypath)) {
          return undefined;
        }

        var key = "",
            i,
            escape = false;

        for (i = 0; i < keypath.length; ++i) {
          switch (keypath[i]) {
            case '.':
              if (escape) {
                escape = false;
                key += '.';
              } else {
                object = callback(object, key, false);
                key = "";
              }

              break;

            case '\\':
              if (escape) {
                escape = false;
                key += '\\';
              } else {
                escape = true;
              }

              break;

            default:
              escape = false;
              key += keypath[i];
              break;
          }
        }

        return callback(object, key, true);
      },
      getDeepObjectValue: function getDeepObjectValue(obj, keypath) {
        if (!v.isObject(obj)) {
          return undefined;
        }

        return v.forEachKeyInKeypath(obj, keypath, function (obj, key) {
          if (v.isObject(obj)) {
            return obj[key];
          }
        });
      },
      collectFormValues: function collectFormValues(form, options) {
        var values = {},
            i,
            j,
            input,
            inputs,
            option,
            value;

        if (v.isJqueryElement(form)) {
          form = form[0];
        }

        if (!form) {
          return values;
        }

        options = options || {};
        inputs = form.querySelectorAll("input[name], textarea[name]");

        for (i = 0; i < inputs.length; ++i) {
          input = inputs.item(i);

          if (v.isDefined(input.getAttribute("data-ignored"))) {
            continue;
          }

          var name = input.name.replace(/\./g, "\\\\.");
          value = v.sanitizeFormValue(input.value, options);

          if (input.type === "number") {
            value = value ? +value : null;
          } else if (input.type === "checkbox") {
            if (input.attributes.value) {
              if (!input.checked) {
                value = values[name] || null;
              }
            } else {
              value = input.checked;
            }
          } else if (input.type === "radio") {
            if (!input.checked) {
              value = values[name] || null;
            }
          }

          values[name] = value;
        }

        inputs = form.querySelectorAll("select[name]");

        for (i = 0; i < inputs.length; ++i) {
          input = inputs.item(i);

          if (v.isDefined(input.getAttribute("data-ignored"))) {
            continue;
          }

          if (input.multiple) {
            value = [];

            for (j in input.options) {
              option = input.options[j];

              if (option && option.selected) {
                value.push(v.sanitizeFormValue(option.value, options));
              }
            }
          } else {
            var _val = typeof input.options[input.selectedIndex] !== 'undefined' ? input.options[input.selectedIndex].value : '';

            value = v.sanitizeFormValue(_val, options);
          }

          values[input.name] = value;
        }

        return values;
      },
      sanitizeFormValue: function sanitizeFormValue(value, options) {
        if (options.trim && v.isString(value)) {
          value = value.trim();
        }

        if (options.nullify !== false && value === "") {
          return null;
        }

        return value;
      },
      capitalize: function capitalize(str) {
        if (!v.isString(str)) {
          return str;
        }

        return str[0].toUpperCase() + str.slice(1);
      },
      pruneEmptyErrors: function pruneEmptyErrors(errors) {
        return errors.filter(function (error) {
          return !v.isEmpty(error.error);
        });
      },
      expandMultipleErrors: function expandMultipleErrors(errors) {
        var ret = [];
        errors.forEach(function (error) {
          if (v.isArray(error.error)) {
            error.error.forEach(function (msg) {
              ret.push(v.extend({}, error, {
                error: msg
              }));
            });
          } else {
            ret.push(error);
          }
        });
        return ret;
      },
      convertErrorMessages: function convertErrorMessages(errors, options) {
        options = options || {};
        var ret = [],
            prettify = options.prettify || v.prettify;
        errors.forEach(function (errorInfo) {
          var error = v.result(errorInfo.error, errorInfo.value, errorInfo.attribute, errorInfo.options, errorInfo.attributes, errorInfo.globalOptions);

          if (!v.isString(error)) {
            ret.push(errorInfo);
            return;
          }

          if (error[0] === '^') {
            error = error.slice(1);
          } else if (options.fullMessages !== false) {
            error = v.capitalize(prettify(errorInfo.attribute)) + " " + error;
          }

          error = error.replace(/\\\^/g, "^");
          error = v.format(error, {
            value: v.stringifyValue(errorInfo.value, options)
          });
          ret.push(v.extend({}, errorInfo, {
            error: error
          }));
        });
        return ret;
      },
      groupErrorsByAttribute: function groupErrorsByAttribute(errors) {
        var ret = {};
        errors.forEach(function (error) {
          var list = ret[error.attribute];

          if (list) {
            list.push(error);
          } else {
            ret[error.attribute] = [error];
          }
        });
        return ret;
      },
      flattenErrorsToArray: function flattenErrorsToArray(errors) {
        return errors.map(function (error) {
          return error.error;
        }).filter(function (value, index, self) {
          return self.indexOf(value) === index;
        });
      },
      cleanAttributes: function cleanAttributes(attributes, whitelist) {
        function whitelistCreator(obj, key, last) {
          if (v.isObject(obj[key])) {
            return obj[key];
          }

          return obj[key] = last ? true : {};
        }

        function buildObjectWhitelist(whitelist) {
          var ow = {},
              attr;

          for (attr in whitelist) {
            if (!whitelist[attr]) {
              continue;
            }

            v.forEachKeyInKeypath(ow, attr, whitelistCreator);
          }

          return ow;
        }

        function cleanRecursive(attributes, whitelist) {
          if (!v.isObject(attributes)) {
            return attributes;
          }

          var ret = v.extend({}, attributes),
              w,
              attribute;

          for (attribute in attributes) {
            w = whitelist[attribute];

            if (v.isObject(w)) {
              ret[attribute] = cleanRecursive(ret[attribute], w);
            } else if (!w) {
              delete ret[attribute];
            }
          }

          return ret;
        }

        if (!v.isObject(whitelist) || !v.isObject(attributes)) {
          return {};
        }

        whitelist = buildObjectWhitelist(whitelist);
        return cleanRecursive(attributes, whitelist);
      },
      exposeModule: function exposeModule(validate, root, exports, module, define) {
        if (exports) {
          if (module && module.exports) {
            exports = module.exports = validate;
          }

          exports.validate = validate;
        } else {
          root.validate = validate;

          if (validate.isFunction(define) && define.amd) {
            define([], function () {
              return validate;
            });
          }
        }
      },
      warn: function warn(msg) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[validate.js] " + msg);
        }
      },
      error: function error(msg) {
        if (typeof console !== "undefined" && console.error) {
          console.error("[validate.js] " + msg);
        }
      }
    });
    validate.validators = {
      presence: function presence(value, options) {
        options = v.extend({}, this.options, options);

        if (options.allowEmpty !== false ? !v.isDefined(value) : v.isEmpty(value)) {
          return options.message || this.message || "can't be blank";
        }
      },
      length: function length(value, options, attribute) {
        if (!v.isDefined(value)) {
          return;
        }

        options = v.extend({}, this.options, options);

        var is = options.is,
            maximum = options.maximum,
            minimum = options.minimum,
            tokenizer = options.tokenizer || function (val) {
          return val;
        },
            err,
            errors = [];

        value = tokenizer(value);
        var length = value.length;

        if (!v.isNumber(length)) {
          return options.message || this.notValid || "has an incorrect length";
        }

        if (v.isNumber(is) && length !== is) {
          err = options.wrongLength || this.wrongLength || "is the wrong length (should be %{count} characters)";
          errors.push(v.format(err, {
            count: is
          }));
        }

        if (v.isNumber(minimum) && length < minimum) {
          err = options.tooShort || this.tooShort || "is too short (minimum is %{count} characters)";
          errors.push(v.format(err, {
            count: minimum
          }));
        }

        if (v.isNumber(maximum) && length > maximum) {
          err = options.tooLong || this.tooLong || "is too long (maximum is %{count} characters)";
          errors.push(v.format(err, {
            count: maximum
          }));
        }

        if (errors.length > 0) {
          return options.message || errors;
        }
      },
      numericality: function numericality(value, options, attribute, attributes, globalOptions) {
        if (!v.isDefined(value)) {
          return;
        }

        options = v.extend({}, this.options, options);
        var errors = [],
            name,
            count,
            checks = {
          greaterThan: function greaterThan(v, c) {
            return v > c;
          },
          greaterThanOrEqualTo: function greaterThanOrEqualTo(v, c) {
            return v >= c;
          },
          equalTo: function equalTo(v, c) {
            return v === c;
          },
          lessThan: function lessThan(v, c) {
            return v < c;
          },
          lessThanOrEqualTo: function lessThanOrEqualTo(v, c) {
            return v <= c;
          },
          divisibleBy: function divisibleBy(v, c) {
            return v % c === 0;
          }
        },
            prettify = options.prettify || globalOptions && globalOptions.prettify || v.prettify;

        if (v.isString(value) && options.strict) {
          var pattern = "^-?(0|[1-9]\\d*)";

          if (!options.onlyInteger) {
            pattern += "(\\.\\d+)?";
          }

          pattern += "$";

          if (!new RegExp(pattern).test(value)) {
            return options.message || options.notValid || this.notValid || this.message || "must be a valid number";
          }
        }

        if (options.noStrings !== true && v.isString(value) && !v.isEmpty(value)) {
          value = +value;
        }

        if (!v.isNumber(value)) {
          return options.message || options.notValid || this.notValid || this.message || "is not a number";
        }

        if (options.onlyInteger && !v.isInteger(value)) {
          return options.message || options.notInteger || this.notInteger || this.message || "must be an integer";
        }

        for (name in checks) {
          count = options[name];

          if (v.isNumber(count) && !checks[name](value, count)) {
            var key = "not" + v.capitalize(name);
            var msg = options[key] || this[key] || this.message || "must be %{type} %{count}";
            errors.push(v.format(msg, {
              count: count,
              type: prettify(name)
            }));
          }
        }

        if (options.odd && value % 2 !== 1) {
          errors.push(options.notOdd || this.notOdd || this.message || "must be odd");
        }

        if (options.even && value % 2 !== 0) {
          errors.push(options.notEven || this.notEven || this.message || "must be even");
        }

        if (errors.length) {
          return options.message || errors;
        }
      },
      datetime: v.extend(function (value, options) {
        if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
          throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
        }

        if (!v.isDefined(value)) {
          return;
        }

        options = v.extend({}, this.options, options);
        var err,
            errors = [],
            earliest = options.earliest ? this.parse(options.earliest, options) : NaN,
            latest = options.latest ? this.parse(options.latest, options) : NaN;
        value = this.parse(value, options);

        if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
          err = options.notValid || options.message || this.notValid || "must be a valid date";
          return v.format(err, {
            value: arguments[0]
          });
        }

        if (!isNaN(earliest) && value < earliest) {
          err = options.tooEarly || options.message || this.tooEarly || "must be no earlier than %{date}";
          err = v.format(err, {
            value: this.format(value, options),
            date: this.format(earliest, options)
          });
          errors.push(err);
        }

        if (!isNaN(latest) && value > latest) {
          err = options.tooLate || options.message || this.tooLate || "must be no later than %{date}";
          err = v.format(err, {
            date: this.format(latest, options),
            value: this.format(value, options)
          });
          errors.push(err);
        }

        if (errors.length) {
          return v.unique(errors);
        }
      }, {
        parse: null,
        format: null
      }),
      date: function date(value, options) {
        options = v.extend({}, options, {
          dateOnly: true
        });
        return v.validators.datetime.call(v.validators.datetime, value, options);
      },
      format: function format(value, options) {
        if (v.isString(options) || options instanceof RegExp) {
          options = {
            pattern: options
          };
        }

        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is invalid",
            pattern = options.pattern,
            match;

        if (!v.isDefined(value)) {
          return;
        }

        if (!v.isString(value)) {
          return message;
        }

        if (v.isString(pattern)) {
          pattern = new RegExp(options.pattern, options.flags);
        }

        match = pattern.exec(value);

        if (!match || match[0].length != value.length) {
          return message;
        }
      },
      inclusion: function inclusion(value, options) {
        if (!v.isDefined(value)) {
          return;
        }

        if (v.isArray(options)) {
          options = {
            within: options
          };
        }

        options = v.extend({}, this.options, options);

        if (v.contains(options.within, value)) {
          return;
        }

        var message = options.message || this.message || "^%{value} is not included in the list";
        return v.format(message, {
          value: value
        });
      },
      exclusion: function exclusion(value, options) {
        if (!v.isDefined(value)) {
          return;
        }

        if (v.isArray(options)) {
          options = {
            within: options
          };
        }

        options = v.extend({}, this.options, options);

        if (!v.contains(options.within, value)) {
          return;
        }

        var message = options.message || this.message || "^%{value} is restricted";

        if (v.isString(options.within[value])) {
          value = options.within[value];
        }

        return v.format(message, {
          value: value
        });
      },
      email: v.extend(function (value, options) {
        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is not a valid email";

        if (!v.isDefined(value)) {
          return;
        }

        if (!v.isString(value)) {
          return message;
        }

        if (!this.PATTERN.exec(value)) {
          return message;
        }
      }, {
        PATTERN: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
      }),
      equality: function equality(value, options, attribute, attributes, globalOptions) {
        if (!v.isDefined(value)) {
          return;
        }

        if (v.isString(options)) {
          options = {
            attribute: options
          };
        }

        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is not equal to %{attribute}";

        if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
          throw new Error("The attribute must be a non empty string");
        }

        var otherValue = v.getDeepObjectValue(attributes, options.attribute),
            comparator = options.comparator || function (v1, v2) {
          return v1 === v2;
        },
            prettify = options.prettify || globalOptions && globalOptions.prettify || v.prettify;

        if (!comparator(value, otherValue, options, attribute, attributes)) {
          return v.format(message, {
            attribute: prettify(options.attribute)
          });
        }
      },
      url: function url(value, options) {
        if (!v.isDefined(value)) {
          return;
        }

        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is not a valid url",
            schemes = options.schemes || this.schemes || ['http', 'https'],
            allowLocal = options.allowLocal || this.allowLocal || false,
            allowDataUrl = options.allowDataUrl || this.allowDataUrl || false;

        if (!v.isString(value)) {
          return message;
        }

        var regex = "^" + "(?:(?:" + schemes.join("|") + ")://)" + "(?:\\S+(?::\\S*)?@)?" + "(?:";
        var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

        if (allowLocal) {
          tld += "?";
        } else {
          regex += "(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
        }

        regex += "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" + "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" + "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" + tld + ")" + "(?::\\d{2,5})?" + "(?:[/?#]\\S*)?" + "$";

        if (allowDataUrl) {
          var mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
          var urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
          var dataurl = "data:(?:" + mediaType + ")?(?:;base64)?," + urlchar;
          regex = "(?:" + regex + ")|(?:^" + dataurl + "$)";
        }

        var PATTERN = new RegExp(regex, 'i');

        if (!PATTERN.exec(value)) {
          return message;
        }
      },
      type: v.extend(function (value, originalOptions, attribute, attributes, globalOptions) {
        if (v.isString(originalOptions)) {
          originalOptions = {
            type: originalOptions
          };
        }

        if (!v.isDefined(value)) {
          return;
        }

        var options = v.extend({}, this.options, originalOptions);
        var type = options.type;

        if (!v.isDefined(type)) {
          throw new Error("No type was specified");
        }

        var check;

        if (v.isFunction(type)) {
          check = type;
        } else {
          check = this.types[type];
        }

        if (!v.isFunction(check)) {
          throw new Error("validate.validators.type.types." + type + " must be a function.");
        }

        if (!check(value, options, attribute, attributes, globalOptions)) {
          var message = originalOptions.message || this.messages[type] || this.message || options.message || (v.isFunction(type) ? "must be of the correct type" : "must be of type %{type}");

          if (v.isFunction(message)) {
            message = message(value, originalOptions, attribute, attributes, globalOptions);
          }

          return v.format(message, {
            attribute: v.prettify(attribute),
            type: type
          });
        }
      }, {
        types: {
          object: function object(value) {
            return v.isObject(value) && !v.isArray(value);
          },
          array: v.isArray,
          integer: v.isInteger,
          number: v.isNumber,
          string: v.isString,
          date: v.isDate,
          "boolean": v.isBoolean
        },
        messages: {}
      })
    };
    validate.formatters = {
      detailed: function detailed(errors) {
        return errors;
      },
      flat: v.flattenErrorsToArray,
      grouped: function grouped(errors) {
        var attr;
        errors = v.groupErrorsByAttribute(errors);

        for (attr in errors) {
          errors[attr] = v.flattenErrorsToArray(errors[attr]);
        }

        return errors;
      },
      constraint: function constraint(errors) {
        var attr;
        errors = v.groupErrorsByAttribute(errors);

        for (attr in errors) {
          errors[attr] = errors[attr].map(function (result) {
            return result.validator;
          }).sort();
        }

        return errors;
      }
    };
    validate.exposeModule(validate, this, exports, module, define);
  }).call(commonjsGlobal,  exports ,  module ,  null);
});

validate.validators.array = function (arrayItems, itemConstraints) {
  var arrayItemErrors = arrayItems.reduce(function (errors, item, index) {
    var error = validate(item, itemConstraints);
    if (error) errors[index] = error;
    return errors;
  }, {});
  return isEmpty(arrayItemErrors) ? null : {
    errors: arrayItemErrors
  };
};

var Validator = /*#__PURE__*/function () {
  function Validator(constraints) {
    this.constraints = constraints;
    this.validator = validate;
    this.validator.options = {
      fullMessages: false
    };
    this.validator.validators.presence.options = {
      allowEmpty: false
    };
  }

  var _proto = Validator.prototype;

  _proto.validateState = function validateState(payload, vldtnSchema) {
    if (vldtnSchema === void 0) {
      vldtnSchema = null;
    }

    var schema = vldtnSchema || this.constraints;
    var errors = this.validator(payload, schema) || {};
    return {
      isValid: isEmpty(errors),
      errors: errors
    };
  };

  _proto.validateField = function validateField(name, value) {
    return this.validator.single(value, this.constraints[name]);
  };

  return Validator;
}();

var useValidation = function useValidation(validationSchema, formStateValues, serverErrors) {
  if (serverErrors === void 0) {
    serverErrors = "";
  }

  var _useState = useState(serverErrors),
      errors = _useState[0],
      setErrors = _useState[1];

  var _useState2 = useState(false),
      isValidating = _useState2[0],
      setIsValidating = _useState2[1];

  var _useState3 = useState(false),
      scrollToDirty = _useState3[0],
      setScrollToDirty = _useState3[1];

  var validator = new Validator(validationSchema);
  useEffect(function () {
    if (scrollToDirty) {
      setScrollToDirty(false);
      var errorElement = document.querySelector("span.error");

      if (errorElement) {
        errorElement.parentElement.scrollIntoView();
      }
    }
  }, [scrollToDirty]);
  useEffect(function () {
    setErrors(serverErrors);
  }, [serverErrors]);

  var handleSubmit = function handleSubmit(event, successCallback) {
    event.preventDefault();
    if (!isValidating) setIsValidating(true);
    var form = validator.validateState(formStateValues);
    setErrors(form.errors);

    if (form.isValid) {
      successCallback(formStateValues);
    } else {
      setScrollToDirty(true);
    }
  };

  var validateField = function validateField(name, value, forceValidate, successCallback) {
    var _extends2, _successCallback;

    if (forceValidate === void 0) {
      forceValidate = false;
    }

    if (successCallback === void 0) {
      successCallback = null;
    }

    var newErrors = validator.validateField(name, value);
    setErrors(_extends({}, errors, (_extends2 = {}, _extends2[name] = newErrors, _extends2)));
    if (successCallback && not(newErrors)) successCallback((_successCallback = {}, _successCallback[name] = value, _successCallback));
    if (!isValidating && forceValidate) setIsValidating(true);
  };

  var resetValidation = function resetValidation() {
    setIsValidating(false);
    setErrors(null);
  };

  var validateForm = function validateForm() {
    if (!isValidating) setIsValidating(true);
    var form = validator.validateState(formStateValues);
    setErrors(form.errors);
    return form.isValid;
  };

  return {
    errors: errors,
    validateField: validateField,
    handleSubmit: handleSubmit,
    resetValidation: resetValidation,
    validateForm: validateForm
  };
};

var CreateMemberForm = function CreateMemberForm(_ref) {
  var onSubmit = _ref.onSubmit,
      onCancel = _ref.onCancel,
      _ref$isInvited = _ref.isInvited,
      isInvited = _ref$isInvited === void 0 ? false : _ref$isInvited,
      submitting = _ref.submitting;
  var validationSchema = {
    first_name: {
      presence: {
        message: "First name is required"
      }
    },
    last_name: {
      presence: {
        message: "Last name is required"
      }
    },
    email: {
      email: true
    }
  };

  var _useState = useState({
    first_name: "",
    last_name: "",
    email: "",
    invite_status: "pending"
  }),
      formValues = _useState[0],
      setFormValues = _useState[1];

  var _useValidation = useValidation(validationSchema, formValues),
      errors = _useValidation.errors,
      handleSubmit = _useValidation.handleSubmit,
      validateField = _useValidation.validateField;

  var handleFormChange = function handleFormChange(attributeName, attributeValue) {
    var newFormValues = clone(formValues);
    newFormValues[attributeName] = attributeValue;
    setFormValues(newFormValues);
    validateField(attributeName, attributeValue);
  };

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row space-x-3 mb-3"
  }, /*#__PURE__*/React.createElement(Input, {
    required: true,
    autoFocus: true,
    label: "First Name",
    name: "organization_user[first_name]",
    value: formValues.first_name,
    onChange: function onChange(event) {
      return handleFormChange("first_name", event.target.value);
    },
    error: errors.first_name
  }), /*#__PURE__*/React.createElement(Input, {
    required: true,
    label: "Last Name",
    name: "organization_user[last_name]",
    value: formValues.last_name,
    onChange: function onChange(event) {
      return handleFormChange("last_name", event.target.value);
    },
    error: errors.last_name
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(Input, {
    required: true,
    label: "Email",
    name: "organization_user[email]",
    value: formValues.email,
    onChange: function onChange(event) {
      return handleFormChange("email", event.target.value);
    },
    error: errors.email
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-baseline justify-start"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "mb-1"
  }, "Invite Email"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-normal leading-4 text-gray-500"
  }, isInvited ? "An invite email has been already sent" : "An invite can be sent later if you are not ready")), isInvited ?
  /*#__PURE__*/
  React.createElement(Button, {
    label: "Resend",
    style: "link"
  }) : /*#__PURE__*/React.createElement(Switch, {
    checked: formValues.invite_status === "pending" ? true : false,
    onChange: function onChange() {
      handleFormChange("invite_status", formValues.invite_status === "pending" ? "not_invited" : "pending");
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "nui-pane__footer nui-pane__footer--absolute"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onCancel,
    label: "Cancel",
    size: "large",
    style: "secondary"
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick(e) {
      return handleSubmit(e, onSubmit);
    },
    type: "submit",
    label: "Submit",
    size: "large",
    style: "primary",
    className: "ml-2",
    loading: submitting
  })));
};

var CreateMember = function CreateMember(_ref) {
  var createUser = function createUser(payload) {
    try {
      setSubmitting(true);

      var _temp2 = _catch(function () {
        return Promise.resolve(createTeamMember({
          user: payload
        })).then(function (response) {
          showToastrSuccess(response.data.notice);
          setReloadUsers(true);
          setSubmitting(false);
          onClose();
        });
      }, function (err) {
        setSubmitting(false);
        showToastrError(err);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var isOpen = _ref.isOpen,
      setReloadUsers = _ref.setReloadUsers,
      onClose = _ref.onClose;

  var _useState = useState(false),
      submitting = _useState[0],
      setSubmitting = _useState[1];

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Pane, {
    title: "Add user",
    isOpen: isOpen,
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-6"
  }, /*#__PURE__*/React.createElement(CreateMemberForm, {
    onSubmit: createUser,
    onCancel: onClose,
    submitting: submitting
  }))));
};

var Members = function Members() {
  var _useState = useState([]),
      users = _useState[0],
      setUsers = _useState[1];

  var _useState2 = useState(false),
      reloadMembers = _useState2[0],
      setReloadMembers = _useState2[1];

  var _useState3 = useState("active"),
      activeTab = _useState3[0],
      setActiveTab = _useState3[1];

  var _useState4 = useState(false),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = useState(false),
      showCreateForm = _useState5[0],
      setShowCreateForm = _useState5[1];

  var TABS = [{
    label: "Active Members",
    value: "active"
  }, {
    label: "Inactive Members",
    value: "inactive"
  }];
  var currentMemberFetch = {
    active: getActiveMembers,
    inactive: getInactiveMembers
  }[activeTab];

  var loadMembers = function loadMembers() {
    try {
      setLoading(true);

      var _temp2 = _catch(function () {
        return Promise.resolve(currentMemberFetch()).then(function (response) {
          setUsers(response.data);
          setLoading(false);
        });
      }, function (error) {
        showToastrError(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var handleStatusChange = function handleStatusChange(id, active) {
    try {
      var _temp4 = _catch(function () {
        return Promise.resolve(setActivationStatus(id, active)).then(function (response) {
          var user = response.data;
          var status = user.active ? "active" : "inactive";
          setActiveTab(status);
          showToastrSuccess(response.data.notice);
        });
      }, function (err) {
        showToastrError(err);
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  useEffect(function () {
    loadMembers();
    setReloadMembers(false);
  }, [activeTab, reloadMembers]);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(MainLayout, null, function () {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Header, {
      title: "Members",
      actionBlock: /*#__PURE__*/React.createElement(Button, {
        icon: "ri-add-line",
        label: "Add a Member",
        onClick: function onClick() {
          return setShowCreateForm(true);
        }
      })
    }), /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-white"
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-6 bg-white nf-scrollable-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row flex-wrap items-start justify-start",
      "data-cy": "forms"
    }, /*#__PURE__*/React.createElement(SubNavBar, {
      tabs: TABS,
      activeTab: activeTab,
      setActiveTab: setActiveTab
    }), loading ? /*#__PURE__*/React.createElement("div", {
      className: "w-full h-60"
    }, /*#__PURE__*/React.createElement(PageLoader, null)) : /*#__PURE__*/React.createElement(UsersTable, {
      loading: loading,
      userData: users,
      handleStatusChange: handleStatusChange
    })))));
  }), showCreateForm && /*#__PURE__*/React.createElement(CreateMember, {
    isOpen: showCreateForm,
    setReloadUsers: setReloadMembers,
    onClose: function onClose() {
      return setShowCreateForm(false);
    }
  }));
};

export default Members;
//# sourceMappingURL=index.modern.js.map
