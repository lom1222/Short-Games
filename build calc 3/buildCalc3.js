
var totalLvl = 1;
//Name, color, position, imgs
var trees = {
  Druid : {name : "Druid", color : "green", pos : 1, imgs : ["druidBack_1", "druidBack_2"], lvls : 0, minLvl : 0, hasRequirements : true, tierDivs : null},
  Priest : {name : "Priest", color : "blue", pos : 2, imgs : ["priestBack"], lvls : 0, minLvl : 0, hasRequirements : true, tierDivs : null},
  Occultist : {name : "Occultist", color : "red", pos : 3, imgs : ["occultBack"], lvls : 0, minLvl : 0, hasRequirements : true, tierDivs : null},
  // Essence : {name : "Essence", color : "white", pos : 4, imgs : ["essenceBack"], lvls : 0, minLvl : 0, hasRequirements : false, tierDivs : null}
};

// requirement
var tiers = {
  1 : {tier: 1, req : 0, Druid : 0, Priest : 0, Occultist : 0},
  2 : {tier: 2, req : 4, Druid : 0, Priest : 0, Occultist : 0},
  3 : {tier: 3, req : 8, Druid : 0, Priest : 0, Occultist : 0},
  4 : {tier: 4, req : 12, Druid : 0, Priest : 0, Occultist : 0},
  5 : {tier: 5, req : 16, Druid : 0, Priest : 0, Occultist : 0},
  6 : {tier: 6, req : 20, Druid : 0, Priest : 0, Occultist : 0},
  7 : {tier: 7, req : 24, Druid : 0, Priest : 0, Occultist : 0},
  8 : {tier: 8, req : 28, Druid : 0, Priest : 0, Occultist : 0},
  9 : {tier: 9, req : 32, Druid : 0, Priest : 0, Occultist : 0},
  10 : {tier: 10, req : 36, Druid : 0, Priest : 0, Occultist : 0}
};

var hideUnusedTalents = false;
var tagSearch = false;
var hideBackground = false;

var talentColumns = 5;


//id, Name, Tree, tier, position, maxLevel, level, tooltip, aura, img
var talents = {
  abundantGrowth :        {id : 1,    name : "Abundant Growth",         tree : "Druid",       tier : 1,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "renew, mana",  tooltip : "Renew's heal has a 15/30/45% chance of restoring 5 mana", special : "", quality : "", img : "abundantGrowth"},
  //anticipation :          {id : 2,    name : "Anticipation",            tree : "Occultist",   tier : 1,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "anticipation"},
  aspectOfTheTreefolk :   {id : 3,    name : "Aspect Of The Treefolk",  tree : "Druid",       tier : 3,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "tank hp, tank mitigation",  tooltip : "Increase tank's HP by 5/10/15%, tank gains 3/6/9% damage reduction", special : "", quality : "", img : "aspectOfTheTreefolk"},
  auraMastery :           {id : 4,    name : "Aura Mastery",            tree : "Priest",      tier : 4,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "aura, party damage",  tooltip : "Reduce max mana reservation by 17/34/51% for auras, all party members deal 1/2/3% more damage per aura on them", special : "", quality : "", img : "auraMastery"},
  blessingOfTheForest :   {id : 5,    name : "Blessing Of The Forest",  tree : "Druid",       tier : 4,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "healpower, regen",  tooltip : "Increase healpower by 80/160/240, every 6 seconds all party members are healed for 6/12/18% of missing HP", special : "", quality : "", img : "blessingOfTheForest"},
  botanist :              {id : 6,    name : "Botanist",                tree : "Druid",       tier : 5,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "renew, healing",  tooltip : "Increase renew's effect by 1/2/3%, renew also heals for 10/15/20% of total heal at end of duration", special : "", quality : "", img : "botanist"},
  chaosStrike :           {id : 7,    name : "Chaos Strike",            tree : "Occultist",   tier : 5,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "berzerker crit damage, chaos strike, spell",  tooltip : "Increase berzeker crit damage by 20/40/60%, berzerker will occasionally cast chaos strike, chaos strike deals 110/115/120% berzerker damage, chaos strike always crits", special : "Chaos strike has a 7-11 second cooldown", quality : "Increase berzerker damage by 2% and chaos strike damage by 8%", img : "chaosStrike"},
  conjuration :           {id : 8,    name : "Conjuration",             tree : "Druid",       tier : 1,   pos : 3,  maxLvl : 5,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "healpower",  tooltip : "Increase healpower by 15/20/45/60/75", special : "", quality : "Increase healpower by 30", img : "conjuration"},
  darkMagic :             {id : 9,    name : "Dark Magic",              tree : "Occultist",   tier : 1,   pos : 1,  maxLvl : 4,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "party damage",  tooltip : "Increase party damage, tank by 4/8/12/16, berzerker by 9/18/27/36, ranger by 3/6/9/12, healer by 2/4/6/8", special : "", quality : "increase pary damage by 2%", img : "darkMagic"},
  decayAura :             {id : 10,   name : "Decay Aura",              tree : "Occultist",   tier : 3,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : true,    levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "enemy degen, enemy increased damage taken, aura",  tooltip : "All enemies lose 10/20/30% healpower HP per second and take 1/2/3% more damage, reserves 5/10/15% max mana", special : "", quality : "", img : "decayAura"},
  deception :             {id : 11,   name : "Deception",               tree : "Occultist",   tier : 4,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "party reduced damage taken, party increased damage taken, party health",  tooltip : "Party takes 30/40/50% mroe damage while over 50% HP, party takes 10/20/30% less damage while below 50% HP, increase party HP by 0.8% per sacrificed talent point", special : "", quality : "", img : "deception"},
  demonify :              {id : 12,   name : "Demonify",                tree : "Occultist",   tier : 8,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "dead, damage, spell",  tooltip : "Dead characters can still attack for 20/40/60% damage and cast spells", special : "", quality : "", img : "demonify"},
  demonKnowledge :        {id : 13,   name : "Demon Knowledge",         tree : "Occultist",   tier : 2,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "party damage",  tooltip : "Increase party damage by 3.5/7/10.5%", special : "", quality : "Increase party crit strike chance by 2%", img : "demonKnowledge"},
  //desperatePrayer :       {id : 14,   name : "Desperate Prayer",        tree : "Priest",      tier : 1,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "desperatePrayer"},
  devotion :              {id : 15,   name : "Devotion",                tree : "Priest",      tier : 8,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "party health, lesser heal, radiant heal, healing, shield effect",  tooltip : "Increase party HP by 4/8/12%, Increase lesser/radiant heal effect by 10/20/30%, all shield effects by 10/20/30%", special : "", quality : "", img : "devotion"},
  divineAegis :           {id : 16,   name : "Divine Aegis",            tree : "Priest",      tier : 7,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "tank block, tank healing",  tooltip : "Increase tank block chance by 2/4/6%, tank is healed for 1/2/3% max HP on block", special : "", quality : "", img : "divineAegis"},
  eclipse :               {id : 17,   name : "Eclipse",                 tree : "Druid",       tier : 2,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "party health",  tooltip : "Increase party HP by 3/6/9%", special : "", quality : "Increase party HP by 2%", img : "eclipse"},
  eradication :           {id : 18,   name : "Eradication",             tree : "Occultist",   tier : 2,   pos : 1,  maxLvl : 4,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "enemy increased damage taken",  tooltip : "Target takes 1/2/3/4% more damage for each 20% life missing", special : "", quality : "", img : "eradication"},
  evergreen :             {id : 19,   name : "Evergreen",               tree : "Druid",       tier : 5,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "mana regen, renew cooldown, dispel cooldown, radiant heal cooldown, rejuvenate cooldown",  tooltip : "Increase mana regen by 0/5/1/1.5, reduce renew's, dispels's, radiant heal's, rejuvenate's cooldown by 15/20/45%", special : "", quality : "", img : "evergreen"},
  fortificationAura :     {id : 20,   name : "Fortification Aura",      tree : "Priest",      tier : 3,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : true,    levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "aura, party reduced damage taken",  tooltip : "Gain an aura that reduces all damage taken by 2/4/6%, reserves 6/12/18% max mana", special : "", quality : "", img : "fortificationAura"},
  harmony :               {id : 21,   name : "Harmony",                 tree : "Druid",       tier : 2,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "renew effect, healpower",  tooltip : "Increase renew's effect by 3/6/9%, Increase healpower by 7/14/21", special : "", quality : "Increase renew's effect by 3%", img : "harmony"},
  havocAura :             {id : 22,   name : "Havoc Aura",              tree : "Occultist",   tier : 3,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : true,    levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "aura, party crit chance",  tooltip : "Gain an aura that increases party crit chance by 2.5/5/7.5%, reserves 6/12/18% max mana", special : "", quality : "", img : "havocAura"},
  helpingHands :          {id : 23,   name : "Helping Hands",           tree : "Priest",      tier : 2,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "healing, lesser heal",  tooltip : "Your lesser heal also heals 1 extra wounded target for 25/35/45% healing done to the main target", special : "", quality : "", img : "helpingHands"},
  heroism :               {id : 24,   name : "Heroism",                 tree : "Priest",      tier : 4,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "tank health, party reduced damage taken",  tooltip : "Increase tank's health by 50/100/150, redirect 5/10/15% damage taken by all party members to tank", special : "", quality : "", img : "heroism"},
  lastStand :             {id : 25,   name : "Last Stand",              tree : "Priest",      tier : 5,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "tank health, tank damage",  tooltip : "Increase tank health by 3/6/9%, tank deals 60/120/180% more damage while under 30% HP", special : "", quality : "", img : "lastStand"},
  leadership :            {id : 26,   name : "Leadership",              tree : "Priest",      tier : 5,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "tank health, tank damage, inspire, party regen, party reduced damage taken, tank attack speed, spell",  tooltip : "Increase tank health and damage by 2/4/6%, tank will occasionally cast inspire, inspire gives 20/40/60 party HP regen and 2/3/4% party damage", special : "Inspire has a 6-8 second cooldown<br>Lasts 3 seconds", quality : "Increase tank attack speed by 5% and inspire damage buff by 2%", img : "leadership"},
  lightsGuidance :        {id : 27,   name : "Light's Guidance",        tree : "Priest",      tier : 3,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "lesser heal, radisnt heal, flash heal, reduced damage taken",  tooltip : "Increase lesser/radiant/flash heal effect by 5/10/15%, your lesser/radiant/flash heal also reduces target's damage taken by 1/2/3% for 5 seconds", special : "", quality : "", img : "lightsGuidance"},
  //manaShield :            {id : 28,   name : "Mana Shield",             tree : "Occultist",   tier : 3,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "manaShield"},
  markOfDeath :           {id : 29,   name : "Mark Of Death",           tree : "Occultist",   tier : 7,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "tank block, enemy increased damage taken",  tooltip : "Increase tank block chance by 2/4/6%, tank's attacks have 5/10/15% chance to mark target, market target takes 6/12/18% more damage", special : "", quality : "", img : "markOfDeath"},
  naturesBlessing :       {id : 30,   name : "Nature's Blessing",       tree : "Druid",       tier : 1,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "renew duration",  tooltip : "Increase renew's duration by 1/2/3 seconds", special : "", quality : "", img : "naturesBlessing"},
  newSpring :             {id : 31,   name : "New Spring",              tree : "Druid",       tier : 5,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "rejuvenate, mana, party healing, regen",  tooltip : "Increase rejuvenate's mana gain by 2/4/6, rejuvenate now heals party for 0.7/1.4/2.1% max HP per tick", special : "", quality : "", img : "newSpring"},
  nimbleAura :            {id : 32,   name : "Nimble Aura",             tree : "Druid",       tier : 3,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : true,    levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "party attack speed, party dodge, aura",  tooltip : "Increase party attack speed by 3/6/9%, increase party dodge chance by 2/4/6%, reserves 8/16/24% max mana", special : "", quality : "", img : "nimbleAura"},
  obliterate :            {id : 33,   name : "Obliterate",              tree : "Occultist",   tier : 8,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "party damage, party attack speed, party crit chance, party crit damage",  tooltip : "Increase party damage by 4/8/12%, attack speed by 1.5/3/4.5%, crit chance by 1/2/3%, crit damage by 5/10/15%", special : "", quality : "Increase party crit damage by 15%", img : "obliterate"},
  pathOfLight :           {id : 34,   name : "Path Of Light",           tree : "Priest",      tier : 1,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "lesser heal effect",  tooltip : "Increase lesser heal's effect by 10/20/30%", special : "", quality : "Increase lesser heal's effect by 8%", img : "pathOfLight"},
  pathsEnd :              {id : 35,   name : "Paths End",               tree : "Priest",      tier : 1,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "dead, increased healing done",  tooltip : "During spirirt form (healer dead), healing done is increased by 20/30/40%", special : "", quality : "", img : "pathsEnd"},
  poison :                {id : 36,   name : "Poison",                  tree : "Druid",       tier : 2,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "ranger damage, poison",  tooltip : "Increase Ranger's damage by 5/10/15%, Ranger's attacks have a 5% chance to poison enemy for 5 seconds dealing 15/25/35*8% ranger's damage per second", special : "", quality : "Increase poison damage by 6%", img : "poison"},
  protectionAura :        {id : 37,   name : "Protection Aura",         tree : "Priest",      tier : 3,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : true,    levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "aura, party health",  tooltip : "Gain an aura that increases all party members health by 4/8/12%, reserves 5/10/15% max mana", special : "", quality : "", img : "protectionAura"},
  rapidShot :             {id : 38,   name : "Rapid Shot",              tree : "Druid",       tier : 5,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase ranger's damage by 3/6/9%, ranger will occasionally cast rapid shot, rapid shot fires 6 arrows and has 80% crit chance, each arrow deals 32/44/56% ranger damage", special : "Rapid shot has a 6-9 second cooldown", quality : "Increase rapid shot damage by 8%", img : "rapidShot"},
  regenAura :             {id : 39,   name : "Regen Aura",              tree : "Druid",       tier : 4,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : true,    levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "All party members regenerate 1/2/3+(1/2/3% healpower) HP per second, Reserves 11/22/33% max mana", special : "", quality : "", img : "regenAura"},
  resilience :            {id : 40,   name : "Resilience",              tree : "Priest",      tier : 1,   pos : 2,  maxLvl : 4,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party HP, tank by 40/80/120/160, berzerker by 35/70/105/140, ranger by 25/50/75/100, healer by 30/60/90/120", special : "", quality : "Increase all party members HP by 1%", img : "resilience"},
  shieldBash :            {id : 41,   name : "Shield Bash",             tree : "Priest",      tier : 3,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase tank's block chance by 1/2/3%, Tank's attacks have a 10/15/20% chance to deal bonus damage equal to 20/25/30+(tank block chance)% of tank damage", special : "", quality : "Increase tank's block chance by 1% and shield bash damage by 8%", img : "shieldBash"},
  soulBoost :             {id : 42,   name : "Soul Boost",              tree : "Occultist",   tier : 2,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Lesser/radiant/flash heal also increases target's damage by 7/14/21%", special : "", quality : "", img : "soulBoost"},
  strengthen :            {id : 43,   name : "Strengthen",              tree : "Priest",      tier : 2,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase total healpower by 2.5/5/7.5%", special : "", quality : "Increase total healpower by 2%", img : "strengthen"},
  surge :                 {id : 44,   name : "Surge",                   tree : "Occultist",   tier : 1,   pos : 3,  maxLvl : 5,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party attack speed by 4/8/12/16/20%", special : "", quality : "", img : "surge"},
  survivalInstincts :     {id : 45,   name : "Survival Instincts",      tree : "Druid",       tier : 6,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase tank's HP by 85/170/235, tank gains 15/20/25% damage reduction while below 35% HP", special : "", quality : "", img : "survivalInstincts"},
  timeInNeed :            {id : 46,   name : "Time In Need",            tree : "Priest",      tier : 5,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Every 7 seconds tank is healed for 5/10/15% of his max health", special : "", quality : "", img : "timeInNeed"},
  tranquility :           {id : 47,   name : "Tranquility",             tree : "Druid",       tier : 7,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party healing received by 6/12/18%", special : "", quality : "", img : "tranquility"},
  typhoon :               {id : 48,   name : "Typhoon",                 tree : "Druid",       tier : 4,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "A storm will occasionally spawn, slowing all enemies' attack speed by 5/10/15% and increasing damage taken by 3/6/9%", special : "Typhoon has a 8-11 second cooldown, lasts 5 seconds", quality : "", img : "typhoon"},
  unstableMagic :         {id : 49,   name : "Unstable Magic",          tree : "Occultist",   tier : 8,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 30/60/90%, reduce party healing received by 15/30/45%", special : "", quality : "", img : "unstableMagic"},
  vampirism :             {id : 50,   name : "Vampirism",               tree : "Occultist",   tier : 3,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party HP by 1.5/3/4.5%, heroes heal for 1/2/3% damage dealt on attack", special : "", quality : "", img : "vampirism"},
  voodooMagic :           {id : 51,   name : "Voodoo Magic",            tree : "Occultist",   tier : 5,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party HP by 2/4/6%, first time a hero dies, they are healed to 20/40/60% max HP instead", special : "", quality : "", img : "voodooMagic"},
  naturesGift :           {id : 60,   name : "Nature's Gift",           tree : "Druid",       tier : 2,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace radiant heal with nature's gift, nature's gift heals all party members for 6/12/18% healpower over 5 seconds", special : "", quality : "", img : "naturesGift"},
  spiritRitual :          {id : 67,   name : "Spirit Ritual",           tree : "Druid",       tier : 3,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace lesser heal with spirit ritual, spirit ritual consumes all renew and nature's gift effects on the target and shields them for 50/60/70% of effects remaining healing for 4 seconds", special : "", quality : "", img : "naturesGift"},
  poisonMastery :         {id : 68,   name : "Poison Mastery",          tree : "Druid",       tier : 6,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase poison's damage by 10/20/30%, increase ranger's crit chance by 1/2/3%, poison damage can now crit with 50/60/70% of ranger's crit chance and damage", special : "", quality : "", img : "poisonMastery"},
  heightenedSenses :      {id : 70,   name : "Heightened Senses",       tree : "Druid",       tier : 6,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Whenever a hero dodges an attack, gain 2/4/6 healpower and ranger gains 2/4/6 damage for 3 seconds, stacks", special : "", quality : "", img : "empty"},
  starCall :              {id : 71,   name : "Star Call",               tree : "Druid",       tier : 7,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace flash heal with star call, star call deals 70/140/210% healpower damage to target enemy", special : "", quality : "", img : "empty"},
  reactiveInstinct :      {id : 72,   name : "Reactive Instinct",       tree : "Druid",       tier : 7,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "+5/10/15% party dodge chance after enemy spell cast", special : "", quality : "", img : "reactiveInstinct"},
  renewingMist :          {id : 73,   name : "Renewing Mist",           tree : "Druid",       tier : 8,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase all shield power by 3/6/9%, spirit ritual has a 10/15/20% chance of not consuming renew and nature's blessing effects", special : "", quality : "", img : "renewingMist"},
  astralShift :           {id : 74,   name : "Astral Shift",            tree : "Druid",       tier : 8,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Every 10 seconds gain 30% healpower for 5 seconds, then gain 70% cast speed for 5 seconds", special : "", quality : "", img : "astralShift"},
  carefulAim :            {id : 75,   name : "Careful Aim",             tree : "Druid",       tier : 8,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase rapid shot's cast speed by 1.5/3/4.5 seconds, increase rapid shot's cooldown by 2/4/6 seconds, increase rapid shot damage by 30/40/50%, +1/2/3 rapid shot arrow", special : "", quality : "", img : "carefulAim"},
  stoneForm :             {id : 76,   name : "Stone Form",              tree : "Druid",       tier : 8,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Tank deals 10/20/30% more damage, tank gains 7/14/21% HP, other heroes gain 3/6/9% HP", special : "", quality : "", img : "empty"},
  holyShield :            {id : 77,   name : "Holy Shield",             tree : "Priest",      tier : 2,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace renew with holy shield, holy shield places a protective shield around target, absorbing damage equal to 17/34/51% healpower", special : "", quality : "", img : "holyShield"},
  smite :                 {id : 78,   name : "Smite",                   tree : "Priest",      tier : 4,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace flash heal with smite, smite the current target, dealing damage equal to 10/20/30% healpower + 60/120/180% healer damage, smited target takes 2/4/6% increased damage for 4 seconds", special : "", quality : "", img : "smite"},
  oracle :                {id : 79,   name : "Oracle",                  tree : "Priest",      tier : 5,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase all shield effects by 20/40/60%, reduces healing done by 15/20/45%", special : "", quality : "", img : "oracle"},
  angelicInfusion :       {id : 80,   name : "Angelic Infusion",        tree : "Priest",      tier : 6,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace rejuvenate with angelic infusion, angelic infusion increases healpower by 50/70/90% and cast speed by 50/100/150% for 6 seconds", special : "", quality : "", img : "empty"},
  piety :                 {id : 81,   name : "Piety",                   tree : "Priest",      tier : 6,   pos : 2,  maxLvl : 2,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party health by 3/6%, increase healpower by 2/4%, reduce cooldown of renew/holy shield/flash heal/smite by 0.5/1 seconds", special : "", quality : "", img : "piety"},
  bodyAndMind :           {id : 82,   name : "Body And Mind",           tree : "Priest",      tier : 6,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase all shield effects by 4/8/12%, party members deal 3/6/9% more damage and take 1/2/3% less damage when shielded", special : "", quality : "", img : "bodyAndMind"},
  rapture :               {id : 83,   name : "Rapture",                 tree : "Priest",      tier : 7,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase all shield effects by 3/6/9%, when a shield is fully absorbed, gain 2/4/6 mana and deal 40/80/120% of damage absorbed to all enemies", special : "", quality : "", img : "rapture"},
  twistOfFate :           {id : 84,   name : "Twist Of Fate",           tree : "Priest",      tier : 7,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healer's critical strike chance by 3/6/9%, increase smite damage by 5/10/15%, healer crits reduce smite cooldown by 1 second and make next smite deal 25/50/75% more damage", special : "", quality : "", img : "empty"},
  finalVerdict :          {id : 85,   name : "Final Verdict",           tree : "Priest",      tier : 8,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase flash heal effect by 10/20/30%, decrease cooldown by 2/4/6 seconds, and reduce mana cost by 30/60/90%", special : "", quality : "", img : "finalVerdict"},
  holyHalo :              {id : 86,   name : "Holy Halo",               tree : "Priest",      tier : 8,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 2/4/6%, radiant heal effect by 8/16/24%, cast time by 0.3/0.6/0.9 seconds, radiant heal now also shields all party members for 4/8/12% healpower for 3 seconds", special : "", quality : "", img : "holyHalo"},
  sacrifice :             {id : 87,   name : "Sacrifice",               tree : "Occultist",   tier : 1,   pos : 2,  maxLvl : 99,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Sacrifice a talent point (1/5 game, developer is bad)", special : "", quality : "", img : "sacrifice"},
  siphonLife :            {id : 88,   name : "SiphonLife",              tree : "Occultist",   tier : 2,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace lesser heal with siphon life, siphon life deals 6/12/18% healpower damage to boss and heals target for 70/80/90% damage dealt, siphon life deals 5% more damage per sacrificed talent point", special : "", quality : "", img : "siphonLife"},
  banish :                {id : 89,   name : "Banish",                  tree : "Occultist",   tier : 3,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Replace flash heal with banish, places a curse on all enemies, reducing their damage by 5/10/15% for 4 seconds, banish further reduces damage by 0.5% per sacrificed talent point", special : "", quality : "", img : "banish"},
  hexing :                {id : 90,   name : "Hexing",                  tree : "Occultist",   tier : 4,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Banish also reduces attack speed by 5/10/15%, reduce banish cooldown by 1 second, banish further reduces attack speed by 0.5% per sacrificed talent point", special : "", quality : "", img : "hexing"},
  misery :                {id : 91,   name : "Misery",                  tree : "Occultist",   tier : 4,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase mana regen by 0.5/1/1.5, reduce lesser heal/siphon life cast time by 0.07/0.14/0.21 seconds, flash heal/banish cooldown by 0.7/1.4/2.1 seconds, rejuvenate/cataclysm cooldown by 25/50/75 seconds", special : "", quality : "", img : "misery"},
  unholyMight :           {id : 92,   name : "Unholy Might",            tree : "Occultist",   tier : 6,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase berzerker damage by 5/10/15%, berzerker crits reduce chaos strike cooldown by 0.2/0.4/0.6 seconds, increase berzerker attack speed by 1% per sacrificed talent point", special : "", quality : "", img : "empty"},
  reaperOfSouls :         {id : 93,   name : "Reaper Of Souls",         tree : "Occultist",   tier : 6,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Siphon life has 10/20/30% increased damage, 3/6/9% reduced healing, and heals 1/2/2 extra party members, increase siphon life damage and healing by 1% per sacrificed talent point", special : "", quality : "", img : "reaperOfSouls"},
  voidChains :            {id : 94,   name : "Void Chains",             tree : "Occultist",   tier : 6,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party damage by 3/6/9%, health by 3/6/9%, reduce enemy healing and regen by 10/20/30%, further reduces all enemy healing and regen by 0.7% per sacrificed talent point", special : "", quality : "", img : "empty"},
  demonSkin :             {id : 95,   name : "Demon Skin",              tree : "Occultist",   tier : 7,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party dodge chance by 3/6/9%, further increases party dodge chance by 0.1% per sacrificed talent point", special : "", quality : "", img : "demonSkin"},
  cataclysm :             {id : 96,   name : "Cataclysm",               tree : "Occultist",   tier : 10,  pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase perty fire res by 2/4/6%, Healer occasionally casts cataclysm, cataclysm deals 70/140/210 healpower fire damage 8 times to boss and 2% of that to party, deals 1% more damage per sacrifice point", special : "8-11 sec cooldown", quality : "", img : "cataclysm"},
  bloodRitual :           {id : 97,   name : "Blood Ritual",            tree : "Occultist",   tier : 7,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 8/16/24%, and party HP by 7/14/21%, Increase healpower and party HP by 1% per sacrificed talent point", special : "", quality : "", img : "bloodRitual"},
  hymn :                  {id : 98,   name : "Hymn",                    tree : "Druid",       tier : 3,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase mana regen by 0.2/0.4/0.6, Increase party ice and fire res by 1.5/3.0/4.5%", special : "", quality : "", img : "empty"},
  frostBite :             {id : 99,   name : "Frost Bite",              tree : "Druid",       tier : 6,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party ice damage by 6/12/18%, Increase party ice res 2/4/6%, Reduce enemy ice res by 1/2/3%a", special : "", quality : "", img : "empty"},
  deepMind :              {id : 100,  name : "Deep Mind",               tree : "Druid",       tier : 9,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 50/100/150, Increase party health by 4/8/12%, 4/8/12% to refund spell mana cost", special : "", quality : "", img : "empty"},
  frozenTouch :           {id : 101,  name : "Frozen Touch",            tree : "Druid",       tier : 9,   pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party ice damage by 10/20/30%, Reduce enemy ice res by 2/4/6%, Leech 5% ice damage", special : "", quality : "", img : "empty"},
  invigorate :            {id : 102,  name : "Invigorate",              tree : "Druid",       tier : 9,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 100/200/300, Increase healpower by 2/4/6%, Increase shield effect by 5/10/15%, Increase party phys res by 1/2/3%", special : "", quality : "", img : "empty"},
  elementalInfusion :     {id : 103,  name : "Elemental Infusion",      tree : "Druid",       tier : 9,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party ele damage by 5/10/15%", special : "", quality : "", img : "empty"},
  blosson :               {id : 104,  name : "Blossom",                 tree : "Druid",       tier : 10,  pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Healer occasionally casts blossom, Blossom heals party for 7/14/21% of healpower and increases party ele res by 2/4/6%", special : "5-6 sec cooldown<br>Lasts 3 sec", quality : "", img : "empty"},
  holyFury :              {id : 105,  name : "Holy Fury",               tree : "Priest",      tier : 6,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase Lesser/Radiant heal effect by  10/20/30%, Increase party fire and lightning res by 2/4/6%, Reduce enemy fire and lightning res by 2/4/6%", special : "", quality : "", img : "empty"},
  retribution :           {id : 106,  name : "Retribution",             tree : "Priest",      tier : 7,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 50/100/150, Reduce enemy ele and nemesis damage by 3/6/9%", special : "", quality : "", img : "empty"},
  divinePurpose :         {id : 107,  name : "Divine Purpose",          tree : "Priest",      tier : 8,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party health by 5/10/15%, +10/20/30% healpower when all heroes are above 70% health", special : "", quality : "", img : "empty"},
  burningJustice :        {id : 108,  name : "Burning Justice",         tree : "Priest",      tier : 9,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Party deals 4/8/12% increase fire damage, Adds fire damage: 80/160/240 to tank, 150/300/450 to zerker, 20/40/60 to ranger, 30/60/90 to healer", special : "", quality : "", img : "empty"},
  thunderAssault :        {id : 109,  name : "Thunder Assault",         tree : "Priest",      tier : 9,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Party deals 5/10/15% increased lightning damage, Increase healer attack speed by 10/20/30%, Every third healer attack deals 300/600/900 + 20/40/60% healpower extra lightning damage", special : "", quality : "", img : "empty"},
  focusedPrayer :         {id : 110,  name : "Focused Prayer",          tree : "Priest",      tier : 9,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "+5/10/15% party health, +3/6/9% party ele res, +2/4/6 party phys and nemesis res", special : "", quality : "", img : "empty"},
  salvation :             {id : 111,  name : "Salvation",               tree : "Priest",      tier : 10,  pos : 2,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Healer occasionally casts salvation, Salvation reduces all damage taken by 20/40/60% and increases party lightning and fire res by 10/20/30%", special : "7-8 sec cooldown<br>Lasts 3 seconds", quality : "", img : "empty"},
  nemesisInfusion :       {id : 112,  name : "Nemesis Infusion",        tree : "Occultist",   tier : 4,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Adds currentLevel*talentLevel*(0.7 for tank, 0.9 for zerker, 0.4 for ranger, 0.6 for healer) nemesis damage", special : "", quality : "", img : "empty"},
  immolate :              {id : 113,  name : "Immolate",                tree : "Occultist",   tier : 5,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "EVery 8 seconds, party gains  6/12/18% of phys damage as extra fire damage, Increase healpower by 20/40/60, Increase party fire res by 1/2/3%", special : "Lasts 5 seconds", quality : "", img : "empty"},
  agony :                 {id : 114,  name : "Agony",                   tree : "Occultist",   tier : 5,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 30/60/90, All enemies take 5/10/15% increase ele damage", special : "", quality : "", img : "empty"},
  forbiddenChapter :      {id : 115,  name : "Forbidden Chapter",       tree : "Occultist",   tier : 8,   pos : 4,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party nemesis damage by 2/4/6%, Increase party phys and nemesis res by 2/4/6%", special : "", quality : "", img : "empty"},
  shadowFury :            {id : 116,  name : "Shadow Fury",             tree : "Occultist",   tier : 9,   pos : 0,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase party nemesis damage by 10/20/30%, decrease party ele damage by 10/20/30%, Increase healer nemesis damage by 30/60/90, Increase zerker nemesis damage by 50/100/150", special : "", quality : "", img : "empty"},
  chaoticInfusion :       {id : 117,  name : "ChaoticInfusion",         tree : "Occultist",   tier : 9,   pos : 1,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 60/120/180, Increase party health by 7/14/21%, Increase party ele res by 2/4/6%", special : "", quality : "", img : "empty"},
  wickedBloom :           {id : 118,  name : "Wicked Bloom",            tree : "Occultist",   tier : 9,   pos : 3,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "Increase healpower by 60/120/180, Enemies take 5/10/15% increase ele damage and 3/6/9% nemesis damage", special : "", quality : "", img : "empty"},


  //placeholder :         {id : 99999,  name : "placeholder",           tree : "Occultist",   tier : 99,   pos : 99,  maxLvl : 3,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "placeholder", special : "", quality : "", img : "empty"},


  // enlighten :             {id : 52,   name : "Enlighten",               tree : "Essence",     tier : 1,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // greed :                 {id : 53,   name : "Greed",                   tree : "Essence",     tier : 1,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // fortune :               {id : 54,   name : "Fortune",                 tree : "Essence",     tier : 1,   pos : 0,  maxLvl : 10,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // blessingOfRestoration : {id : 55,   name : "Blessing Of Restoration", tree : "Essence",     tier : 2,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // blessingOfLife :        {id : 56,   name : "Blessing Of Life",        tree : "Essence",     tier : 2,   pos : 0,  maxLvl : 8,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // blessingOfChaos :       {id : 57,   name : "Blessing Of Chaos",       tree : "Essence",     tier : 2,   pos : 0,  maxLvl : 8,   lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // tankHealth :            {id : 58,   name : "Tank Health",             tree : "Essence",     tier : 3,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // tankDamage :            {id : 59,   name : "Tank Damage",             tree : "Essence",     tier : 3,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // berzerkerHealth :       {id : 61,   name : "Berzerker Health",        tree : "Essence",     tier : 3,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // berzerkerDamage :       {id : 62,   name : "Berzerker Damage",        tree : "Essence",     tier : 3,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // rangerHealth :          {id : 63,   name : "Ranger Health",           tree : "Essence",     tier : 4,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // rangerDamage :          {id : 64,   name : "Ranger Damage",           tree : "Essence",     tier : 4,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // healerHealth :          {id : 65,   name : "Healer Health",           tree : "Essence",     tier : 4,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"},
  // healerDamage :          {id : 66,   name : "Healer Damage",           tree : "Essence",     tier : 4,   pos : 0,  maxLvl : 15,  lvl : 0,  isAura : false,   levelIndicator : null,  req : 0,  hasRequirements : false,  tags : "",  tooltip : "", special : "", quality : "", img : "surge"}
};



init()

function init(){
  createTrees();
  addTalents();
  setFontColor();
}

function setFontColor(){
  var body = document.getElementById("body");
  var r = trees.Occultist.lvls+5;
  var g = trees.Druid.lvls+5;
  var b = trees.Priest.lvls+5;
  body.style.color = "rgb("+(200*r/Math.max(r,g,b))+","+(200*g/Math.max(r,g,b))+","+(200*b/Math.max(r,g,b))+")";
  console.log();
}

function createTrees(){
  var tree0 = trees[Object.keys(trees)[0]];
  var atLeast = -1;
  var minPos;
  var minPosTree;
  for(var x = 0;x < Object.keys(trees).length;x++){
    minPos = Math.max(tree0.pos,atLeast);
    minPosTree = tree0.pos>atLeast?0:-1;
    for (var y = 0;y < Object.keys(trees).length;y++){
      var treey = trees[Object.keys(trees)[y]];
      if(minPosTree==-1||(treey.pos<minPos&&treey.pos>atLeast)){
        minPos = Math.max(treey.pos,atLeast);
        minPosTree = treey.pos>atLeast?y:-1;
      }
    }
    atLeast = minPos;

    var treeCur = trees[Object.keys(trees)[minPosTree]];

    var holder = document.getElementById("holder");

    var tree = document.createElement("div");
    tree.className = "tree";
    tree.id = treeCur.name;
    tree.style.borderColor = treeCur.color;
    holder.appendChild(tree);

    // var treeImg = document.createElement("img");
    // treeImg.className = "treeImg";
    // treeImg.src = "images/"+treeCur.imgs[0]+".png";
    // treeImg.alt = treeCur.imgs[0]+"";
    // tree.appendChild(treeImg);
    tree.style.background = "url('images/"+treeCur.imgs[0]+".png') center center no-repeat #000000";
    tree.style.backgroundSize = (tree.offsetWidth-12)+"px "+(tree.offsetHeight-12)+"px";;

    var tierDivArray = [];
    for(var y = 0;y < Object.keys(tiers).length;y++){
      let tier = document.createElement("div");
      tier.className = "tier";
      tree.appendChild(tier);
      tierDivArray.push(tier);
    }
    treeCur.tierDivs = tierDivArray;
  }
}

function toggleBackground(){
  hideBackground = !hideBackground;
  if(hideBackground){
    let domTrees = document.getElementsByClassName("tree");
    for(let x = 0;x < domTrees.length;x++){
      domTrees[x].style.background = "black"
    }
  }else{
    let domTrees = document.getElementsByClassName("tree");
    for(let x = 0;x < domTrees.length;x++){
      domTrees[x].style.background = "url('images/"+trees[domTrees[x].id].imgs[0]+".png') center center no-repeat #000000"
      domTrees[x].style.backgroundSize = (domTrees[x].offsetWidth-12)+"px "+(domTrees[x].offsetHeight-12)+"px";
    }
  }
}

function searchTags(){
  tagSearch = !tagSearch;
  if(tagSearch){
    document.getElementById("search").innerHTML = "Hide Tags";
    let tagSearchValue = document.getElementById("tagToSearch").value;
    let showOnlySearch = document.getElementById("showOnlySearch").checked;
    for(let x = 0;x<Object.keys(talents).length;x++){
      let talent = talents[Object.keys(talents)[x]];
      let talentDiv = document.getElementById(talent.name);
      if(talent.tags.indexOf(tagSearchValue)!=-1){
        talentDiv.style.borderColor = "rgb(0,0,255)";
      }else{
        if(showOnlySearch){
          talentDiv.style.visibility = "hidden";
        }else{
          talentDiv.style.borderColor = "rgb(75,75,75)";
        }
      }
    }
  }else{
    document.getElementById("search").innerHTML = "Show Tags";
    for(let x = 0;x<Object.keys(talents).length;x++){
      let talent = talents[Object.keys(talents)[x]];
      let talentDiv = document.getElementById(talent.name);
      checkBorderColor(talent);
      talentDiv.style.visibility = "visible";
    }
  }
}

function addTalents(){
  for(let x = 0;x<Object.keys(trees).length;x++){ //runs for every tree, gets talents in each tree
    let talentsInTree = [];
    for(let y = 0;y<Object.keys(talents).length;y++){
      if(talents[Object.keys(talents)[y]].tree == trees[Object.keys(trees)[x]].name){
        talents[Object.keys(talents)[y]].hasRequirements = trees[Object.keys(trees)[x]].hasRequirements;
        talentsInTree.push(talents[Object.keys(talents)[y]]);
      }
    }
    for(let y = 0;y<Object.keys(tiers).length;y++){ //runs for every tier, gets talents in each tier for current tree
      let talentsInTier = [];
      for(let z = 0;z<talentsInTree.length;z++){
        if(talentsInTree[z].tier == tiers[Object.keys(tiers)[y]].tier){
          if(talentsInTree[z].hasRequirements){
            talentsInTree[z].req = tiers[Object.keys(tiers)[y]].req;
          }
          talentsInTier.push(talentsInTree[z]);
        }
      }
      let sortedTalents = talentsInTier;
      for(let z = 0;z < sortedTalents.length;z++){ // sorts talents in current tier in current tree by position value
        let minPos = 5;
        let minTalent = 0;
        for(let w = z;w < sortedTalents.length;w++){
          if(talentsInTier[w].pos<minPos){
            minPos = sortedTalents[w].pos;
            minTalent = w;
          }
        }
        let temp = sortedTalents[z];
        sortedTalents[z] = sortedTalents[minTalent];
        sortedTalents[minTalent] = temp;
        if(sortedTalents[z].pos < z){
          sortedTalents[z].pos = z;
        }
      }
      tierDiv = trees[Object.keys(trees)[x]].tierDivs[y];
      let empties = 0;
      for(let z = 0;z < sortedTalents.length;z++){ //adds all the talent div, icons, tooltips
        if(sortedTalents[z].pos == z+empties)
        {
          talent = document.createElement("div");
          talent.className = "talent";
          talent.id = sortedTalents[z].name;
          talent.style.background = "url('images/"+sortedTalents[z].img+".png') center center no-repeat #000000";
          talent.style.backgroundSize = "45px 45px";
          talent.addEventListener("mousedown",function(event){
            if(event.button==0){
              addLevel(sortedTalents[z]);
            }else if(event.button==2){
              subtractLevel(sortedTalents[z]);
          }},false);
          tierDiv.appendChild(talent);

          let tooltip = document.createElement("p");
          tooltip.className = "tooltip";
          let talentName = "<span class = 'talentName'>"+sortedTalents[z].name+"</span><br>";
          let tagText = "<span class = 'tagText'>("+sortedTalents[z].tags+")</span><br>"
          let auraModText = sortedTalents[z].isAura?"<span class = 'auraModText'>Aura</span><br>":"";
          let talentText = "<br><span class = 'talentText'>"+sortedTalents[z].tooltip+"</span><br><br>";
          let specialText = sortedTalents[z].special==""?"":"<span class = 'specialText'>"+sortedTalents[z].special+"</span><br>";
          let maxLvlText = "<span class = 'maxLvlText'>Max "+sortedTalents[z].maxLvl+" Levels</span><br>";
          let reqText = sortedTalents[z].hasRequirements?"<span class = 'reqText'>Requires "+sortedTalents[z].req+" points in "+sortedTalents[z].tree+"</span><br>":"";
          let qualityText = sortedTalents[z].quality==""?"":"<br><span class = 'qualityText'>"+sortedTalents[z].quality+" per quality</span>";
          tooltip.innerHTML = talentName+tagText+auraModText+talentText+specialText+maxLvlText+reqText+qualityText;
          talent.appendChild(tooltip);

          levelIndicator = document.createElement("p");
          levelIndicator.className = "levelIndicator";
          levelIndicator.innerHTML = "0";
          sortedTalents[z].levelIndicator = levelIndicator;
          talent.appendChild(levelIndicator);

        }else{
          empties++;
          z--;
          talent = document.createElement("div");
          talent.classList.add("empty", "talent");
          tierDiv.appendChild(talent);
        }
      }
      if(sortedTalents.length+empties<talentColumns){
        for(var z = 0;z < talentColumns-sortedTalents.length-empties;z++){
          talent = document.createElement("div");
          talent.classList.add("empty", "talent");
          tierDiv.appendChild(talent);
        }
      }
    }

  }

}

function addLevel(talent){
  if(talent.lvl < talent.maxLvl){
    if(!talent.hasRequirements||trees[talent.tree].lvls>=talent.req){
      talent.lvl++;
      talent.levelIndicator.innerHTML = talent.lvl;
      tiers[talent.tier][talent.tree]++;
      trees[talent.tree].lvls++;
      totalLvl++;
      trees[talent.tree].minLvl = Math.max(trees[talent.tree].minLvl,talent.req);
      checkBorderColor(talent);
      checkLevelText();
    }else{
      console.log("talent: "+talent.name+", has req : " +talent.hasRequirements+", tree lvl : "+trees[talent.tree].lvls+", req lvl : "+talent.req);
    }
  }
}

function subtractLevel(talent){
  if(talent.lvl > 0){
    if(talentCanBeSubtracted(talent)){
      talent.lvl--;
      talent.levelIndicator.innerHTML = talent.lvl;
      tiers[talent.tier][talent.tree]--;
      trees[talent.tree].lvls--;
      totalLvl--;
      checkBorderColor(talent);
      checkLevelText();
    }else {
      console.log("tree requires has min level of : "+trees[talent.tree].minLvl);
    }
  }
}

function talentCanBeSubtracted(talent){
  resetMinLevels();
  if(trees[talent.tree].lvls-1>trees[talent.tree].minLvl){
    if(talent.req==trees[talent.tree].minLvl||checkTalentMinBelowTalentTier(talent)){
      return true;
    }
  }else if(trees[talent.tree].minLvl == tiers[talent.tier].req&&tiers[talent.tier][talent.tree] == 1){
    return true
  }
  return false;
}

function checkTalentMinBelowTalentTier(talent){
  var levels = 0;
  for(let x = 0;x < Math.min(Object.keys(tiers).length, talent.tier);x++){
    levels += tiers[Object.keys(tiers)[x]][talent.tree];
  }
  if(levels > tiers[talent.tier+1].req){
    return true;
  }
  return false;
}

function resetMinLevels(){
  for(let x = 0;x < Object.keys(trees).length;x++){
    for(let y = 0;y < Object.keys(tiers).length;y++){
      if(tiers[Object.keys(tiers)[y]][Object.keys(trees)[x]]>0){
        trees[Object.keys(trees)[x]].minLvl = tiers[Object.keys(tiers)[y]].req;
      }
    }
  }
}

function checkBorderColor(talent){
  let talentDiv = document.getElementById(talent.name);
  if(talent.lvl == 0){
    talentDiv.style.borderColor = "rgb(75,75,75)";
  }else if(talent.lvl == talent.maxLvl){
    talentDiv.style.borderColor = "rgb(255,0,0)";
  }else {
    talentDiv.style.borderColor = "rgb(0,255,0)";
  }
}

function checkLevelText(){
  document.getElementById("level").innerHTML = totalLvl;
  setFontColor();
}

function exportBuild(){
  let talentLevels = [];
  let maxLevels = [];
  let bitsRequired = [];
  let binaryLevels = [];
  let totalString = "";
  for(let x = 0;x < Object.keys(talents).length;x++){
    talentLevels.push(talents[Object.keys(talents)[x]].lvl);
    maxLevels.push(talents[Object.keys(talents)[x]].maxLvl);
    bitsRequired.push(Math.ceil(Math.log(maxLevels[x]+1)/Math.log(2)));
    binaryLevels.push(talentLevels[x].toString(2));
    let length = binaryLevels[x].length;
    for(let y = 0;y < bitsRequired[x]-length;y++){
      binaryLevels[x] = "0"+binaryLevels[x];
    }
    totalString += binaryLevels[x];
  }
  let lengthMod = totalString.length%6;
  for(let x = 0;x<6-lengthMod;x++){
    totalString += "0";
  }
  let binaryStrings = totalString.match(/.{1,6}/g);
  let decimalStrings = [];
  let base64Reference = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/?";
  let encodedString = "";
  for(let x = 0;x< binaryStrings.length;x++){
    decimalStrings.push(parseInt(binaryStrings[x],2));
    encodedString += base64Reference.charAt(decimalStrings[x]);
  }
  let shortenedString = encodedString;
  let itteration = 0;
  while(shortenedString.indexOf("000")!=-1&&itteration!=10){
    let start = shortenedString.indexOf("000");
    let end = start;
    for(let x = start;x < Math.min(shortenedString.length,start+100);x++){
      if(shortenedString.charAt(x)=='0'){
        end++;
      }else {
        break;
      }
    }
    shortenedString = shortenedString.substring(0,start) + "~" + ((end-start)>9?(end-start):("0"+(end-start))) + "" + (end+1!=shortenedString.length?shortenedString.substring(end):"");
    itteration++;
  }
  document.getElementById("buildCode").value = shortenedString;
  console.log("export : "+encodedString+" -> "+shortenedString);
}

// function shorten(encodedString){
//   console.log("yup");
//   let shortenedString = encodedString;
//   let itteration = 0;
//   while(shortenedString.indexOf("000")!=-1&&itteration!=10){
//     let start = shortenedString.indexOf("000");
//     let end = start;
//     for(let x = start;x < Math.min(shortenedString.length,start+100);x++){
//       if(shortenedString.charAt(x)=='0'){
//         end = x;
//       }
//     }
//     shortenedString = shortenedString.substring(0,start) + "~" + ((end-start)>9?(end-start):("0"+(end-start))) + "" + (end!=shortenedString.legnth?shortenedString.substring(end+1):"");
//     itteration++;
//   }
//   document.getElementById("buildCode").value = shortenedString;
//   console.log(shortenedString);
// }

function importBuild(){
  reset();
  let code = document.getElementById("buildCode").value;
  let lengthenedString = code;
  while(true){
    if(lengthenedString.indexOf("~")==-1){
      break;
    }
    let index = lengthenedString.indexOf("~");
    let zeroes = (lengthenedString.length>=index+3)?lengthenedString.substring(index+1,index+3):lengthenedString.substring(index+1);
    zeroes = parseInt(zeroes);
    let stringEnd = (lengthenedString.length>index+2)?lengthenedString.substring(index+3):"";
    lengthenedString = lengthenedString.substring(0,index);
    for(let x = 0;x < zeroes;x++){
      lengthenedString+="0";
    }
    lengthenedString += stringEnd;
  }
  let charArray = lengthenedString.split("");
  let binaryArray = [];
  let base64Reference = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/?";
  let concatString = "";
  for(var x = 0;x < charArray.length;x++){
    let charValue = base64Reference.indexOf(charArray[x]);
    binaryArray.push(charValue.toString(2));
    while(binaryArray[x].length!=6){
      binaryArray[x] = "0"+binaryArray[x];
    }
    concatString += binaryArray[x]+"";
  }
  let maxLevels = [];
  let bitsRequired = [];
  let binaryLevels = [];
  let talentLevels = [];
  let last = 0;
  for(var x = 0;x < Object.keys(talents).length;x++){
    maxLevels.push(talents[Object.keys(talents)[x]].maxLvl);
    bitsRequired.push(Math.ceil(Math.log(maxLevels[x]+1)/Math.log(2)));
    binaryLevels.push(concatString.substring(last,last+bitsRequired[x]));
    last += bitsRequired[x];
    talentLevels.push(parseInt(binaryLevels[x],2));
  }
  for(var x = 0;x < Object.keys(talents).length;x++){
    let level = talentLevels[x];
    let talent = talents[Object.keys(talents)[x]];
    for(var y = 0;y < level;y++){
      talent.lvl++;
      talent.levelIndicator.innerHTML = talent.lvl;
      tiers[talent.tier][talent.tree]++;
      trees[talent.tree].lvls++;
      totalLvl++;
      trees[talent.tree].minLvl = Math.max(trees[talent.tree].minLvl,talent.req);
      checkBorderColor(talent);
      checkLevelText();
    }
  }
  console.log("import : "+code+" -> "+lengthenedString);
}

function reset(){
  console.log("reset");
  for(let x = 0;x<Object.keys(talents).length;x++){
    talents[Object.keys(talents)[x]].lvl = 0;
    if(talents[Object.keys(talents)[x]].levelIndicator!=null){
      talents[Object.keys(talents)[x]].levelIndicator.innerHTML = 0;
      checkBorderColor(talents[Object.keys(talents)[x]]);
    }
  }
  for(let x = 0;x<Object.keys(trees).length;x++){
    trees[Object.keys(trees)[x]].lvls = 0;
    for(let y = 0;y<Object.keys(tiers).length;y++){
      tiers[Object.keys(tiers)[y]][trees[Object.keys(trees)[x]].name] = 0;
    }
  }
  totalLvl = 1;
  checkLevelText();
}

function toggleUnusedTalents(){
  hideUnusedTalents = !hideUnusedTalents;
  let talentDivs = document.getElementsByClassName("talent");
  if(hideUnusedTalents){
    for(let x = 0;x < talentDivs.length;x++){
      if(talentDivs[x].className.indexOf("empty")==-1){
        if(talentDivs[x].getElementsByClassName("levelIndicator")[0].innerHTML == 0){
          talentDivs[x].style.visibility = "hidden";
        }
      }
    }
  } else{
    for(let x = 0;x < talentDivs.length;x++){
      if(talentDivs[x].className.indexOf("empty")==-1){
        talentDivs[x].style.visibility = "visible";
      }
    }
  }
}












function nothing(){

}
