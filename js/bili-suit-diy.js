/*
B站装扮diy
版本：1.6.8
脚本兼容: Quantumult X
作者：@kokoryh

脚本仅供自用，禁转载，转载死全家
任何转载行为被发现后此脚本将从库中删除

说明：
1、打开粉色B站进入装扮详情页，如果通知获取装扮信息成功，则可以使用本脚本
2、更换装扮需要退后台重新打开app，重复两次
3、如果不想提取加载动画，可在boxjs中将『不提取加载动画』开关打开
4、如果装扮有多套主题，可在boxjs中填入『使用第几套主题』，加载动画同理
5、粉色B站和白色B站均可使用本脚本
6、如果只想让白色B站使用本脚本，而粉色B站不使用，请使用bili-suit-diy2.js
7、diy请自行下载需要的装扮，将素材拼合为规范的zip包上传，然后自行编写规范的配置填入boxjs。仅适合有一定编程基础的人，小白请放弃此功能
   配置格式和各配置项含义请『自行体会』，作为挡住小白的门槛
8、引用请自行去掉前面的#号，用解析器解析的都给我滚

----------------
获取装扮信息(获取完即可关闭此重写)
[rewrite_local]
# ^https:\/\/api\.bilibili\.com\/x\/garb\/v2\/mall\/suit\/detail url script-response-body https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-detail.js

[mitm]
hostname = api.bilibili.com

----------------
日常使用
[rewrite_local]
# ^https:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\? url script-response-body https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-diy.js

[mitm]
hostname = app.bilibili.com

----------------
*/
var obj = JSON.parse($response.body);
var user_equip = $prefs.valueForKey("bili_user_equip");
var load_equip = $prefs.valueForKey("bili_load_equip");
if(user_equip) {
    user_equip = JSON.parse(user_equip);
    if (user_equip.length === 1) obj.data["user_equip"] = user_equip[0];
    else {
        var skin_num = parseInt($prefs.valueForKey("bili_skin_num") || 1);
        if (skin_num > user_equip.length) {
            obj.data["user_equip"] = user_equip[0];
            $prefs.setValueForKey("1", "bili_skin_num");
            $notify("bili_skin_num参数设置过大", "", "转为使用第1套主题，bili_skin_num已重置为1");
        } else {
            obj.data["user_equip"] = user_equip[skin_num - 1];
        }
    }
}
if(load_equip) {
    load_equip = JSON.parse(load_equip);
    if (load_equip.length === 1) obj.data["load_equip"] = load_equip[0];
    else {
        var load_num = parseInt($prefs.valueForKey("bili_load_num") || 1);
        if (load_num > load_equip.length) {
            obj.data["load_equip"] = load_equip[0];
            $prefs.setValueForKey("1", "bili_load_num");
            $notify("bili_load_num参数设置过大", "", "转为使用第1个加载动画，bili_load_num已重置为1");
        } else {
            obj.data["load_equip"] = load_equip[load_num - 1];
        }
    }
}
$done({body: JSON.stringify(obj)});