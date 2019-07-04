
module.exports = function (req) {
  let ua = req.headers['user-agent'], device = {}, x_platform = req.headers['x-platform'];
  device.type = req.device.type;
  if (/mobile/i.test(ua)) {
    device.Mobile = true;
  }
  if (!_.isEmpty(x_platform)) {
    let appData = x_platform.split(';');
    device.os = appData[0];
    device.version = appData[1];
    device.brand = appData[2];
    device.app_version = appData[3];
    device.type = 'mobile';
  }
  if (/like Mac OS X/.test(ua)) {
    device.iOS = (_.get(/CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua), '[2]') || '').replace(/_/g, '.');
    device.iPhone = /iPhone/.test(ua);
    device.iPad = /iPad/.test(ua);
    device.os = 'IOS ' + device.iOS;
    device.version = device.iOS;
    device.UserAgent = ua;
    device.Platform = x_platform;
    return device;
  }
  if (/Android/.test(ua)) {
    device.Android = _.get(/Android ([0-9\.]+)[\);]/.exec(ua), '[1]');
    device.os = 'Android ' + device.Android;
    device.version = device.Android;
    device.UserAgent = ua;
    device.Platform = x_platform;
    return device;
  }
  if (/webOS\//.test(ua)) {
    device.webOS = _.get(/webOS\/([0-9\.]+)[\);]/.exec(ua), '[1]');
    device.os = 'webOS ' + device.webOS;
    device.version = device.webOS;
    device.UserAgent = ua;
    device.Platform = x_platform;
    return device;
  }
  if (/(Intel|PPC) Mac OS X/.test(ua)) {
    device.Mac = (_.get(/(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua), '[2]') || '').replace(/_/g, '.');
    device.os = 'Mac ' + device.Mac;
    device.version = device.Mac;
    device.UserAgent = ua;
    device.Platform = x_platform;
    return device;
  }
  if (/Windows NT/.test(ua)) {
    device.Windows = _.get(/Windows NT ([0-9\._]+)[\);]/.exec(ua), '[1]');
    device.os = 'Windows NT ' + device.Windows;
    device.version = device.Windows;
    device.UserAgent = ua;
    device.Platform = x_platform;
    return device;
  }
  if (/X11/.test(ua)) {
    device.Linux = 'x86_64';
    device.os = 'Linux ' + device.Linux;
    device.version = device.Linux;
    device.UserAgent = ua;
    device.Platform = x_platform;
    return device;
  }

  device.UserAgent = ua;
  device.Platform = x_platform;
  device.ip = req.headers['x-forwarded-for'] ||
    req.headers['x-client-ip'] ||
    req.headers['true-client-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-google-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  return device;
};