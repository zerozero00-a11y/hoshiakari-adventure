// セーブ形式を変更するときは、このバージョンも更新します。
const SAVE_VERSION = 5;
const SUPPORTED_SAVE_VERSIONS = [1, 2, 3, 4, SAVE_VERSION];
const MAX_CHARACTER_LEVEL = 50;
const STORAGE_KEYS = {
  auto: "hoshiRpg.autoSave",
  manual1: "hoshiRpg.manualSave1",
  manual2: "hoshiRpg.manualSave2",
  settings: "hoshiRpg.settings"
};

const AREAS = [
  { name: "星降る草原", description: "星屑の魔物が暮らす、星明かりに満ちた草原。" },
  { name: "精霊の森", description: "小さな精霊と古樹が守る、深い緑の森。" },
  { name: "水晶洞窟", description: "青紫の結晶が輝く、静かな地下洞窟。" },
  { name: "天空遺跡", description: "雲海に浮かぶ、古代文明の遺跡。" },
  { name: "星の神殿", description: "星喰らいが封じられた、世界の果ての神殿。" }
];

const CHARACTERS = [
  { id: "lucien", name: "ルシオン", job: "剣士", icon: "⚔️" },
  { id: "lumiera", name: "リュミエラ", job: "剣士", icon: "⚔️" },
  { id: "asterio", name: "アステリオ", job: "騎士", icon: "🛡️" },
  { id: "verdis", name: "ヴェルディス", job: "騎士", icon: "🛡️" },
  { id: "celestia", name: "セレスティア", job: "魔術師", icon: "🔮" },
  { id: "noctis", name: "ノクティス", job: "魔術師", icon: "🔮" },
  { id: "luminaria", name: "ルミナリア", job: "僧侶", icon: "✨" },
  { id: "elsiel", name: "エルシエル", job: "僧侶", icon: "✨" },
  { id: "sirius", name: "シリウス", job: "弓使い", icon: "🏹" },
  { id: "arsheria", name: "アルシェリア", job: "弓使い", icon: "🏹" },
  { id: "ravel", name: "レイヴェル", job: "暗殺者", icon: "🗡️" },
  { id: "mystiria", name: "ミスティリア", job: "暗殺者", icon: "🗡️" },
  { id: "orferio", name: "オルフェリオ", job: "武闘家", icon: "🥊" },
  { id: "zephiran", name: "ゼフィラン", job: "武闘家", icon: "🥊" },
  { id: "ariastella", name: "アリアステラ", job: "吟遊詩人", icon: "🎵" },
  { id: "lunatiel", name: "ルナティエル", job: "吟遊詩人", icon: "🎵" }
];

const JOB_DATA = {
  "剣士": { base: [120, 30, 18, 12, 5, 8, 10], growth: [14, 3, 4, 3, 1, 2, 2], criticalChance: 0.05 },
  "騎士": { base: [150, 25, 14, 20, 4, 12, 6], growth: [18, 2, 3, 5, 1, 3, 1], criticalChance: 0.03 },
  "魔術師": { base: [75, 70, 5, 6, 22, 15, 10], growth: [8, 8, 1, 1, 5, 3, 2], criticalChance: 0.05 },
  "僧侶": { base: [90, 65, 7, 9, 16, 20, 9], growth: [10, 7, 1, 2, 4, 5, 2], criticalChance: 0.03 },
  "弓使い": { base: [95, 40, 17, 8, 6, 9, 17], growth: [11, 4, 4, 2, 1, 2, 4], criticalChance: 0.08 },
  "暗殺者": { base: [85, 35, 19, 7, 5, 8, 22], growth: [9, 4, 5, 1, 1, 2, 5], criticalChance: 0.12 },
  "武闘家": { base: [130, 25, 20, 11, 4, 7, 14], growth: [16, 2, 5, 3, 1, 1, 3], criticalChance: 0.07 },
  "吟遊詩人": { base: [90, 60, 9, 8, 15, 16, 16], growth: [10, 7, 2, 2, 3, 4, 4], criticalChance: 0.04 }
};

const STAT_KEYS = ["maxHp", "maxMp", "physicalAttack", "physicalDefense", "magicAttack", "magicDefense", "speed"];
const EQUIPMENT_SLOTS = ["weapon", "head", "body", "feet", "accessory"];
const EQUIPMENT_SLOT_LABELS = {
  weapon: "武器",
  head: "頭",
  body: "体",
  feet: "足",
  accessory: "アクセサリー"
};
const EQUIPMENT_AREA_DATA = [
  { prefix: "星屑", bonuses: { weapon: 10, head: 5, body: 10, feet: 5, accessory: 30 }, prices: { weapon: 100, head: 60, body: 100, feet: 60, accessory: 80 } },
  { prefix: "精霊", bonuses: { weapon: 25, head: 12, body: 25, feet: 12, accessory: 75 }, prices: { weapon: 300, head: 180, body: 300, feet: 180, accessory: 240 } },
  { prefix: "水晶", bonuses: { weapon: 50, head: 25, body: 50, feet: 25, accessory: 150 }, prices: { weapon: 700, head: 420, body: 700, feet: 420, accessory: 560 } },
  { prefix: "天空", bonuses: { weapon: 80, head: 40, body: 80, feet: 40, accessory: 240 }, prices: { weapon: 1400, head: 840, body: 1400, feet: 840, accessory: 1120 } },
  { prefix: "星霊", bonuses: { weapon: 120, head: 60, body: 120, feet: 60, accessory: 360 }, prices: { weapon: 2500, head: 1500, body: 2500, feet: 1500, accessory: 2000 } }
];
const EQUIPMENT_RARITIES = {
  normal: { name: "ノーマル", multiplier: 1, priceMultiplier: 1 },
  rare: { name: "レア", multiplier: 1.5, priceMultiplier: 2 },
  legendary: { name: "レジェンダリー", multiplier: 2, priceMultiplier: 4 }
};
const JOB_WEAPON_TYPES = {
  "剣士": "剣",
  "騎士": "槍",
  "魔術師": "杖",
  "僧侶": "聖杖",
  "弓使い": "弓",
  "暗殺者": "短剣",
  "武闘家": "拳具",
  "吟遊詩人": "楽器"
};
const PHYSICAL_JOBS = new Set(["剣士", "騎士", "弓使い", "暗殺者", "武闘家"]);
const EQUIPMENT_DROP_CHANCE = 0.1;
const EQUIPMENT_DROP_RARITIES = [
  { rarity: "normal", threshold: 0.8 },
  { rarity: "rare", threshold: 0.98 },
  { rarity: "legendary", threshold: 1 }
];
const BOSS_THEMES = {
  5: { key: "star-rabbit", name: "星角ラビット", colors: ["#f4d276", "#a8e5ff"], particles: ["✦", "✧", "·", "✦"] },
  10: { key: "ancient-tree", name: "古樹の番人", colors: ["#39cf91", "#c0ff9b"], particles: ["❧", "✦", "·", "❋"] },
  15: { key: "amethyst-serpent", name: "紫晶サーペント", colors: ["#c078ff", "#79e6ff"], particles: ["◇", "✧", "·", "◈"] },
  20: { key: "sky-bird", name: "天空の幻鳥", colors: ["#b9edff", "#f3d889"], particles: ["羽", "✦", "·", "ϟ"] },
  25: { key: "star-devourer", name: "星喰らい", colors: ["#a357ff", "#ef4d70"], particles: ["✦", "·", "◈", "✧"] }
};
const INITIAL_PARTY = ["lucien", "sirius"];
// Stage 24でLv34前後、Stage 25の報酬後にLv35前後となる経験値倍率。
const AREA_EXPERIENCE_MULTIPLIERS = [2, 3.33, 4, 4.02, 4.85];
const FINAL_STAGE_EXPERIENCE_MULTIPLIER = 3.9;
const RECRUITMENT_DATA = {
  asterio: { unlockStage: 2, cost: 100 },
  luminaria: { unlockStage: 3, cost: 150 },
  celestia: { unlockStage: 4, cost: 200 },
  ravel: { unlockStage: 5, cost: 300 },
  orferio: { unlockStage: 6, cost: 400 },
  ariastella: { unlockStage: 7, cost: 500 },
  lumiera: { unlockStage: 9, cost: 650 },
  arsheria: { unlockStage: 10, cost: 800 },
  verdis: { unlockStage: 12, cost: 1000 },
  elsiel: { unlockStage: 13, cost: 1200 },
  noctis: { unlockStage: 15, cost: 1500 },
  zephiran: { unlockStage: 17, cost: 1800 },
  mystiria: { unlockStage: 19, cost: 2200 },
  lunatiel: { unlockStage: 20, cost: 2500 }
};
const RECRUIT_START_LEVEL = [
  { maxStage: 5, level: 1 },
  { maxStage: 10, level: 10 },
  { maxStage: 15, level: 20 },
  { maxStage: 20, level: 30 }
];
const LEGACY_CHARACTER_IDS = [
  "lyra", "orion", "elena", "kai", "mira", "gareth", "noa",
  "freya", "ren", "celes", "dante", "yuna", "seth", "aria"
];

const ENEMY_DATA = {
  stardustSlime: {
    name: "星屑スライム", icon: "🟣", maxHp: 50, physicalAttack: 12, magicAttack: 4, physicalDefense: 5, magicDefense: 4,
    experience: 10, gold: 8, specialName: "星屑タックル", specialMultiplier: 1.5
  },
  moonWolf: {
    name: "月影ウルフ", icon: "🐺", maxHp: 75, physicalAttack: 18, magicAttack: 5, physicalDefense: 7, magicDefense: 5,
    experience: 15, gold: 12, specialName: "月影の牙", specialMultiplier: 1.8
  },
  starRabbit: {
    name: "星角ラビット", icon: "🐇", maxHp: 65, physicalAttack: 16, magicAttack: 5, physicalDefense: 6, magicDefense: 5,
    experience: 13, gold: 10, specialName: "星角突き", specialMultiplier: 1.6,
    bossSpecials: [
      { name: "星角突進", multiplier: 1.6, damageType: "physical" },
      { name: "流星跳躍", multiplier: 2, damageType: "physical" }
    ]
  },
  forestWisp: {
    name: "森の小精霊", icon: "🧚", maxHp: 105, physicalAttack: 22, magicAttack: 25, physicalDefense: 10, magicDefense: 16,
    experience: 35, gold: 25, specialName: "木霊の光", specialMultiplier: 1.5
  },
  illusionMushroom: {
    name: "幻惑キノコ", icon: "🍄", maxHp: 120, physicalAttack: 23, magicAttack: 28, physicalDefense: 12, magicDefense: 20,
    experience: 40, gold: 30, specialName: "幻惑胞子", specialMultiplier: 1.6
  },
  ancientTreeGuardian: {
    name: "古樹の番人", icon: "🌳", maxHp: 180, physicalAttack: 30, magicAttack: 25, physicalDefense: 23, magicDefense: 22,
    experience: 50, gold: 40, specialName: "古樹の一撃", specialMultiplier: 1.8,
    bossSpecials: [
      { name: "古樹の一撃", multiplier: 1.8, damageType: "physical" },
      { name: "大地の震動", multiplier: 1.6, damageType: "physical", target: "all" }
    ]
  },
  crystalBat: {
    name: "水晶バット", icon: "🦇", maxHp: 210, physicalAttack: 38, magicAttack: 34, physicalDefense: 22, magicDefense: 24,
    experience: 80, gold: 60, specialName: "結晶音波", specialMultiplier: 1.5
  },
  crystalGolem: {
    name: "結晶ゴーレム", icon: "🪨", maxHp: 290, physicalAttack: 36, magicAttack: 30, physicalDefense: 34, magicDefense: 30,
    experience: 100, gold: 75, specialName: "結晶拳", specialMultiplier: 1.6
  },
  amethystSerpent: {
    name: "紫晶サーペント", icon: "🐍", maxHp: 260, physicalAttack: 42, magicAttack: 42, physicalDefense: 27, magicDefense: 28,
    experience: 90, gold: 70, specialName: "紫晶の牙", specialMultiplier: 1.8,
    bossSpecials: [
      { name: "紫晶の牙", multiplier: 1.8, damageType: "physical" },
      { name: "水晶尾撃", multiplier: 2, damageType: "physical" }
    ]
  },
  floatingArcaneOrb: {
    name: "浮遊の魔導球", icon: "🔮", maxHp: 350, physicalAttack: 47, magicAttack: 58, physicalDefense: 32, magicDefense: 42,
    experience: 150, gold: 110, specialName: "魔力弾", specialMultiplier: 1.6
  },
  ancientGuardian: {
    name: "古代の守護兵", icon: "🗿", maxHp: 450, physicalAttack: 55, magicAttack: 48, physicalDefense: 47, magicDefense: 43,
    experience: 180, gold: 140, specialName: "古代の斬撃", specialMultiplier: 1.7
  },
  skyPhantomBird: {
    name: "天空の幻鳥", icon: "🦅", maxHp: 390, physicalAttack: 60, magicAttack: 64, physicalDefense: 35, magicDefense: 40,
    experience: 165, gold: 125, specialName: "天空の羽嵐", specialMultiplier: 1.6,
    bossSpecials: [
      { name: "天空の羽嵐", multiplier: 1.6, damageType: "magic", target: "all" },
      { name: "天空の急襲", multiplier: 2, damageType: "physical" }
    ]
  },
  astralKnight: {
    name: "星霊騎士", icon: "🌟", maxHp: 510, physicalAttack: 66, magicAttack: 58, physicalDefense: 48, magicDefense: 44,
    experience: 250, gold: 200, specialName: "星霊斬り", specialMultiplier: 1.6
  },
  voidMage: {
    name: "虚空の魔導士", icon: "🧙", maxHp: 470, physicalAttack: 54, magicAttack: 76, physicalDefense: 39, magicDefense: 58,
    experience: 270, gold: 220, specialName: "虚空弾", specialMultiplier: 1.7
  },
  starEater: {
    name: "星喰らい", icon: "🌌", maxHp: 620, physicalAttack: 78, magicAttack: 82, physicalDefense: 53, magicDefense: 55,
    experience: 300, gold: 250, specialName: "虚空の波動", specialMultiplier: 1.8,
    bossSpecials: [
      { name: "虚空の波動", multiplier: 1.8, damageType: "magic", target: "all" },
      { name: "星喰らいの一撃", multiplier: 2, damageType: "physical" }
    ]
  }
};

const AREA_ENEMY_IDS = {
  1: ["stardustSlime", "moonWolf", "starRabbit"],
  2: ["forestWisp", "illusionMushroom", "ancientTreeGuardian"],
  3: ["crystalBat", "crystalGolem", "amethystSerpent"],
  4: ["floatingArcaneOrb", "ancientGuardian", "skyPhantomBird"],
  5: ["astralKnight", "voidMage", "starEater"]
};

const BOSS_FIRST_CLEAR_GOLD = { 5: 300, 10: 800, 15: 1500, 20: 2500, 25: 5000 };

const BATTLE_RULES = {
  maxPartySize: 4,
  wavesPerStage: 3,
  normalEnemyAttackMultiplier: 0.7,
  basicHitChance: 0.95,
  criticalChance: 0.05,
  gaugePerAttack: 20,
  gaugePerHit: 10,
  gaugeMaximum: 100,
  actionDelayMs: 550,
  waveDelayMs: 900
};

const ITEM_DATA = {
  potion: { name: "回復薬", target: "living", description: "味方1人のHPを100回復", price: 50 },
  ether: { name: "魔力薬", target: "living", description: "味方1人のMPを30回復", price: 60 },
  panacea: { name: "万能薬", target: "living", description: "味方1人の状態異常を解除", price: 80 },
  revive: { name: "蘇生薬", target: "fallen", description: "戦闘不能の味方を最大HPの50%で復活", price: 120 }
};

function defineCharacterSkill(name, level, effect) {
  const mpCost = level === 30 ? 0 : level === 1 ? 5 : level === 10 ? 10 : level === 20 ? 15 : 20;
  return { name, level, mpCost, ...effect };
}

function attackSkill(name, level, damageType = "physical", multiplier = 1.5, target = "singleEnemy", extra = {}) {
  return defineCharacterSkill(name, level, { type: "damage", damageType, multiplier, target, ...extra });
}

function healSkill(name, level, target = "singleAlly", healRatio = 0.3) {
  return defineCharacterSkill(name, level, { type: "heal", target, healRatio });
}

function reviveSkill(name, level, target = "singleAlly", reviveRatio = 0.5) {
  return defineCharacterSkill(name, level, { type: "revive", target, reviveRatio });
}

function buffSkill(name, level, stat, amount = 0.2, target = "singleAlly") {
  return defineCharacterSkill(name, level, { type: "buff", target, stat, amount, duration: 3 });
}

function statDebuffSkill(name, level, stat, amount = 0.2, target = "singleEnemy") {
  return defineCharacterSkill(name, level, {
    type: "debuff",
    target,
    stat,
    amount: -Math.abs(amount),
    duration: 3
  });
}

function debuffSkill(name, level, status, damageType = null, multiplier = 0) {
  return defineCharacterSkill(name, level, {
    type: damageType ? "damage" : "status",
    target: "singleEnemy",
    ...(damageType ? { damageType, multiplier } : {}),
    applyStatus: status
  });
}

// 習得レベルと効果はキャラクターIDごとにまとめ、レベルから使用可否を判定します。
const CHARACTER_SKILLS = {
  lucien: {
    basic: attackSkill("星光斬", 1),
    unique: attackSkill("流星連斬", 10, "physical", 0.8, "singleEnemy", { hits: 3 }),
    advanced: attackSkill("星裂き", 20, "physical", 2),
    ultimate: attackSkill("天星剣・暁", 30, "physical", 3.5),
    final: attackSkill("銀河一閃", 40, "physical", 1.4, "allEnemies")
  },
  lumiera: {
    basic: attackSkill("月光斬", 1),
    unique: buffSkill("月影の構え", 10, "physicalAttack", 0.2, "self"),
    advanced: attackSkill("月輪連舞", 20, "physical", 0.8, "singleEnemy", { hits: 3 }),
    ultimate: attackSkill("月華剣・満月", 30, "physical", 3.5),
    final: attackSkill("蒼月一閃", 40, "physical", 2.5)
  },
  asterio: {
    basic: attackSkill("守護の一撃", 1),
    unique: buffSkill("鉄壁の誓い", 10, "physicalDefense", 0.2),
    advanced: attackSkill("聖盾の突撃", 20, "physical", 2),
    ultimate: buffSkill("星盾・不滅の守護", 30, "physicalDefense", 0.35, "allAllies"),
    final: attackSkill("天穿つ槍", 40, "physical", 2.5)
  },
  verdis: {
    basic: attackSkill("翠風突き", 1),
    unique: buffSkill("守護の陣", 10, "magicDefense", 0.2),
    advanced: attackSkill("風裂の槍", 20, "physical", 2),
    ultimate: buffSkill("翠星の城壁", 30, "magicDefense", 0.35, "allAllies"),
    final: attackSkill("翠嵐連突", 40, "physical", 0.8, "singleEnemy", { hits: 3 })
  },
  celestia: {
    basic: attackSkill("星炎", 1, "magic"),
    unique: attackSkill("星火の雨", 10, "magic", 1.4, "allEnemies"),
    advanced: attackSkill("紅蓮星", 20, "magic", 2),
    ultimate: attackSkill("星天魔法・超新星", 30, "magic", 3.5),
    final: attackSkill("天穹の業火", 40, "magic", 1.4, "allEnemies")
  },
  noctis: {
    basic: attackSkill("闇の矢", 1, "magic"),
    unique: debuffSkill("夜霧の呪縛", 10, { type: "paralysis" }),
    advanced: attackSkill("深淵の波動", 20, "magic", 1.4, "allEnemies"),
    ultimate: attackSkill("終夜魔法・黒き星", 30, "magic", 3.5),
    final: attackSkill("虚無の奔流", 40, "magic", 2.5)
  },
  luminaria: {
    basic: healSkill("癒やしの光", 1),
    unique: healSkill("聖なる祈り", 10, "singleAlly", 0.5),
    advanced: healSkill("星の祝福", 20, "allAllies", 0.25),
    ultimate: healSkill("奇跡の星明かり", 30, "allAllies", 0.5),
    final: attackSkill("聖光の裁き", 40, "magic", 2.5)
  },
  elsiel: {
    basic: healSkill("天使の癒やし", 1),
    unique: defineCharacterSkill("浄化の祈り", 10, { type: "cleanse", target: "singleAlly" }),
    advanced: buffSkill("守護の聖歌", 20, "magicDefense", 0.2, "allAllies"),
    ultimate: healSkill("天界の恩寵", 30, "allAllies", 0.5),
    final: reviveSkill("聖翼の蘇生歌", 40)
  },
  sirius: {
    basic: attackSkill("星矢", 1),
    unique: attackSkill("流星射ち", 10, "physical", 0.8, "singleEnemy", { hits: 3 }),
    advanced: attackSkill("貫星の矢", 20, "physical", 2),
    ultimate: attackSkill("天狼星の一矢", 30, "physical", 3.5),
    final: attackSkill("星雨の矢", 40, "physical", 1.4, "allEnemies")
  },
  arsheria: {
    basic: attackSkill("風の矢", 1),
    unique: buffSkill("狙撃の構え", 10, "physicalAttack", 0.2, "self"),
    advanced: attackSkill("風刃連射", 20, "physical", 0.8, "singleEnemy", { hits: 3 }),
    ultimate: attackSkill("天翔ける翠風", 30, "physical", 3.5),
    final: attackSkill("疾風の矢雨", 40, "physical", 1.4, "allEnemies")
  },
  ravel: {
    basic: attackSkill("影刃", 1),
    unique: debuffSkill("毒刃", 10, { type: "poison" }, "physical", 1.5),
    advanced: attackSkill("暗影連撃", 20, "physical", 0.8, "singleEnemy", { hits: 3 }),
    ultimate: attackSkill("絶影・終焉", 30, "physical", 3.5),
    final: attackSkill("漆黒の一閃", 40, "physical", 2.5)
  },
  mystiria: {
    basic: attackSkill("霧刃", 1),
    unique: debuffSkill("幻惑の霧", 10, { type: "confusion" }),
    advanced: attackSkill("霧影乱舞", 20, "physical", 0.8, "singleEnemy", { hits: 3 }),
    ultimate: attackSkill("幻影・千夜の舞", 30, "physical", 3.5),
    final: attackSkill("夢幻の刃", 40, "physical", 2.5)
  },
  orferio: {
    basic: attackSkill("星拳", 1),
    unique: attackSkill("連星拳", 10, "physical", 0.8, "singleEnemy", { hits: 3 }),
    advanced: attackSkill("破星撃", 20, "physical", 2),
    ultimate: attackSkill("奥義・星砕き", 30, "physical", 3.5),
    final: attackSkill("天星百烈拳", 40, "physical", 0.8, "singleEnemy", { hits: 3 })
  },
  zephiran: {
    basic: attackSkill("風拳", 1),
    unique: buffSkill("疾風の構え", 10, "speed", 0.2, "self"),
    advanced: attackSkill("烈風脚", 20, "physical", 2),
    ultimate: attackSkill("奥義・嵐神拳", 30, "physical", 3.5),
    final: attackSkill("風神連舞", 40, "physical", 0.8, "singleEnemy", { hits: 3 })
  },
  ariastella: {
    basic: buffSkill("勇気の旋律", 1, "physicalAttack", 0.2),
    unique: healSkill("癒やしの歌", 10),
    advanced: buffSkill("星の戦歌", 20, "physicalAttack", 0.2, "allAllies"),
    ultimate: buffSkill("星空の大交響曲", 30, "physicalAttack", 0.35, "allAllies"),
    final: statDebuffSkill("星影の衰歌", 40, "physicalAttack", 0.2, "allEnemies")
  },
  lunatiel: {
    basic: buffSkill("月の旋律", 1, "magicAttack", 0.2),
    unique: healSkill("安らぎの歌", 10),
    advanced: buffSkill("月夜の賛歌", 20, "magicAttack", 0.2, "allAllies"),
    ultimate: buffSkill("月光の幻想曲", 30, "magicAttack", 0.35, "allAllies"),
    final: statDebuffSkill("月蝕の鎮魂歌", 40, "magicAttack", 0.2, "allEnemies")
  }
};

const INITIAL_INVENTORY = { potion: 3, ether: 2, panacea: 1, revive: 1 };
const INN_PRICE_PER_PARTY_MEMBER = 50;

const app = document.getElementById("app");
const headerStatus = document.getElementById("header-status");
const notice = document.getElementById("notice");

let currentScreen = "title";
let gameData = null;
let settings = { bgm: true, sound: true };
let guildTab = "party";
let shopTab = "buy";
let equipmentCharacterId = INITIAL_PARTY[0];
let equipmentSlot = "weapon";
let equipmentSelectionId = "";
let noticeTimer;
let battleState = null;
let battleTimer = null;
let bossVisualTimer = null;
let catalogTab = "characters";
let catalogSelection = null;
let catalogBackground = "dark";
let catalogImagesStarted = false;
let debugMode = false;
let normalGameData = null;
let debugReturnScreen = "catalog";
let debugReturnCatalogTab = "characters";
let debugStage = 1;
let debugCharacterId = INITIAL_PARTY[0];
let debugParty = [...INITIAL_PARTY];
let debugCharacterSettings = {};
const catalogImageStatus = { characters: {}, monsters: {} };

function createEquipmentItem(area, slot, rarity = "normal", jobRequirement = null, equippedBy = null, id = null) {
  const areaIndex = Math.max(1, Math.min(EQUIPMENT_AREA_DATA.length, area)) - 1;
  const areaData = EQUIPMENT_AREA_DATA[areaIndex];
  const rarityData = EQUIPMENT_RARITIES[rarity] || EQUIPMENT_RARITIES.normal;
  const baseValue = areaData.bonuses[slot];
  const bonus = Math.round(baseValue * rarityData.multiplier);
  let bonusKey;
  let name;
  if (slot === "weapon") {
    const weaponType = JOB_WEAPON_TYPES[jobRequirement];
    if (!weaponType) return null;
    bonusKey = PHYSICAL_JOBS.has(jobRequirement) ? "physicalAttack" : "magicAttack";
    name = `${areaData.prefix}の${weaponType}`;
  } else if (slot === "head") {
    bonusKey = "magicDefense";
    name = `${areaData.prefix}の星冠`;
  } else if (slot === "body") {
    bonusKey = "physicalDefense";
    name = `${areaData.prefix}の旅装`;
  } else if (slot === "feet") {
    bonusKey = "speed";
    name = `${areaData.prefix}の靴`;
  } else if (slot === "accessory") {
    bonusKey = "maxHp";
    name = `${areaData.prefix}の護符`;
  } else {
    return null;
  }
  const purchasePrice = areaData.prices[slot] * rarityData.priceMultiplier;
  const uniqueId = id || `gear-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return {
    id: uniqueId,
    name,
    slot,
    area: areaIndex + 1,
    rarity,
    jobRequirement: slot === "weapon" ? jobRequirement : null,
    bonuses: { [bonusKey]: bonus },
    purchasePrice,
    equippedBy
  };
}

function getEquipmentItem(itemId) {
  return gameData?.equipmentInventory?.find((item) => item.id === itemId) || null;
}

function addInitialEquipment(characterId, area, progress, equipmentInventory) {
  const character = CHARACTERS.find((entry) => entry.id === characterId);
  if (!character) return;
  for (const slot of EQUIPMENT_SLOTS) {
    if (progress.equipment[slot]) continue;
    const item = createEquipmentItem(area, slot, "normal", slot === "weapon" ? character.job : null, characterId);
    if (!item) continue;
    equipmentInventory.push(item);
    progress.equipment[slot] = item.id;
  }
}

function createNewGame() {
  const characterProgress = Object.fromEntries(CHARACTERS.map((character) => [
    character.id,
    createCharacterProgress(character.id, INITIAL_PARTY.includes(character.id), 1, 1)
  ]));
  const equipmentInventory = [];
  for (const characterId of INITIAL_PARTY) {
    addInitialEquipment(characterId, 1, characterProgress[characterId], equipmentInventory);
  }
  return {
    clearedStages: 0,
    selectedStage: 1,
    gold: 500,
    roster: [...INITIAL_PARTY],
    party: [...INITIAL_PARTY],
    inventory: { ...INITIAL_INVENTORY },
    characterProgress,
    equipmentSystemVersion: 1,
    equipmentInventory,
    legacyRoster: [],
    bossRewardsClaimed: []
  };
}

function createDebugGameData() {
  const data = createNewGame();
  const equipmentInventory = [];
  const characterProgress = {};
  for (const character of CHARACTERS) {
    const progress = createCharacterProgress(character.id, true, 1, 1);
    addInitialEquipment(character.id, 1, progress, equipmentInventory);
    characterProgress[character.id] = progress;
  }
  return {
    ...data,
    roster: CHARACTERS.map((character) => character.id),
    characterProgress,
    equipmentInventory
  };
}

function enterDebugMode(previousCatalogTab = "characters") {
  if (debugMode) return;
  normalGameData = gameData;
  gameData = createDebugGameData();
  debugMode = true;
  debugReturnScreen = currentScreen;
  debugReturnCatalogTab = previousCatalogTab;
  debugStage = 1;
  debugCharacterId = INITIAL_PARTY[0];
  debugParty = [...INITIAL_PARTY];
  debugCharacterSettings = Object.fromEntries(CHARACTERS.map((character) => [
    character.id,
    { level: 1, gauge: 0 }
  ]));
  catalogSelection = null;
}

function exitDebugMode() {
  if (!debugMode) return;
  window.clearTimeout(battleTimer);
  window.clearTimeout(bossVisualTimer);
  battleState = null;
  gameData = normalGameData;
  normalGameData = null;
  debugMode = false;
  catalogTab = debugReturnCatalogTab;
  const returnScreen = debugReturnScreen;
  debugCharacterSettings = {};
  debugParty = [...INITIAL_PARTY];
  debugStage = 1;
  debugCharacterId = INITIAL_PARTY[0];
  debugReturnScreen = "catalog";
  debugReturnCatalogTab = "characters";
  setScreen(returnScreen);
}

function setDebugCharacterLevel(characterId, level) {
  if (!debugMode || !CHARACTERS.some((character) => character.id === characterId)) return;
  const parsedLevel = Number(level);
  if (!Number.isInteger(parsedLevel) || parsedLevel < 1 || parsedLevel > MAX_CHARACTER_LEVEL) return;
  const progress = getCharacterProgress(gameData, characterId);
  progress.level = parsedLevel;
  progress.experience = 0;
  progress.learnedSkills = Object.entries(CHARACTER_SKILLS[characterId] || {})
    .filter(([, skill]) => skill && parsedLevel >= skill.level)
    .map(([skillId]) => skillId);
  debugCharacterSettings[characterId].level = parsedLevel;
  if (parsedLevel < 30) debugCharacterSettings[characterId].gauge = 0;
  const stats = calculateCharacterStats(characterId, parsedLevel, progress.equipment);
  if (stats) debugCharacterSettings[characterId].hp = stats.maxHp;
  if (stats) debugCharacterSettings[characterId].mp = stats.maxMp;
}

function startDebugBattle() {
  if (!debugMode || debugParty.length === 0 || debugParty.length > BATTLE_RULES.maxPartySize) return;
  gameData.party = [...debugParty];
  gameData.selectedStage = debugStage;
  startBattle();
  if (!battleState || currentScreen !== "battle") return;
  for (const member of battleState.party) {
    const testSettings = debugCharacterSettings[member.id];
    if (!testSettings) continue;
    member.level = testSettings.level;
    member.learnedSkills = getCharacterProgress(gameData, member.id).learnedSkills;
    member.gauge = member.level >= 30 ? testSettings.gauge : 0;
    member.hp = Math.min(member.maxHp, testSettings.hp ?? member.maxHp);
    member.mp = Math.min(member.maxMp, testSettings.mp ?? member.maxMp);
  }
  render();
}

function createCharacterProgress(characterId, recruited = false, level = 1, equipmentArea = 1) {
  const learnedSkills = Object.entries(CHARACTER_SKILLS[characterId] || {})
    .filter(([, skill]) => skill && level >= skill.level)
    .map(([skillId]) => skillId);
  return {
    recruited,
    level,
    experience: 0,
    learnedSkills,
    equipment: Object.fromEntries(EQUIPMENT_SLOTS.map((slot) => [slot, null])),
    equipmentArea
  };
}

function recruitmentArea(stage) {
  return Math.max(1, Math.min(4, Math.ceil(stage / 5)));
}

function calculateCharacterStats(characterId, level, equipment = {}) {
  const character = CHARACTERS.find((entry) => entry.id === characterId);
  const job = character && JOB_DATA[character.job];
  if (!job) return null;
  const safeLevel = Math.max(1, Math.min(MAX_CHARACTER_LEVEL, level));
  const equipmentBonuses = Object.fromEntries(STAT_KEYS.map((key) => [key, 0]));
  for (const slot of EQUIPMENT_SLOTS) {
    const equipped = equipment[slot];
    const item = typeof equipped === "string" ? getEquipmentItem(equipped) : equipped;
    const bonuses = item?.bonuses || {};
    for (const key of STAT_KEYS) {
      if (Number.isFinite(bonuses[key])) equipmentBonuses[key] += bonuses[key];
    }
  }
  const baseStats = Object.fromEntries(STAT_KEYS.map((key, index) => [
    key,
    job.base[index] + (safeLevel - 1) * job.growth[index]
  ]));
  const stats = Object.fromEntries(STAT_KEYS.map((key) => [key, baseStats[key] + equipmentBonuses[key]]));
  return { ...stats, baseStats, equipmentBonuses, level: safeLevel, criticalChance: job.criticalChance };
}

function experienceRequiredForLevel(level) {
  return 20 * level + 5 * level * level;
}

function getEnemyReward(enemyId, stage, rewardType, isBoss = false) {
  const area = Math.floor((stage - 1) / 5) + 1;
  const stageInArea = ((stage - 1) % 5) + 1;
  const baseReward = ENEMY_DATA[enemyId]?.[rewardType];
  if (!Number.isFinite(baseReward)) return 0;
  const stageMultiplier = 1 + (stageInArea - 1) * 0.05;
  const bossMultiplier = isBoss && stageInArea === 5 ? 5 : 1;
  const areaMultiplier = rewardType !== "experience"
    ? 1
    : stage === 25
      ? FINAL_STAGE_EXPERIENCE_MULTIPLIER
      : AREA_EXPERIENCE_MULTIPLIERS[area - 1];
  return Math.round(baseReward * stageMultiplier * areaMultiplier) * bossMultiplier;
}

function getCharacterProgress(game, characterId) {
  return game.characterProgress?.[characterId] || createCharacterProgress(characterId, game.roster?.includes(characterId));
}

function renderCharacterPortrait(character, className = "") {
  return `<span class="character-portrait ${className}" aria-hidden="true">
    <img src="images/characters/${encodeURIComponent(character.name)}.png" alt="" loading="lazy" decoding="async">
    <span class="portrait-fallback" hidden>${character.icon}</span>
  </span>`;
}

function normalizeGameData(data) {
  const knownIds = new Set(CHARACTERS.map((character) => character.id));
  const sourceRoster = Array.isArray(data.roster) ? data.roster : [];
  const legacyRoster = [
    ...(Array.isArray(data.legacyRoster) ? data.legacyRoster : []),
    ...sourceRoster.filter((id) => !knownIds.has(id)).map((id) => ({ id, recruited: true, inParty: data.party?.includes(id) || false }))
  ];
  const roster = sourceRoster.filter((id) => knownIds.has(id));
  for (const character of CHARACTERS) {
    const oldProgress = data.characterProgress?.[character.id];
    if (oldProgress?.recruited && !roster.includes(character.id)) roster.push(character.id);
  }
  for (const starterId of INITIAL_PARTY) {
    if (!roster.includes(starterId)) roster.push(starterId);
  }
  const party = (Array.isArray(data.party) ? data.party : [])
    .filter((id) => knownIds.has(id) && roster.includes(id))
    .slice(0, BATTLE_RULES.maxPartySize);
  if (party.length === 0) party.push(INITIAL_PARTY[0]);
  const equipmentInventory = [];
  const usedItemIds = new Set();
  const addNormalizedEquipment = (area, slot, rarity, jobRequirement, id) => {
    if (!EQUIPMENT_SLOTS.includes(slot) || !EQUIPMENT_RARITIES[rarity]) return null;
    const item = createEquipmentItem(area, slot, rarity, jobRequirement, null, id);
    if (!item) return null;
    if (usedItemIds.has(item.id)) return null;
    usedItemIds.add(item.id);
    equipmentInventory.push(item);
    return item;
  };
  if (Array.isArray(data.equipmentInventory)) {
    for (const savedItem of data.equipmentInventory) {
      if (!savedItem || typeof savedItem !== "object" || typeof savedItem.id !== "string"
        || savedItem.id.length === 0 || !Number.isInteger(savedItem.area)
        || savedItem.area < 1 || savedItem.area > EQUIPMENT_AREA_DATA.length) continue;
      const slot = savedItem.slot;
      const rarity = savedItem.rarity;
      const job = savedItem.jobRequirement;
      if (slot === "weapon" && !Object.hasOwn(JOB_WEAPON_TYPES, job)) continue;
      if (slot !== "weapon" && job !== null && job !== undefined) continue;
      addNormalizedEquipment(savedItem.area, slot, rarity, slot === "weapon" ? job : null, savedItem.id);
    }
  }
  const characterProgress = {};
  const claimedSlots = new Set();
  const claimedItemIds = new Set();
  for (const character of CHARACTERS) {
    const previous = data.characterProgress?.[character.id];
    const recruited = roster.includes(character.id);
    const level = Number.isInteger(previous?.level) ? Math.max(1, Math.min(MAX_CHARACTER_LEVEL, previous.level)) : 1;
    const area = INITIAL_PARTY.includes(character.id)
      ? 1
      : recruitmentArea(RECRUITMENT_DATA[character.id]?.unlockStage || 1);
    const experience = Number.isInteger(previous?.experience) && previous.experience >= 0 && level < MAX_CHARACTER_LEVEL
      ? previous.experience
      : 0;
    const equipment = Object.fromEntries(EQUIPMENT_SLOTS.map((slot) => {
      const savedEquipment = previous?.equipment?.[slot];
      const savedItemId = typeof savedEquipment === "string"
        ? savedEquipment
        : savedEquipment && typeof savedEquipment === "object" ? savedEquipment.itemId : null;
      let item = savedItemId ? equipmentInventory.find((entry) => entry.id === savedItemId) : null;
      if (!item && data.equipmentSystemVersion !== 1 && savedItemId && savedEquipment && typeof savedEquipment === "object") {
        const oldSlot = savedEquipment.slot || slot;
        const oldRarity = Object.hasOwn(EQUIPMENT_RARITIES, savedEquipment.rarity) ? savedEquipment.rarity : "normal";
        const oldArea = Number.isInteger(savedEquipment.area) ? savedEquipment.area : area;
        const jobRequirement = oldSlot === "weapon" ? character.job : null;
        item = addNormalizedEquipment(oldArea, oldSlot, oldRarity, jobRequirement, savedItemId);
        if (item && savedEquipment.bonuses && typeof savedEquipment.bonuses === "object") {
          item.bonuses = Object.fromEntries(STAT_KEYS
            .filter((key) => Number.isFinite(savedEquipment.bonuses[key]))
            .map((key) => [key, savedEquipment.bonuses[key]]));
        }
      }
      if (!item || item.slot !== slot || claimedSlots.has(`${character.id}:${slot}`) || claimedItemIds.has(item.id)) return [slot, null];
      item.equippedBy = character.id;
      claimedSlots.add(`${character.id}:${slot}`);
      claimedItemIds.add(item.id);
      return [slot, item.id];
    }));
    const learnedSkills = Object.entries(CHARACTER_SKILLS[character.id] || {})
      .filter(([, skill]) => skill && level >= skill.level)
      .map(([skillId]) => skillId);
    characterProgress[character.id] = { recruited, level, experience, learnedSkills, equipment };
  }
  if (data.equipmentSystemVersion !== 1) {
    for (const characterId of roster) {
      const progress = characterProgress[characterId];
      addInitialEquipment(characterId, INITIAL_PARTY.includes(characterId)
        ? 1
        : recruitmentArea(RECRUITMENT_DATA[characterId]?.unlockStage || 1), progress, equipmentInventory);
    }
  }
  return {
    ...data,
    roster,
    party,
    inventory: Object.fromEntries(Object.keys(ITEM_DATA).map((itemId) => {
      const count = data.inventory?.[itemId];
      return [itemId, Number.isInteger(count) && count >= 0 && count <= 99
        ? count
        : INITIAL_INVENTORY[itemId]];
    })),
    characterProgress,
    equipmentSystemVersion: 1,
    equipmentInventory,
    legacyRoster,
    bossRewardsClaimed: Array.isArray(data.bossRewardsClaimed)
      ? [...new Set(data.bossRewardsClaimed.filter((stage) => Number.isInteger(stage) && Object.hasOwn(BOSS_FIRST_CLEAR_GOLD, stage)))]
      : []
  };
}

function addInventoryItem(itemId, amount) {
  if (!Object.hasOwn(ITEM_DATA, itemId) || !Number.isInteger(amount) || amount <= 0) return false;
  const currentCount = gameData.inventory[itemId] || 0;
  gameData.inventory[itemId] = Math.min(99, currentCount + amount);
  return gameData.inventory[itemId] > currentCount;
}

// セーブデータの形と値を確認してから、ゲーム内で使用します。
function isValidSave(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const data = value.game;
  if (!SUPPORTED_SAVE_VERSIONS.includes(value.version) || typeof value.savedAt !== "string" || !Number.isFinite(Date.parse(value.savedAt))) return false;
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  if (!Number.isInteger(data.clearedStages) || data.clearedStages < 0 || data.clearedStages > 25) return false;
  if (!Number.isInteger(data.selectedStage) || data.selectedStage < 1 || data.selectedStage > Math.min(data.clearedStages + 1, 25)) return false;
  if (!Number.isInteger(data.gold) || data.gold < 0) return false;
  if (!Array.isArray(data.roster) || !Array.isArray(data.party)) return false;
  const knownIds = new Set(CHARACTERS.map((character) => character.id));
  const allowedIds = value.version < SAVE_VERSION ? new Set([...knownIds, ...LEGACY_CHARACTER_IDS]) : knownIds;
  const rosterIsValid = data.roster.every((id) => allowedIds.has(id)) && new Set(data.roster).size === data.roster.length;
  const partyIsValid = data.party.length <= 4
    && data.party.every((id) => data.roster.includes(id))
    && new Set(data.party).size === data.party.length;
  const inventoryIsValid = data.inventory === undefined
    || (data.inventory && typeof data.inventory === "object" && !Array.isArray(data.inventory)
      && Object.entries(data.inventory).every(([id, count]) =>
        Object.hasOwn(ITEM_DATA, id) && Number.isInteger(count) && count >= 0 && count <= 99));
  const progressIsValid = data.characterProgress === undefined
    || (data.characterProgress && typeof data.characterProgress === "object" && !Array.isArray(data.characterProgress)
      && Object.entries(data.characterProgress).every(([id, progress]) =>
        knownIds.has(id) && progress && typeof progress === "object"
        && typeof progress.recruited === "boolean"
        && Number.isInteger(progress.level) && progress.level >= 1 && progress.level <= MAX_CHARACTER_LEVEL
        && Number.isInteger(progress.experience) && progress.experience >= 0));
  const bossRewardsAreValid = data.bossRewardsClaimed === undefined
    || (Array.isArray(data.bossRewardsClaimed)
      && data.bossRewardsClaimed.every((stage) => Number.isInteger(stage) && Object.hasOwn(BOSS_FIRST_CLEAR_GOLD, stage)));
  const equipmentIsValid = (data.equipmentSystemVersion === undefined || data.equipmentSystemVersion === 1)
    && (data.equipmentInventory === undefined
      || (Array.isArray(data.equipmentInventory)
        && data.equipmentInventory.every((item) => item && typeof item === "object"
          && typeof item.id === "string" && item.id.length > 0
          && EQUIPMENT_SLOTS.includes(item.slot)
          && Number.isInteger(item.area) && item.area >= 1 && item.area <= EQUIPMENT_AREA_DATA.length
          && Object.hasOwn(EQUIPMENT_RARITIES, item.rarity)
          && Number.isFinite(item.purchasePrice)
          && (item.equippedBy === null || item.equippedBy === undefined || knownIds.has(item.equippedBy)))))
    && (data.equipmentSystemVersion !== 1 || Array.isArray(data.equipmentInventory));
  return rosterIsValid && partyIsValid && inventoryIsValid && progressIsValid && bossRewardsAreValid && equipmentIsValid;
}

function readSave(key) {
  const raw = localStorage.getItem(key);
  if (raw === null) return { status: "empty", save: null };

  try {
    const parsed = JSON.parse(raw);
    return isValidSave(parsed)
      ? { status: "valid", save: { ...parsed, version: SAVE_VERSION, game: normalizeGameData(parsed.game) } }
      : { status: "invalid", save: null };
  } catch (error) {
    return { status: "invalid", save: null };
  }
}

function saveGame(key) {
  if (debugMode) return true;
  try {
    const record = {
      version: SAVE_VERSION,
      savedAt: new Date().toISOString(),
      game: JSON.parse(JSON.stringify(gameData))
    };
    localStorage.setItem(key, JSON.stringify(record));
    return true;
  } catch (error) {
    showNotice(`セーブに失敗しました。ブラウザの保存領域を確認してください。(${error.message})`);
    return false;
  }
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (raw === null) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.bgm === "boolean" && typeof parsed.sound === "boolean") {
      settings = { bgm: parsed.bgm, sound: parsed.sound };
    }
  } catch (error) {
    showNotice(`設定を読み込めませんでした。初期設定で起動します。(${error.message})`);
  }
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    return true;
  } catch (error) {
    showNotice(`設定を保存できませんでした。(${error.message})`);
    return false;
  }
}

function showNotice(message) {
  window.clearTimeout(noticeTimer);
  notice.textContent = message;
  notice.hidden = false;
  noticeTimer = window.setTimeout(() => {
    notice.hidden = true;
  }, 6000);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
  }).format(new Date(value));
}

function updateHeader() {
  headerStatus.classList.toggle("is-debug-mode", debugMode);
  if (debugMode) {
    headerStatus.textContent = "DEBUG MODE";
    return;
  }
  if (!gameData) {
    headerStatus.textContent = "";
    return;
  }
  headerStatus.textContent = `所持金 ${gameData.gold} G　｜　解放ステージ ${Math.min(gameData.clearedStages + 1, 25)} / 25`;
}

function setScreen(screen) {
  currentScreen = screen;
  render();
  app.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pageHeading(title, description, backAction, backLabel = "街へ戻る") {
  return `<div class="page-heading">
    <div><h1>${title}</h1><p>${description}</p></div>
    <button class="back-button" type="button" data-action="${backAction}">← ${backLabel}</button>
  </div>`;
}

function renderTitle() {
  const loadStatus = getAvailableSaveCount() > 0 ? "セーブデータから冒険を再開" : "セーブデータがありません";
  return `<section class="title-screen panel">
    <div class="moon" aria-hidden="true">☾</div>
    <p class="eyebrow">STARDUST FANTASY RPG</p>
    <h1>星明かりの冒険</h1>
    <p class="title-copy">古代の魔物「星喰らい」の封印が弱まり、世界から星の輝きが消え始めた。<br>剣士ルシオンと弓使いシリウスとともに、星を取り戻す旅へ。</p>
    <div class="title-menu">
      <button class="primary-button" type="button" data-action="new-game">ニューゲーム</button>
      <button class="menu-button" type="button" data-action="open-saves">ロードゲーム</button>
      <button class="menu-button" type="button" data-action="settings" data-return="title">設定</button>
      <button class="menu-button" type="button" data-action="about">ゲームについて</button>
    </div>
    <p class="help-text">${loadStatus}</p>
    <button class="catalog-entry-button" type="button" data-action="catalog-open">
      <span>開発者用図鑑</span>
      <small>※ネタバレが含まれます。</small>
    </button>
  </section>`;
}

function getCatalogEntries(type) {
  if (type === "characters") {
    return CHARACTERS.map((character) => {
      const job = JOB_DATA[character.job];
      const recruitment = RECRUITMENT_DATA[character.id];
      return {
        id: character.id,
        name: character.name,
        icon: character.icon,
        imagePath: `images/characters/${character.name}.png`,
        subtitle: character.job,
        stats: [
          ["最大HP", job.base[0]], ["最大MP", job.base[1]],
          ["物理攻撃力", job.base[2]], ["物理防御力", job.base[3]],
          ["魔法攻撃力", job.base[4]], ["魔法防御力", job.base[5]],
          ["素早さ", job.base[6]]
        ],
        condition: recruitment
          ? `ステージ${recruitment.unlockStage}クリア後、${recruitment.cost} Gで雇用`
          : "初期メンバー"
      };
    });
  }

  const bossIds = new Set(Object.keys(BOSS_THEMES).map((stage) => {
    const area = Math.floor((Number(stage) - 1) / 5) + 1;
    return AREA_ENEMY_IDS[area][2];
  }));
  return Object.entries(ENEMY_DATA).map(([id, enemy]) => {
    const areaNumber = Number(Object.keys(AREA_ENEMY_IDS).find((area) => AREA_ENEMY_IDS[area].includes(id)));
    const isBoss = bossIds.has(id);
    return {
      id,
      name: enemy.name,
      icon: enemy.icon,
      imagePath: `images/enemies/${enemy.name}.png`,
      subtitle: `${AREAS[areaNumber - 1]?.name || "出現エリア不明"} ・ ${isBoss ? "ボス" : "通常敵"}`,
      stats: [
        ["HP", enemy.maxHp], ["物理攻撃力", enemy.physicalAttack],
        ["魔法攻撃力", enemy.magicAttack], ["物理防御力", enemy.physicalDefense],
        ["魔法防御力", enemy.magicDefense], ["経験値", enemy.experience], ["獲得G", enemy.gold]
      ],
      condition: isBoss ? "ボスモンスター" : "通常モンスター",
      isBoss
    };
  });
}

function catalogImageKey(type, id) {
  return `${type}:${id}`;
}

function updateCatalogImageReport() {
  for (const [type, count] of [["characters", CHARACTERS.length], ["monsters", Object.keys(ENEMY_DATA).length]]) {
    const loaded = Object.values(catalogImageStatus[type]).filter((status) => status === "loaded").length;
    const countElement = document.getElementById(`catalog-${type}-image-count`);
    if (countElement) countElement.textContent = `${loaded} / ${count}`;
  }
  const failures = [
    ...getCatalogEntries("characters").map((entry) => ({ ...entry, type: "仲間" })),
    ...getCatalogEntries("monsters").map((entry) => ({ ...entry, type: "モンスター" }))
  ].filter((entry) => catalogImageStatus[entry.type === "仲間" ? "characters" : "monsters"][entry.id] === "missing");
  const failureList = document.getElementById("catalog-image-failures");
  if (failureList) {
    failureList.textContent = failures.length
      ? `読み込み失敗: ${failures.map((entry) => `${entry.type}「${entry.name}」 (${entry.imagePath})`).join("、")}`
      : "画像の読み込み失敗はありません。";
  }
  for (const image of app.querySelectorAll("img[data-catalog-type][data-catalog-id]")) {
    const status = catalogImageStatus[image.dataset.catalogType]?.[image.dataset.catalogId];
    const fallback = image.nextElementSibling;
    if (status === "missing") {
      image.hidden = true;
      if (fallback instanceof HTMLElement) fallback.hidden = false;
    } else if (status === "loaded") {
      image.hidden = false;
      if (fallback instanceof HTMLElement) fallback.hidden = true;
    }
  }
}

function startCatalogImageChecks() {
  if (catalogImagesStarted) return;
  catalogImagesStarted = true;
  for (const [type, entries] of [
    ["characters", getCatalogEntries("characters")],
    ["monsters", getCatalogEntries("monsters")]
  ]) {
    for (const entry of entries) {
      catalogImageStatus[type][entry.id] = "loading";
      const image = new Image();
      image.onload = () => {
        catalogImageStatus[type][entry.id] = "loaded";
        updateCatalogImageReport();
      };
      image.onerror = () => {
        catalogImageStatus[type][entry.id] = "missing";
        updateCatalogImageReport();
      };
      image.src = entry.imagePath;
    }
  }
}

function catalogImage(entry, type, className = "") {
  const status = catalogImageStatus[type][entry.id];
  const loaded = status === "loaded";
  const failed = status === "missing";
  return `<span class="encyclopedia-portrait ${className}">
    <img src="${entry.imagePath}" alt="${entry.name}の立ち絵" data-catalog-type="${type}" data-catalog-id="${entry.id}" ${loaded || !failed ? "" : "hidden"}>
    <span class="encyclopedia-image-fallback" ${loaded || !failed ? "hidden" : ""}>画像未読込</span>
  </span>`;
}

function renderCatalogTabs() {
  return `<div class="tabs encyclopedia-tabs" role="tablist" aria-label="図鑑の種類">
    <button class="tab-button" type="button" role="tab" aria-selected="${catalogTab === "characters"}" data-action="catalog-tab" data-tab="characters">仲間図鑑（16人）</button>
    <button class="tab-button" type="button" role="tab" aria-selected="${catalogTab === "monsters"}" data-action="catalog-tab" data-tab="monsters">モンスター図鑑（15体）</button>
    <button class="tab-button" type="button" role="tab" aria-selected="${catalogTab === "debug"}" data-action="catalog-tab" data-tab="debug">デバッグ</button>
  </div>`;
}

function renderDebugPanel() {
  const selectedCharacter = CHARACTERS.find((character) => character.id === debugCharacterId) || CHARACTERS[0];
  const selectedProgress = getCharacterProgress(gameData, selectedCharacter.id);
  const selectedStats = calculateCharacterStats(selectedCharacter.id, selectedProgress.level, selectedProgress.equipment);
  const selectedEntry = getCatalogEntries("characters").find((entry) => entry.id === selectedCharacter.id);
  const levelOptions = Array.from({ length: MAX_CHARACTER_LEVEL }, (_, index) => index + 1)
    .map((level) => `<option value="${level}" ${level === selectedProgress.level ? "selected" : ""}>Lv ${level}</option>`).join("");
  const stageOptions = Array.from({ length: 25 }, (_, index) => index + 1)
    .map((stage) => `<option value="${stage}" ${stage === debugStage ? "selected" : ""}>ステージ ${String(stage).padStart(2, "0")} ・ ${getAreaForStage(stage).name}</option>`).join("");
  const characterCards = CHARACTERS.map((character) => {
    const progress = getCharacterProgress(gameData, character.id);
    const catalogEntry = getCatalogEntries("characters").find((entry) => entry.id === character.id);
    const inParty = debugParty.includes(character.id);
    return `<article class="debug-character-card${character.id === selectedCharacter.id ? " is-selected" : ""}${inParty ? " is-in-party" : ""}">
      <button class="debug-character-select" type="button" data-action="debug-select-character" data-character="${character.id}" aria-pressed="${character.id === selectedCharacter.id}">
        ${catalogImage(catalogEntry, "characters")}
        <span><strong>${character.name}</strong><small>${character.job}・Lv${progress.level}</small></span>
      </button>
      <button class="small-button debug-party-toggle" type="button" data-action="debug-toggle-party" data-character="${character.id}">${inParty ? "テスト編成から外す" : "テスト編成に加える"}</button>
    </article>`;
  }).join("");
  return `<section class="debug-console">
    <div class="debug-console-heading">
      <div><span class="debug-mode-label">DEBUG MODE</span><h2>開発者用テスト環境</h2>
        <p>一時データで戦闘を確認します。通常のセーブデータ・進行状況には反映されません。</p></div>
      <button class="back-button" type="button" data-action="debug-exit">デバッグ終了・通常プレイへ戻る</button>
    </div>
    <div class="debug-control-grid">
      <section class="sub-panel debug-selected-character">
        <h3>選択中のキャラクター</h3>
        <div class="debug-selected-summary">${catalogImage(selectedEntry, "characters", "debug-selected-portrait")}
          <div><strong>${selectedCharacter.name}</strong><span>${selectedCharacter.job}</span>
            <small>HP ${debugCharacterSettings[selectedCharacter.id]?.hp ?? selectedStats?.maxHp ?? 0} / ${selectedStats?.maxHp ?? 0} ・ MP ${debugCharacterSettings[selectedCharacter.id]?.mp ?? selectedStats?.maxMp ?? 0} / ${selectedStats?.maxMp ?? 0}</small></div>
        </div>
        <label class="debug-field">テストレベル
          <select data-debug-level="${selectedCharacter.id}">${levelOptions}</select>
        </label>
        <div class="debug-field"><span>必殺技ゲージ</span>
          <div class="debug-gauge-options">
            ${[0, 50, 100].map((gauge) => `<button class="small-button${debugCharacterSettings[selectedCharacter.id]?.gauge === gauge ? " is-active" : ""}" type="button" data-action="debug-gauge" data-character="${selectedCharacter.id}" data-gauge="${gauge}" ${selectedProgress.level < 30 && gauge > 0 ? "disabled" : ""}>${gauge}%</button>`).join("")}
          </div>
          ${selectedProgress.level < 30 ? '<small>必殺技はLv30で解放されます。</small>' : ""}
        </div>
        <button class="small-button debug-heal-button" type="button" data-action="debug-heal" data-character="${selectedCharacter.id}">HP・MPを全回復</button>
        <div class="debug-party-status"><strong>テストパーティー ${debugParty.length} / ${BATTLE_RULES.maxPartySize}</strong>
          <span>${debugParty.length ? debugParty.map((id) => CHARACTERS.find((character) => character.id === id)?.name || id).join("・") : "編成なし"}</span></div>
      </section>
      <section class="sub-panel debug-stage-controls">
        <h3>ステージテスト</h3>
        <label class="debug-field">テストするステージ
          <select data-debug-stage>${stageOptions}</select>
        </label>
        <p class="help-text">未解放ステージも選べます。通常の解放状況は変更されません。</p>
        <button class="primary-button debug-start-button" type="button" data-action="debug-start-battle" ${debugParty.length === 0 ? "disabled" : ""}>ステージ${debugStage}のテスト戦闘を開始</button>
      </section>
    </div>
    <div class="debug-roster-heading"><h3>仲間・テスト編成</h3><span>クリックで調整対象を選択し、ボタンで出撃メンバーを変更</span></div>
    <div class="debug-character-grid">${characterCards}</div>
  </section>`;
}

function renderCatalogStats(entries) {
  return `<dl class="encyclopedia-stats">${entries.map(([label, value]) =>
    `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>`;
}

function renderCatalog() {
  startCatalogImageChecks();
  const type = catalogTab;
  if (type === "debug" && !debugMode) enterDebugMode("characters");
  if (type === "debug") {
    return `<section class="panel page-panel encyclopedia-screen">
      ${pageHeading("開発者用図鑑", "仲間とモンスターの設定・画像を確認できます。", "debug-exit", "デバッグ終了")}
      ${renderCatalogTabs()}
      ${renderDebugPanel()}
    </section>`;
  }
  const entries = getCatalogEntries(type);
  const title = type === "characters" ? "仲間図鑑" : "モンスター図鑑";
  const selected = catalogSelection?.type === type
    ? entries.find((entry) => entry.id === catalogSelection.id)
    : null;
  const detail = selected ? `<article class="encyclopedia-detail">
      <div class="encyclopedia-detail-image encyclopedia-background-${catalogBackground}">
        ${catalogImage(selected, type, "is-large")}
      </div>
      <div class="encyclopedia-detail-copy">
        <p class="eyebrow">${type === "characters" ? "ADVENTURER" : selected.isBoss ? "BOSS MONSTER" : "MONSTER"}</p>
        <h2>${selected.name}</h2>
        <p class="encyclopedia-subtitle">${selected.subtitle}</p>
        ${type === "characters" ? `<p class="encyclopedia-condition"><strong>加入条件</strong>${selected.condition}</p>` : `<p class="encyclopedia-condition"><strong>区分</strong>${selected.condition}</p>`}
        ${renderCatalogStats(selected.stats)}
      </div>
    </article>
    <div class="encyclopedia-detail-controls">
      <span>透過背景</span>
      <button class="small-button" type="button" data-action="catalog-background" data-background="dark" aria-pressed="${catalogBackground === "dark"}">暗い背景</button>
      <button class="small-button" type="button" data-action="catalog-background" data-background="light" aria-pressed="${catalogBackground === "light"}">明るい背景</button>
      <button class="small-button" type="button" data-action="catalog-background" data-background="checker" aria-pressed="${catalogBackground === "checker"}">市松模様</button>
      <button class="back-button" type="button" data-action="catalog-list-back">← 一覧へ戻る</button>
    </div>` : `<div class="encyclopedia-grid">
      ${entries.map((entry) => `<button class="encyclopedia-card" type="button" data-action="catalog-select" data-type="${type}" data-id="${entry.id}">
        ${catalogImage(entry, type)}
        <span class="encyclopedia-card-title">${entry.name}</span>
        <span class="encyclopedia-card-subtitle">${entry.subtitle}</span>
      </button>`).join("")}
    </div>`;
  return `<section class="panel page-panel encyclopedia-screen">
    ${pageHeading("開発者用図鑑", "仲間とモンスターの設定・画像を確認できます。ゲームデータは変更されません。", debugMode ? "debug-exit" : "title", debugMode ? "デバッグ終了" : "タイトルへ")}
    ${renderCatalogTabs()}
    <div class="encyclopedia-image-report" aria-live="polite">
      <strong>画像チェック</strong>
      <span>仲間: <b id="catalog-characters-image-count">0 / 16</b></span>
      <span>モンスター: <b id="catalog-monsters-image-count">0 / 15</b></span>
      <p id="catalog-image-failures">画像を確認しています。</p>
    </div>
    <h2 class="encyclopedia-section-title">${title}${selected ? ` ・ ${selected.name}` : ""}</h2>
    ${detail}
  </section>`;
}

function renderTown() {
  const menus = [
    ["✧", "冒険の門", "5つのエリア、25のステージへ", "map"],
    ["⚜", "ギルド", "仲間の編成・一覧・雇用", "guild"],
    ["⚔", "武器屋", "武器の購入と売却", "weapon-shop"],
    ["🛡", "防具屋", "防具の購入と売却", "armor-shop"],
    ["⚗", "道具屋", "冒険に役立つ道具", "item-shop"],
    ["⌂", "宿屋", "旅の疲れを癒やす場所", "inn"],
    ["📖", "記録の書", "冒険のセーブ・ロード", "saves"],
    ["☼", "設定", "BGM・効果音", "settings"]
  ];
  return `<section class="panel page-panel scene-screen scene-town">
    ${pageHeading("冒険者の街", "旅立つ前に、準備を整えましょう。", "title", "タイトルへ")}
    <div class="town-scene-content">
      <p class="town-intro">星明かりの街へようこそ、旅人さん。</p>
      <div class="menu-grid">${menus.map(([icon, title, description, action]) => `
        <button class="menu-card" type="button" data-action="${action}">
          <span class="card-icon" aria-hidden="true">${icon}</span>
          <strong>${title}</strong><small>${description}</small>
        </button>`).join("")}
      </div>
    </div>
  </section>`;
}

function sceneWelcome(imagePath, message) {
  return `<div class="scene-welcome">
    <p class="scene-dialogue">${message}</p>
    <figure class="scene-npc"><img src="${imagePath}" alt="" onerror="this.hidden=true"></figure>
  </div>`;
}

function renderInn() {
  const price = gameData.party.length * INN_PRICE_PER_PARTY_MEMBER;
  const canStay = gameData.party.length > 0 && gameData.gold >= price;
  return `<section class="panel page-panel scene-screen scene-inn">
    ${pageHeading("星見の宿屋", "旅の疲れを癒やす、街の宿です。", "town")}
    ${sceneWelcome("images/npcs/inn_shopkeeper.png", "おかえりなさい！ゆっくり休んでいってくださいね。")}
    <div class="sub-panel inn-info">
      <h2>星見の宿屋</h2>
      <p>宿泊料金：1人 ${INN_PRICE_PER_PARTY_MEMBER} G　／　現在のパーティー ${gameData.party.length} 人</p>
      <p>合計 <strong>${price} G</strong>　・　所持金 ${gameData.gold} G</p>
      <p class="help-text">宿泊すると、パーティー全員のHP・MPが全回復し、状態異常も解除されます。</p>
      <button class="primary-button" type="button" data-action="inn-stay" ${canStay ? "" : "disabled"}>宿泊する（${price} G）</button>
      ${canStay ? "" : `<p class="help-text">${gameData.party.length ? "所持金が足りないため宿泊できません。" : "パーティーを編成してからお越しください。"}</p>`}
    </div>
  </section>`;
}

function stageNumber(areaIndex, stageIndex) {
  return areaIndex * 5 + stageIndex + 1;
}

function getAreaForStage(stage) {
  return AREAS[Math.floor((stage - 1) / 5)];
}

function renderMap() {
  const unlockedThrough = gameData.clearedStages + 1;
  const areas = AREAS.map((area, areaIndex) => {
    const stages = Array.from({ length: 5 }, (_, stageIndex) => {
      const number = stageNumber(areaIndex, stageIndex);
      const unlocked = number <= unlockedThrough;
      const cleared = number <= gameData.clearedStages;
      return `<button class="stage-button${cleared ? " is-cleared" : ""}" type="button"
        data-action="stage-details" data-stage="${number}" ${unlocked ? "" : "disabled"}
        aria-label="ステージ ${number}${cleared ? "（クリア済み）" : unlocked ? "（選択可能）" : "（未解放）"}">
        ${cleared ? "★ " : unlocked ? "✦ " : "🔒 "}${String(stageIndex + 1).padStart(2, "0")}
      </button>`;
    }).join("");
    return `<article class="area-card">
      <h3>${String(areaIndex + 1).padStart(2, "0")}　${area.name}</h3>
      <p>${area.description}</p>
      <div class="stage-grid">${stages}</div>
    </article>`;
  }).join("");
  return `<section class="panel page-panel">
    ${pageHeading("冒険の門", "解放されたステージを選んでください。", "town")}
    <div class="area-grid">${areas}</div>
    <p class="map-legend"><span>✦ 選択可能</span><span>★ クリア済み</span><span>🔒 未解放</span></p>
  </section>`;
}

function renderStageDetails() {
  const stage = gameData.selectedStage;
  const areaIndex = Math.floor((stage - 1) / 5);
  const area = getAreaForStage(stage);
  const stageInArea = ((stage - 1) % 5) + 1;
  const replay = stage <= gameData.clearedStages;
  return `<section class="panel page-panel detail-panel">
    ${pageHeading(`ステージ ${String(stage).padStart(2, "0")}`, area.name, "map", "マップへ戻る")}
    <div class="detail-symbol" aria-hidden="true">✦</div>
    <p>${area.description}</p>
    <div class="detail-info">
      <div class="info-box"><span>エリア</span><strong>${area.name}</strong></div>
      <div class="info-box"><span>ステージ</span><strong>${stageInArea} / 5（全25ステージ）</strong></div>
      <div class="info-box"><span>出撃パーティー</span><strong>${gameData.party.length} / 4 人</strong></div>
      <div class="info-box"><span>進行状況</span><strong>${stage <= gameData.clearedStages ? "クリア済み" : "挑戦可能"}</strong></div>
    </div>
    <p class="help-text">${replay ? "クリア済みステージです。何度でも再挑戦できます。" : "このステージに出発できます。出撃メンバーはギルドで編成できます。"}</p>
    <div class="detail-actions">
      <button class="primary-button" type="button" data-action="battle-start">ステージ${stage}に出発</button>
      <button class="menu-button" type="button" data-action="guild">パーティーを確認</button>
    </div>
  </section>`;
}

function createBattlePartyMember(characterId, slot) {
  const character = CHARACTERS.find((entry) => entry.id === characterId);
  const progress = getCharacterProgress(gameData, characterId);
  const stats = calculateCharacterStats(characterId, progress.level, progress.equipment);
  if (!character || !stats) return null;
  return {
    ...character,
    ...stats,
    slot,
    experience: progress.experience,
    learnedSkills: progress.learnedSkills,
    equipment: progress.equipment,
    hp: stats.maxHp,
    mp: stats.maxMp,
    statusEffects: [],
    gauge: 0,
    accuracy: BATTLE_RULES.basicHitChance,
    evasion: 0,
    criticalChance: stats.criticalChance
  };
}

function getStageFormation(stage, wave) {
  const area = Math.floor((stage - 1) / 5) + 1;
  const stageInArea = ((stage - 1) % 5) + 1;
  const [enemyA, enemyB, enemyC] = AREA_ENEMY_IDS[area];
  const formations = {
    1: [[enemyA], [enemyA, enemyA], [enemyA, enemyA, enemyA]],
    2: [[enemyA], [enemyA, enemyB], [enemyA, enemyA, enemyB]],
    3: [[enemyB], [enemyB, enemyB], [enemyB, enemyB, enemyC]],
    4: [[enemyC], [enemyB, enemyC], [enemyC, enemyC, enemyC]],
    5: [[enemyB], [enemyB, enemyC], [`boss:${enemyC}`]]
  };
  return formations[stageInArea][wave - 1];
}

function createBossData(enemyId, stage) {
  const normalEnemyIds = [...getStageFormation(stage, 1), ...getStageFormation(stage, 2)];
  const normalEnemies = normalEnemyIds.map((normalEnemyId) => ENEMY_DATA[normalEnemyId]);
  const average = (key) => normalEnemies.reduce((sum, enemy) => sum + enemy[key], 0) / normalEnemies.length;
  const bossTemplate = ENEMY_DATA[enemyId];
  return {
    ...bossTemplate,
    isBoss: true,
    maxHp: Math.round(average("maxHp") * 5),
    physicalAttack: Math.round(average("physicalAttack") * 1.5),
    magicAttack: Math.round(average("magicAttack") * 1.5),
    physicalDefense: Math.round(average("physicalDefense") * 1.3),
    magicDefense: Math.round(average("magicDefense") * 1.3),
    bossSpecials: bossTemplate.bossSpecials || [],
    bossBuffed: false,
    bossTheme: BOSS_THEMES[stage]
  };
}

function createBattleEnemies(wave, stage = 1) {
  return getStageFormation(stage, wave).map((formationId, index) => {
    const isBoss = formationId.startsWith("boss:");
    const enemyId = isBoss ? formationId.slice(5) : formationId;
    const baseEnemy = ENEMY_DATA[enemyId];
    const enemy = isBoss ? createBossData(enemyId, stage) : baseEnemy;
    const attackMultiplier = isBoss ? 1 : BATTLE_RULES.normalEnemyAttackMultiplier;
    const combatData = { ...enemy };
    for (const stat of ["physicalAttack", "magicAttack"]) {
      if (Number.isFinite(baseEnemy[stat]) && !isBoss) {
        combatData[stat] = Math.max(1, baseEnemy[stat] * attackMultiplier);
      }
    }
    return {
      ...combatData,
      id: `wave-${wave}-enemy-${index + 1}`,
      hp: combatData.maxHp,
      statusEffects: [],
      experience: getEnemyReward(enemyId, stage, "experience", isBoss),
      gold: getEnemyReward(enemyId, stage, "gold", isBoss),
      accuracy: BATTLE_RULES.basicHitChance,
      evasion: 0,
      criticalChance: BATTLE_RULES.criticalChance
    };
  });
}

function getBattleBackgroundClass(stage) {
  const area = Math.max(1, Math.min(5, Math.ceil(stage / 5)));
  return ["grassland", "forest", "crystal", "sky", "temple"][area - 1];
}

function startBattle() {
  if (!gameData || (!debugMode && gameData.selectedStage > gameData.clearedStages + 1) || gameData.selectedStage < 1) {
    showNotice("このステージはまだ解放されていません。");
    return;
  }
  const party = gameData.party
    .slice(0, BATTLE_RULES.maxPartySize)
    .map((characterId, index) => createBattlePartyMember(characterId, index));
  if (party.length === 0 || party.some((member) => member === null)) {
    showNotice("パーティーの戦闘データが見つかりません。ギルドの編成を確認してください。");
    return;
  }
  window.clearTimeout(battleTimer);
  window.clearTimeout(bossVisualTimer);
  battleState = {
    stage: gameData.selectedStage,
    wave: 1,
    party,
    enemies: createBattleEnemies(1, gameData.selectedStage),
    selectedCharacterId: party[0].id,
    actions: {},
    commandSelections: Object.fromEntries(party.map((member) => [member.id, "attack"])),
    targetSelections: {},
    phase: "planning",
    result: null,
    message: "味方全員の行動を予約してください。",
    effect: null,
    statusVfx: [],
    actionPresentation: null,
    actionQueue: [],
    actionIndex: 0,
    experienceReward: 0,
    goldReward: 0,
    pendingEquipmentDrops: [],
    acquiredEquipmentDrops: [],
    bossPresentation: null,
    bossDefeatStarted: false,
    levelUps: []
  };
  setScreen("battle");
}

function isAlive(combatant) {
  return combatant.hp > 0;
}

function getAliveParty() {
  return battleState.party.filter(isAlive);
}

function getNextUnreservedPartyMember(characterId = null) {
  const party = battleState.party;
  const currentIndex = party.findIndex((member) => member.id === characterId);
  const startIndex = currentIndex < 0 ? 0 : currentIndex + 1;
  for (let offset = 0; offset < party.length; offset += 1) {
    const index = (startIndex + offset) % party.length;
    const member = party[index];
    if (isAlive(member) && !battleState.actions[member.id]) return member;
  }
  return null;
}

function getAliveEnemies() {
  return battleState.enemies.filter(isAlive);
}

function renderHealthBar(current, maximum, type, label) {
  const ratio = Math.max(0, Math.min(100, (current / maximum) * 100));
  return `<div class="battle-stat-line">
    <span>${label}</span>
    <div class="battle-bar-track" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${maximum}" aria-valuenow="${current}">
      <div class="battle-bar ${type}" style="width:${ratio}%"></div>
    </div>
    <span class="battle-stat-value">${current} / ${maximum}</span>
  </div>`;
}

function getLearnedCharacterSkills(member) {
  return Object.entries(CHARACTER_SKILLS[member.id] || {})
    .filter(([, skill]) => skill && member.level >= skill.level);
}

function getCharacterSkill(member, skillId) {
  const skill = CHARACTER_SKILLS[member.id]?.[skillId] || null;
  return skill && member.level >= skill.level ? skill : null;
}

function getAvailableSkillId(member, selectedSkillId = null) {
  const available = getLearnedCharacterSkills(member).filter(([skillId]) => skillId !== "ultimate");
  return available.some(([skillId]) => skillId === selectedSkillId)
    ? selectedSkillId
    : available[0]?.[0] || "";
}

function getStatusLabel(effect) {
  const labels = { poison: "毒", paralysis: "麻痺", confusion: "混乱" };
  if (effect.type === "buff" || effect.type === "debuff") {
    const stats = {
      physicalAttack: "物攻",
      physicalDefense: "物防",
      magicAttack: "魔攻",
      magicDefense: "魔防",
      speed: "素早さ"
    };
    return `${stats[effect.stat] || effect.stat}${effect.type === "buff" ? "↑" : "↓"}`;
  }
  return labels[effect.type] || effect.name || effect.type;
}

function describeCharacterSkill(skill) {
  if (!skill) return "効果情報なし";
  if (skill.type === "damage") {
    const damageLabel = skill.damageType === "magic" ? "魔法" : "物理";
    const targetLabel = skill.target === "allEnemies" ? "敵全体" : "敵単体";
    const hitsLabel = skill.hits ? `・${Math.round(skill.multiplier * 100)}%×${skill.hits}回` : `・${Math.round(skill.multiplier * 100)}%`;
    return `${targetLabel}${damageLabel}${hitsLabel}${skill.applyStatus ? `・${getStatusLabel(skill.applyStatus)}付与判定` : ""}`;
  }
  if (skill.type === "heal") {
    const targetLabel = skill.target === "allAllies" ? "味方全体" : "味方単体";
    return `${targetLabel}・最大HPの${Math.round(skill.healRatio * 100)}%回復`;
  }
  if (skill.type === "revive") {
    return `戦闘不能の味方単体を最大HPの${Math.round(skill.reviveRatio * 100)}%で蘇生`;
  }
  if (skill.type === "buff") {
    const targetLabel = skill.target === "allAllies" ? "味方全体" : skill.target === "self" ? "自分" : "味方単体";
    return `${targetLabel}・${getStatusLabel({ type: "buff", stat: skill.stat })}+${Math.round(skill.amount * 100)}%・${skill.duration}ターン`;
  }
  if (skill.type === "debuff") {
    const targetLabel = skill.target === "allEnemies" ? "敵全体" : "敵単体";
    return `${targetLabel}・${getStatusLabel({ type: "debuff", stat: skill.stat })}${Math.round(Math.abs(skill.amount) * 100)}%・${skill.duration}ターン`;
  }
  if (skill.type === "cleanse") return "味方単体の状態異常をすべて解除";
  if (skill.type === "status") return `敵単体に${getStatusLabel(skill.applyStatus)}付与判定`;
  return "効果情報なし";
}

function getEffectiveBattleStat(combatant, stat) {
  return (combatant.statusEffects || []).reduce((value, effect) => {
    if (effect.stat !== stat || !["buff", "debuff"].includes(effect.type)) return value;
    return value * (1 + effect.amount);
  }, combatant[stat] || 0);
}

function applyBattleBuff(target, stat, amount, duration = 3) {
  target.statusEffects ||= [];
  target.statusEffects = target.statusEffects.filter((effect) => effect.stat !== stat);
  target.statusEffects.push({
    type: amount >= 0 ? "buff" : "debuff",
    stat,
    amount,
    duration,
    name: getStatusLabel({ type: amount >= 0 ? "buff" : "debuff", stat })
  });
  showBattleStatusVfx(target, amount >= 0 ? "buff" : "debuff");
}

function applyBattleAilment(target, ailment) {
  const chance = target.isBoss ? 0.25 : 0.5;
  if (Math.random() >= chance) return false;
  target.statusEffects ||= [];
  target.statusEffects = target.statusEffects.filter((effect) => effect.type !== ailment.type);
  target.statusEffects.push({ ...ailment, duration: 3 });
  showBattleStatusVfx(target, ailment.type);
  return true;
}

function showBattleStatusVfx(target, type) {
  if (!battleState || !target) return;
  const state = battleState;
  const current = state.statusVfx || [];
  state.statusVfx = current.filter((entry) => entry.targetId !== target.id || entry.type !== type);
  state.statusVfx.push({ targetId: target.id, type });
}

function renderBattleStatusEffects(combatant) {
  const ailmentIcons = { poison: "☣", paralysis: "⚡", confusion: "✦" };
  return (combatant.statusEffects || []).map((effect) => {
    const label = getStatusLabel(effect);
    if (!label) return "";
    const isStatEffect = effect.type === "buff" || effect.type === "debuff";
    const className = isStatEffect ? effect.type : `ailment-${effect.type}`;
    const detail = isStatEffect
      ? `${label} ${Math.round(Math.abs(effect.amount) * 100)}%・残り${effect.duration}ターン`
      : `${label}・残り${effect.duration}ターン`;
    const icon = isStatEffect ? (effect.type === "buff" ? "↑" : "↓") : ailmentIcons[effect.type] || "✧";
    return `<span class="battle-status-tag ${className}" title="${detail}"><span class="battle-status-icon" aria-hidden="true">${icon}</span>${detail}</span>`;
  }).join("");
}

function applySkillAilment(target, ailment) {
  if (!isAlive(target)) return false;
  if (Array.isArray(ailment)) return ailment.map((effect) => applyBattleAilment(target, effect)).some(Boolean);
  return applyBattleAilment(target, ailment);
}

function reservedItemCount(itemId, exceptCharacterId = null) {
  return Object.entries(battleState.actions).reduce((count, [characterId, action]) => {
    return characterId !== exceptCharacterId && action.type === "item" && action.itemId === itemId
      ? count + 1
      : count;
  }, 0);
}

function isValidItemTarget(itemId, target) {
  if (!target) return false;
  switch (itemId) {
    case "potion":
      return isAlive(target) && target.hp < target.maxHp;
    case "ether":
      return isAlive(target) && target.mp < target.maxMp;
    case "panacea":
      return isAlive(target) && target.statusEffects?.some((effect) => ["poison", "paralysis", "confusion"].includes(effect.type));
    case "revive":
      return !isAlive(target);
    default:
      return false;
  }
}

function getBattleActionLabel(action, member) {
  if (!action) return "行動未予約";
  if (action.type === "attack") {
    const target = battleState.enemies.find((enemy) => enemy.id === action.targetId);
    return `攻撃 → ${target?.name || "敵"}`;
  }
  if (action.type === "item") {
    const item = ITEM_DATA[action.itemId];
    const target = battleState.party.find((member) => member.id === action.targetId);
    return `${item?.name || "アイテム"} → ${target?.name || "味方"}`;
  }
  if (action.type === "skill" || action.type === "ultimate") {
    const skill = getCharacterSkill(member, action.skillId);
    const enemyTarget = battleState.enemies.find((enemy) => enemy.id === action.targetId);
    const partyTarget = battleState.party.find((partyMember) => partyMember.id === action.targetId);
    const targetName = skill?.target === "allEnemies" ? "敵全体"
      : skill?.target === "allAllies" ? "味方全体"
        : skill?.target === "self" ? "自分"
          : enemyTarget?.name || partyTarget?.name || "対象";
    return `${skill?.name || "スキル"} → ${targetName}`;
  }
  return "行動未予約";
}

function renderPartyBattleCard(member) {
  const reserved = battleState.actions[member.id];
  const statusMarkup = renderBattleStatusEffects(member);
  return `<article class="battle-unit ally-unit battle-ally-card${!isAlive(member) ? " is-ko" : ""}${battleState.selectedCharacterId === member.id ? " is-selected" : ""}${battleState.effect?.attackerId === member.id ? " is-attacking" : ""}${battleState.effect?.targetId === member.id ? " is-hit" : ""}${getBattleVisualClasses(member)}"
      data-battle-select="${member.id}" role="button" tabindex="0" aria-pressed="${battleState.selectedCharacterId === member.id}" aria-label="${member.name}、${member.job}、レベル${member.level}${!isAlive(member) ? "、戦闘不能" : ""}">
    ${renderBattleStatusVfx(member)}
    <div class="battle-unit-top">
      ${renderCharacterPortrait(member, "battle-party-portrait")}
      <div class="battle-unit-heading"><h3>${member.name}</h3><p>${member.job}・Lv${member.level}・枠 ${member.slot + 1}</p></div>
      ${reserved ? `<span class="reservation-check" aria-label="行動予約済み">✓</span>` : ""}
      ${renderBattleEffectNumbers(member)}
    </div>
    ${renderHealthBar(member.hp, member.maxHp, "hp-fill", "HP")}
    ${renderHealthBar(member.mp, member.maxMp, "mp-fill", "MP")}
    ${member.level >= 30
      ? `<div class="battle-stat-line gauge-line">
          <span>必殺</span><div class="battle-bar-track" role="progressbar" aria-label="${member.name}の必殺技ゲージ" aria-valuemin="0" aria-valuemax="${BATTLE_RULES.gaugeMaximum}" aria-valuenow="${member.gauge}">
            <div class="battle-bar gauge-fill" style="width:${member.gauge}%"></div>
          </div><span class="battle-stat-value">${member.gauge}%</span>
        </div>`
      : `<div class="ultimate-locked-note">必殺技 Lv30で解放</div>`}
    <div class="battle-card-status">${statusMarkup || `<span class="battle-status-empty">${isAlive(member) ? "状態異常なし" : "戦闘不能"}</span>`}</div>
    <p class="reserved-action">${reserved ? getBattleActionLabel(reserved, member) : isAlive(member) ? "行動未予約" : "戦闘不能"}</p>
  </article>`;
}

function renderBattleCommandPanel(member, planning, allReserved) {
  const enemies = getAliveEnemies();
  const selectedCommand = battleState.commandSelections[member.id] || "attack";
  const targetSelections = battleState.targetSelections[member.id] || {};
  const characterSkills = Object.entries(CHARACTER_SKILLS[member.id] || {})
    .filter(([skillId]) => skillId !== "ultimate");
  const learnedSkills = characterSkills.filter(([, skill]) => member.level >= skill.level);
  const selectedSkillId = getAvailableSkillId(member, targetSelections.skillId);
  const selectedSkill = getCharacterSkill(member, selectedSkillId);
  const selectedEnemy = enemies.some((enemy) => enemy.id === targetSelections.enemyId)
    ? targetSelections.enemyId
    : enemies[0]?.id || "";
  const selectedItem = targetSelections.itemId || "potion";
  const selectedItemDefinition = ITEM_DATA[selectedItem] ? selectedItem : Object.keys(ITEM_DATA)[0];
  const validAllyTargets = battleState.party.filter((target) => isValidItemTarget(selectedItemDefinition, target));
  const skillAllyTargets = battleState.party.filter((target) =>
    selectedSkill?.type === "revive" ? !isAlive(target) : isAlive(target));
  const selectedAlly = battleState.party.some((target) =>
    target.id === targetSelections.allyId
    && (selectedCommand === "item" ? isValidItemTarget(selectedItemDefinition, target)
      : selectedCommand === "skill" && selectedSkill?.type === "revive" ? !isAlive(target) : isAlive(target)))
    ? targetSelections.allyId
    : selectedCommand === "skill" && selectedSkill?.type === "revive"
      ? skillAllyTargets[0]?.id || member.id
      : validAllyTargets[0]?.id || getAliveParty()[0]?.id || member.id;
  const ultimate = getCharacterSkill(member, "ultimate");
  const locked = !planning || !isAlive(member);
  const enemyOptions = enemies.map((enemy) =>
    `<option value="${enemy.id}" ${enemy.id === selectedEnemy ? "selected" : ""}>${enemy.name}</option>`
  ).join("");
  const itemOptions = Object.entries(ITEM_DATA).map(([itemId, item]) => {
    const count = gameData.inventory[itemId] || 0;
    const available = count - reservedItemCount(itemId, member.id);
    return `<option value="${itemId}" ${itemId === selectedItemDefinition ? "selected" : ""} ${available <= 0 ? "disabled" : ""}>${item.name}（所持 ${count}・予約可能 ${Math.max(0, available)}）</option>`;
  }).join("");
  const allyOptions = battleState.party.map((target) => {
    const valid = isValidItemTarget(selectedItemDefinition, target);
    return `<option value="${target.id}" ${target.id === selectedAlly ? "selected" : ""} ${valid ? "" : "disabled"}>${target.name}${!isAlive(target) ? "（戦闘不能）" : ""}${valid ? "" : "（対象外）"}</option>`;
  }).join("");
  const commandButtons = [
    ["attack", "攻撃", true],
    ["skill", selectedSkill ? "スキル" : "スキル未習得", Boolean(selectedSkill)],
    ["ultimate", ultimate ? `${ultimate.name}（${member.gauge} / 100）` : "必殺技（Lv30で解放）", Boolean(ultimate) && member.gauge >= BATTLE_RULES.gaugeMaximum],
    ["item", "アイテム", true]
  ].map(([command, label, available]) =>
    `<button class="battle-command-button${selectedCommand === command ? " is-active" : ""}" type="button" data-action="battle-command" data-character="${member.id}" data-command="${command}" aria-pressed="${selectedCommand === command}" ${locked || !available ? "disabled" : ""}>${label}</button>`
  ).join("");
  return `<section class="battle-command-panel" aria-label="共通コマンド">
    <div class="battle-command-heading">
      <div><span class="command-kicker">選択中の仲間</span><h2>${member.icon} ${member.name}の行動を選択</h2></div>
      <span class="command-member-status">${isAlive(member)
        ? `MP ${member.mp} / ${member.maxMp}　${member.level >= 30 ? `必殺 ${member.gauge}%` : "必殺技 Lv30で解放"}`
        : "戦闘不能"}</span>
    </div>
    <div class="battle-command-buttons" role="group" aria-label="行動の種類">${commandButtons}</div>
    <div class="battle-target-controls">
      ${selectedCommand === "skill" && characterSkills.length ? `<label class="target-picker">使用する技
        <select data-skill-for="${member.id}" ${locked || !learnedSkills.length ? "disabled" : ""}>${characterSkills.map(([skillId, skill]) => {
          const learned = member.level >= skill.level;
          const cost = skill.mpCost ? `・${skill.mpCost} MP` : "・ゲージ100%";
          return `<option value="${skillId}" ${skillId === selectedSkillId ? "selected" : ""} ${learned ? "" : "disabled"}>${skill.name}・Lv${skill.level}${learned ? cost : "・未習得"}</option>`;
        }).join("")}</select>
      </label>` : ""}
      ${selectedCommand === "attack" || (selectedCommand === "skill" && selectedSkill?.target === "singleEnemy") || (selectedCommand === "ultimate" && ultimate?.target === "singleEnemy") ? `<label class="target-picker">攻撃対象
        <select data-enemy-for="${member.id}" ${locked || enemies.length === 0 ? "disabled" : ""}>${enemyOptions}</select>
      </label>` : ""}
      ${selectedCommand === "skill" && selectedSkill ? `<div class="battle-selection-note"><strong>技の効果</strong><span>${describeCharacterSkill(selectedSkill)}${selectedSkill.mpCost ? `・${selectedSkill.mpCost} MP（現在 ${member.mp} MP）` : ""}</span></div>` : ""}
      ${selectedCommand === "ultimate" ? `<div class="battle-selection-note"><strong>必殺技</strong><span>${ultimate ? `${describeCharacterSkill(ultimate)}・MP消費なし・ゲージ100（現在 ${member.gauge}）` : "Lv30で解放"}</span></div>` : ""}
      ${selectedCommand === "item" ? `<label class="target-picker">使用アイテム
        <select data-item-for="${member.id}" ${locked ? "disabled" : ""}>${itemOptions}</select>
      </label>
      <label class="target-picker">使用対象
        <select data-ally-for="${member.id}" ${locked || validAllyTargets.length === 0 ? "disabled" : ""}>${allyOptions}</select>
      </label>` : ""}
      ${selectedCommand === "skill" && selectedSkill?.target === "singleAlly" ? `<label class="target-picker">${selectedSkill.type === "revive" ? "蘇生対象" : "味方対象"}
        <select data-ally-for="${member.id}" ${locked || skillAllyTargets.length === 0 ? "disabled" : ""}>${battleState.party.map((target) => {
          const valid = selectedSkill.type === "revive" ? !isAlive(target) : isAlive(target);
          return `<option value="${target.id}" ${target.id === selectedAlly ? "selected" : ""} ${valid ? "" : "disabled"}>${target.name}${!isAlive(target) ? "（戦闘不能）" : ""}${valid ? "" : "（対象外）"}</option>`;
        }).join("")}</select>
      </label>` : ""}
    </div>
    <div class="battle-command-footer">
      <button class="primary-button reserve-action-button" type="button" data-action="battle-reserve" data-character="${member.id}" ${locked ? "disabled" : ""}>${battleState.actions[member.id] ? "行動を変更して予約" : "行動を予約"}</button>
      <div class="reservation-summary">
        <strong>行動予約　${Object.keys(battleState.actions).length} / ${getAliveParty().length}</strong>
        <span>${battleState.party.map((partyMember) => {
          if (!isAlive(partyMember)) return `${partyMember.name}：戦闘不能`;
          const action = battleState.actions[partyMember.id];
          return `${partyMember.name}：${getBattleActionLabel(action, partyMember)}`;
        }).join("　｜　")}</span>
      </div>
      <button class="primary-button begin-action-button" type="button" data-action="battle-begin" ${!planning || !allReserved ? "disabled" : ""}>
        ${battleState.phase === "resolving" ? "行動を実行中…" : battleState.phase === "transition" ? "次のWAVEを準備中…" : "行動開始"}
      </button>
      ${planning ? `<button class="back-button battle-retire-button" type="button" data-action="battle-retire">リタイア</button>` : ""}
    </div>
  </section>`;
}

function renderEnemyBattleCard(enemy) {
  const statusMarkup = renderBattleStatusEffects(enemy);
  const presentation = battleState.bossPresentation;
  const boss = enemy.isBoss;
  const bossEffectClass = boss && presentation?.theme?.key === enemy.bossTheme?.key
    ? ` is-boss-${presentation.type}`
    : "";
  const criticalClass = battleState.effect?.critical ? " has-critical-hit" : "";
  return `<article class="battle-unit enemy-unit${boss ? ` is-boss-card boss-theme-${enemy.bossTheme?.key || ""}${enemy.bossBuffed ? " is-awakened" : ""}` : ""}${!isAlive(enemy) ? " is-ko" : ""}${battleState.effect?.attackerId === enemy.id ? " is-attacking" : ""}${battleState.effect?.targetId === enemy.id ? " is-hit" : ""}${bossEffectClass}${criticalClass}${getBattleVisualClasses(enemy)}">
    ${renderBattleStatusVfx(enemy)}
    ${boss ? `<div class="boss-card-ornament" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>` : ""}
    <div class="battle-unit-top">
      <div class="boss-nameplate"><span class="boss-label">${boss ? (enemy.bossBuffed ? "AWAKENED BOSS" : "BOSS") : isAlive(enemy) ? "敵" : "撃破"}</span><h3>${enemy.name}</h3></div>
      ${renderBattleEffectNumbers(enemy)}
    </div>
    <span class="character-portrait enemy-monster-portrait${boss ? " is-boss-portrait" : ""}${enemy.bossTheme?.key === "star-devourer" ? " is-star-devourer-portrait" : ""}" aria-hidden="true">
      <img src="images/enemies/${encodeURIComponent(enemy.name)}.png" alt="" loading="lazy" decoding="async">
      <span class="portrait-fallback" hidden>${enemy.icon}</span>
    </span>
    ${renderHealthBar(enemy.hp, enemy.maxHp, boss ? "boss-hp-fill" : "enemy-hp-fill", "HP")}
    ${statusMarkup ? `<div class="battle-card-status">${statusMarkup}</div>` : ""}
    ${boss && presentation?.type === "special" && presentation.bossId === enemy.id ? `<div class="boss-technique-name">${presentation.bossName}・${presentation.technique}</div>` : ""}
    ${boss && presentation?.type === "awakening" && presentation.bossId === enemy.id ? `<div class="boss-technique-name">星の力が高まった！${presentation.technique ? ` ${presentation.technique}` : ""}</div>` : ""}
    ${!isAlive(enemy) ? `<div class="enemy-defeated">撃破</div>` : ""}
  </article>`;
}

function renderBossPresentationOverlay() {
  const presentation = battleState.bossPresentation;
  if (!presentation) return "";
  if (presentation.type === "intro") {
    const particles = Array.from({ length: 16 }, (_, index) =>
      `<span class="boss-intro-particle particle-${index % 8}" style="--particle-index:${index}">${presentation.theme.particles[index % presentation.theme.particles.length]}</span>`).join("");
    return `<div class="boss-cinematic boss-intro boss-theme-${presentation.theme.key}" data-boss-intro role="dialog" aria-label="${presentation.bossName}登場">
      <div class="boss-intro-vignette"></div><div class="boss-intro-particles" aria-hidden="true">${particles}</div>
      <div class="boss-intro-title"><span class="warning-title">WARNING</span><strong>${presentation.bossName}</strong><small>強大な星の気配が満ちていく……</small></div>
      <button type="button" class="boss-skip-button" data-action="boss-intro-skip">スキップ</button>
    </div>`;
  }
  if (presentation.type === "defeated") {
    const particles = Array.from({ length: 14 }, (_, index) =>
      `<span class="boss-defeat-particle particle-${index % 7}" style="--particle-index:${index}">${presentation.theme.particles[index % presentation.theme.particles.length]}</span>`).join("");
    return `<div class="boss-cinematic boss-defeat boss-theme-${presentation.theme.key}" role="status" aria-live="assertive">
      <div class="boss-intro-particles" aria-hidden="true">${particles}</div>
      <div class="boss-defeat-title"><span>${presentation.bossName}</span><strong>BOSS DEFEATED</strong></div>
    </div>`;
  }
  if (presentation.type === "special" || presentation.type === "awakening") {
    return `<div class="boss-flash-banner boss-theme-${presentation.theme.key} is-${presentation.type}" role="status">${presentation.type === "awakening" ? `${presentation.bossName}の力が高まった！` : `${presentation.bossName}　${presentation.technique}`}</div>`;
  }
  return "";
}

function renderBattle() {
  const aliveCount = getAliveParty().length;
  const reservedCount = Object.keys(battleState.actions).length;
  const allReserved = aliveCount > 0 && reservedCount === aliveCount;
  const planning = battleState.phase === "planning";
  const area = getAreaForStage(battleState.stage);
  const battleStatus = planning ? "行動を予約中"
    : battleState.phase === "transition" ? "次のWAVEを準備中"
      : battleState.phase === "boss-intro" ? "ボス登場演出"
        : battleState.phase === "boss-defeated" ? "ボス撃破演出"
          : "行動を実行中";
  const bossTheme = battleState.enemies.find((enemy) => enemy.isBoss)?.bossTheme;
  const bossClass = bossTheme ? ` boss-battle boss-theme-${bossTheme.key}` : "";
  const selectedMember = battleState.party.find((member) => member.id === battleState.selectedCharacterId)
    || battleState.party[0];
  return `<section class="panel page-panel battle-screen battle-background-${getBattleBackgroundClass(battleState.stage)}${bossClass}">
    <div class="battle-heading">
      <div><p class="eyebrow">STAGE ${String(battleState.stage).padStart(2, "0")}　・　${area.name}</p><h1>星明かりの戦い</h1></div>
      <div class="battle-header-status"><span>戦闘状況：${battleStatus}</span><div class="wave-indicator">WAVE <strong>${battleState.wave}</strong> / ${BATTLE_RULES.wavesPerStage}</div></div>
    </div>
    <div class="battlefield-layout">
      <section class="battle-side allies-side" aria-label="味方">
        <h2>味方　${aliveCount} / ${battleState.party.length}</h2>
        <div class="battle-units">${battleState.party.map(renderPartyBattleCard).join("")}</div>
      </section>
      <div class="battle-versus" aria-hidden="true">VS</div>
      <section class="battle-side enemies-side" aria-label="敵">
        <h2>魔物　${getAliveEnemies().length} 体</h2>
        <div class="battle-units enemy-count-${battleState.enemies.length}">${battleState.enemies.map(renderEnemyBattleCard).join("")}</div>
      </section>
    </div>
    <p class="battle-message" role="status" aria-live="polite">${battleState.message}</p>
    ${renderBattleCommandPanel(selectedMember, planning, allReserved)}
    <p class="battle-help">行動順：味方のパーティー枠1から順に行動し、その後、敵が左から行動します。</p>
    ${renderBattleActionPresentation()}
    ${renderBossPresentationOverlay()}
  </section>`;
}

function renderBattleResult() {
  const victory = battleState.result === "victory";
  const retired = battleState.result === "retired";
  const area = getAreaForStage(battleState.stage);
  const droppedItems = battleState.acquiredEquipmentDrops?.length
    ? `<div class="result-equipment-drops"><strong>獲得装備品</strong>${battleState.acquiredEquipmentDrops.map((item) => `<span class="rarity-${item.rarity}">${item.name}［${EQUIPMENT_RARITIES[item.rarity].name}］</span>`).join("")}</div>`
    : "";
  const resultParty = battleState.party.map((member) => {
    const levelUp = battleState.levelUps.find((entry) => entry.id === member.id);
    const experience = victory ? `<span class="result-member-exp">獲得 EXP <strong>${battleState.experienceReward}</strong></span>` : "";
    return `<article class="result-member-card${levelUp ? " has-level-up" : ""}">
      <span class="character-portrait result-character-portrait" aria-hidden="true">
        <img src="images/characters/${encodeURIComponent(member.name)}.png" alt="" loading="lazy" decoding="async">
        <span class="portrait-fallback" hidden>${member.name.slice(0, 1)}</span>
      </span>
      <div class="result-member-info">
        <strong class="result-member-name">${member.name}</strong>
        <span class="result-member-level">Lv ${member.level}</span>
        ${experience}
        <span class="result-member-hp">HP <strong>${member.hp} / ${member.maxHp}</strong></span>
        ${levelUp ? `<span class="result-level-up">LEVEL UP!　Lv${levelUp.before} → Lv${levelUp.after}</span>` : ""}
      </div>
    </article>`;
  }).join("");
  return `<section class="panel page-panel battle-result-screen ${victory ? "is-victory" : "is-defeat"}${debugMode ? " is-debug-result" : ""}">
    <div class="result-symbol" aria-hidden="true">${victory ? "✦" : "☾"}</div>
    <p class="eyebrow">STAGE ${String(battleState.stage).padStart(2, "0")}　RESULT</p>
    <h1>${victory ? "ステージクリア！" : retired ? "ステージから撤退" : "ステージ失敗…"}</h1>
    ${victory ? `<p class="result-description">${area.name}に星の光が戻った。</p>
      <div class="result-rewards">
        <span><strong>${battleState.experienceReward}</strong> EXP</span>
        <span><strong>${battleState.goldReward + battleState.bossBonusReward}</strong> G</span>
        ${battleState.bossBonusReward ? `<small>ボス初回クリア特典 +${battleState.bossBonusReward} G</small>` : ""}
      </div>` : `<p>${retired ? "戦闘で使用したアイテムは消費されています。報酬は獲得できません。" : "味方が全員戦闘不能になりました。報酬は獲得できません。仲間を立て直して再挑戦しましょう。"}</p>`}
    ${victory ? droppedItems : ""}
    <div class="result-party">${resultParty}</div>
    <div class="detail-actions">
      <button class="primary-button" type="button" data-action="${debugMode ? "debug-return" : "battle-return-map"}">${debugMode ? "デバッグ設定へ戻る" : "ステージ選択へ戻る"}</button>
      ${retired ? "" : `<button class="menu-button" type="button" data-action="battle-retry">ステージ${battleState.stage}を再挑戦</button>`}
    </div>
  </section>`;
}

function queueBattleAction(characterId) {
  if (!battleState || currentScreen !== "battle" || battleState.phase !== "planning") return;
  const member = battleState.party.find((entry) => entry.id === characterId);
  if (!member || !isAlive(member)) {
    battleState.message = "戦闘不能のキャラクターは行動を予約できません。";
    render();
    return;
  }
  const command = battleState.commandSelections[characterId] || "attack";
  const targetSelections = battleState.targetSelections[characterId] || {};
  const selectedEnemyId = app.querySelector(`[data-enemy-for="${characterId}"]`)?.value || targetSelections.enemyId;
  const selectedAllyId = app.querySelector(`[data-ally-for="${characterId}"]`)?.value || targetSelections.allyId;
  let action;

  if (command === "attack") {
    action = { type: "attack", targetId: selectedEnemyId };
  } else if (command === "skill") {
    const skillId = getAvailableSkillId(member, app.querySelector(`[data-skill-for="${characterId}"]`)?.value || targetSelections.skillId);
    const skill = getCharacterSkill(member, skillId);
    if (!skill) {
      battleState.message = `${member.name}はまだスキルを習得していません。`;
      render();
      return;
    }
    if (member.mp < skill.mpCost) {
      battleState.message = `MPが足りません。${skill.name}には${skill.mpCost} MP必要です（現在 ${member.mp} MP）。`;
      render();
      return;
    }
    action = { type: "skill", skillId, targetId: ["singleEnemy", "singleAlly"].includes(skill.target) ? (skill.target === "singleEnemy" ? selectedEnemyId : selectedAllyId) : member.id };
  } else if (command === "ultimate") {
    const ultimate = getCharacterSkill(member, "ultimate");
    if (!ultimate) {
      battleState.message = `${member.name}の必殺技はLv30で解放されます。`;
      render();
      return;
    }
    if (member.gauge < BATTLE_RULES.gaugeMaximum) {
      battleState.message = `必殺技ゲージが足りません。必要 ${BATTLE_RULES.gaugeMaximum}（現在 ${member.gauge}）。`;
      render();
      return;
    }
    action = { type: "ultimate", skillId: "ultimate", targetId: ["singleEnemy", "singleAlly"].includes(ultimate.target) ? (ultimate.target === "singleEnemy" ? selectedEnemyId : selectedAllyId) : member.id };
  } else if (command === "item") {
    const itemId = app.querySelector(`[data-item-for="${characterId}"]`)?.value;
    const item = ITEM_DATA[itemId];
    const targetId = app.querySelector(`[data-ally-for="${characterId}"]`)?.value;
    const target = battleState.party.find((ally) => ally.id === targetId);
    if (!item) {
      battleState.message = "使用するアイテムを選んでください。";
      render();
      return;
    }
    const availableCount = (gameData.inventory[itemId] || 0) - reservedItemCount(itemId, characterId);
    if (availableCount <= 0) {
      battleState.message = `${item.name}が足りません。所持数は${gameData.inventory[itemId] || 0}個で、他の予約分を含めて使える数がありません。`;
      render();
      return;
    }
    if (!isValidItemTarget(itemId, target)) {
      battleState.message = `${item.name}の対象が不適切です。${item.target === "fallen" ? "戦闘不能の味方" : "効果が必要な生存中の味方"}を選んでください。`;
      render();
      return;
    }
    action = { type: "item", itemId, targetId };
    targetSelections.itemId = itemId;
    targetSelections.allyId = targetId;
    battleState.targetSelections[characterId] = targetSelections;
  } else {
    battleState.message = "行動を選択してください。";
    render();
    return;
  }

  const actionSkill = ["skill", "ultimate"].includes(action.type) ? getCharacterSkill(member, action.skillId) : null;
  if (action.type === "attack" || actionSkill?.target === "singleEnemy") {
    if (!battleState.enemies.some((enemy) => enemy.id === action.targetId && isAlive(enemy))) {
      battleState.message = "攻撃対象を選んでください。";
      render();
      return;
    }
  } else if (actionSkill?.target === "singleAlly") {
    const target = battleState.party.find((ally) => ally.id === action.targetId);
    const targetIsValid = target && (actionSkill.type === "revive" ? !isAlive(target) : isAlive(target));
    if (!targetIsValid) {
      battleState.message = actionSkill.type === "revive"
        ? "蘇生する戦闘不能の味方を選んでください。"
        : "対象にできる生存中の味方を選んでください。";
      render();
      return;
    }
  }

  battleState.commandSelections[characterId] = command;
  battleState.actions[characterId] = action;
  battleState.message = `${member.name}の「${getBattleActionLabel(action, member)}」を予約しました。予約内容は行動開始前に変更できます。`;
  const nextMember = getNextUnreservedPartyMember(characterId);
  battleState.selectedCharacterId = nextMember?.id || member.id;
  render();
}

function calculateBattleDamage(attack, defense, multiplier, criticalChance) {
  // 基本式に±5%の乱数と会心倍率を適用し、最後に四捨五入します。
  const baseDamage = attack * 100 / (100 + defense);
  const randomVariation = 0.95 + Math.random() * 0.1;
  const critical = Math.random() < criticalChance;
  const damage = Math.max(1, Math.round(baseDamage * multiplier * randomVariation * (critical ? 1.5 : 1)));
  return { damage, critical };
}

function resolveBattleStrike(attacker, defender, options = {}) {
  const hitChance = Math.max(0, Math.min(1, (attacker.accuracy ?? BATTLE_RULES.basicHitChance) - (defender.evasion ?? 0)));
  if (Math.random() >= hitChance) return { hit: false, damage: 0, critical: false };

  const attack = options.attackPower ?? attacker.physicalAttack;
  const defense = options.defensePower ?? defender.physicalDefense;
  const result = calculateBattleDamage(
    attack,
    defense,
    options.multiplier ?? 1,
    attacker.criticalChance ?? BATTLE_RULES.criticalChance
  );
  const wasAlive = isAlive(defender);
  defender.hp = Math.max(0, defender.hp - result.damage);
  if (wasAlive && !isAlive(defender) && battleState.enemies.includes(defender)) {
    registerEnemyDefeat(defender);
  }
  if (defender.level >= 30 && Number.isFinite(defender.gauge)) {
    defender.gauge = Math.min(BATTLE_RULES.gaugeMaximum, defender.gauge + BATTLE_RULES.gaugePerHit);
  } else if (Number.isFinite(defender.gauge)) {
    defender.gauge = 0;
  }
  return { hit: true, ...result };
}

function registerEnemyDefeat(enemy) {
  battleState.experienceReward += enemy.experience || 0;
  battleState.goldReward += enemy.gold || 0;
  if (Math.random() >= EQUIPMENT_DROP_CHANCE) return;
  const rarityRoll = Math.random();
  const rarity = EQUIPMENT_DROP_RARITIES.find((entry) => rarityRoll < entry.threshold)?.rarity || "legendary";
  const slot = EQUIPMENT_SLOTS[Math.floor(Math.random() * EQUIPMENT_SLOTS.length)];
  const job = slot === "weapon"
    ? Object.keys(JOB_WEAPON_TYPES)[Math.floor(Math.random() * Object.keys(JOB_WEAPON_TYPES).length)]
    : null;
  const area = Math.floor((battleState.stage - 1) / 5) + 1;
  const item = createEquipmentItem(area, slot, rarity, job);
  if (item) battleState.pendingEquipmentDrops.push(item);
}

function awardExperience(characterId, amount) {
  const progress = getCharacterProgress(gameData, characterId);
  if (progress.level >= MAX_CHARACTER_LEVEL) return { levelsGained: 0 };
  progress.experience += amount;
  let levelsGained = 0;
  while (progress.level < MAX_CHARACTER_LEVEL) {
    const required = experienceRequiredForLevel(progress.level);
    if (progress.experience < required) break;
    progress.experience -= required;
    progress.level += 1;
    levelsGained += 1;
  }
  if (progress.level >= MAX_CHARACTER_LEVEL) progress.experience = 0;
  progress.learnedSkills = Object.entries(CHARACTER_SKILLS[characterId] || {})
    .filter(([skillId, skill]) =>
      skill && progress.level >= skill.level && !progress.learnedSkills.includes(skillId))
    .map(([skillId]) => skillId)
    .concat(progress.learnedSkills);
  return { levelsGained, level: progress.level };
}

function refreshBattleMemberStats(member) {
  const progress = getCharacterProgress(gameData, member.id);
  const stats = calculateCharacterStats(member.id, progress.level, progress.equipment);
  if (!stats) return;
  Object.assign(member, stats, {
    experience: progress.experience,
    learnedSkills: progress.learnedSkills,
    equipment: progress.equipment
  });
}

function setBattleEffect(targetId, amount, kind = "damage", attackerId = null, details = {}) {
  battleState.effect = {
    targetId,
    kind,
    attackerId,
    text: amount === null ? "MISS" : `${["heal", "mp-recovery"].includes(kind) ? "+" : "-"}${amount}`,
    critical: Boolean(details.critical),
    status: Boolean(details.status),
    effects: details.effects || [{
      targetId,
      amount,
      kind,
      critical: Boolean(details.critical),
      status: Boolean(details.status)
    }]
  };
}

function getBattlePresentationStyle(member, action, skill) {
  if (action.type === "ultimate") return "ultimate";
  if (skill) {
    if (["heal", "revive", "cleanse"].includes(skill.type)) return "healing";
    if (skill.type === "buff") return "buff";
    if (["debuff", "status"].includes(skill.type)) return "affliction";
    if (skill.damageType === "magic") return "magic";
    return member.job === "暗殺者" ? "shadow" : "physical";
  }
  return ({
    "剣士": "physical",
    "騎士": "physical",
    "魔術師": "magic",
    "僧侶": "magic",
    "弓使い": "arrow",
    "暗殺者": "shadow",
    "武闘家": "impact",
    "吟遊詩人": "music"
  })[member.job] || "physical";
}

function getBattlePresentationDuration(presentation) {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return 240;
  if (presentation?.style === "ultimate") return 1750;
  const hitBonus = Math.max(0, (presentation?.hitCount || 1) - 1) * 230;
  return (presentation?.style === "magic" ? 1050 : 820) + hitBonus;
}

function renderBattleEffectNumbers(combatant) {
  return (battleState.effect?.effects || [])
    .filter((effect) => effect.targetId === combatant.id)
    .map((effect) => `<span class="damage-number ${effect.kind}${effect.critical ? " is-critical" : ""}${effect.status ? " is-status" : ""}">${effect.amount === null ? "MISS" : `${["heal", "mp-recovery"].includes(effect.kind) ? "+" : "-"}${effect.amount}`}${effect.critical ? "!" : ""}${effect.status ? " ✧" : ""}</span>`)
    .join("");
}

function getBattleVisualClasses(combatant) {
  const presentation = battleState.actionPresentation;
  if (!presentation) return "";
  const classes = [];
  const hitClass = `vfx-hits-${Math.min(presentation.hitCount || 1, 4)}`;
  if (presentation.actorId === combatant.id) classes.push(`is-vfx-attacker vfx-actor-${presentation.style} ${hitClass}`);
  if (presentation.targetIds.includes(combatant.id)) classes.push(`is-vfx-target vfx-target-${presentation.style} ${hitClass}`);
  return classes.length ? ` ${classes.join(" ")}` : "";
}

function renderBattleStatusVfx(combatant) {
  const entries = (battleState.statusVfx || []).filter((entry) => entry.targetId === combatant.id);
  if (entries.length) {
    // VFXは描画時に消費し、次のUI再描画で演出を再生しないようにします。
    battleState.statusVfx = battleState.statusVfx.filter((entry) => entry.targetId !== combatant.id);
  }
  return entries
    .map((entry) => `<span class="battle-status-vfx is-${entry.type}" aria-hidden="true">
      <i>✦</i><i>✧</i><i>✦</i>
    </span>`).join("");
}

function renderBattleActionPresentation() {
  const presentation = battleState.actionPresentation;
  if (!presentation) return "";
  const particles = Array.from({ length: presentation.style === "ultimate" ? 14 : 6 }, (_, index) =>
    `<i class="action-vfx-particle particle-${index % 7}" aria-hidden="true">${presentation.style === "music" ? ["♪", "♫", "✦", "♬", "✧", "♫", "♪"][index % 7] : presentation.style === "arrow" ? "➶" : "✦"}</i>`).join("");
  return `<div class="battle-action-vfx is-${presentation.style}" aria-hidden="true">
    ${particles}
    ${presentation.style === "magic" ? '<i class="action-vfx-circle"></i>' : ""}
    ${presentation.style === "music" ? '<i class="action-vfx-music-wave"></i>' : ""}
    <div class="battle-action-vfx-title">${presentation.style === "ultimate" ? `<strong>${presentation.actorName}</strong>` : ""}
      <span>${presentation.actionName}</span>
    </div>
    ${presentation.style === "ultimate" ? '<i class="action-vfx-flash"></i><i class="action-vfx-circle"></i>' : ""}
  </div>`;
}

function finishBattle(result) {
  window.clearTimeout(battleTimer);
  window.clearTimeout(bossVisualTimer);
  battleState.bossBonusReward = 0;
  battleState.acquiredEquipmentDrops = [];
  if (result === "victory" && !debugMode) {
    battleState.levelUps = battleState.party.map((member) => {
      const progress = getCharacterProgress(gameData, member.id);
      const before = progress.level;
      const reward = awardExperience(member.id, battleState.experienceReward);
      refreshBattleMemberStats(member);
      return { id: member.id, name: member.name, before, after: reward.level || before };
    }).filter((entry) => entry.after > entry.before);
    battleState.acquiredEquipmentDrops = [...battleState.pendingEquipmentDrops];
    gameData.equipmentInventory.push(...battleState.acquiredEquipmentDrops);
  } else {
    battleState.pendingEquipmentDrops = [];
  }
  battleState.party.forEach((member) => {
    member.hp = member.maxHp;
    member.mp = member.maxMp;
  });
  battleState.result = result;
  battleState.phase = "finished";
  if (result === "victory" && !debugMode) {
    if (BOSS_FIRST_CLEAR_GOLD[battleState.stage]
      && !gameData.bossRewardsClaimed.includes(battleState.stage)) {
      battleState.bossBonusReward = BOSS_FIRST_CLEAR_GOLD[battleState.stage];
      gameData.gold += battleState.bossBonusReward;
      gameData.bossRewardsClaimed.push(battleState.stage);
    }
    gameData.gold += battleState.goldReward;
    gameData.clearedStages = Math.max(gameData.clearedStages, battleState.stage);
    battleState.message = `獲得 ${battleState.experienceReward} EXP・${battleState.goldReward + battleState.bossBonusReward} G`;
    saveGame(STORAGE_KEYS.auto);
  } else if (result === "victory") {
    battleState.message = "デバッグ戦闘に勝利しました。報酬は通常データに反映されません。";
  }
  currentScreen = "battle-result";
  render();
}

function prepareNextWave() {
  if (!battleState || currentScreen !== "battle") return;
  battleState.wave += 1;
  battleState.enemies = createBattleEnemies(battleState.wave, battleState.stage);
  battleState.actions = {};
  battleState.selectedCharacterId = getAliveParty()[0]?.id || battleState.party[0].id;
  const boss = battleState.enemies.find((enemy) => enemy.isBoss);
  if (boss) {
    beginBossEntrance(boss);
    return;
  }
  battleState.phase = "planning";
  battleState.effect = null;
  battleState.bossPresentation = null;
  battleState.message = `WAVE ${battleState.wave} 開始！前のWAVEからHP・MP・状態を引き継ぎます。`;
  render();
}

function getBossPresentationDuration(normalDuration) {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? Math.min(normalDuration, 300)
    : normalDuration;
}

function showBossBattleEffect(presentation, duration = 1250) {
  if (!battleState) return;
  window.clearTimeout(bossVisualTimer);
  battleState.bossPresentation = presentation;
  const state = battleState;
  bossVisualTimer = window.setTimeout(() => {
    if (battleState !== state || state.bossPresentation !== presentation) return;
    state.bossPresentation = null;
    if (currentScreen === "battle" && state.phase !== "resolving") render();
  }, getBossPresentationDuration(duration));
}

function beginBossEntrance(boss) {
  window.clearTimeout(bossVisualTimer);
  battleState.phase = "boss-intro";
  battleState.bossPresentation = { type: "intro", theme: boss.bossTheme, bossName: boss.name };
  battleState.message = `${boss.name}が現れた！`;
  render();
  const state = battleState;
  battleTimer = window.setTimeout(() => completeBossEntrance(state), getBossPresentationDuration(2600));
}

function completeBossEntrance(state = battleState) {
  if (!state || battleState !== state || currentScreen !== "battle" || state.phase !== "boss-intro") return;
  window.clearTimeout(battleTimer);
  window.clearTimeout(bossVisualTimer);
  state.phase = "planning";
  state.bossPresentation = null;
  state.message = `${state.enemies.find((enemy) => enemy.isBoss)?.name || "ボス"}が立ちはだかる！味方全員の行動を予約してください。`;
  render();
}

function beginBossDefeatSequence() {
  if (!battleState || battleState.bossDefeatStarted) return false;
  const boss = battleState.enemies.find((enemy) => enemy.isBoss && !isAlive(enemy));
  if (!boss) return false;
  battleState.bossDefeatStarted = true;
  window.clearTimeout(bossVisualTimer);
  battleState.message = `${boss.name}を打ち倒した！`;
  render();
  const state = battleState;
  battleTimer = window.setTimeout(() => {
    if (battleState !== state || currentScreen !== "battle" || state.phase !== "resolving") return;
    state.phase = "boss-defeated";
    state.bossPresentation = { type: "defeated", theme: boss.bossTheme, bossName: boss.name };
    render();
    battleTimer = window.setTimeout(() => {
      if (battleState !== state || currentScreen !== "battle" || state.phase !== "boss-defeated") return;
      state.bossPresentation = null;
      finishWave();
    }, getBossPresentationDuration(2400));
  }, getBossPresentationDuration(300));
  return true;
}

function finishWave() {
  window.clearTimeout(bossVisualTimer);
  if (battleState.wave >= BATTLE_RULES.wavesPerStage) {
    finishBattle("victory");
    return;
  }
  battleState.phase = "transition";
  battleState.message = `WAVE ${battleState.wave} クリア！HP・MP・状態はそのまま次のWAVEへ引き継がれます。`;
  render();
  const state = battleState;
  battleTimer = window.setTimeout(() => {
    if (battleState === state && currentScreen === "battle") prepareNextWave();
  }, BATTLE_RULES.waveDelayMs);
}

function resolvePlayerAction(member) {
  const action = battleState.actions[member.id];
  if (!action || !isAlive(member)) return;
  if (member.statusEffects?.some((effect) => effect.type === "paralysis") && Math.random() < 0.4) {
    battleState.message = `${member.name}は麻痺して行動できない！`;
    showBattleStatusVfx(member, "paralysis");
    return;
  }
  if (member.statusEffects?.some((effect) => effect.type === "confusion")
    && resolveConfusedCombatantAction(member)) return;
  if (action.type === "item") {
    resolveItemAction(member, action);
    return;
  }

  const skill = action.type === "attack" ? null : getCharacterSkill(member, action.skillId);
  const actionName = skill?.name || "攻撃";
  if (action.type !== "attack" && !skill) {
    battleState.message = `${member.name}はその技をまだ習得していません。`;
    return;
  }
  if (skill?.mpCost && member.mp < skill.mpCost) {
    battleState.message = `MPが足りません。${skill.name}には${skill.mpCost} MP必要です（現在 ${member.mp} MP）。`;
    return;
  }
  if (action.type === "ultimate" && member.gauge < BATTLE_RULES.gaugeMaximum) {
    battleState.message = `${member.name}の必殺技にはゲージ100が必要です（現在 ${member.gauge}）。`;
    return;
  }

  const targetType = skill?.target || "singleEnemy";
  let targets = [];
  if (targetType === "singleEnemy") {
    const livingEnemies = getAliveEnemies();
    if (livingEnemies.length === 0) return;
    targets = [livingEnemies.find((enemy) => enemy.id === action.targetId)
      || livingEnemies[Math.floor(Math.random() * livingEnemies.length)]];
  } else if (targetType === "allEnemies") {
    targets = getAliveEnemies();
  } else if (targetType === "singleAlly" && skill?.type === "revive") {
    const target = battleState.party.find((ally) => ally.id === action.targetId && !isAlive(ally));
    if (!target) {
      battleState.message = `${skill.name}の対象にできる戦闘不能の味方がいません。`;
      return;
    }
    targets = [target];
  } else if (targetType === "singleAlly") {
    const livingParty = getAliveParty();
    const target = livingParty.find((ally) => ally.id === action.targetId);
    if (!target) {
      battleState.message = `${skill.name}の対象にできる味方がいません。`;
      return;
    }
    targets = [target];
  } else if (targetType === "allAllies") {
    targets = getAliveParty();
  } else if (targetType === "self") {
    targets = [member];
  }
  if (!targets.length) return;

  if (skill?.mpCost) member.mp -= skill.mpCost;
  if (action.type === "ultimate") member.gauge = 0;

  const messages = [];
  let effectTarget = targets[targets.length - 1];
  let effectAmount = null;
  let effectKind = "damage";
  let effectCritical = false;
  let effectStatus = false;
  const visualEffects = [];
  let performed = false;

  if (!skill || skill.type === "damage" || skill.type === "status") {
    for (const target of targets) {
      if (!isAlive(target)) continue;
      if (skill?.type === "status") {
        const applied = skill.applyStatus && applySkillAilment(target, skill.applyStatus);
        messages.push(`${target.name}${applied ? `に${getStatusLabel(skill.applyStatus)}を付与` : "は状態異常を回避"}`);
        visualEffects.push({ targetId: target.id, amount: null, kind: "miss", status: Boolean(applied) });
        effectTarget = null;
        performed = true;
        continue;
      }
      let totalDamage = 0;
      let hitCount = 0;
      let criticalHit = false;
      const hitResults = [];
      const hits = skill?.hits || 1;
      for (let hit = 0; hit < hits && isAlive(target); hit += 1) {
        const damageType = skill?.damageType || "physical";
        const result = resolveBattleStrike(member, target, {
          multiplier: skill?.multiplier || 1,
          attackPower: getEffectiveBattleStat(member, damageType === "magic" ? "magicAttack" : "physicalAttack"),
          defensePower: getEffectiveBattleStat(target, damageType === "magic" ? "magicDefense" : "physicalDefense")
        });
        hitResults.push(result);
        if (result.hit) {
          totalDamage += result.damage;
          hitCount += 1;
          criticalHit ||= result.critical;
        }
      }
      const appliedAilment = skill?.applyStatus && isAlive(target)
        ? applySkillAilment(target, skill.applyStatus)
        : false;
      effectCritical ||= criticalHit;
      effectStatus ||= appliedAilment;
      const allMissed = hitCount === 0;
      messages.push(`${target.name}${allMissed ? "は攻撃を回避" : `に${totalDamage}ダメージ${skill?.hits ? `（${hitCount}回命中）` : ""}${criticalHit ? "・会心" : ""}`}${appliedAilment ? `・${getStatusLabel(skill.applyStatus)}付与` : ""}`);
      effectTarget = target;
      effectAmount = allMissed ? null : totalDamage;
      effectKind = allMissed ? "miss" : "damage";
      visualEffects.push({
        targetId: target.id,
        amount: effectAmount,
        kind: effectKind,
        critical: criticalHit,
        status: appliedAilment
      });
      performed = true;
    }
  } else if (skill.type === "heal") {
    for (const target of targets) {
      if (!isAlive(target)) continue;
      const amount = Math.min(target.maxHp - target.hp, Math.round(target.maxHp * skill.healRatio));
      target.hp += amount;
      messages.push(`${target.name}のHPが${amount}回復`);
      effectTarget = target;
      effectAmount = amount;
      effectKind = "heal";
      visualEffects.push({ targetId: target.id, amount, kind: "heal" });
      performed = true;
    }
  } else if (skill.type === "revive") {
    const target = targets[0];
    if (isAlive(target)) {
      battleState.message = `${target.name}は戦闘不能ではありません。`;
      if (skill.mpCost) member.mp += skill.mpCost;
      if (action.type === "ultimate") member.gauge = BATTLE_RULES.gaugeMaximum;
      return;
    }
    target.hp = Math.min(target.maxHp, Math.ceil(target.maxHp * skill.reviveRatio));
    messages.push(`${target.name}がHP${target.hp}で復活`);
    effectTarget = target;
    effectAmount = target.hp;
    effectKind = "heal";
    visualEffects.push({ targetId: target.id, amount: target.hp, kind: "heal" });
    performed = true;
  } else if (skill.type === "buff") {
    for (const target of targets) {
      if (!isAlive(target)) continue;
      applyBattleBuff(target, skill.stat, skill.amount, skill.duration);
      messages.push(`${target.name}の${getStatusLabel({ type: "buff", stat: skill.stat })}が${Math.round(skill.amount * 100)}%上昇（${skill.duration}ターン）`);
      effectTarget = target;
      effectAmount = 0;
      effectKind = "heal";
      performed = true;
    }
  } else if (skill.type === "debuff") {
    for (const target of targets) {
      if (!isAlive(target)) continue;
      applyBattleBuff(target, skill.stat, skill.amount, skill.duration);
      messages.push(`${target.name}の${getStatusLabel({ type: "debuff", stat: skill.stat })}が${Math.round(Math.abs(skill.amount) * 100)}%低下（${skill.duration}ターン）`);
      effectTarget = target;
      effectAmount = 0;
      effectKind = "damage";
      performed = true;
    }
  } else if (skill.type === "cleanse") {
    const target = targets[0];
    const removable = (target.statusEffects || []).filter((effect) => ["poison", "paralysis", "confusion"].includes(effect.type));
    target.statusEffects = (target.statusEffects || []).filter((effect) => !["poison", "paralysis", "confusion"].includes(effect.type));
    if (removable.length) showBattleStatusVfx(target, "cleanse");
    messages.push(removable.length ? `${target.name}の状態異常をすべて解除` : `${target.name}に解除する状態異常はない`);
    effectTarget = target;
    effectAmount = 0;
    effectKind = "heal";
    performed = true;
  }

  if (!performed) {
    if (skill?.mpCost) member.mp += skill.mpCost;
    if (action.type === "ultimate") member.gauge = BATTLE_RULES.gaugeMaximum;
    return;
  }
  if (action.type !== "ultimate" && member.level >= 30) {
    member.gauge = Math.min(BATTLE_RULES.gaugeMaximum, member.gauge + BATTLE_RULES.gaugePerAttack);
  } else if (member.level < 30) {
    member.gauge = 0;
  }
  battleState.message = `${actionName}！ ${messages.join("、")}。`;
  if (effectTarget && (!skill || ["damage", "heal", "revive"].includes(skill.type))) {
    setBattleEffect(effectTarget.id, effectAmount, effectKind, member.id, {
      critical: effectCritical,
      status: effectStatus,
      effects: visualEffects
    });
  }
  battleState.actionPresentation = {
    actorId: member.id,
    actorName: member.name,
    actionName,
    style: getBattlePresentationStyle(member, action, skill),
    targetIds: targets.map((target) => target.id),
    duration: getBattlePresentationDuration({ style: getBattlePresentationStyle(member, action, skill) }),
    hitCount: skill?.hits || 1
  };
}

function resolveItemAction(member, action) {
  const item = ITEM_DATA[action.itemId];
  const target = battleState.party.find((ally) => ally.id === action.targetId);
  if (!item || !target || !isValidItemTarget(action.itemId, target)) {
    battleState.message = `${item?.name || "アイテム"}の対象が無効になったため、アイテムは消費されませんでした。`;
    return;
  }
  if ((gameData.inventory[action.itemId] || 0) <= 0) {
    battleState.message = `${item.name}が足りないため、行動できませんでした。`;
    return;
  }

  let resultMessage;
  let effectAmount = 0;
  if (action.itemId === "potion") {
    effectAmount = Math.min(100, target.maxHp - target.hp);
    target.hp += effectAmount;
    resultMessage = effectAmount > 0
      ? `${member.name}は${item.name}を使った。${target.name}のHPが${effectAmount}回復！`
      : `${target.name}のHPは満タンです。${item.name}は消費されませんでした。`;
  } else if (action.itemId === "ether") {
    effectAmount = Math.min(30, target.maxMp - target.mp);
    target.mp += effectAmount;
    resultMessage = effectAmount > 0
      ? `${member.name}は${item.name}を使った。${target.name}のMPが${effectAmount}回復！`
      : `${target.name}のMPは満タンです。${item.name}は消費されませんでした。`;
  } else if (action.itemId === "panacea") {
    const ailments = ["poison", "paralysis", "confusion"];
    const removed = (target.statusEffects || []).filter((effect) => ailments.includes(effect.type)).length;
    target.statusEffects = (target.statusEffects || []).filter((effect) => !ailments.includes(effect.type));
    if (removed) showBattleStatusVfx(target, "cleanse");
    resultMessage = removed > 0
      ? `${member.name}は${item.name}を使った。${target.name}の状態異常を解除！`
      : `${target.name}に解除できる状態異常はありません。${item.name}は消費されませんでした。`;
  } else if (action.itemId === "revive") {
    target.hp = Math.ceil(target.maxHp * 0.5);
    effectAmount = target.hp;
    resultMessage = `${member.name}は${item.name}を使った。${target.name}がHP${effectAmount}で復活！`;
  }

  const applied = action.itemId === "potion" || action.itemId === "ether"
    ? effectAmount > 0
    : action.itemId === "panacea"
      ? resultMessage.includes("状態異常を解除！")
      : action.itemId === "revive";
  if (!applied) {
    battleState.message = resultMessage;
    return;
  }

  gameData.inventory[action.itemId] -= 1;
  battleState.message = resultMessage;
  const effectKind = action.itemId === "ether" ? "mp-recovery" : "heal";
  setBattleEffect(target.id, effectAmount, effectKind, member.id);
  battleState.actionPresentation = {
    actorId: member.id,
    actorName: member.name,
    actionName: item.name,
    style: action.itemId === "ether" ? "magic" : "healing",
    targetIds: [target.id],
    duration: getBattlePresentationDuration({ style: action.itemId === "ether" ? "magic" : "healing" }),
    hitCount: 1
  };
  saveGame(STORAGE_KEYS.auto);
}

function processBattleRoundStatuses() {
  const messages = [];
  for (const combatant of [...battleState.party, ...battleState.enemies]) {
    if (!isAlive(combatant) || !combatant.statusEffects?.length) continue;
    const remainingEffects = [];
    for (const effect of combatant.statusEffects) {
      if (effect.type === "poison") {
        const ratio = combatant.isBoss ? 0.02 : 0.08;
        const damage = Math.max(1, Math.round(combatant.maxHp * ratio));
        const wasAlive = isAlive(combatant);
        combatant.hp = Math.max(0, combatant.hp - damage);
        showBattleStatusVfx(combatant, "poison");
        messages.push(`${combatant.name}は毒で${damage}ダメージ`);
        setBattleEffect(combatant.id, damage, "damage");
        if (wasAlive && !isAlive(combatant) && battleState.enemies.includes(combatant)) {
          registerEnemyDefeat(combatant);
        }
      }
      effect.duration -= 1;
      if (effect.duration > 0) remainingEffects.push(effect);
      else {
        messages.push(`${combatant.name}の${getStatusLabel(effect)}が切れた`);
        showBattleStatusVfx(combatant, "cleanse");
      }
    }
    combatant.statusEffects = remainingEffects;
  }
  return messages;
}

function resolveConfusedCombatantAction(combatant) {
  if (Math.random() >= 0.4) return false;
  showBattleStatusVfx(combatant, "confusion");
  if (Math.random() < 0.5) {
    battleState.message = `${combatant.name}は混乱して行動できない！`;
    return true;
  }
  const targets = [...getAliveParty(), ...getAliveEnemies()];
  if (targets.length === 0) return true;
  const target = targets[Math.floor(Math.random() * targets.length)];
  const result = resolveBattleStrike(combatant, target, {
    attackPower: getEffectiveBattleStat(combatant, "physicalAttack"),
    defensePower: getEffectiveBattleStat(target, "physicalDefense")
  });
  battleState.message = result.hit
    ? `${combatant.name}は混乱して暴れた！ ${target.name}に${result.damage}ダメージ。`
    : `${combatant.name}は混乱して暴れたが、${target.name}にかわされた。`;
  setBattleEffect(target.id, result.hit ? result.damage : null, result.hit ? "damage" : "miss", combatant.id);
  return true;
}

function resolveEnemyAction(enemy) {
  if (!isAlive(enemy)) return;
  if (enemy.statusEffects?.some((effect) => effect.type === "paralysis") && Math.random() < 0.4) {
    battleState.message = `${enemy.name}は麻痺して行動できない！`;
    showBattleStatusVfx(enemy, "paralysis");
    return;
  }
  if (enemy.statusEffects?.some((effect) => effect.type === "confusion")
    && resolveConfusedCombatantAction(enemy)) return;
  let buffMessage = "";
  if (enemy.isBoss && !enemy.bossBuffed && enemy.hp <= enemy.maxHp * 0.5) {
    enemy.bossBuffed = true;
    enemy.physicalAttack *= 1.2;
    enemy.magicAttack *= 1.2;
    buffMessage = `${enemy.name}は星の力を解放した！攻撃力が上昇！ `;
    showBossBattleEffect({
      type: "awakening",
      theme: enemy.bossTheme,
      bossId: enemy.id,
      bossName: enemy.name
    }, 1600);
  }
  const targets = getAliveParty();
  if (targets.length === 0) return;
  let attackName = "攻撃";
  let multiplier = 1;
  let damageType = "physical";
  let targetAll = false;
  let usedBossSpecial = false;
  if (enemy.isBoss) {
    const roll = Math.random();
    if (roll >= 0.4) {
      const specialIndex = roll < 0.7 ? 0 : 1;
      const special = enemy.bossSpecials[specialIndex];
      attackName = special.name;
      multiplier = special.multiplier;
      damageType = special.damageType;
      targetAll = special.target === "all";
      usedBossSpecial = true;
    }
  } else {
    const special = Math.random() >= 0.6;
    if (special) {
      attackName = enemy.specialName;
      multiplier = enemy.specialMultiplier;
    }
  }
  const affectedTargets = targetAll ? targets : [targets[Math.floor(Math.random() * targets.length)]];
  const attack = damageType === "magic" ? enemy.magicAttack : enemy.physicalAttack;
  const results = affectedTargets.map((target) => ({
    target,
    result: resolveBattleStrike(enemy, target, {
      multiplier,
      attackPower: getEffectiveBattleStat(enemy, damageType === "magic" ? "magicAttack" : "physicalAttack"),
      defensePower: getEffectiveBattleStat(target, damageType === "magic" ? "magicDefense" : "physicalDefense")
    })
  }));
  const damageMessages = results.map(({ target, result }) => result.hit
    ? `${target.name}に${result.damage}ダメージ${result.critical ? "（会心）" : ""}`
    : `${target.name}は回避`).join("、");
  const effect = results[results.length - 1];
  setBattleEffect(effect.target.id, effect.result.hit ? effect.result.damage : null, effect.result.hit ? "damage" : "miss", enemy.id, {
    critical: effect.result.critical,
    effects: results.map(({ target, result }) => ({
      targetId: target.id,
      amount: result.hit ? result.damage : null,
      kind: result.hit ? "damage" : "miss",
      critical: result.critical
    }))
  });
  battleState.actionPresentation = {
    actorId: enemy.id,
    actorName: enemy.name,
    actionName: attackName,
    style: damageType === "magic" ? "magic" : "physical",
    targetIds: affectedTargets.map((target) => target.id),
    duration: getBattlePresentationDuration({ style: damageType === "magic" ? "magic" : "physical" }),
    hitCount: 1
  };
  if (enemy.isBoss && usedBossSpecial && !battleState.bossPresentation) {
    showBossBattleEffect({
      type: "special",
      theme: enemy.bossTheme,
      bossId: enemy.id,
      bossName: enemy.name,
      technique: attackName
    });
  } else if (enemy.isBoss && usedBossSpecial && battleState.bossPresentation?.type === "awakening") {
    battleState.bossPresentation.technique = attackName;
  }
  battleState.message = `${buffMessage}${enemy.name}の${attackName}！ ${damageMessages}。`;
}

function runNextBattleAction() {
  if (!battleState || currentScreen !== "battle" || battleState.phase !== "resolving") return;
  if (getAliveParty().length === 0) {
    finishBattle("defeat");
    return;
  }
  if (getAliveEnemies().length === 0) {
    if (beginBossDefeatSequence()) return;
    finishWave();
    return;
  }

  if (battleState.actionIndex >= battleState.actionQueue.length) {
    const statusMessages = processBattleRoundStatuses();
    if (getAliveParty().length === 0) {
      battleState.message = statusMessages.join("。");
      finishBattle("defeat");
      return;
    }
    if (getAliveEnemies().length === 0) {
      if (statusMessages.length) battleState.message = statusMessages.join("。");
      if (beginBossDefeatSequence()) return;
      finishWave();
      return;
    }
    battleState.actions = {};
    battleState.selectedCharacterId = getAliveParty()[0]?.id || battleState.party[0].id;
    battleState.phase = "planning";
    battleState.effect = null;
    battleState.message = statusMessages.length
      ? `${statusMessages.join("。")}。次のターンの行動を予約してください。`
      : "行動が終わりました。次のターンの行動を予約してください。";
    render();
    return;
  }

  const action = battleState.actionQueue[battleState.actionIndex];
  battleState.actionIndex += 1;
  battleState.actionPresentation = null;
  battleState.effect = null;
  if (action.side === "party") {
    resolvePlayerAction(action.combatant);
  } else {
    resolveEnemyAction(action.combatant);
  }
  const actionDelay = Math.max(BATTLE_RULES.actionDelayMs, battleState.actionPresentation?.duration || 0);
  render();
  battleTimer = window.setTimeout(runNextBattleAction, actionDelay);
}

function beginBattleRound() {
  if (!battleState || currentScreen !== "battle" || battleState.phase !== "planning") return;
  if (Object.keys(battleState.actions).length !== getAliveParty().length) return;
  battleState.phase = "resolving";
  battleState.effect = null;
  battleState.actionPresentation = null;
  battleState.actionQueue = [
    ...battleState.party.filter(isAlive).map((combatant) => ({ side: "party", combatant })),
    ...battleState.enemies.filter(isAlive).map((combatant) => ({ side: "enemy", combatant }))
  ];
  battleState.actionIndex = 0;
  battleState.message = "行動開始！味方の予約行動を実行します。";
  render();
  battleTimer = window.setTimeout(runNextBattleAction, 250);
}

function renderGuild() {
  const tabs = [["party", "編成"], ["roster", "仲間一覧"], ["hire", "雇用"], ["equipment", "装備"]];
  let content;
  if (guildTab === "party") {
    const partySlots = Array.from({ length: BATTLE_RULES.maxPartySize }, (_, index) => {
      const characterId = gameData.party[index];
      return characterId
        ? renderGuildCharacterCard(characterId, "party", index)
        : `<article class="member-card party-slot-card is-empty"><span class="party-slot-number">枠 ${index + 1}</span><strong>空き枠</strong><small>控えメンバーから追加できます</small></article>`;
    }).join("");
    const reserveIds = gameData.roster.filter((id) => !gameData.party.includes(id));
    const reserveContent = reserveIds.length
      ? `<div class="member-grid guild-member-grid reserve-member-grid">${reserveIds.map((id) => renderGuildCharacterCard(id, "reserve")).join("")}</div>`
      : `<p class="empty-reserves">控えメンバーはいません。</p>`;
    content = `<section class="guild-party-section">
        <h3>現在のパーティー　${gameData.party.length} / ${BATTLE_RULES.maxPartySize} 人</h3>
        <p>枠の順番が戦闘中の行動順になります。パーティーは1人以上必要です。</p>
        <div class="member-grid guild-member-grid party-slot-grid">${partySlots}</div>
      </section>
      <section class="guild-reserve-section">
        <h3>控えメンバー</h3>
        ${gameData.party.length >= BATTLE_RULES.maxPartySize ? `<p class="party-limit-note">パーティーは4人編成中のため、仲間を追加するには先に誰かを外してください。</p>` : ""}
        ${reserveContent}
      </section>`;
  } else if (guildTab === "roster") {
    content = `<h3>仲間一覧　${gameData.roster.length} / ${CHARACTERS.length} 人</h3>
      <p>雇用済みの仲間のステータスを確認できます。数値には装備の能力補正が含まれます。</p>
      <div class="member-grid guild-member-grid roster-member-grid">${gameData.roster.map((id) => renderGuildCharacterCard(id, "roster")).join("")}</div>`;
  } else if (guildTab === "hire") {
    content = `<h3>仲間を雇用する　所持金 ${gameData.gold} G</h3>
      <p>ステージをクリアすると雇用が解放されます。雇用した仲間は永久に加入します。</p>
      <div class="member-grid guild-member-grid">${Object.entries(RECRUITMENT_DATA).map(([id, recruitment]) => renderRecruitCard(id, recruitment)).join("")}</div>`;
  } else {
    content = renderEquipmentManagement();
  }
  return `<section class="panel page-panel scene-screen scene-guild">
    ${pageHeading("冒険者ギルド", "仲間を集め、パーティーを整えましょう。", "town")}
    ${sceneWelcome("images/npcs/guild_receptionist.png", "ようこそ、冒険者ギルドへ。今日はどんなご用件ですか？")}
    <div class="tabs" role="tablist" aria-label="ギルドメニュー">${tabs.map(([id, label]) => `
      <button class="tab-button" type="button" role="tab" aria-selected="${guildTab === id}" data-action="guild-tab" data-tab="${id}">${label}</button>`).join("")}
    </div>
    <div class="sub-panel">${content}</div>
  </section>`;
}

function renderEquipmentManagement() {
  if (!gameData.roster.includes(equipmentCharacterId)) equipmentCharacterId = gameData.roster[0];
  if (!EQUIPMENT_SLOTS.includes(equipmentSlot)) equipmentSlot = "weapon";
  const character = CHARACTERS.find((entry) => entry.id === equipmentCharacterId);
  const progress = getCharacterProgress(gameData, equipmentCharacterId);
  const equippedId = progress.equipment[equipmentSlot];
  const equippedItem = equippedId ? getEquipmentItem(equippedId) : null;
  const availableItems = gameData.equipmentInventory.filter((item) => item.slot === equipmentSlot);
  const selectedItem = availableItems.find((item) => item.id === equipmentSelectionId)
    || availableItems.find((item) => (!item.jobRequirement || item.jobRequirement === character.job)
      && (!item.equippedBy || item.equippedBy === character.id))
    || availableItems[0]
    || null;
  equipmentSelectionId = selectedItem?.id || "";
  const canEquip = selectedItem
    && (!selectedItem.jobRequirement || selectedItem.jobRequirement === character.job)
    && (!selectedItem.equippedBy || selectedItem.equippedBy === character.id)
    && selectedItem.id !== equippedId;
  const nextEquipment = { ...progress.equipment, [equipmentSlot]: selectedItem?.id || null };
  const currentStats = calculateCharacterStats(character.id, progress.level, progress.equipment);
  const previewStats = calculateCharacterStats(character.id, progress.level, nextEquipment);
  const statLabels = [
    ["maxHp", "最大HP"], ["maxMp", "最大MP"], ["physicalAttack", "物理攻撃"],
    ["physicalDefense", "物理防御"], ["magicAttack", "魔法攻撃"],
    ["magicDefense", "魔法防御"], ["speed", "素早さ"]
  ];
  const statRows = statLabels.map(([key, label]) => {
    const before = currentStats[key];
    const after = previewStats[key];
    const delta = after - before;
    return `<div class="equipment-stat-row"><span>${label}</span><strong>${before} → ${after}</strong><em class="${delta > 0 ? "stat-up" : delta < 0 ? "stat-down" : ""}">${delta > 0 ? "+" : ""}${delta}</em></div>`;
  }).join("");
  const itemOptions = availableItems.map((item) => {
    const compatible = !item.jobRequirement || item.jobRequirement === character.job;
    const ownership = item.equippedBy && item.equippedBy !== character.id
      ? `・${CHARACTERS.find((entry) => entry.id === item.equippedBy)?.name || "装備中"}が装備`
      : "";
    return `<option value="${item.id}" ${item.id === selectedItem?.id ? "selected" : ""} ${compatible && (!item.equippedBy || item.equippedBy === character.id) ? "" : "disabled"}>${item.name}［${EQUIPMENT_RARITIES[item.rarity].name}］${ownership}${compatible ? "" : "・職業不適合"}</option>`;
  }).join("");
  const ownedItems = gameData.equipmentInventory.length
    ? gameData.equipmentInventory.map((item) => {
      const owner = item.equippedBy ? CHARACTERS.find((entry) => entry.id === item.equippedBy)?.name || "装備中" : "未装備";
      const job = item.jobRequirement ? `・${item.jobRequirement}専用` : "";
      return `<article class="equipment-item rarity-${item.rarity}">
        ${equipmentIconMarkup(item.slot, item.rarity)}
        <div class="equipment-item-info">
          <strong>${item.name}</strong>
          <span>${AREAS[item.area - 1].name}・${EQUIPMENT_SLOT_LABELS[item.slot]}${job}</span>
          <small>${formatEquipmentBonuses(item)}</small>
          <small class="equipment-rarity-label">${EQUIPMENT_RARITIES[item.rarity].name}・${owner}</small>
        </div>
      </article>`;
    }).join("")
    : `<p class="help-text">装備品を所持していません。</p>`;
  const equipmentSlotsMarkup = EQUIPMENT_SLOTS.map((slot) => {
    const item = getEquipmentItem(progress.equipment[slot]);
    return `<button class="equipment-slot-card${slot === equipmentSlot ? " is-active" : ""}" type="button" data-action="equipment-select-slot" data-slot="${slot}">
      ${equipmentIconMarkup(slot, item?.rarity || "normal", true)}
      <span>${EQUIPMENT_SLOT_LABELS[slot]}</span><strong class="rarity-${item?.rarity || "normal"}">${item?.name || "装備なし"}</strong>
    </button>`;
  }).join("");
  return `<h3>装備の付け替え</h3>
    <p>装備品は仲間ごとに個別管理され、装備中の品は他の仲間が使用できません。</p>
    <div class="equipment-character-profile">
      ${renderCharacterPortrait(character, "equipment-character-portrait")}
      <div><strong>${character.name}</strong><span>${character.job}・Lv${progress.level}</span></div>
    </div>
    <div class="equipment-controls">
      <label>キャラクター<select data-equipment-character>${gameData.roster.map((id) => {
        const entry = CHARACTERS.find((item) => item.id === id);
        const memberProgress = getCharacterProgress(gameData, id);
        return `<option value="${id}" ${id === character.id ? "selected" : ""}>${entry.name}・${entry.job}・Lv${memberProgress.level}</option>`;
      }).join("")}</select></label>
      <label>装備枠<select data-equipment-slot>${EQUIPMENT_SLOTS.map((slot) => `<option value="${slot}" ${slot === equipmentSlot ? "selected" : ""}>${EQUIPMENT_SLOT_LABELS[slot]}</option>`).join("")}</select></label>
    </div>
    <div class="equipment-slot-list" aria-label="現在の装備">${equipmentSlotsMarkup}</div>
    <div class="equipment-current">
      ${equipmentIconMarkup(equipmentSlot, equippedItem?.rarity || "normal", true)}
      <span>現在の${EQUIPMENT_SLOT_LABELS[equipmentSlot]}</span>
      <strong class="rarity-${equippedItem?.rarity || "normal"}">${equippedItem ? `${equippedItem.name}［${EQUIPMENT_RARITIES[equippedItem.rarity].name}］` : "なし"}</strong>
      <button class="small-button" type="button" data-action="equipment-remove" data-character="${character.id}" data-slot="${equipmentSlot}" ${equippedItem ? "" : "disabled"}>外す</button>
    </div>
    <div class="equipment-preview">
      <label>装備候補<select data-equipment-selection ${availableItems.length ? "" : "disabled"}>${itemOptions || `<option value="">この枠の装備品はありません</option>`}</select></label>
      <div class="equipment-stat-list">${statRows}</div>
      <p class="help-text">${selectedItem ? `${selectedItem.name}・${formatEquipmentBonuses(selectedItem)}${selectedItem.jobRequirement && selectedItem.jobRequirement !== character.job ? `・${selectedItem.jobRequirement}専用のため装備できません` : ""}` : "候補の装備品を所持していません。"}</p>
      <button class="primary-button" type="button" data-action="equipment-equip" data-character="${character.id}" data-slot="${equipmentSlot}" data-item="${selectedItem?.id || ""}" ${canEquip ? "" : "disabled"}>装備する</button>
    </div>
    <h3>所持している装備品　${gameData.equipmentInventory.length} 個</h3>
    <div class="equipment-inventory-list">${ownedItems}</div>`;
}

function formatEquipmentBonuses(item) {
  const labels = {
    maxHp: "最大HP",
    physicalAttack: "物攻",
    physicalDefense: "物防",
    magicAttack: "魔攻",
    magicDefense: "魔防",
    speed: "素早さ"
  };
  return Object.entries(item.bonuses)
    .map(([key, value]) => `${labels[key]} +${value}`)
    .join("・");
}

function equipmentIconMarkup(slot, rarity, compact = false) {
  const art = {
    weapon: '<path d="M16 3 21 8 9 20l-5 1 1-5L17 4"/><path d="m14 6 4 4M4 17l3 3"/>',
    head: '<path d="M4 17a8 8 0 0 1 16 0v2H4z"/><path d="M3 19h18M12 4v5M9 7h6"/>',
    body: '<path d="m8 4 4 2 4-2 5 4-3 4-2-2v10H8V10l-2 2-3-4z"/><path d="m10 6 2 3 2-3"/>',
    feet: '<path d="M9 4h6v8l2 3 4 2v3H4v-3l3-2 2-4z"/><path d="M7 16h11"/>',
    accessory: '<path d="m12 3 2.2 5.1 5.5.5-4.2 3.6 1.3 5.4-4.8-2.9-4.8 2.9 1.3-5.4-4.2-3.6 5.5-.5z"/><path d="M12 18v3"/>'
  }[slot] || '<path d="M12 3 21 12 12 21 3 12z"/>';
  const slotLabel = EQUIPMENT_SLOT_LABELS[slot] || "装備";
  const rarityKey = Object.hasOwn(EQUIPMENT_RARITIES, rarity) ? rarity : "normal";
  return `<span class="equipment-icon-frame equipment-icon-${rarityKey}${compact ? " is-compact" : ""}" role="img" aria-label="${slotLabel}アイコン">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${art}</svg>
  </span>`;
}

function changeParty(characterId, operation, direction = 0) {
  if (!gameData.roster.includes(characterId)) {
    showNotice("加入済みの仲間だけを編成できます。");
    return;
  }
  const currentIndex = gameData.party.indexOf(characterId);
  if (operation === "add") {
    if (currentIndex >= 0) return;
    if (gameData.party.length >= BATTLE_RULES.maxPartySize) {
      showNotice("パーティーは最大4人です。");
      return;
    }
    gameData.party.push(characterId);
  } else if (operation === "remove") {
    if (gameData.party.length <= 1) {
      showNotice("パーティーには最低1人必要です。");
      return;
    }
    if (currentIndex < 0) return;
    gameData.party.splice(currentIndex, 1);
  } else if (operation === "move") {
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= gameData.party.length) return;
    [gameData.party[currentIndex], gameData.party[nextIndex]] = [gameData.party[nextIndex], gameData.party[currentIndex]];
  }
  if (saveGame(STORAGE_KEYS.auto)) {
    render();
    showNotice("パーティー編成を保存しました。");
  }
}

function recruitCharacter(characterId) {
  const recruitment = RECRUITMENT_DATA[characterId];
  const character = CHARACTERS.find((entry) => entry.id === characterId);
  if (!recruitment || !character) return;
  if (gameData.roster.includes(characterId) || getCharacterProgress(gameData, characterId).recruited) {
    showNotice(`${character.name}はすでに加入しています。`);
    return;
  }
  if (gameData.clearedStages < recruitment.unlockStage) {
    showNotice(`ステージ${recruitment.unlockStage}をクリアすると${character.name}を雇用できます。`);
    return;
  }
  if (gameData.gold < recruitment.cost) {
    showNotice(`ゴールドが足りません。必要 ${recruitment.cost} G（所持 ${gameData.gold} G）。`);
    return;
  }
  const startLevel = RECRUIT_START_LEVEL.find((entry) => recruitment.unlockStage <= entry.maxStage)?.level || 1;
  const progress = createCharacterProgress(
    characterId,
    true,
    startLevel,
    recruitmentArea(recruitment.unlockStage)
  );
  gameData.gold -= recruitment.cost;
  gameData.roster.push(characterId);
  addInitialEquipment(characterId, recruitmentArea(recruitment.unlockStage), progress, gameData.equipmentInventory);
  gameData.characterProgress[characterId] = progress;
  if (saveGame(STORAGE_KEYS.auto)) {
    render();
    showNotice(`${character.name}が仲間になりました。${recruitment.cost} Gを支払い、Lv${startLevel}で加入しました。`);
  }
}

function persistEquipmentChange(previousData, message) {
  if (saveGame(STORAGE_KEYS.auto)) {
    render();
    showNotice(message);
    return true;
  }
  gameData = JSON.parse(previousData);
  render();
  return false;
}

function equipOwnedItem(characterId, slot, itemId) {
  const character = CHARACTERS.find((entry) => entry.id === characterId);
  const progress = getCharacterProgress(gameData, characterId);
  const item = getEquipmentItem(itemId);
  if (!character || !gameData.roster.includes(characterId) || !item || item.slot !== slot) {
    showNotice("装備する仲間または装備品を確認してください。");
    return;
  }
  if (item.jobRequirement && item.jobRequirement !== character.job) {
    showNotice(`${item.name}は${item.jobRequirement}専用です。`);
    return;
  }
  if (item.equippedBy && item.equippedBy !== characterId) {
    showNotice(`${item.name}は別の仲間が装備中です。`);
    return;
  }
  const previousData = JSON.stringify(gameData);
  const oldItem = getEquipmentItem(progress.equipment[slot]);
  if (oldItem) oldItem.equippedBy = null;
  progress.equipment[slot] = item.id;
  item.equippedBy = characterId;
  equipmentCharacterId = characterId;
  equipmentSlot = slot;
  equipmentSelectionId = item.id;
  persistEquipmentChange(previousData, `${character.name}に${item.name}を装備しました。`);
}

function removeEquippedItem(characterId, slot) {
  const progress = getCharacterProgress(gameData, characterId);
  const item = getEquipmentItem(progress.equipment[slot]);
  if (!item) {
    showNotice("この装備枠には装備品がありません。");
    return;
  }
  const previousData = JSON.stringify(gameData);
  item.equippedBy = null;
  progress.equipment[slot] = null;
  equipmentCharacterId = characterId;
  equipmentSlot = slot;
  equipmentSelectionId = item.id;
  persistEquipmentChange(previousData, `${item.name}を所持品に戻しました。`);
}

function buyEquipment(area, slot, rarity, jobRequirement) {
  const maxUnlockedArea = Math.min(EQUIPMENT_AREA_DATA.length, Math.floor(gameData.clearedStages / 5) + 1);
  if (!Number.isInteger(area) || area < 1 || area > maxUnlockedArea
    || !["normal", "rare"].includes(rarity) || !EQUIPMENT_SLOTS.includes(slot)
    || (slot === "weapon" && !Object.hasOwn(JOB_WEAPON_TYPES, jobRequirement))
    || (slot !== "weapon" && jobRequirement)) {
    showNotice("この装備品は現在購入できません。");
    return;
  }
  const product = createEquipmentItem(area, slot, rarity, slot === "weapon" ? jobRequirement : null);
  if (!product) {
    showNotice("装備品の情報を確認できません。");
    return;
  }
  if (gameData.gold < product.purchasePrice) {
    showNotice(`ゴールドが足りません。必要 ${product.purchasePrice} G（所持 ${gameData.gold} G）。`);
    return;
  }
  const previousData = JSON.stringify(gameData);
  gameData.gold -= product.purchasePrice;
  gameData.equipmentInventory.push(product);
  equipmentSlot = slot;
  equipmentSelectionId = product.id;
  persistEquipmentChange(previousData, `${product.name}［${EQUIPMENT_RARITIES[rarity].name}］を購入しました。`);
}

function sellEquipment(itemId) {
  const itemIndex = gameData.equipmentInventory.findIndex((entry) => entry.id === itemId);
  const item = gameData.equipmentInventory[itemIndex];
  if (!item) {
    showNotice("売却する装備品が見つかりません。");
    return;
  }
  if (item.equippedBy) {
    const owner = CHARACTERS.find((entry) => entry.id === item.equippedBy);
    showNotice(`${owner?.name || "仲間"}が装備中の品は売却できません。`);
    return;
  }
  const price = Math.floor(item.purchasePrice * 0.4);
  const previousData = JSON.stringify(gameData);
  gameData.equipmentInventory.splice(itemIndex, 1);
  gameData.gold += price;
  persistEquipmentChange(previousData, `${item.name}を売却し、${price} Gを受け取りました。`);
}

function renderGuildCharacterCard(characterId, view, partyIndex = gameData.party.indexOf(characterId)) {
  const character = CHARACTERS.find((entry) => entry.id === characterId);
  if (!character) return "";
  const progress = getCharacterProgress(gameData, characterId);
  const stats = calculateCharacterStats(characterId, progress.level, progress.equipment);
  let controls = "";
  if (view === "party") {
    controls = `<div class="guild-card-actions">
      <button class="small-button order-button" type="button" data-action="party-move" data-character="${characterId}" data-direction="-1" ${partyIndex === 0 ? "disabled" : ""} aria-label="${character.name}を一つ上の順番へ">↑ 順番を上げる</button>
      <button class="small-button order-button" type="button" data-action="party-move" data-character="${characterId}" data-direction="1" ${partyIndex === gameData.party.length - 1 ? "disabled" : ""} aria-label="${character.name}を一つ下の順番へ">↓ 順番を下げる</button>
      <button class="small-button" type="button" data-action="party-remove" data-character="${characterId}" ${gameData.party.length === 1 ? "disabled" : ""}>編成から外す</button>
    </div>`;
  } else if (view === "reserve") {
    controls = `<button class="small-button" type="button" data-action="party-add" data-character="${characterId}" ${gameData.party.length >= BATTLE_RULES.maxPartySize ? "disabled" : ""}>${gameData.party.length >= BATTLE_RULES.maxPartySize ? "4人編成中" : "編成に加える"}</button>`;
  }
  const inParty = partyIndex >= 0;
  const status = inParty ? `編成中・枠 ${partyIndex + 1}` : "控え";
  const statsMarkup = `<div class="guild-stats">
    <span>HP ${stats.maxHp}</span><span>MP ${stats.maxMp}</span>
    <span>物攻 ${stats.physicalAttack}</span><span>物防 ${stats.physicalDefense}</span>
    <span>魔攻 ${stats.magicAttack}</span><span>魔防 ${stats.magicDefense}</span>
    <span>素早さ ${stats.speed}</span><span>EXP ${progress.experience}${progress.level < MAX_CHARACTER_LEVEL ? ` / ${experienceRequiredForLevel(progress.level)}` : " / MAX"}</span>
  </div>`;
  return `<article class="member-card guild-character-card${inParty ? " is-in-party" : ""}${view === "reserve" ? " reserve-character-card" : ""}">
    ${renderCharacterPortrait(character, "guild-character-portrait")}
    ${view === "party" ? `<span class="party-slot-number">枠 ${partyIndex + 1}</span>` : ""}
    <strong>${character.name}</strong><small>${character.job}・Lv${progress.level}${view === "roster" ? `・${status}` : ""}</small>
    ${view === "roster" ? statsMarkup : ""}
    ${controls}
  </article>`;
}

function renderRecruitCard(characterId, recruitment) {
  const character = CHARACTERS.find((entry) => entry.id === characterId);
  const progress = getCharacterProgress(gameData, characterId);
  const recruited = gameData.roster.includes(characterId) || progress.recruited;
  const unlocked = gameData.clearedStages >= recruitment.unlockStage;
  const startLevel = RECRUIT_START_LEVEL.find((entry) => recruitment.unlockStage <= entry.maxStage)?.level || 1;
  const stateLabel = recruited ? `雇用済み・Lv${progress.level}` : unlocked ? "雇用可能" : "未解放";
  const action = recruited
    ? `<button class="small-button" type="button" disabled>加入済み</button>`
    : `<button class="small-button" type="button" data-action="recruit" data-character="${characterId}" ${unlocked ? "" : "disabled"}>雇用する（${recruitment.cost} G）</button>`;
  return `<article class="member-card recruit-card${recruited ? " is-in-party" : ""}">
    ${renderCharacterPortrait(character, "guild-character-portrait")}
    <strong>${character.name}</strong><small>${character.job}・${stateLabel}</small>
    <small>解放条件：ステージ${recruitment.unlockStage}クリア</small>
    <small>加入時：Lv${recruited ? progress.level : startLevel}・費用：${recruitment.cost} G</small>
    ${action}
  </article>`;
}

function renderShop(type) {
  const isEquipment = ["equipment-shop", "weapon-shop", "armor-shop"].includes(type);
  const slotFilter = type === "weapon-shop" ? "weapon" : type === "armor-shop" ? "armor" : null;
  const title = type === "weapon-shop" ? "武器屋"
    : type === "armor-shop" ? "防具屋"
      : type === "equipment-shop" ? "武器・防具屋" : "道具屋";
  const sceneClass = type === "weapon-shop" ? "scene-weapon-shop"
    : type === "armor-shop" ? "scene-armor-shop" : "scene-item-shop";
  const npcPath = type === "weapon-shop" ? "images/npcs/weapon_shopkeeper.png"
    : type === "armor-shop" ? "images/npcs/armor_shopkeeper.png"
      : "images/npcs/item_shopkeeper.png";
  const greeting = type === "weapon-shop" ? "いい武器がそろってるぜ！じっくり見ていきな！"
    : type === "armor-shop" ? "丈夫な防具は命を守る！遠慮なく見ていきな！"
      : "旅の準備は大丈夫？必要なものをそろえていってね。";
  const tabs = [["buy", "購入"], ["sell", "売却"]];
  const actionLabel = shopTab === "buy" ? "購入" : "売却";
  const content = isEquipment
    ? renderEquipmentShopContent(slotFilter)
    : `<h3>${actionLabel}メニュー</h3><p>${actionLabel}機能は準備中です。道具屋の品ぞろえは今後追加予定です。</p>`;
  return `<section class="panel page-panel scene-screen ${sceneClass}">
    ${pageHeading(title, isEquipment ? "装備を整えて、次の冒険に備えましょう。" : "旅に必要な道具をそろえましょう。", "town")}
    ${sceneWelcome(npcPath, greeting)}
    <div class="tabs" role="tablist" aria-label="${title}メニュー">${tabs.map(([id, label]) => `
      <button class="tab-button" type="button" role="tab" aria-selected="${shopTab === id}" data-action="shop-tab" data-tab="${id}">${label}</button>`).join("")}
    </div>
    <div class="sub-panel">
      <h3>${actionLabel}メニュー　所持金 ${gameData.gold} G</h3>
      ${content}
    </div>
  </section>`;
}

function renderEquipmentShopContent(slotFilter = null) {
  if (shopTab === "sell") {
    const sellable = gameData.equipmentInventory.filter((item) => !item.equippedBy
      && (!slotFilter || (slotFilter === "weapon" ? item.slot === "weapon" : item.slot !== "weapon")));
    return sellable.length
      ? `<div class="equipment-shop-grid">${sellable.map((item) => {
        const price = Math.floor(item.purchasePrice * 0.4);
        return `<article class="equipment-shop-card rarity-${item.rarity}">
          ${equipmentIconMarkup(item.slot, item.rarity)}
          <div class="equipment-shop-info">
            <strong>${item.name}</strong>
            <span>${AREAS[item.area - 1].name}・${EQUIPMENT_SLOT_LABELS[item.slot]}${item.jobRequirement ? `・${item.jobRequirement}専用` : ""}</span>
            <small>${formatEquipmentBonuses(item)}</small>
            <small class="equipment-rarity-label">${EQUIPMENT_RARITIES[item.rarity].name}</small>
          </div>
          <button class="small-button" type="button" data-action="equipment-sell" data-item="${item.id}">売却（${price} G）</button>
        </article>`;
      }).join("")}</div>`
      : `<p>売却できる装備品がありません。装備中の品は外してから売却してください。</p>`;
  }

  const highestUnlockedArea = Math.min(EQUIPMENT_AREA_DATA.length, Math.floor(gameData.clearedStages / 5) + 1);
  const products = [];
  for (let area = 1; area <= highestUnlockedArea; area += 1) {
    for (const rarity of ["normal", "rare"]) {
      for (const slot of EQUIPMENT_SLOTS) {
        if (slotFilter && (slotFilter === "weapon" ? slot !== "weapon" : slot === "weapon")) continue;
        const jobs = slot === "weapon" ? Object.keys(JOB_WEAPON_TYPES) : [null];
        for (const job of jobs) {
          const product = createEquipmentItem(area, slot, rarity, job, null, `catalog-${area}-${slot}-${rarity}-${job || "all"}`);
          if (product) products.push(product);
        }
      }
    }
  }
  return `<p>解放済みエリアのノーマル・レア装備を販売しています。レジェンダリー装備は敵からのみ入手できます。</p>
    <div class="equipment-shop-grid">${products.map((item) => `<article class="equipment-shop-card rarity-${item.rarity}">
      ${equipmentIconMarkup(item.slot, item.rarity)}
      <div class="equipment-shop-info">
        <strong>${item.name}</strong>
        <span>${AREAS[item.area - 1].name}・${EQUIPMENT_SLOT_LABELS[item.slot]}${item.jobRequirement ? `・${item.jobRequirement}専用` : ""}</span>
        <small>${formatEquipmentBonuses(item)}</small>
        <small class="equipment-rarity-label">${EQUIPMENT_RARITIES[item.rarity].name}</small>
      </div>
      <button class="small-button" type="button" data-action="equipment-buy" data-area="${item.area}" data-slot="${item.slot}" data-rarity="${item.rarity}" data-job="${item.jobRequirement || ""}" ${gameData.gold < item.purchasePrice ? "disabled" : ""}>購入（${item.purchasePrice} G）</button>
    </article>`).join("")}</div>`;
}

function saveCard(slot, title, description) {
  let record;
  try {
    record = readSave(STORAGE_KEYS[slot]);
  } catch (error) {
    return `<article class="save-card"><div><h3>${title}</h3><p>保存領域を確認できませんでした。</p></div></article>`;
  }
  const key = STORAGE_KEYS[slot];
  if (record.status === "empty") {
    const saveAction = slot === "auto" ? "" : `<button class="small-button" type="button" data-action="save-slot" data-slot="${slot}">セーブ</button>`;
    return `<article class="save-card">
      <div><h3>${title}</h3><p>${description} ・ データなし</p></div>
      <div class="save-actions">${saveAction}</div>
    </article>`;
  }
  if (record.status === "invalid") {
    return `<article class="save-card">
      <div><h3>${title}</h3><p>データ形式が正しくないか、対応していないバージョンです。</p></div>
      <div class="save-actions"><button class="small-button" type="button" data-action="delete-slot" data-slot="${slot}">削除</button></div>
    </article>`;
  }

  const save = record.save;
  const overwriteAction = slot === "auto"
    ? `<button class="small-button" type="button" data-action="save-auto">上書き</button>`
    : `<button class="small-button" type="button" data-action="save-slot" data-slot="${slot}">上書き</button>`;
  return `<article class="save-card">
    <div><h3>${title}</h3><p>${description} ・ ${formatDate(save.savedAt)} ・ 解放 ${save.game.clearedStages + 1} / 25</p></div>
    <div class="save-actions">
      <button class="small-button" type="button" data-action="load-slot" data-slot="${slot}">ロード</button>
      ${overwriteAction}
      <button class="small-button" type="button" data-action="delete-slot" data-slot="${slot}">削除</button>
    </div>
  </article>`;
}

function renderSaves() {
  return `<section class="panel page-panel">
    ${pageHeading("記録の書", "セーブデータを記録・再開できます。", "town")}
    <div class="save-list">
      ${saveCard("auto", "オートセーブ", "冒険の進行を自動で保存")}
      ${saveCard("manual1", "手動セーブ 1", "手動で保存できる枠")}
      ${saveCard("manual2", "手動セーブ 2", "手動で保存できる枠")}
    </div>
    <p class="help-text">セーブデータはこのブラウザのlocalStorageに保存されます。ブラウザのデータを消去すると、記録も削除されます。</p>
  </section>`;
}

function renderSettings() {
  return `<section class="panel page-panel">
    ${pageHeading("設定", "サウンドの設定はこのブラウザに保存されます。", "settings-back", "戻る")}
    <div class="setting-list">
      ${settingRow("bgm", "BGM", "ゲームの背景音楽")}
      ${settingRow("sound", "効果音", "ボタン操作やゲーム内の効果音")}
    </div>
    <p class="help-text">音声再生機能は準備中です。ここではON/OFFの設定を保存できます。</p>
  </section>`;
}

function settingRow(key, title, description) {
  const enabled = settings[key];
  return `<div class="setting-row">
    <div><strong>${title}</strong><small>${description}</small></div>
    <button class="toggle-button" type="button" aria-pressed="${enabled}" data-action="toggle-setting" data-setting="${key}">${enabled ? "ON" : "OFF"}</button>
  </div>`;
}

function renderAbout() {
  return `<section class="panel page-panel">
    ${pageHeading("ゲームについて", "星を取り戻す旅のはじまり。", "title", "タイトルへ")}
    <div class="sub-panel">
      <h3>星明かりの冒険</h3>
      <p>古代の魔物「星喰らい」の封印が弱まり、世界から星の輝きが失われ始めました。</p>
      <p>剣士ルシオンと弓使いシリウスは、世界に平和を取り戻すため、5つのエリア・全25ステージを旅します。</p>
      <p>ターン制戦闘、仲間の雇用・編成、経験値とレベルアップ、装備の収集と強化を楽しめます。</p>
    </div>
  </section>`;
}

function render() {
  updateHeader();
  document.querySelector(".game-shell").classList.toggle("is-battle-layout", currentScreen === "battle");
  const screens = {
    title: renderTitle,
    town: renderTown,
    inn: renderInn,
    map: renderMap,
    "stage-details": renderStageDetails,
    guild: renderGuild,
    "equipment-shop": () => renderShop("equipment-shop"),
    "weapon-shop": () => renderShop("weapon-shop"),
    "armor-shop": () => renderShop("armor-shop"),
    "item-shop": () => renderShop("item-shop"),
    saves: renderSaves,
    settings: renderSettings,
    about: renderAbout,
    catalog: renderCatalog,
    battle: renderBattle,
    "battle-result": renderBattleResult
  };
  app.innerHTML = (screens[currentScreen] || renderTitle)();
  if (currentScreen === "battle") {
    battleState.actionPresentation = null;
    battleState.effect = null;
  } else if (currentScreen === "catalog") {
    updateCatalogImageReport();
  }
}

function getAvailableSaveCount() {
  try {
    return Object.values(STORAGE_KEYS)
      .filter((key) => key !== STORAGE_KEYS.settings)
      .filter((key) => readSave(key).status === "valid").length;
  } catch (error) {
    showNotice(`セーブデータを確認できませんでした。(${error.message})`);
    return 0;
  }
}

function startNewGame() {
  let existingAutoSave;
  try {
    existingAutoSave = localStorage.getItem(STORAGE_KEYS.auto);
  } catch (error) {
    showNotice(`セーブ領域を確認できません。(${error.message})`);
    return;
  }
  if (existingAutoSave !== null && !window.confirm("既存のオートセーブを新しい冒険で上書きします。よろしいですか？")) return;

  gameData = createNewGame();
  const saved = saveGame(STORAGE_KEYS.auto);
  setScreen("town");
  if (saved) showNotice("新しい冒険を始めました。");
}

function loadGameFromSlot(slot) {
  let result;
  try {
    result = readSave(STORAGE_KEYS[slot]);
  } catch (error) {
    showNotice(`セーブデータを読み込めませんでした。(${error.message})`);
    return;
  }
  if (result.status !== "valid") {
    showNotice(result.status === "empty" ? "このスロットにセーブデータはありません。" : "セーブデータの形式またはバージョンが正しくありません。");
    render();
    return;
  }
  if (!window.confirm("このセーブデータをロードしますか？現在の冒険の未保存の変更は失われます。")) return;
  gameData = result.save.game;
  setScreen("town");
  showNotice("冒険をロードしました。");
}

function deleteSave(slot) {
  let result;
  try {
    result = readSave(STORAGE_KEYS[slot]);
  } catch (error) {
    showNotice(`セーブデータを確認できませんでした。(${error.message})`);
    return;
  }
  if (result.status === "empty") {
    showNotice("削除するセーブデータがありません。");
    return;
  }
  const title = slot === "auto" ? "オートセーブ" : `手動セーブ ${slot === "manual1" ? "1" : "2"}`;
  if (!window.confirm(`${title}を削除します。この操作は取り消せません。よろしいですか？`)) return;
  try {
    localStorage.removeItem(STORAGE_KEYS[slot]);
    render();
    showNotice(`${title}を削除しました。`);
  } catch (error) {
    showNotice(`削除に失敗しました。(${error.message})`);
  }
}

function saveManualSlot(slot) {
  if (!gameData) {
    showNotice("先にニューゲームを始めてください。");
    return;
  }
  let current;
  try {
    current = readSave(STORAGE_KEYS[slot]);
  } catch (error) {
    showNotice(`セーブデータを確認できませんでした。(${error.message})`);
    return;
  }
  const label = slot === "manual1" ? "手動セーブ 1" : "手動セーブ 2";
  if (current.status !== "empty" && !window.confirm(`${label}を上書きしますか？`)) return;
  if (saveGame(STORAGE_KEYS[slot])) {
    render();
    showNotice(`${label}にセーブしました。`);
  }
}

function saveAutoWithConfirmation() {
  let current;
  try {
    current = readSave(STORAGE_KEYS.auto);
  } catch (error) {
    showNotice(`オートセーブを確認できませんでした。(${error.message})`);
    return;
  }
  if (current.status !== "empty" && !window.confirm("オートセーブを上書きしますか？")) return;
  if (saveGame(STORAGE_KEYS.auto)) {
    render();
    showNotice("オートセーブしました。");
  }
}

function handleAction(button) {
  const action = button.dataset.action;
  const slot = button.dataset.slot;
  if (debugMode && ![
    "boss-intro-skip", "title", "catalog-tab", "debug-exit", "debug-return",
    "debug-select-character", "debug-toggle-party", "debug-gauge", "debug-heal",
    "debug-start-battle", "battle-attack", "battle-reserve", "battle-command",
    "battle-begin", "battle-return-map", "battle-retry", "battle-retire"
  ].includes(action)) {
    showNotice("デバッグモード中は通常プレイの操作を利用できません。");
    return;
  }
  switch (action) {
    case "boss-intro-skip":
      completeBossEntrance();
      break;
    case "title":
      if (debugMode) {
        exitDebugMode();
        break;
      }
      setScreen("title");
      break;
    case "new-game":
      if (debugMode) {
        showNotice("デバッグ中は通常プレイを開始できません。");
        break;
      }
      startNewGame();
      break;
    case "open-saves":
      setScreen("saves");
      break;
    case "about":
      setScreen("about");
      break;
    case "catalog-open":
      catalogTab = "characters";
      catalogSelection = null;
      setScreen("catalog");
      break;
    case "catalog-tab":
      if (!["characters", "monsters", "debug"].includes(button.dataset.tab)) break;
      if (button.dataset.tab === "debug" && !debugMode) enterDebugMode(catalogTab);
      catalogTab = button.dataset.tab;
      catalogSelection = null;
      render();
      break;
    case "debug-exit":
      exitDebugMode();
      break;
    case "debug-return":
      if (debugMode) {
        window.clearTimeout(battleTimer);
        battleState = null;
        setScreen("catalog");
      }
      break;
    case "debug-select-character":
      if (!debugMode || !CHARACTERS.some((character) => character.id === button.dataset.character)) break;
      debugCharacterId = button.dataset.character;
      render();
      break;
    case "debug-toggle-party": {
      if (!debugMode || !CHARACTERS.some((character) => character.id === button.dataset.character)) break;
      if (debugParty.includes(button.dataset.character)) {
        debugParty = debugParty.filter((id) => id !== button.dataset.character);
      } else if (debugParty.length < BATTLE_RULES.maxPartySize) {
        debugParty.push(button.dataset.character);
      } else {
        showNotice(`テスト編成は最大${BATTLE_RULES.maxPartySize}人です。`);
      }
      render();
      break;
    }
    case "debug-gauge": {
      const gauge = Number(button.dataset.gauge);
      if (!debugMode || ![0, 50, 100].includes(gauge)) break;
      const progress = getCharacterProgress(gameData, button.dataset.character);
      if (!progress || (progress.level < 30 && gauge > 0)) break;
      debugCharacterSettings[button.dataset.character].gauge = gauge;
      render();
      break;
    }
    case "debug-heal": {
      if (!debugMode) break;
      const character = CHARACTERS.find((entry) => entry.id === button.dataset.character);
      if (!character) break;
      const progress = getCharacterProgress(gameData, character.id);
      const stats = calculateCharacterStats(character.id, progress.level, progress.equipment);
      if (!stats) break;
      debugCharacterSettings[character.id].hp = stats.maxHp;
      debugCharacterSettings[character.id].mp = stats.maxMp;
      render();
      showNotice(`${character.name}のHP・MPを全回復しました。`);
      break;
    }
    case "debug-start-battle":
      startDebugBattle();
      break;
    case "catalog-select":
      if (!["characters", "monsters"].includes(button.dataset.type)) break;
      catalogTab = button.dataset.type;
      catalogSelection = { type: button.dataset.type, id: button.dataset.id };
      render();
      break;
    case "catalog-list-back":
      catalogSelection = null;
      render();
      break;
    case "catalog-background":
      if (!["dark", "light", "checker"].includes(button.dataset.background)) break;
      catalogBackground = button.dataset.background;
      render();
      break;
    case "town":
      setScreen("town");
      break;
    case "map":
      setScreen("map");
      break;
    case "stage-details": {
      const stage = Number(button.dataset.stage);
      if (!gameData || !Number.isInteger(stage) || stage < 1 || stage > gameData.clearedStages + 1) return;
      gameData.selectedStage = stage;
      saveGame(STORAGE_KEYS.auto);
      setScreen("stage-details");
      break;
    }
    case "battle-start":
      startBattle();
      break;
    case "battle-attack":
      queueBattleAction(button.dataset.character);
      break;
    case "battle-reserve":
      queueBattleAction(button.dataset.character);
      break;
    case "battle-command": {
      const characterId = button.dataset.character;
      const command = button.dataset.command;
      const member = battleState?.party.find((entry) => entry.id === characterId);
      if (!member || !isAlive(member) || battleState.phase !== "planning") break;
      if (!["attack", "skill", "ultimate", "item"].includes(command)) break;
      if (battleState.commandSelections[characterId] !== command && battleState.actions[characterId]) {
        delete battleState.actions[characterId];
        battleState.message = `${member.name}の行動を変更します。新しい行動を予約してください。`;
      }
      battleState.commandSelections[characterId] = command;
      render();
      break;
    }
    case "battle-begin":
      beginBattleRound();
      break;
    case "battle-return-map":
      window.clearTimeout(battleTimer);
      if (debugMode) {
        battleState = null;
        setScreen("catalog");
        break;
      }
      battleState = null;
      setScreen("map");
      break;
    case "battle-retry":
      startBattle();
      break;
    case "battle-retire":
      if (window.confirm("このステージからリタイアしますか？使用したアイテムは返却されません。")) {
        window.clearTimeout(battleTimer);
        finishBattle("retired");
      }
      break;
    case "guild":
      guildTab = "party";
      setScreen("guild");
      break;
    case "inn":
      setScreen("inn");
      break;
    case "guild-tab":
      guildTab = button.dataset.tab;
      render();
      break;
    case "party-add":
      changeParty(button.dataset.character, "add");
      break;
    case "party-remove":
      changeParty(button.dataset.character, "remove");
      break;
    case "party-move":
      changeParty(button.dataset.character, "move", Number(button.dataset.direction));
      break;
    case "recruit":
      recruitCharacter(button.dataset.character);
      break;
    case "equipment-equip":
      equipOwnedItem(button.dataset.character, button.dataset.slot, button.dataset.item);
      break;
    case "equipment-remove":
      removeEquippedItem(button.dataset.character, button.dataset.slot);
      break;
    case "equipment-select-slot":
      equipmentSlot = button.dataset.slot;
      equipmentSelectionId = "";
      render();
      break;
    case "equipment-buy":
      buyEquipment(Number(button.dataset.area), button.dataset.slot, button.dataset.rarity, button.dataset.job || null);
      break;
    case "equipment-sell":
      sellEquipment(button.dataset.item);
      break;
    case "equipment-shop":
    case "weapon-shop":
    case "armor-shop":
    case "item-shop":
      shopTab = "buy";
      setScreen(action);
      break;
    case "shop-tab":
      shopTab = button.dataset.tab;
      render();
      break;
    case "saves":
      setScreen("saves");
      break;
    case "settings":
      currentScreen = "settings";
      settingsReturnScreen = button.dataset.return || "town";
      render();
      app.focus();
      break;
    case "settings-back":
      setScreen(settingsReturnScreen);
      break;
    case "toggle-setting": {
      const setting = button.dataset.setting;
      if (setting !== "bgm" && setting !== "sound") return;
      settings[setting] = !settings[setting];
      if (saveSettings()) {
        render();
        showNotice(`${setting === "bgm" ? "BGM" : "効果音"}を${settings[setting] ? "ON" : "OFF"}にしました。`);
      } else {
        settings[setting] = !settings[setting];
        render();
      }
      break;
    }
    case "save-slot":
      if (debugMode) {
        showNotice("デバッグ中はセーブできません。");
        break;
      }
      saveManualSlot(slot);
      break;
    case "save-auto":
      if (debugMode) {
        showNotice("デバッグ中はセーブできません。");
        break;
      }
      saveAutoWithConfirmation();
      break;
    case "load-slot":
      if (debugMode) {
        showNotice("デバッグ中はロードできません。");
        break;
      }
      loadGameFromSlot(slot);
      break;
    case "delete-slot":
      if (debugMode) {
        showNotice("デバッグ中はセーブデータを削除できません。");
        break;
      }
      deleteSave(slot);
      break;
    case "not-ready":
      showNotice("この機能は準備中です。");
      break;
    default:
      break;
  }
}

let settingsReturnScreen = "town";

app.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  if (image.matches("img[data-catalog-type][data-catalog-id]")) {
    catalogImageStatus[image.dataset.catalogType][image.dataset.catalogId] = "missing";
    updateCatalogImageReport();
    return;
  }
  if (!image.closest(".character-portrait")) return;
  image.hidden = true;
  const fallback = image.nextElementSibling;
  if (fallback instanceof HTMLElement) fallback.hidden = false;
}, true);

app.addEventListener("animationend", (event) => {
  const element = event.target;
  if (!(element instanceof HTMLElement)) return;
  if (element.matches(".battle-action-vfx") && event.animationName === "action-vfx-fade") {
    element.remove();
    return;
  }
  if (!element.matches(".battle-unit")) return;
  for (const className of [...element.classList]) {
    if (className === "is-attacking" || className === "is-hit"
      || className.startsWith("is-vfx-") || className.startsWith("vfx-")) {
      element.classList.remove(className);
    }
  }
}, true);

app.addEventListener("click", (event) => {
  if (event.target.closest("[data-boss-intro]")) {
    completeBossEntrance();
    return;
  }
  const card = event.target.closest("[data-battle-select]");
  if (card && currentScreen === "battle" && battleState?.phase === "planning") {
    const member = battleState.party.find((entry) => entry.id === card.dataset.battleSelect);
    if (!member) return;
    battleState.selectedCharacterId = member.id;
    render();
    return;
  }
  const button = event.target.closest("button[data-action]");
  if (button && !button.disabled) handleAction(button);
});

app.addEventListener("keydown", (event) => {
  const card = event.target.closest("[data-battle-select]");
  if (!card || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault();
  if (currentScreen !== "battle" || battleState?.phase !== "planning") return;
  const member = battleState.party.find((entry) => entry.id === card.dataset.battleSelect);
  if (!member) return;
  battleState.selectedCharacterId = member.id;
  render();
});

document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  if (debugMode) {
    exitDebugMode();
    return;
  }
  if (currentScreen === "battle" && battleState) {
    showNotice("戦闘中は画面を移動できません。ステージ結果から冒険マップへ戻ってください。");
    return;
  }
  setScreen("title");
});

app.addEventListener("change", (event) => {
  const debugLevel = event.target.closest("select[data-debug-level]");
  if (debugLevel && debugMode) {
    setDebugCharacterLevel(debugLevel.dataset.debugLevel, debugLevel.value);
    render();
    return;
  }
  const debugStageSelector = event.target.closest("select[data-debug-stage]");
  if (debugStageSelector && debugMode) {
    const stage = Number(debugStageSelector.value);
    if (Number.isInteger(stage) && stage >= 1 && stage <= 25) debugStage = stage;
    render();
    return;
  }
  const equipmentSelector = event.target.closest("select[data-equipment-character], select[data-equipment-slot], select[data-equipment-selection]");
  if (equipmentSelector && currentScreen === "guild") {
    if (equipmentSelector.dataset.equipmentCharacter) {
      equipmentCharacterId = equipmentSelector.value;
      equipmentSelectionId = "";
    } else if (equipmentSelector.dataset.equipmentSlot) {
      equipmentSlot = equipmentSelector.value;
      equipmentSelectionId = "";
    } else {
      equipmentSelectionId = equipmentSelector.value;
    }
    render();
    return;
  }
  const selector = event.target.closest("select[data-enemy-for], select[data-item-for], select[data-ally-for], select[data-skill-for]");
  if (!selector || currentScreen !== "battle" || battleState.phase !== "planning") return;
  const memberId = selector.dataset.enemyFor || selector.dataset.itemFor || selector.dataset.allyFor || selector.dataset.skillFor;
  const member = battleState.party.find((entry) => entry.id === memberId);
  if (!member) return;

  const targets = battleState.targetSelections[memberId] || {};
  if (selector.dataset.enemyFor) targets.enemyId = selector.value;
  if (selector.dataset.itemFor) targets.itemId = selector.value;
  if (selector.dataset.allyFor) targets.allyId = selector.value;
  if (selector.dataset.skillFor) targets.skillId = selector.value;
  battleState.targetSelections[memberId] = targets;
  if (battleState.actions[memberId]) {
    delete battleState.actions[memberId];
    battleState.message = `${member.name}の予約を解除しました。新しい行動を予約してください。`;
  }
  render();
});

loadSettings();
render();
