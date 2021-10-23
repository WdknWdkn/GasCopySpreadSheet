// コピー元のマスターシートの名称を保持する配列（コピー元を追加したいときはここに追加、コピー元の名称は「XXXmaster」の形の前提）
var copySheetArray = [
  '週報'
];

// 当日のシートを作成する関数
function makeTodaySheet() {
  // copySheetArrayを回して各シート名でコピーする
  copySheetArray.forEach(function(sheeName){
    AutoSheetCopy(sheeName);
  });
  postSlack();
}

// シート"XXXXmaster"を複製する関数
function AutoSheetCopy(sheetName){
  // スプレッドシートを取得
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  // 取得したスプレッドシートから、コピー元のシートを取得（コピー元の名称は「XXXmaster」の形の前提）
  var templateSheet = ss.getSheetByName(sheetName + 'master'); 
  // シートをコピー作成（ホントは「templateSheet」が取得できなかったとき、すでに同名のシートが存在するときの分岐もつけたい）
  ss.insertSheet(sheetName + getDate(), 0, {template: templateSheet}); 
}

// 現在の月と週数を取得する関数
function getDate(){
  // 現在の日時を取得
  var today = new Date(); 
  // 現在の日時から、日付取得（月日で）
  var out = Utilities.formatDate(new Date(), "JST", "MMdd");
  return out; 
}

function postSlack() {

    
    const postUrl  = '';// slackのincoming webhook用
    const username = '週報bot';  // 通知時に表示されるユーザー名
    const icon     = ':hatching_chick:';  // 通知時に表示されるアイコン

    const subject = '【今週の週報記載お願いします！】';
    const ssURL = ''; // 本文にSSURLを記載
    const body    = '' + subject + '\n' + ssURL + '\n';

    const jsonData =
              {
                  'username'  : username,
                  'icon_emoji': icon,
                  'text'      : body
              };

    const options =
              {
                  'method'     : 'post',
                  'contentType': 'application/json',
                  'payload'    : JSON.stringify(jsonData)
              };

    UrlFetchApp.fetch(postUrl, options);
}
