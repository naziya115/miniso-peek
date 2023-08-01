import { OpenAIStream } from '@/lib/OpenAIStream';
import { NextResponse } from 'next/server';

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const runtime = 'edge';

export async function POST(req) {
  const body = await req.json();
  const data = {
    items: [
      {"present_title": "Besty: ИГР.Н-Р \"ДОКТОР\" в коробке 8604D-1 (937185)"},
      {"present_title": "YTY TOYS: Игр.н-р посуды серия \"Розовый цветок\", 14 пр. (1153888)"},
      {"present_title": "YTY TOYS: Игр.н-р керамической посуды, 001 (1118199)"},
      {"present_title": "Besty: Карета 2 в 1, 40 предметов, серия \"Доктор\" (1212390)"},
      {"present_title": "Besty: Игровой набор: Рюкзак -кухня, красный (1274054)"},
      {"present_title": "Развивающая интерактивная кукла \"Чудо-Малыш\", говорящая, пупс (1115038)"},
      {"present_title": "LLORENS: Кукла Валерия 28 см., блондинка в розовом костюме (1180917)"},
      {"present_title": "Kaifan Toys: Пупс в розовом комбинезоне c ушками с бутылочкой (1212399)"},
      {"present_title": "Sparkle Girlz: Кукла Зимняя Принцесса, 26см в ассорт. (1298139)"},
      {"present_title": "Sparkle Girlz: ZURU Кукла Принцесса Единорогов 12см, в ассортименте (1295605)"},
      {"present_title": "Sparkle Girlz: Кукла Феечка 12см, в ассортименте (1296998)"},
      {"present_title": "Игрушка мини-фигурка Barbie (1292902)"},
      {"present_title": "Игрушка мини-фигурка Barbie. (1292903)"},
      {"present_title": "Baby So Lovely: Кукла шатенка в праздничном наряде (1298547)"},
      {"present_title": "Sparkle Girlz: Набор из 10 кукол \"Маленькие друзья\" (1352432)"},
      {"present_title": "Sparkle Girlz: Кукла Princess Cone 26см, в ассортименте (1353041)"},
      {"present_title": "Sparkle Girlz: Кукла Unicorn Princess Cone 26см, в ассортименте (1353043)"},
      {"present_title": "Disney: Ily 4ever: Кукла Ариэль 45см. (1347462)"},
      {"present_title": "Disney: Ily 4ever: Набор одежды и аксессуаров Минни (1347465)"},
      {"present_title": "Disney: Ily 4ever: Набор одежды и аксессуаров Рапунцель (1347467)"},
      {"present_title": "Disney: Ily 4ever: Набор одежды и аксессуаров Эльза (1347469)"},
      {"present_title": "Disney: Ily 4ever: Набор одежды и аксессуаров Жасмин (1347471)"},
      {"present_title": "Disney: Ily 4ever: Кукла Золушка 45см. (1347476)"},
      {"present_title": "Baby: Игровой набор пупс с коляской, кроваткой и аксессуарами (1212404)"},
      {"present_title": "Moose: Рюкзачок Real Littles с 4 сюрпризами (1226673)"},
      {"present_title": "Zuru: Набор Itty Bitty Prettys \"Маленькая чайная чашка\", серия 2 (1262301)"},
      {"present_title": "5 Surprise: ZURU Mini Brands. Игровой набор Мини Маркет (1282196)"},
      {"present_title": "5 Surprise: ZURU Mini Brands. Игровой набор Мини Магазин (1282197)"},
      {"present_title": "5 Surprise: ZURU Toy Mini Brands. Шар с секретом (1282200)"},
      {"present_title": "5 Surprise: ZURU Toy Mini Brands. Кейс-накопитель 5 Surprise с 5 игрушками (1282201)"},
      {"present_title": "5 Surprise: Mini Brands, S2, шар с секретом (1294572)"},
      {"present_title": "Sparkle Girlz: Игр.н-р \"Автомобиль для Принцессы\" (1294578)"},
      {"present_title": "5 Surprise: Mini Brands Disney Store, шар с секретом (1298140)"},
      {"present_title": "Sparkle Girlz: ZURU Игровой набор \"Пекарня\" (1295607)"},
      {"present_title": "Sparkle Girlz: ZURU Игровой набор \"Ветеринарная клиника\" (1295608)"},
      {"present_title": "Sparkle Girlz: ZURU Игровой набор \"Няня\" (1295609)"},
      {"present_title": "Sparkle Girlz: ZURU Игровой набор \"На прогулку!\" (1295610)"},
      {"present_title": "Rainbocorns: Zuru Eggzania, S1 (1317937)"},
      {"present_title": "5 Surprise: Unicorn S3. Шар с секретом (1329787)"},
      {"present_title": "Lanard: Игр.н-р \"ROYAL BREEDS\" лошадь с жеребёнком, Appaloosa Horse (1357780)"},
      {"present_title": "Lanard: Игр.н-р \"ROYAL BREEDS\" лошадь с жеребёнком, Pinto Horse (1357781)"},
      {"present_title": "Sparkle Girlz: Игровой набор \"Королевский замок\" (1352433)"},
      {"present_title": "5 Surprise: Mini Fashion, S2. Шар с секретом (1353040)"},
      {"present_title": "Disney: Frozen. Игровой набор Colour Reveal (1376657)"},
      {"present_title": "Rainbocorns: Kittycorn, S7 (1389934)"},
      {"present_title": "Make It Real: Набор для нейл-арта Paint & Sparkle Mermaid Nail Art (1284445)"},
      {"present_title": "Markwins: L.O.L. Surprise! Игровой набор детской декоративной косметики для лица в пенале (большой) (1323589)"},
      {"present_title": "TIK TOK GIRL: Праймер для лица, цвет зелёный (1356707)"},
      {"present_title": "TIK TOK GIRL: Гель для душа, клубничный милкшейк 300 мл (1372707)"},
      {"present_title": "Bayer Dolls: Коляска-трость для куклы BUGGY. Складная, синий-розовый (1364441)"}
    ]
  };
  
  
  // Extract present titles and store them in the list variable
  const presentTitles = data.items.map(item => item.present_title);
  
  const messages = [
    {
      role: 'system',
      content: `I want you to act as Glovo Assistant. You need to find 3 presents ONLY from this list: ${presentTitles} that fit into the description of a customer. Display them in this format 1. option, 2. option, 3. option. Don't write anything else.`,
    },
  ];
  messages.push(...body?.messages);

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new NextResponse(stream);
}
