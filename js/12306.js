!function(){let e,i=JSON.parse($request.body);e="0007"===i.placementNo?'{"materialsList":[{"billMaterialsId":"255","filePath":"h","creativeType":1}],"advertParam":{"skipTime":1}}':"G0054"===i.placementNo?'{"code":"00","materialsList":[{}],"advertParam":{"skipTime":3000,"showSkipBtn":0,"skipTimeAgain":0,"chacheTime":600000,"fixedscreen":3,"isDefault":0,"displayNumDi":1,"index":2}}':'{"code":"00","message":"无广告返回"}';"undefined"!=typeof $task?$done({body:e}):$done({response:{body:e}})}();