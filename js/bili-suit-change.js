/*
B站装扮diy
版本：1.8.0
脚本兼容: Quantumult X
作者：@kokoryh

脚本仅供自用，禁转载，禁公开分享，B站随时可以修复，修复了大家都没得用
任何分享或转载行为被发现后此脚本将从库中删除

说明：
1、打开粉色B站-我的-个性装扮，选择喜欢的装扮进入装扮详情页，如果通知获取装扮信息成功，则可以使用本脚本
2、更换新的装扮需要退后台重新打开app，重复2次
3、如果不想提取加载动画，可在boxjs中将『不提取加载动画』开关打开
4、如果想保留原有装扮，可在boxjs中将『装扮追加』开关打开
5、如果有多套主题，可在boxjs中填入『使用第几套主题』，加载动画同理。填写前请仔细阅读该选项下的简介
6、装扮的定时切换请按照定时脚本的要求正确配置
7、粉色B站和白色B站均可使用本脚本
8、diy请自行下载需要的装扮，将素材拼合为规范的zip包上传，然后自行编写规范的配置填入boxjs。仅适合有一定编程基础的人，配置格式和各配置项含义请『自行体会』，作为挡住小白的门槛
9、空间头图和头像框均可以替换，但由于我用不到，因此不会实现此功能。有需要请自行实现
10、引用请自行去掉前面的#号，用解析器解析的都给我滚

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
定时切换脚本(此处cron仅供参考，请自行设置切换的时间)
[task_local]
0 8,20 * * * https://raw.githubusercontent.com/kokoryh/Script/master/js/bili-suit-change.js, tag=装扮定时切换, img-url=https://raw.githubusercontent.com/NobyDa/mini/master/Color/bilibili.png, enabled=true
----------------
*/
let bili_skin_num = $prefs.valueForKey("bili_skin_num");
let bili_load_num = $prefs.valueForKey("bili_load_num");
let bili_suit = $prefs.valueForKey("bili_suit");
let loop_data = bili_suit ? JSON.parse(bili_suit).loop : {
    "pink_skin": "1",
    "pink_load": "1",
    "white_skin": "1",
    "white_load": "1"
};
let pink_skin = handleData(loop_data.pink_skin.trim());
let pink_load = handleData(loop_data.pink_load.trim());
let white_skin = handleData(loop_data.white_skin.trim());
let white_load = handleData(loop_data.white_load.trim());
let new_skin_num = handleNum(bili_skin_num, pink_skin, white_skin);
let new_load_num = handleNum(bili_load_num, pink_load, white_load);
getNext5Data(new_skin_num, new_load_num, pink_skin, pink_load, white_skin, white_load);
$prefs.setValueForKey(new_skin_num, "bili_skin_num");
$prefs.setValueForKey(new_load_num, "bili_load_num");
$done();

function getNext5Data(skin_num, load_num, pink_skin, pink_load, white_skin, white_load) {
    let sn = skin_num;
    let ln = load_num;
    let log = "后续5次更换顺序如下(第0次为当前配置)：\n        粉色B站            白色B站\n";
    for (let i = 0; i < 6; i++) {
        let ps = sn.split(";")[1].split(":")[0];
        let pl = ln.split(";")[1].split(":")[0];
        let ws = sn.split(";")[2].split(":")[0];
        let wl = ln.split(";")[2].split(":")[0];
        log += `第${i + 1}次   主题${ps},加载动画${pl}    主题${ws},加载动画${wl}\n`;
        sn = handleNum(sn, pink_skin, white_skin);
        ln = handleNum(ln, pink_load, white_load);
        // console.log(sn + "   " + ln);
    }
    console.log(log);
}

function handleNum(num, pink_item, white_item) {
    if (/(;\d+:\d+){2}/.test(num)) {
        let pink_index = num.split(/;|；/)[1].split(":")[1];
        let white_index = num.split(/;|；/)[2].split(":")[1];
        if (pink_index < pink_item.length - 1) pink_index++;
        else pink_index = 0;
        if (white_index < white_item.length - 1) white_index++;
        else white_index = 0;
        return `;${pink_item[pink_index]}:${pink_index};${white_item[white_index]}:${white_index}`;
    } else {
        return `;${pink_item[0]}:0;${white_item[0]}:0`;
    }
}

function handleData(str) {
    if ((/^\d+([,，]\d+)*$/).test(str)) {
        return str.split(/,|，/);
    } else {
        $notify("B站装扮DIY", "", "参数格式非法，请检查BoxJs设置");
        return ["1"];
    }
}