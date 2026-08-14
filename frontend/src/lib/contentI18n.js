import { defaultContent } from "./content";

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
// element-wise deep merge (translated text over English base, keeping style props)
const merge = (b, o) => {
  if (o === undefined) return b;
  if (Array.isArray(b) && Array.isArray(o))
    return b.map((el, i) => (i < o.length ? merge(el, o[i]) : el)).concat(o.slice(b.length));
  if (isObj(b) && isObj(o)) {
    const out = { ...b };
    Object.keys(o).forEach((k) => (out[k] = merge(b[k], o[k])));
    return out;
  }
  return o;
};

const en = {
  ...defaultContent,
  preorder: {
    ...defaultContent.preorder,
    description:
      "Preorder NUVII AI Pet for $49 today. Regular price is $69, with first-batch shipping estimated for September 1, 2026.",
  },
};

const az = {
  hero: {
    badge: "NUVII ONE · AI PET ÖN SİFARİŞ",
    title: "NUVII",
    subtitle: "Sənin balaca AI dostun.",
    description: "Reaksiya verən, geyinən, yeni dünyalar açan və səninlə böyüyən balaca AI pet.",
    primaryCta: "$49-a ön sifariş et",
    secondaryCta: "Necə böyüdüyünə bax",
    cards: [
      { title: "100 günlük böyümə", text: "Xarakter, geyimlər, xəritələr və bacarıqlar daim dəyişir." },
      { title: "Əvvəlcə cihaz", text: "Gündəlik yoxlamalar üçün cib yoldaşı." },
      { title: "Kolleksiyalıq", text: "Onu geyindir, nadir anları aç və özününküləşdir." },
    ],
  },
  featured: { label: "NUVII MAĞAZA", title: "Birini evə gətir.", cta: "Bütün məhsullara bax" },
  whatIs: {
    label: "NUVII NƏDİR",
    title: "Növbəti çatbot deyil. Böyütdüyün balaca bir həyat.",
    note: "NUVII acır, dağınıq olur, sənə sığınır, əhvalı dəyişir, maraqlanır və hər gəlişində bir az da gülməli olur.",
    cards: [
      { tag: "Yox", title: "Sadəcə danışan oyuncaq deyil", text: "Söhbət yalnız bir qatdır. Münasibəti qayğı, rejim, yaddaş və böyümə idarə edir." },
      { tag: "Yox", title: "Nağıl maşını deyil", text: "Nağıllar, musiqi və rəsmlər bacarıq kimi açılır, bütöv məhsul kimi yox." },
      { tag: "Yox", title: "Gizli ev tapşırığı deyil", text: "NUVII sevimli reaksiyalar, geyimlər, kiçik ehtiyaclar və gündəlik sürprizlər üzərində qurulub." },
      { tag: "Bəli", title: "Böyüyən bir yoldaş", text: "Nə qədər çox qayğı göstərsən, NUVII bir o qədər səninki olur." },
    ],
  },
  daily: {
    label: "GÜNDƏLİK PET ANLARI",
    title: "Toxun, yedizdir, təmizlə, ovut, təkrarla.",
    note: "Əyləncə kiçik siqnallardadır: ac üz, dağınıq əhval, qəribə səs, yeni reaksiya, şəkil çəkmək istədiyin baxış.",
    cards: [
      { title: "Yedizdir", text: "Balaca ac üzü görməzdən gəlmək çətindir." },
      { title: "Təmizlə", text: "Təmizlə və əhvalının necə dəyişdiyinə bax." },
      { title: "Ovut", text: "Küsür, qımıldayır, sevinir və özünəməxsus şəkildə səni istəyir." },
      { title: "Sağalt", text: "Ona toparlanmağa kömək et və növbəti sevimli reaksiyanı aç." },
    ],
  },
  collectible: {
    cards: [
      { title: "Kolleksiya görünüşləri", text: "Tülkü, quzu, dovşan və hər NUVII-ni fərqli edən digər stillər." },
      { title: "Masaüstü pet enerjisi", text: "Masan, çantan, rəfin, şəkillərin və gündəlik yoxlamaların üçün balaca yoldaş." },
      { title: "Nadir kiçik anlar", text: "İfadələr, səslər, bacarıqlar, gündəlik qeydləri və xəritə sürprizləri zamanla açılır." },
    ],
  },
  skills: {
    label: "AI BACARIQLARI VƏ DÜNYA",
    title: "Bağ gücləndikcə AI bacarıqları açılır.",
    note: "NUVII tam açıq başlamır. Bağınız gücləndikcə daha qəribə, daha sevimli və daha bacarıqlı olur.",
    cards: [
      { tag: "AI", title: "Yaradıcı alətlər", text: "AI rəsm, AI musiqi, nağıllar və gündəlik." },
      { tag: "Gün", title: "Gündəlik köməkçilər", text: "Hava, zəng, taymer və kiçik rejimlər." },
      { tag: "Xəritə", title: "Dünya macəraları", text: "Səyahət, gizli yerlər, işlər və əyləncəli tapşırıqlar." },
      { tag: "Bağ", title: "Yaddaş və səs", text: "Zamanla daha şəxsi hiss olunması üçün yaradılmış yoldaş." },
    ],
    gallery: "Kəşf et, böyüt, qazan",
  },
  preorder: {
    label: "İLK PARTİYA ÖN SİFARİŞ",
    title: "Birini böyüdən ilk sən ol.",
    description: "NUVII AI Pet-i bu gün $49-a ön sifariş et. Adi qiymət $69-dır, ilk partiya çatdırılması təxminən 1 Sentyabr 2026.",
    badges: ["$49 ön sifariş", "$69 adi", "1 Sen 2026 göndərilir"],
    primaryCta: "$49-a ön sifariş et",
    secondaryCta: "Ətraflı bax",
  },
  timeline: {
    label: "BÖYÜMƏ XƏTTİ",
    title: "Dəyişir, çünki sən daim gəlirsən.",
    note: "NUVII yöndəmsiz və ehtiyaclı başlayır, sonra yavaş-yavaş daha qəribə, daha sevimli, daha şəxsi olur.",
    steps: [
      { day: "1-ci gün", text: "Yöndəmsiz, ac və mənasız səslərlə dolu." },
      { day: "7-ci gün", text: "Kiçik reaksiyalar və əyləncəli ifadələr işlətməyə başlayır." },
      { day: "21-ci gün", text: "Ən çox eşitdiyi səsə reaksiya verməyə başlayır." },
      { day: "30-cu gün", text: "Bir az dəcəl, müstəqil və gülməli olur." },
      { day: "55-ci gün", text: "Bacarıqlar, geyimlər və kiçik sürprizlər yığılmağa başlayır." },
      { day: "100+ gün", text: "Xarakter, yaddaş və macəralar dərinləşir." },
    ],
  },
  loop: {
    label: "EGG COIN VƏ AÇILIŞLAR",
    title: "Səni daim geri çəkən kiçik dövrə.",
    note: "Egg Coin qazan, iş seç, mağazanı aç, yeni görünüş götür və NUVII dünyasının daha çoxunu aç.",
    overlay: { title: "Qayğı göstər, qazan, aç", text: "Hər yoxlama coin, geyim, xəritə və ya yeni reaksiyaya çevrilə bilər." },
    steps: [
      { title: "Statusu yoxla", text: "Yemək, su, əhval, sağlamlıq, coin və səviyyə." },
      { title: "Qayğı və reaksiya", text: "Yedizdir, təmizlə, sağalt və kiçik əhval dəyişikliklərini tut." },
      { title: "Egg Coin qazan", text: "İşlər, hərəkət, çağırışlar və əyləncəli tapşırıqlar." },
      { title: "Alış-veriş və stil", text: "Coin-ləri görünüşlərə, əşyalara və kiçik yeniləmələrə xərclə." },
      { title: "Daha çoxunu aç", text: "Bacarıqlar, geyimlər, xəritələr, macəralar və xarakter." },
    ],
  },
  faq: {
    label: "QISA SUALLAR",
    title: "Birini böyütməzdən əvvəl bilməli olduqların.",
    note: "Sadə saxla: nədir, necə böyüyür, nə açılır və ilk partiyaya nə daxildir.",
    items: [
      { q: "NUVII Tamaqoçi kimidir?", a: "Ruhən bəli: hər gün qayğı göstərdiyin balaca pet. NUVII AI reaksiyaları, səs yaddaşı, geyimlər və dünyalar əlavə edir." },
      { q: "Onunla əslində nə edirəm?", a: "Yedizdir, təmizlə, ovut, coin qazan, geyindir, bacarıqlar aç və yeni yerlər kəşf et." },
      { q: "Onu fərdiləşdirə bilərəm?", a: "Bəli. Ana cihaz bu ön sifariş üçün bir rəng və bir versiyadadır. Quzu, tülkü və dovşan geyimləri ön sifarişdə hər biri $9.90, sonradan $15.90." },
      { q: "İlk partiyaya nə daxildir?", a: "İlk partiyaya $49 ön sifariş qiyməti ilə NUVII AI Pet daxildir, təxminən 1 Sentyabr 2026-da göndəriləcək." },
      { q: "Geyim əlavə edə bilərəm?", a: "Bəli. Quzu, tülkü və ya dovşan geyimlərini ayrıca seç." },
    ],
  },
};

const ru = {
  hero: {
    badge: "NUVII ONE · ПРЕДЗАКАЗ AI-ПИТОМЦА",
    title: "NUVII",
    subtitle: "Твой маленький AI-друг.",
    description: "Крошечный AI-питомец, который реагирует, наряжается, открывает миры и растёт вместе с тобой.",
    primaryCta: "Предзаказ за $49",
    secondaryCta: "Смотреть, как он растёт",
    cards: [
      { title: "Рост за 100 дней", text: "Характер, наряды, карты и навыки постоянно меняются." },
      { title: "Сначала устройство", text: "Карманный компаньон для ежедневных проверок." },
      { title: "Коллекционный", text: "Наряжай, открывай редкие моменты и делай его своим." },
    ],
  },
  featured: { label: "МАГАЗИН NUVII", title: "Забери себе одного.", cta: "Все товары" },
  whatIs: {
    label: "ЧТО ТАКОЕ NUVII",
    title: "Не очередной чат-бот. Крошечная жизнь, которую ты растишь.",
    note: "NUVII голодает, пачкается, ластится, капризничает, любопытничает и становится немного смешнее с каждым возвращением.",
    cards: [
      { tag: "Нет", title: "Не просто говорящая игрушка", text: "Разговор — лишь один слой. Отношениями движут забота, режим, память и рост." },
      { tag: "Нет", title: "Не машина историй", text: "Истории, музыка и рисунки открываются как навыки, а не как весь продукт." },
      { tag: "Нет", title: "Не замаскированная домашка", text: "NUVII построен на милых реакциях, нарядах, маленьких потребностях и ежедневных сюрпризах." },
      { tag: "Да", title: "Компаньон, который растёт", text: "Чем больше заботы, тем больше NUVII становится твоим." },
    ],
  },
  daily: {
    label: "ЕЖЕДНЕВНЫЕ МОМЕНТЫ",
    title: "Нажми, покорми, почисти, утешь, повтори.",
    note: "Веселье в мелких сигналах: голодное лицо, грязное настроение, странный звук, новая реакция, взгляд для скриншота.",
    cards: [
      { title: "Покорми", text: "Крошечное голодное лицо трудно игнорировать." },
      { title: "Почисти", text: "Почисти и смотри, как меняется настроение." },
      { title: "Утешь", text: "Он дуется, ёрзает, радуется и по-своему зовёт тебя." },
      { title: "Вылечи", text: "Помоги ему прийти в себя и открой следующую милую реакцию." },
    ],
  },
  collectible: {
    cards: [
      { title: "Коллекционные образы", text: "Лиса, овечка, кролик и другие стили, делающие каждого NUVII особенным." },
      { title: "Энергия настольного питомца", text: "Крошечный компаньон для стола, сумки, полки, фото и ежедневных проверок." },
      { title: "Редкие маленькие моменты", text: "Выражения, звуки, навыки, записи дневника и сюрпризы карт открываются со временем." },
    ],
  },
  skills: {
    label: "AI-НАВЫКИ И МИР",
    title: "AI-навыки открываются по мере роста связи.",
    note: "NUVII не начинается полностью открытым. Он становится страннее, милее и способнее по мере роста вашей связи.",
    cards: [
      { tag: "AI", title: "Творческие инструменты", text: "AI-рисование, AI-музыка, истории и ежедневный дневник." },
      { tag: "День", title: "Ежедневные помощники", text: "Погода, будильники, таймеры и маленькие рутины." },
      { tag: "Карта", title: "Приключения мира", text: "Путешествия, тайные места, работы и весёлые миссии." },
      { tag: "Связь", title: "Память и голос", text: "Компаньон, созданный, чтобы со временем ощущаться более личным." },
    ],
    gallery: "Исследуй, расти, зарабатывай",
  },
  preorder: {
    label: "ПРЕДЗАКАЗ ПЕРВОЙ ПАРТИИ",
    title: "Стань первым, кто вырастит его.",
    description: "Оформи предзаказ NUVII AI Pet сегодня за $49. Обычная цена $69, отправка первой партии ориентировочно 1 сентября 2026.",
    badges: ["$49 предзаказ", "$69 обычная", "Отправка 1 сен 2026"],
    primaryCta: "Предзаказ за $49",
    secondaryCta: "Подробнее",
  },
  timeline: {
    label: "ЛИНИЯ РОСТА",
    title: "Он меняется, потому что ты приходишь снова.",
    note: "NUVII начинается неуклюжим и нуждающимся, затем медленно становится страннее, милее и личнее.",
    steps: [
      { day: "День 1", text: "Неуклюжий, голодный и полный бессмысленных звуков." },
      { day: "День 7", text: "Начинает использовать мелкие реакции и игривые выражения." },
      { day: "День 21", text: "Начинает реагировать на голос, который слышит чаще всего." },
      { day: "День 30", text: "Становится немного бунтарским, самостоятельным и смешным." },
      { day: "День 55", text: "Навыки, наряды и маленькие сюрпризы начинают накапливаться." },
      { day: "День 100+", text: "Характер, память и приключения углубляются." },
    ],
  },
  loop: {
    label: "EGG COINS И РАЗБЛОКИРОВКИ",
    title: "Маленькая петля, которая тянет тебя назад.",
    note: "Зарабатывай Egg Coins, выбери работу, открой магазин, возьми новый образ и открой больше мира NUVII.",
    overlay: { title: "Заботься, зарабатывай, открывай", text: "Каждая проверка может стать монетами, нарядами, картами или новой реакцией." },
    steps: [
      { title: "Проверь статус", text: "Еда, вода, настроение, здоровье, монеты и уровень." },
      { title: "Заботься и реагируй", text: "Корми, чисти, лечи и лови мелкие смены настроения." },
      { title: "Зарабатывай Egg Coins", text: "Работы, движение, испытания и весёлые задания." },
      { title: "Покупай и стилизуй", text: "Трать монеты на образы, предметы и мелкие апгрейды." },
      { title: "Открывай больше", text: "Навыки, наряды, карты, приключения и характер." },
    ],
  },
  faq: {
    label: "БЫСТРЫЕ ВОПРОСЫ",
    title: "Что нужно знать, прежде чем растить его.",
    note: "Просто: что это, как растёт, что открывается и что входит в первую партию.",
    items: [
      { q: "NUVII как Тамагочи?", a: "По духу да: крошечный питомец, о котором заботишься ежедневно. NUVII добавляет AI-реакции, память голоса, наряды и миры." },
      { q: "Что я на самом деле с ним делаю?", a: "Кормишь, чистишь, утешаешь, зарабатываешь монеты, наряжаешь, открываешь навыки и исследуешь новые места." },
      { q: "Можно его настроить?", a: "Да. Основное устройство в одном цвете и версии для этого предзаказа. Наряды овечки, лисы и кролика — по $9.90 при предзаказе или $15.90 позже." },
      { q: "Что входит в первую партию?", a: "В первую партию входит NUVII AI Pet по цене предзаказа $49, отправка ориентировочно 1 сентября 2026." },
      { q: "Можно добавить наряды?", a: "Да. Выбери наряды овечки, лисы или кролика отдельно." },
    ],
  },
};

export const contentDefaults = {
  en,
  az: merge(en, az),
  ru: merge(en, ru),
};
