var obj,url=$request.url,change=!1;try{obj=JSON.parse($response.body)}catch(i){console.log(i+"\n错误URL："+url),$done({})}if(url.includes("app.bilibili.com/x/v2/splash/list")){if(obj.data?.list){for(let i of obj.data.list)i.duration=0,i.begin_time=2240150400,i.end_time=2240150400;change=!0}}else if(url.includes("app.bilibili.com/x/v2/feed/index?"))obj.data?.items&&(obj.data.items=obj.data.items.filter((i=>!i.banner_item&&!i.ad_info&&-1===i.card_goto?.indexOf("ad")&&["small_cover_v2","large_cover_v1","large_cover_single_v9"].includes(i.card_type))),change=!0);else if(url.includes("app.bilibili.com/x/v2/feed/index/story?"))obj.data?.items&&(obj.data.items=obj.data.items.filter((i=>!i.ad_info&&-1===i.card_goto?.indexOf("ad"))),change=!0);else if(url.includes("app.bilibili.com/x/resource/show/tab"))if(obj.data?.tab?.length<4)obj.data.tab.push({id:1411,tab_id:"bangumi",name:"动画",uri:"bilibili://following/home_activity_tab/6544",pos:4}),change=!0;else{const i=new Set([39,40,41,774,857,545,151,442,99,100,101,554,556]),a=new Set([177,178,179,181,102,104,106,486,488,489]);obj.data?.tab&&(obj.data.tab=obj.data.tab.filter((a=>i.has(a.id))),change=!0),obj.data?.top&&(obj.data.top=[{id:176,icon:"http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",tab_id:"消息Top",name:"消息",uri:"bilibili://link/im_home",pos:1}],change=!0),obj.data?.bottom&&(obj.data.bottom=obj.data.bottom.filter((i=>a.has(i.id))),change=!0)}else if(url.includes("app.bilibili.com/x/v2/account/mine")){if(obj.data?.sections_v2){const i=new Set([396,397,398,399,402,404,407,410,425,426,427,428,430,432,433,434,494,495,496,497,500,501]);obj.data.sections_v2.forEach((a=>{["创作中心","創作中心"].includes(a.title)&&(a.title=void 0,a.type=void 0),a.items=a.items.filter((a=>i.has(a.id))),a.button={},a.be_up_title=void 0,a.tip_icon=void 0,a.tip_title=void 0})),obj.data?.live_tip&&(obj.data.live_tip={}),obj.data?.answer&&(obj.data.answer={}),obj.data.vip_section=void 0,obj.data.vip_section_v2=void 0,obj.data.vip_type=2,obj.data.vip.type=2,obj.data.vip.status=1,obj.data.vip.vip_pay_type=1,obj.data.vip.due_date=4669824160,change=!0}}else url.includes("app.bilibili.com/x/v2/account/myinfo?")?obj.data?.vip&&(obj.data.vip.type=2,obj.data.vip.status=1,obj.data.vip.vip_pay_type=1,obj.data.vip.due_date=4669824160,change=!0):url.includes("app.bilibili.com/x/v2/search/square")?(obj.data=[{type:"history",title:"搜索历史"}],change=!0):url.includes("api.live.bilibili.com/xlive/app-room/v1/index/getInfoByRoom")?obj.data&&(obj.data.activity_banner_info=void 0,change=!0):url.includes("pgc/page/bangumi")||url.includes("pgc/page/cinema/tab?")?obj.result?.modules&&(obj.result.modules.forEach((i=>{i.style.startsWith("banner")?i.items=i.items.filter((i=>i.link.includes("play"))):i.style.startsWith("function")?i.items=i.items.filter((i=>i.blink.startsWith("bilibili"))):i.style.startsWith("tip")&&(i.items=[])})),change=!0):console.log("触发意外的请求，请确认脚本或复写配置是否正常\n错误URL："+url);change?$done({body:JSON.stringify(obj)}):$done({});