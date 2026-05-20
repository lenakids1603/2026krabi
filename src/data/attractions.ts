import { Attraction } from '../types';
import krabiIslands from '../assets/images/krabi_island_tour_1779244669020.png';
import hongIsland from '../assets/images/hong_island_1779278372804.png';
import aoThalane from '../assets/images/ao_thalane_kayak_1779278392430.png';
import emeraldPool from '../assets/images/emerald_pool_temple_1779278411880.png';
import railayBeach from '../assets/images/railay_beach_sunset_1779278430557.png';
import lantaNationalPark from '../assets/images/lanta_national_park_1779278446724.png';
import lantaOldTown from '../assets/images/lanta_old_town_chic_1779278470177.png';
import thungYiPeng from '../assets/images/thung_yi_peng_eco_1779278487746.png';
import lantaLongBeach from '../assets/images/lanta_long_beach_1779278506551.png';

export const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    title: '四岛跳岛一日游 / 半日游 (Four Islands Tour)',
    rating: 5.0,
    duration: '半日-1天',
    description: '四岛跳岛一日游是甲米经典的常驻地。乘坐特色长尾木船/快艇环绕于波达岛、鸡岛、管岛/莫岛和帕南海滩之间，漫步“一线天”奇景，拍摄极佳的翡翠海和柔软白沙滩大片。',
    image: krabiIslands,
    packingList: ['泳衣', '防晒霜', '防水袋', '换洗衣物', '沙滩鞋'],
    type: 'water',
    category: 'unified',
    region: '甲米',
    schedule: '公司统一订票与通知，按特定批次出行安排',
    meetingPoint: '奥南海滩专用搭船栈桥码头 / 组队大巴大堂接送',
    effort: '低-中 (需要乘船和短途沙滩涉水)',
    cost: '公司团建包办，全程包含登岛国家公园费、午餐水饮，员工完全无需自付费',
    isWater: '可下水',
    suitableFor: '第一次来甲米、喜欢拍照、游泳和轻浮潜的员工伙伴',
    highlights: [
      '经典浪漫的波达岛(Poda Island)地标海中独柱巨岩',
      '在鸡岛(Chicken Island)周边海域清澈的翡翠底进行浮潜看小鱼',
      '两岛退潮时神奇展露的浅沙一线天奇特走道(Talay Waek)',
      '莱利半岛神圣壮丽的帕南海滩原始钟乳石公主洞窟'
    ],
    warnings: [
      '海上出航极易受实时海风和天气波动，请务必听从公司领队和泰国当地船工的安全指引',
      '不想下水湿鞋的员工伙伴可以在船舱或松软沙滩草棚下休息闲谈，备足防晒油'
    ],
    webPosition: '经典甲米出海项目，适合做大众必选路线',
    mapsUrl: 'https://maps.google.com/?q=Ao+Nang+Beach+Krabi'
  },
  {
    id: '2',
    title: 'Hong Island 洪岛一日游 (Hong Island Tour)',
    rating: 5.0,
    duration: '1天',
    description: '洪岛（割喉岛）拥有极富高级感的出海风景。穿过仅容单船通过的天然绝壁“大门”进入平镜般的洪岛内部潟湖，并能攀登全新的360度悬崖钢梯观景台，一览气势磅礴的喀斯特海中石林群礁。',
    image: hongIsland,
    packingList: ['防滑沙滩鞋', '防水包', '运动防晒油', '备换干爽衣物'],
    type: 'water',
    category: 'unified',
    region: '甲米',
    schedule: '公司统一安排订船与统筹路线时间',
    meetingPoint: '奥南专用渡口/游艇中心码头 (大巴往返)',
    effort: '低-中 (绝壁钢梯登顶需要一定心肺体力支持)',
    cost: '公司团建统包，包全岛门票费、安全上岛税以及餐食补给',
    isWater: '可下水',
    suitableFor: '向往高质量翡翠内海、爱拍海岛画报级大片、喜欢轻松出海感受宁静的员工',
    highlights: [
      '鬼斧神工巨崖环绕的翡翠绿色内陆天然闭合潟湖(Hong Lagoon)',
      '多阶梯极限挑战的360度喀斯特全景观悬崖观景台，视角震撼',
      '如糖霜般洁白柔软的纯净半月形白沙滩，海水极其清澈'
    ],
    warnings: [
      '悬崖大视角观景塔共有近四百阶钢架楼梯，稍显陡峭，恐高或腿脚易酸痛的伙伴建议留在海平面沙滩嬉水漫步，无需勉强',
      '建议随行配合穿戴救生衣登岸，国家自然公园区严禁捕捞打捞任何原始珊瑚、贝壳'
    ],
    webPosition: '比四岛更有高级感的主动活动项目',
    mapsUrl: 'https://maps.google.com/?q=Hong+Island+Krabi'
  },
  {
    id: '3',
    title: 'Ao Thalane 红树林皮划艇 (Ao Thalane Kayaking)',
    rating: 4.8,
    duration: '半日',
    description: '喀斯特绝壁与红树林的极胜生态区。乘坐皮划艇自驾驶过宁静平缓的潮汐入海层，穿行于高耸入云的宏伟石灰岩峭壁峡谷之间，是不可多得的深度水上轻运动项目。',
    image: aoThalane,
    packingList: ['防蚊虫喷雾', '防滑越野鞋', '长袖凉爽防晒衣', '备件干衣服'],
    type: 'nature',
    category: 'suggested',
    region: '甲米',
    schedule: '自由活动时间内，拼组包车自选成行，可提早一日预约',
    meetingPoint: '奥塔兰(Ao Thalane)红树林生态皮划艇启航基地',
    effort: '中 (需要伙伴互相协作手工划行大约 1.5 - 2 小时)',
    cost: '拼船包向导预估 500 - 800 泰铢 / 人 (需自由行成行人员现场支付自负)',
    isWater: '不一定下水',
    suitableFor: '热心轻运动、想要体验自然、不想一味坐机动船吹海风的活力员工',
    highlights: [
      '穿行蜿蜒迷离的热带原始红树林“生态迷宫”，享受巨杉树根奇观',
      '双人合作划行皮筏深入雄奇巍峨、绝壁万丈的喀斯特地貌峡谷深处',
      '近距离寻踪灵动天然的野生猕猴、深林飞雀和泥滩上的小彩蟹'
    ],
    warnings: [
      '由于是手动摇桨涉水，出航裤腿及腋下必然会被带过的小浪浸湿，极力建议准备一套完整的备用干衣物及干汗巾',
      '沿途森林中出没的小猴偶然会有夺客人物品的淘气行为，请一定要把高单价的首饰钱包等贵重物品拉好防水拉链锁紧'
    ],
    webPosition: '轻运动型团建，适合丰富行程层次',
    mapsUrl: 'https://maps.google.com/?q=Ao+Thalane+Krabi'
  },
  {
    id: '4',
    title: '卡斯特翡翠池 + 温泉瀑布 + 虎窟寺 (Emerald Pool & Hot Spring & Tiger Cave)',
    rating: 4.6,
    duration: '1天',
    description: '甲米除了绝美的大海，还拥有浩瀚独特的内陆雨林景观。本探秘路线直捣翡翠般透亮的天然地热池、流淌在一片苍翠雨林巨柏间的阶梯温泉瀑布，并能攀爬神秘的虎窟寺万山之巅，一览内陆万顷壮丽峰林。',
    image: emeraldPool,
    packingList: ['高防滑越野徒步鞋', '泳衣与备用速干衣', '防蚊液', '登山手杖'],
    type: 'nature',
    category: 'suggested',
    region: '甲米',
    schedule: '自选团队在自由活动日包车自订探险，单程1-1.2小时',
    meetingPoint: '景区检票口 / 约定包车在酒店大堂集结乘车',
    effort: '中-高 (虎窟寺天梯极陡，对下肢肌肉耐力及心肺要求较高)',
    cost: '各景点单项票独立收费，翡翠池200铢、温泉100铢，包车摊分费约500铢(自清自结算)',
    isWater: '可下水',
    suitableFor: '厌倦每日咸腥海水、向往清凉热带原始茂林及佛禅内陆奇景、具备坚毅体力热心的行者',
    highlights: [
      '喀斯特雨林盆地中浑然天成、通体剔透耀眼如祖母绿的翡翠游泳池(Emerald Pool)',
      '隐藏在参天古树下的层级碳酸钙温泉矿物质瀑布(Hot Springs Cascade)，舒适排毒',
      '在南传佛教虎窟寺，挑战几近垂直攀升、登顶 1260 层的极限天梯，将内陆全幅喀斯特盆景尽收眼底'
    ],
    warnings: [
      '虎窟寺1260多级天台台阶高度非常陡，甚至斜度接近70度，对体力不支者极其受限。绝非强制，请体力较弱、膝盖旧伤伙伴和长辈切勿冒险，可在一层林地溪流间休闲礼佛',
      '翡翠池周沿常年有温泉钙质沉积、石面和泥地极为湿滑，行走须缓慢；严禁在岸边奔跑或向池中高空跳水'
    ],
    webPosition: '不出海的自然文化路线，适合穿插在海岛行程中',
    mapsUrl: 'https://maps.google.com/?q=Emerald+Pool+Krabi'
  },
  {
    id: '5',
    title: '莱利海滩半日游 / 最美落日漫游 (Railay Beach & Sunset)',
    rating: 4.7,
    duration: '半日',
    description: '莱利半岛因高耸孤立的攀岩绝壁而从陆岛隔绝，只能经水路坐长尾船涉水探访。这里汇聚了鬼斧神工的石灰悬崖、纯白洁净沙滩以及无数世界攀岩狂热爱好者。在此喝着冰椰汁、伴着落日看悬崖上的攀岩者，无比惬意。',
    image: railayBeach,
    packingList: ['平底便携拖鞋', '防晒帽/太阳眼镜', '手机防水袋', '少量泰铢纸币'],
    type: 'water',
    category: 'suggested',
    region: '甲米',
    schedule: '自由灵活时间。最为提倡午后 14:00 起程出发，可顺延目睹震撼海滩日落',
    meetingPoint: '奥南海滩售票点，直接自由搭买拼船长尾船(往返 200 铢/人)',
    effort: '低 (沙滩全平地，老幼咸宜，攀岩区可选择性旁观)',
    cost: '沙滩及公主洞窟完全免费进入；若要在崖壁挑战专业教练攀岩体验，约需自付费 1000 泰铢',
    isWater: '可下水',
    suitableFor: '想彻底放松情绪、拍海滩崖壁人文神图、体验安详酒吧香醇美酒、不愿长途车马劳顿的伙伴',
    highlights: [
      '傲视世界海崖攀岩圣地，欣赏绝壁芭蕾，感受自由攀爬的蓬勃力量',
      '金红海潮西沉下，莱利海滩独特的石岩群峰剪影，静品天空魔幻日落',
      '帕南海滩奇岩巨耸的原始公主图腾神像溶洞，承载古老安宁本土崇敬'
    ],
    warnings: [
      '由于半岛未修铁路跟陆路公路，全部接驳都是通过在奥南海滩登长尾船。潮汐作怪下，上下船需要徒步在膝盖深的沙滩水层中踩过，切勿穿球鞋或精致皮鞋，改穿透水拖鞋最为安妥',
      '遇上季风大暴雨突袭时海浪颠簸且视野不佳，出海体验严重削折，出行前要盯紧奥南气象信号看板'
    ],
    webPosition: '轻松半日项目，适合自由活动推荐',
    mapsUrl: 'https://maps.google.com/?q=Railay+Beach+Krabi'
  },
  {
    id: '6',
    title: 'Mu Ko Lanta 兰塔国家公园与白塔巡礼 (Mu Ko Lanta National Park)',
    rating: 4.9,
    duration: '半日',
    description: '兰塔岛最南端一尘不染的天涯海角。这里屹立着兰塔岛最经典的纯白灯塔。碧蓝惊涛层层堆砌在陡峭礁崖、一侧是细白沙滩而另一侧是鹅卵石碎滩的奇妙双子海湾。信步登高，宛若置身海港小镇。',
    image: lantaNationalPark,
    packingList: ['长袜与驱蚊液', '平稳行路鞋', '防晒草帽', '小瓶白开水'],
    type: 'nature',
    category: 'suggested',
    region: '兰塔',
    schedule: '兰塔自由活动日首选。在上午 09:00 - 13:00 或日落前两小时来拍超级大片',
    meetingPoint: '包车/自驾/租车前往兰塔南部崖壁公园大门口合拢',
    effort: '中 (含林下短途健步路段，斜坡上灯塔，体力平稳)',
    cost: '国家公园管理局现场收取门票 200 泰铢/人 (属于自理自足非必选费用)',
    isWater: '不一定下水',
    suitableFor: '痴迷打卡绝景、文艺相片创作、偏爱地中海式海岸旷野与徒步林中踏青的员工',
    highlights: [
      '极负盛名极具人文故事感、耸立山崖白头上的白框高灯塔(White Lighthouse)',
      '由国家公园天涯分割出两端一柔一刚、奇丽诡谲和缓并存的冷暖双子砾石/沙滩海湾',
      '全长约 2 公里绿荫参天的原生热带雨林自然生态循步道，呼吸极负离子'
    ],
    warnings: [
      '南部国家公园深处的野生猕猴已经具备一定的野外竞争捕食习性，绝对不要在外手持装有香蕉、坚果的塑料袋，手持敞口冷饮也会引起猴群夺抢，包包请拉紧背包拉链防扒',
      '惊涛撞击灯塔下的乱石滩乱礁石极其坚硬长青苔，风大浪急时千万不可过于探出安全红线边缘'
    ],
    webPosition: '兰塔最经典打卡点，适合放在兰塔必去栏目',
    mapsUrl: 'https://maps.google.com/?q=Mu+Ko+Lanta+National+Park'
  },
  {
    id: '7',
    title: 'Lanta Old Town 兰塔老镇闲逛与临海茶慢 (Lanta Old Town Exploration)',
    rating: 4.8,
    duration: '2-3小时',
    description: '位于兰塔岛东海岸，是一座历经百年风霜、饱含海洋多元文化（泰式清真与早年华侨闽商木居）熏陶的古雅中转港。宁静优雅的临海街道上，清一色由百年柚木吊脚楼建成的小铺点缀，在此吃一顿悬空在碧绿海面上的地道午餐，超级惬意。',
    image: lantaOldTown,
    packingList: ['舒适平底单鞋', '清爽便装', '防蚊液喷雾', '相机/手机'],
    type: 'culture',
    category: 'suggested',
    region: '兰塔',
    schedule: '下午自由闲散行程，推荐在 11:30 - 15:30 贯穿午餐享歇时段',
    meetingPoint: '老镇牌坊标志正大门下，散团自发步行慢逛',
    effort: '低 (步行路面平整毫无波澜斜度，全岁段无痛通达)',
    cost: '完全免门票；临海悬挂木楼海鲜、文艺手冲椰子咖啡与泰布纪念品等由个人自定自费',
    isWater: '不下水',
    suitableFor: '寻找本地人文肌理、深度古街探踪、渴望午后慵懒看潮起潮落、享受木屋美食咖啡的员工伙伴',
    highlights: [
      '临江临海吊挂空中在潮汐退涌中呼吸的壮观闽式百年吊脚楼老木屋群落',
      '街头各色极其可爱文艺的泰式手作布画杂货铺、自制水果冰淇淋吧',
      '原汁原味的当地海边老渔港码头与静心听海的下午茶露天茶室'
    ],
    warnings: [
      '本街道以清修、淡雅和淳朴的乡里民风为主，周边无繁琐的迪厅或高度网乐夜场。请在逛游探店聊天时保持基本安详，不大声在木质楼板上跺脚大嗓叫嚣'
    ],
    webPosition: '兰塔自由活动推荐，适合餐饮和慢逛内容',
    mapsUrl: 'https://maps.google.com/?q=Lanta+Old+Town'
  },
  {
    id: '8',
    title: 'Thung Yi Peng 红树林社区慢活摇手船 (Thung Yi Peng Mangrove Service)',
    rating: 4.7,
    duration: '半日',
    description: '曾荣获泰国社区绿色共建旅游杰出大奖。在兰塔东海岸庞大的天然海洋入海泥港沼泽地上，乘坐完全靠原木质手摇的传统摇橹慢船穿梭在幽会如荫的红树繁网，与林、海、天空和灵动动物亲近呼吸。',
    image: thungYiPeng,
    packingList: ['高效驱蚊喷液', '遮阳帽/头饰长巾', '一瓶防暑水'],
    type: 'nature',
    category: 'suggested',
    region: '兰塔',
    schedule: '提早一日致电预约最灵气。极其推崇清晨 06:30 晨曦朝阳游，或 16:30 追余晖班次',
    meetingPoint: 'Thung Yi Peng 社区游客生态接待登记浮栈桥',
    effort: '低-中 (无需自己摇桨，完全由熟手泰国向导操作，体验度极为省心舒服)',
    cost: '坐一船往返约 300 - 500 泰铢 / 人 (视包一叶木船大小，按个人实地自理)',
    isWater: '不一定下水',
    suitableFor: '向往宁静生态野趣、家庭朋友组合极为和气、想要摆脱机动马达咆哮震动的养生员工伙伴',
    highlights: [
      '乘坐手工艺精美、悄无声息的古朴尖头慢摇大橹木船穿行于绿荫走廊下的运河水道',
      '近水观赏极其诡奇强大的红树林八爪式原生庞大根系群自然呼吸奇景',
      '在河流两旁用天然安全香蕉投养，看活泼可爱的野外红树猴游泳攀缘捕食'
    ],
    warnings: [
      '沼泽地带由于森林密林郁闭、阴风阵阵，会积攒较多的凶猛白线草斑蚊。强烈要求在登船前，务必在裸露的手腿后侧均匀擦拭多道本地购买的驱蚊药膏',
      '该地为重点社区环保实践区，禁止随船扔下任何胶带塑料垃圾袋，不随意惊扰林中野鸟'
    ],
    webPosition: '兰塔本地生态体验，比普通海滩更有记忆点',
    mapsUrl: 'https://maps.google.com/?q=Tung+Yee+Peng+Pier+Lanta'
  },
  {
    id: '10',
    title: '兰塔海滩自由躺平活动: Long Beach / Klong Dao / Kantiang Bay',
    rating: 4.6,
    duration: '2小时-半日',
    description: '兰塔岛延绵数十公里的西海岸缀满了各具绝妙个性的平缓纯净沙滩。这里是泰国家岛中少见的没有排他高密度排档人浪的、纯粹用来听海发呆的寂静沙层。在沙滩草棚下享用廉价大碗的纯椰汁，看火舞，洗涤内心浮尘。',
    image: lantaLongBeach,
    packingList: ['沙滩巾/简垫', '最靓的比基尼/泳裤', '防水耳塞'],
    type: 'water',
    category: 'suggested',
    region: '兰塔',
    schedule: '每日午后 16:00 至夜幕拉开 22:00 沙滩风情全天无限制躺平',
    meetingPoint: '根据员工伙伴自订落脚住所，推荐最近的最佳沿线沙地',
    effort: '低 (沙地游散、在简陋草垫上瘫坐赏景，毫无体魄负荷)',
    cost: '全部海滨路线均属于公共免费自然遗产，游沙漫漫全免费通达',
    isWater: '可下水',
    suitableFor: '终极大平躺主义、落日迷恋狂、慵懒漫步发散思绪、或者只是想要独自或携友喝听风声看剧的发呆型员工',
    highlights: [
      '延绵不屈如缎带般细腻且沙滩海水湛蓝大气的标志性长滩(Long Beach)',
      '水域平缓安全、极其适合幼童嬉戏和初学者在海面沐浴漂泊的 Klong Dao 沙滩',
      '兰塔西海岸最经典、各路个性化海风小酒肆和夜间野性传统火舞表演(Fire Dance Show)'
    ],
    warnings: [
      '各沙滩各有其水况特点：Klong Dao 海水前深平浅、基本无大浪最适合散水；Long Beach 偶尔潮汐深差偏大，下水嬉戏时请随时跟护同伴；Kantiang Bay 较为幽僻原生态，请注意防护暗沙滩的尖利碎贝壳',
      '海滩游泳游玩时一定留意是否有红色警示三角小旗贴着，浪极大时不要孤身一意探入深水中央'
    ],
    webPosition: '自由活动页基础内容，适合做定位周边推荐入口',
    mapsUrl: 'https://maps.google.com/?q=Kantiang+Bay+Lanta'
  }
];
