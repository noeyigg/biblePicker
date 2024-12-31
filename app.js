const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const bibleVerses = [
    {
      "verse": "\n\n\n우리에게 날마다\n일용할 양식을 주시옵고\n",
      "reference": "누가복음 11:13"
    },
    {
      "verse": "\n\n\n너희가 나를 사랑하면\n내 계명을 지키라\n",
      "reference": "요한복음 14:15"
    },
    {
      "verse": "\n\n\n여호와는 나의 목자시니\n내게 부족함이 없으리로다\n",
      "reference": "시편 23:1"
    },
    {
      "verse": "\n\n\n누구든지\n주의 이름을 부르는 자는\n구원을 받으리라\n",
      "reference": "로마서 10:13"
    },
    {
      "verse": "\n\n\n여호와는\n네게 복을 주시고\n너를 지키시기를 원하며\n",
      "reference": "민수기 6:24"
    },
    {
      "verse": "\n\n\n네 길을 여호와께 맡기라\n그를 의지하면\n그가 이루시고\n",
      "reference": "시편 37:5"
    },
    {
      "verse": "\n\n\n여호와는\n그의 얼굴을 네게 비추사\n은혜 베푸시기를 원하며\n",
      "reference": "민수기 6:25"
    },
    {
      "verse": "\n\n\n여호와께 감사하라\n그는 선하시며\n그 인자하심이 영원함이로다\n",
      "reference": "시편 136:1"
    },
    {
      "verse": "\n\n\n내게 능력 주시는 자 안에서\n내가 모든 것을\n할 수 있느니라\n",
      "reference": "빌립보서 4:13"
    },
    {
      "verse": "\n\n\n내게 능력 주시는 자 안에서\n내가 모든 것을\n할 수 있느니라\n",
      "reference": "빌립보서 4:13"
    },
    {
      "verse": "\n\n\n여호와여\n주의 도를 내게 보이시고\n주의 길을 내게 가르치소서\n",
      "reference": "시편 25:4"
    },
    {
      "verse": "\n\n\n너희는 세상의 빛이라\n산 위에 있는 동네가\n숨겨지지 못할 것이요\n",
      "reference": "마태복음 5:14"
    },
    {
      "verse": "\n\n\n그가 나를\n푸른 풀밭에 누이시며\n쉴 만한 물 가로\n인도하시는도다\n",
      "reference": "시편 23:2"
    },
    {
      "verse": "\n\n\n너희는 마음을 다하여\n여호와를 신뢰하고,\n네 명철을 의지하지 말라\n",
      "reference": "잠언 3:5"
    },
    {
      "verse": "\n\n\n하나님은\n우리의 피난처시요 힘이시니,\n환난 중에 만날\n큰 도움이시라\n",
      "reference": "시편 46:1"
    },
    {
      "verse": "\n\n\n내 영혼을 소생시키시고\n자기 이름을 위하여\n의의 길로 인도하시는도다\n",
      "reference": "시편 23:3"
    },
    {
      "verse": "\n\n\n또 여호와를 기뻐하라\n그가 네 마음의 소원을\n네게 이루어 주시리로다\n",
      "reference": "시편 37:4"
    },
    {
      "verse": "\n\n\n내 영혼을 소생시키시고\n자기 이름을 위하여\n의의 길로 인도하시는도다\n",
      "reference": "시편 23:3"
    },
    {
      "verse": "\n\n\n우리는\n하나님의 동역자들이요\n너희는 하나님의 밭이요\n하나님의 집이니라\n",
      "reference": "고린도전서 3:9"
    },
    {
      "verse": "\n\n\n\n사랑하지 아니하는 자는\n하나님을 알지 못하나니\n이는 하나님은 사랑이심이라\n\n",
      "reference": "요한일서 4:8"
    },
    {
      "verse": "\n\n모든 것을 참으며\n모든 것을 믿으며\n모든 것을 바라며\n모든 것을 견디느니라",
      "reference": "고린도전서 13:7"
    },
    {
      "verse": "\n\n\n우리 주 예수 그리스도로 말미암아\n우리에게 승리를 주시는\n하나님께 감사하노니\n",
      "reference": "고린도전서 15:57"
    },
    {
      "verse": "\n\n\n\n범사에 감사하라\n이것이 그리스도 예수 안에서\n너희를 향하신 하나님의 뜻이니라\n",
      "reference": "데살로니가전서 5:18"
    },
    {
      "verse": "\n\n\n\n그러므로 염려하여 이르기를\n무엇을 먹을까 무엇을 마실까\n무엇을 입을까 하지 말라\n",
      "reference": "마태복음 6:31"
    },
    {
      "verse": "\n\n\n내 계명은 곧\n내가 너희를 사랑한 것 같이\n너희도 서로 사랑하라\n하는 이것이니라",
      "reference": "요한복음 15:12"
    },
    {
      "verse": "\n\n여호와는\n긍휼이 많으시고\n은혜로우시며\n노하기를 더디 하시고\n인자하심이 풍부하시도다",
      "reference": "시편 103:8"
    },
    {
      "verse": "\n\n\n내가 이것을\n너희에게 이름은\n내 기쁨이 너희 안에 있어\n너희 기쁨을 충만하게 하려 함이라\n",       
      "reference": "요한복음 15:11"
    },
    {
      "verse": "\n\n\n하나님이 우리에게 주신 것은\n두려워하는 마음이 아니요\n오직 능력과 사랑과\n절제하는 마음이니\n",   
      "reference": "디모데후서 1:7"
    },
    {
      "verse": "\n\n\n새 계명을 너희에게 주노니\n서로 사랑하라\n내가 너희를 사랑한 것 같이\n너희도 서로 사랑하라\n",     
      "reference": "요한복음 13:34"
    },
    {
      "verse": "\n\n그리하면\n모든 지각에 뛰어난\n하나님의 평강이\n그리스도 예수 안에서\n너희 마음과 생각을\n지키시리라",
      "reference": "빌립보서 4:7"
    },
    {
      "verse": "\n\\n\n예수께서 이르시되\n내가 곧 길이요 진리요 생명이니\n나로 말미암지 않고는\n아버지께로 올 자가 없느 니라\n",
      "reference": "요한복음 14:6"
    },
    {
      "verse": "\n\n그 작은 자가\n천 명을 이루겠고\n그 약한 자가\n강국을 이룰 것이라\n때가 되면 나 여호와가\n속히 이루 리라",
      "reference": "이사야 60:22"
    },
    {
      "verse": "\n\n하나님이\n지으신 그 모든 것을 보시니\n보시기에 심히 좋았더라\n저녁이 되고 아침이 되니\n이는 여섯째 날이니라",
      "reference": "창세기 1:31"
    },
    {
      "verse": "\n너희는\n그 은혜에 의하여\n믿음으로 말미암아\n구원을 받았으니\n이것은 너희에게서\n난 것이 아니요\n하나님의 선물이라",
      "reference": "에베소서 2:8"
    },
    {
      "verse": "\n구하라 그리하면\n너희에게 주실 것이요\n찾으라 그리하면\n찾아낼 것이요\n문을 두드리라 그리하면\n너희에게 열릴 것이니",
      "reference": "마태복음 7:7"
    },
    {
      "verse": "\n이는\n나 여호와 너의 하나님이\n네 오른손을 붙들고\n네게 이르기를\n두려워하지 말라\n내가 너를 도우리라\n할 것임이니라",
      "reference": "이사야 41:13"
    },
    {
      "verse": "\n우리가 알거니와\n하나님을 사랑하는 자\n곧 그의 뜻대로\n부르심을 입은 자들에게는\n모든 것이 합력하여\n선을 이루느니라",
      "reference": "로마서 8:28"
    },
    {
      "verse": "\n\n여호와는 나의 빛이요\n나의 구원이시니\n내가 누구를 두려워하리요\n여호와는 내 생명의 능력이시니\n내가 누구를 무서워하리요",
      "reference": "시편 27:1"
    },
    {
      "verse": "\n우리가\n아직 죄인 되었을 때에\n그리스도께서\n우리를 위하여 죽으심으로\n하나님께서 우리에 대한\n자기의 사랑을 확증하셨느니라",
      "reference": "로마서 5:8"
    },
    {
      "verse": "\n여호와의 말씀이니라\n너희를 향한\n나의 생각을 내가 아나니\n평안이요 재앙이 아니니라\n너희에게 미래와 희망을\n주는 것이니라",
      "reference": "예레미야 29:11"
    },
    {
      "verse": "\n보라\n하나님은 나의 구원이시라\n내가 신뢰하고\n두려움이 없으리니\n주 여호와는 나의 힘이시며\n나의 노래시며\n나의 구원이심이라",
      "reference": "이사야 12:2"
    },
    {
      "verse": "\n그는\n시냇가에 심은 나무가\n철을 따라 열매를 맺으며\n그 잎사귀가\n마르지 아니함 같으니\n그가 하는 모든 일이\n다 형통하리로다",
      "reference": "시편 1:3"
    },
    {
      "verse": "\n\n내 입에서 나가는 말도\n이와 같이 헛되이\n내게로 되돌아오지 아니하고\n나의 기뻐하는 뜻을 이루며\n내가 보낸 일에 형통함이니라\n",
      "reference": "이사야 55:11"
    },
    {
      "verse": "\n보라\n내가 새 일을 행하리니\n이제 나타낼 것이라\n너희가 그것을\n알지 못하겠느냐\n반드시 내가 광야에 길을\n사막에 강을 내리니",
      "reference": "이사야 43:19"
    },
    {
      "verse": "\n복음에는\n하나님의 의가 나타나서\n믿음으로 믿음에\n이르게 하나니\n기록된 바 오직 의인은\n믿음으로 말미암아\n살리라 함과 같으니라",
      "reference": "로마서 1:17"
    },
    {
      "verse": "\n이것을\n너희에게 이르는 것은\n너희로 내 안에서\n평안을 누리게 하려 함이라\n세상에서는\n너희가 환난을 당하나\n담대하라\n내가 세상을 이기었노라",
      "reference": "요한복음 16:33"
    },
    {
      "verse": "\n돈을 사랑하지 말고\n있는 바를 족한 줄로 알라\n그가 친히 말씀하시기를\n내가 결코 너희를\n버리지 아니하고\n너희를 떠나지 아니하리라\n하셨느니라",
      "reference": "히브리서 13:5"
    },
    {
      "verse": "\n여호와는\n나의 힘과 나의 방패이시니\n내 마음이 그를 의지하여\n도움을 얻었도다\n그러므로 내 마음이\n크게 기뻐하며\n내 노래로 그를 찬송하리로다",
      "reference": "시편 28:7"
    },
    {
      "verse": "\n나의\n계명을 지키는 자라야\n나를 사랑하는 자니\n나를 사랑하는 자는\n내 아버지께\n사랑을 받을 것이요\n나도 그를 사랑하여\n그에게 나를 나타내리라",
      "reference": "요한복음 14:21"
    },
    {
      "verse": "\n\n임금이 대답하여 이르시되\n내가 진실로 너희에게 이르노니\n너희가 여기 내 형제 중에\n지극히 작은 자\n하나에게 한 것이\n곧 내게 한 것이니라 하시고",
      "reference": "마태복음 25:40"
    },
    {
      "verse": "\n평안을 너희에게 끼치노니\n곧 나의 평안을 너희에게 주노라\n내가 너희에게 주는 것은\n세상이 주는 것과\n같지 아니하니라\n너희는 마음에 근심하지도 말고\n두려워하지도 말라",
      "reference": "요한복음 14:27"
    },
    {
      "verse": "\n두려워하지 말라\n내가 너와 함께 함이라\n놀라지 말라\n나는 네 하나님이 됨이라\n내가 너를 굳세게 하리라\n참으로 너를 도와 주리라\n참으로 나의 의로운 오른손으로\n너를 붙들리라",
      "reference": "이사야 41:10"
    },
    {
      "verse": "\n하나님이 모든 것을 지으시되\n때를 따라 아름답게 하셨고\n또 사람들에게는\n영원을 사모하는\n마음을 주셨느니라\n그러나\n하나님이 하시는 일의 시종을\n사람으로 측량할 수 없게 하셨도다",
      "reference": "전도서 3:11"
    },
    {
      "verse": "\n네가 물 가운데로 지날 때에\n내가 너와 함께 할 것이라\n강을 건널 때에\n물이 너를 침몰하지 못할 것이며\n네가 불 가운데로 지날 때에\n타지도 아니할 것이요\n불꽃이 너를 사르지도 못하리니",
      "reference": "이사야 43:2"
    }
  ];

  // 랜덤으로 verse를 가져오는 함수
function getRandomVerse() {
  // bibleVerses 배열에서 랜덤 인덱스 선택
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);

  const verse = bibleVerses[randomIndex].verse;
  const reference = bibleVerses[randomIndex].reference;
  // 선택된 구절의 verse 반환
  return [verse, reference];
}

// EJS 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 (CSS, 이미지 등) 제공
app.use(express.static(path.join(__dirname, 'public')));

// 루트 라우트
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/image', (req, res) => {
  res.render('choice');
});

app.get('/image/:imageName', (req, res) => {
  const pickedBible = getRandomVerse()
  const { imageName } = req.params; // URL 파라미터로 받은 이미지 파일명
  res.render('image', { imageName, pickedBible }); // image.ejs로 이미지 파일명 전달
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
