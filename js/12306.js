!function(){let e;e="0007"===JSON.parse($request.body).placementNo?'{"materialsList":[{"billMaterialsId":"255","filePath":"h","creativeType":1}],"advertParam":{"skipTime":1}}':'{"code":"00","message":"无广告返回"}';$task?$done({body:e}):$done({response:{body:e}})}();