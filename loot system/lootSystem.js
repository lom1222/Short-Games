
var itemLevel = 0;
var maxAffixNum;
var minAffixNum;
var affixNum;
var affixPool;
var itemAffixes;
var name;
var type;
var material;
var completeItem;

var extraAffixChanceModifier = 3;

var itemTypes = ["orb","staff","robe"];
var itemMaterials = {
  orb0 : ["glass","quartz","obsidian glass"],
  orb1 : ["quartz","obsidian glass","crystal"],//unlocked at level 10
  orb2 : ["obsidian glass","crystal","draconic glass"],//unlocked at level 30
  staff0 : ["wood","bone","yew wood"],
  staff1 : ["bone","yew wood","enchanted wood"],//unlocked at level 10
  staff2 : ["yew wood","enchanted wood","dragon bone"],//unlocked at level 30
  robe0 : ["cotton","silk","scale"],
  robe1 : ["silk","scale","elfweave"],//unlocked at level 10
  robe2 : ["scale","elfweave","dragon scale"],//unlocked at level 30
};

var namePrefixes = ["reinforced","powerful","molten","glacial","gump's","iqsior's","giant","incredible","shinning","absorbing"];
var nameSuffixes = ["of healing","of radiance","of light","of strength","of speed","of endurance","of the ranger","of the berzerker","of shadow","of casting"];

var affixes = {
  generic : { //basic stuff
    lvl0: [
      createAffix("basic","healingPower",15,30),
      createAffix("basic","healingPowerPercent",2,3),
      createAffix("randomHero","damage",5,10),
      createAffix("randomHero","damagePercent",2,4),
      createAffix("randomHero","health",20,30),
      createAffix("randomHero","healthPercent",2,4)
    ],
    lvl5: [
      createAffix("basic","healingPower",30,45),
      createAffix("basic","healingPowerPercent",3,5),
      createAffix("randomSkill","cooldownReductionPercent",5,10),
      createAffix("randomSkill","baseHealingPercent",10,20),
      createAffix("randomSkill","manaCostReductionPercent",5,10),
      createAffix("randomSkill","duration",1,1),
      createAffix("randomSkill","durationPercent",5,10),
      createAffix("randomSkill","healingPowerBonus",2,4),
      createAffix("randomSkill","castTimeReductionPercent",5,10)
    ],
    lvl10: [
      createAffix("basic","healingPower",45,60),
      createAffix("basic","healingPowerPercent",4,7),
      createAffix("randomHero","damage",10,15),
      createAffix("randomHero","damagePercent",3,5),
      createAffix("randomHero","health",30,70),
      createAffix("randomHero","healthPercent",3,5),
      createAffix("talent","randomDruidTalent",1,1),
      createAffix("talent","randomPriestTalent",1,1),
      createAffix("talent","randomOccultistTalent",1,1),
      createAffix("randomHero","attackSpeedPercent",5,10)
    ],
    lvl15: [
      createAffix("basic","healingPower",60,75),
      createAffix("basic","healingPowerPercent",5,8),
      createAffix("randomSkill","cooldownReductionPercent",7,13),
      createAffix("randomSkill","baseHealingPercent",20,40),
      createAffix("randomSkill","manaCostReductionPercent",7,13),
      createAffix("randomSkill","duration",2,2),
      createAffix("randomSkill","durationPercent",10,15),
      createAffix("randomSkill","healingPowerBonus",3,5),
      createAffix("randomSkill","castTimeReductionPercent",8,12)
    ],
    lvl25: [
      createAffix("basic","healingPower",75,100),
      createAffix("basic","healingPowerPercent",6,10),
      createAffix("randomHero","damage",15,25),
      createAffix("randomHero","damagePercent",5,8),
      createAffix("randomHero","health",70,120),
      createAffix("randomHero","healthPercent",5,8),
      createAffix("talent","randomDruidTalent",1,2),
      createAffix("talent","randomPriestTalent",1,2),
      createAffix("talent","randomOccultistTalent",1,2),
      createAffix("randomHero","attackSpeedPercent",8,12)
    ],
    lvl35: [
      createAffix("basic","healingPower",100,125),
      createAffix("basic","healingPowerPercent",6,11),
      createAffix("randomSkill","cooldownReductionPercent",10,16),
      createAffix("randomSkill","baseHealingPercent",30,50),
      createAffix("randomSkill","manaCostReductionPercent",9,15),
      createAffix("randomSkill","duration",3,4),
      createAffix("randomSkill","durationPercent",12,18),
      createAffix("randomSkill","healingPowerBonus",4,7),
      createAffix("randomSkill","castTimeReductionPercent",10,15)
    ],
    lvl50: [
      createAffix("basic","healingPower",175,175),
      createAffix("basic","healingPowerPercent",13,13),
      createAffix("randomHero","damage",40,40),
      createAffix("randomHero","damagePercent",9,9),
      createAffix("randomHero","health",170,170),
      createAffix("randomHero","healthPercent",10,10),
      createAffix("talent","randomDruidTalent",2,2),
      createAffix("talent","randomPriestTalent",2,2),
      createAffix("talent","randomOccultistTalent",2,2),
      createAffix("randomHero","attackSpeedPercent",15,15),
      createAffix("randomSkill","cooldownReductionPercent",18,18),
      createAffix("randomSkill","baseHealingPercent",60,60),
      createAffix("randomSkill","manaCostReductionPercent",17,17),
      createAffix("randomSkill","duration",5,5),
      createAffix("randomSkill","durationPercent",20,20),
      createAffix("randomSkill","healingPowerBonus",9,9),
      createAffix("randomSkill","castTimeReductionPercent",18,18)
    ]
  },
  orb: { //skills buffs
    lvl0: [
      createAffix("randomSkill","cooldownReductionPercent",5,10),
      createAffix("randomSkill","baseHealingPercent",10,20),
      createAffix("randomSkill","manaCostReductionPercent",5,10),
      createAffix("allSkill","duration",1,1),
      createAffix("randomSkill","durationPercent",5,10),
      createAffix("randomSkill","healingPowerBonus",2,4),
      createAffix("randomSkill","castTimeReductionPercent",5,10),
      createAffix("allSkill","cooldownReductionPercent",2,4),
      createAffix("allSkill","baseHealingPercent",5,8),
      createAffix("allSkill","manaCostReductionPercent",2,3),
      createAffix("allSkill","durationPercent",4,7),
      createAffix("allSkill","healingPowerBonus",1,2),
      createAffix("allSkill","castTimeReductionPercent",3,5),
      createAffix("basic","mana",25,50),
      createAffix("basic","manaPercent",1,2)
    ],
    lvl5: [
      createAffix("randomSkill","cooldownReductionPercent",7,13),
      createAffix("randomSkill","baseHealingPercent",20,30),
      createAffix("randomSkill","manaCostReductionPercent",7,13),
      createAffix("allSkill","duration",1,2),
      createAffix("randomSkill","durationPercent",10,15),
      createAffix("randomSkill","healingPowerBonus",2,5),
      createAffix("randomSkill","castTimeReductionPercent",8,12),
      createAffix("allSkill","cooldownReductionPercent",3,5),
      createAffix("allSkill","baseHealingPercent",6,10),
      createAffix("allSkill","manaCostReductionPercent",2,4),
      createAffix("allSkill","durationPercent",5,10),
      createAffix("allSkill","healingPowerBonus",1,3),
      createAffix("allSkill","castTimeReductionPercent",4,8),
      createAffix("talent","randomDruidTalent",1,1),
      createAffix("talent","randomPriestTalent",1,1),
      createAffix("talent","randomOccultistTalent",1,1),
      createAffix("basic","mana",50,75),
      createAffix("basic","manaPercent",3,5)
    ],
    lvl10: [
      createAffix("randomSkill","cooldownReductionPercent",9,15),
      createAffix("randomSkill","baseHealingPercent",30,45),
      createAffix("randomSkill","manaCostReductionPercent",8,15),
      createAffix("allSkill","duration",2,4),
      createAffix("randomSkill","durationPercent",12,17),
      createAffix("randomSkill","healingPowerBonus",3,6),
      createAffix("randomSkill","castTimeReductionPercent",9,14),
      createAffix("allSkill","cooldownReductionPercent",3,6),
      createAffix("allSkill","baseHealingPercent",10,15),
      createAffix("allSkill","manaCostReductionPercent",3,5),
      createAffix("allSkill","durationPercent",5,12),
      createAffix("allSkill","healingPowerBonus",2,3),
      createAffix("allSkill","castTimeReductionPercent",5,8),
      createAffix("talent","randomDruidTalent",1,2),
      createAffix("talent","randomPriestTalent",1,2),
      createAffix("talent","randomOccultistTalent",1,2),
      createAffix("basic","mana",75,100),
      createAffix("basic","manaPercent",5,7)
    ],
    lvl15: [
      createAffix("randomSkill","cooldownReductionPercent",11,17),
      createAffix("randomSkill","baseHealingPercent",40,60),
      createAffix("randomSkill","manaCostReductionPercent",9,16),
      createAffix("allSkill","duration",3,5),
      createAffix("randomSkill","durationPercent",13,19),
      createAffix("randomSkill","healingPowerBonus",4,8),
      createAffix("randomSkill","castTimeReductionPercent",10,16),
      createAffix("allSkill","cooldownReductionPercent",3,7),
      createAffix("allSkill","baseHealingPercent",15,20),
      createAffix("allSkill","manaCostReductionPercent",3,6),
      createAffix("allSkill","durationPercent",7,13),
      createAffix("allSkill","healingPowerBonus",2,4),
      createAffix("allSkill","castTimeReductionPercent",6,9),
      createAffix("talent","randomDruidTalent",2,2),
      createAffix("talent","randomPriestTalent",2,2),
      createAffix("talent","randomOccultistTalent",2,2),
      createAffix("basic","mana",100,125),
      createAffix("basic","manaPercent",7,9)
    ],
    lvl25: [
      createAffix("randomSkill","cooldownReductionPercent",13,19),
      createAffix("randomSkill","baseHealingPercent",50,75),
      createAffix("randomSkill","manaCostReductionPercent",10,17),
      createAffix("allSkill","duration",4,5),
      createAffix("randomSkill","durationPercent",14,21),
      createAffix("randomSkill","healingPowerBonus",5,10),
      createAffix("randomSkill","castTimeReductionPercent",12,18),
      createAffix("allSkill","cooldownReductionPercent",4,8),
      createAffix("allSkill","baseHealingPercent",20,25),
      createAffix("allSkill","manaCostReductionPercent",3,7),
      createAffix("allSkill","durationPercent",8,15),
      createAffix("allSkill","healingPowerBonus",3,5),
      createAffix("allSkill","castTimeReductionPercent",7,11),
      createAffix("talent","randomDruidTalent",2,3),
      createAffix("talent","randomPriestTalent",2,3),
      createAffix("talent","randomOccultistTalent",2,3),
      createAffix("basic","mana",125,150),
      createAffix("basic","manaPercent",9,11),
      createAffix("lesserHealing","baseHealing",85,85),
      createAffix("renew","baseHealing",27,27),
      createAffix("dispel","additionalStatusRemove",1,1),
      createAffix("radiantHeal","baseHealing",95,95),
      createAffix("flashHealing","baseHealing",75,75),
      createAffix("rejuvenate","cooldownRed",70,70),
      createAffix("talentExchange","priestToOccultist",1,1),
      createAffix("talentExchange","occultistToDruid",1,1),
      createAffix("talentExchange","druidToPriest",1,1)
    ],
    lvl35: [
      createAffix("randomSkill","cooldownReductionPercent",15,20),
      createAffix("randomSkill","baseHealingPercent",60,100),
      createAffix("randomSkill","manaCostReductionPercent",11,20),
      createAffix("allSkill","duration",4,6),
      createAffix("randomSkill","durationPercent",15,25),
      createAffix("randomSkill","healingPowerBonus",7,10),
      createAffix("randomSkill","castTimeReductionPercent",15,20),
      createAffix("allSkill","cooldownReductionPercent",5,10),
      createAffix("allSkill","baseHealingPercent",25,30),
      createAffix("allSkill","manaCostReductionPercent",4,10),
      createAffix("allSkill","durationPercent",8,20),
      createAffix("allSkill","healingPowerBonus",4,6),
      createAffix("allSkill","castTimeReductionPercent",7,15),
      createAffix("talent","randomDruidTalent",3,3),
      createAffix("talent","randomPriestTalent",3,3),
      createAffix("talent","randomOccultistTalent",3,3),
      createAffix("basic","mana",150,175),
      createAffix("basic","manaPercent",11,13),
      createAffix("lesserHealing","baseHealing",130,130),
      createAffix("renew","baseHealing",40,40),
      createAffix("dispel","additionalStatusRemove",2,2),
      createAffix("radiantHeal","baseHealing",150,150),
      createAffix("flashHealing","baseHealing",120,120),
      createAffix("rejuvenate","cooldownRed",105,105),
      createAffix("talentExchange","priestToOccultist",1,2),
      createAffix("talentExchange","occultistToDruid",1,2),
      createAffix("talentExchange","druidToPriest",1,2)
    ],
    lvl50: [
      createAffix("randomSkill","cooldownReductionPercent",20,20),
      createAffix("randomSkill","baseHealingPercent",100,100),
      createAffix("randomSkill","manaCostReductionPercent",20,20),
      createAffix("allSkill","duration",6,6),
      createAffix("randomSkill","durationPercent",25,25),
      createAffix("randomSkill","healingPowerBonus",12,12),
      createAffix("randomSkill","castTimeReductionPercent",20,20),
      createAffix("allSkill","cooldownReductionPercent",10,10),
      createAffix("allSkill","baseHealingPercent",35,35),
      createAffix("allSkill","manaCostReductionPercent",10,10),
      createAffix("allSkill","durationPercent",20,20),
      createAffix("allSkill","healingPowerBonus",6,6),
      createAffix("allSkill","castTimeReductionPercent",15,15),
      createAffix("talent","randomDruidTalent",4,4),
      createAffix("talent","randomPriestTalent",4,4),
      createAffix("talent","randomOccultistTalent",4,4),
      createAffix("basic","mana",200,200),
      createAffix("basic","manaPercent",20,20),
      createAffix("lesserHealing","baseHealing",200,200),
      createAffix("renew","baseHealing",60,60),
      createAffix("dispel","additionalStatusRemove",5,5),
      createAffix("radiantHeal","baseHealing",250,250),
      createAffix("flashHealing","baseHealing",200,200),
      createAffix("rejuvenate","cooldownRed",140,140),
      createAffix("talentExchange","priestToOccultist",2,2),
      createAffix("talentExchange","occultistToDruid",2,2),
      createAffix("talentExchange","druidToPriest",2,2),
      createAffix("talent","allPriest",1,1),
      createAffix("talent","allDruid",1,1),
      createAffix("talent","allOccultist",1,1)
    ]
  },
  staff: { //damage buffs
    lvl0: [
      createAffix("randomHero","damage",10,14),
      createAffix("randomHero","damagePercent",2,5),
      createAffix("randomHero","attackSpeedPercent",5,10),
      createAffix("allHero","damage",4,8),
      createAffix("allHero","damagePercent",1,3),
      createAffix("allHero","attackSpeedPercent",2,5)
    ],
    lvl5: [
      createAffix("randomHero","damage",15,24),
      createAffix("randomHero","damagePercent",3,6),
      createAffix("randomHero","attackSpeedPercent",7,12),
      createAffix("allHero","damage",6,12),
      createAffix("allHero","damagePercent",2,3),
      createAffix("allHero","attackSpeedPercent",2,6),
      createAffix("talent","poison",1,1),
      createAffix("talent","darkMagic",1,1),
      createAffix("talent","eradication",1,1),
      createAffix("talent","demonKnowledge",1,1),
      createAffix("talent","demonify",1,1),
      createAffix("talent","soulBoost",1,1),
      createAffix("talent","vampirism",1,1),
      createAffix("talent","decayAura",1,1)
    ],
    lvl10: [
      createAffix("randomHero","damage",20,36),
      createAffix("randomHero","damagePercent",4,7),
      createAffix("randomHero","attackSpeedPercent",8,13),
      createAffix("allHero","damage",8,16),
      createAffix("allHero","damagePercent",2,4),
      createAffix("allHero","attackSpeedPercent",4,6)
    ],
    lvl15: [
      createAffix("randomHero","damage",24,45),
      createAffix("randomHero","damagePercent",5,9),
      createAffix("randomHero","attackSpeedPercent",9,14),
      createAffix("allHero","damage",10,20),
      createAffix("allHero","damagePercent",3,5),
      createAffix("allHero","attackSpeedPercent",4,7),
      createAffix("ranger","damage",20,36),
      createAffix("warrior","damagePercent",10,15),
      createAffix("berzerker","attackSpeedPercent",20,25),
      createAffix("basic","healingPower",100,100)
    ],
    lvl25: [
      createAffix("randomHero","damage",30,50),
      createAffix("randomHero","damagePercent",5,10),
      createAffix("randomHero","attackSpeedPercent",10,15),
      createAffix("allHero","damage",11,24),
      createAffix("allHero","damagePercent",4,5),
      createAffix("allHero","attackSpeedPercent",5,8),
      createAffix("talent","poison",2,3),
      createAffix("talent","darkMagic",2,3),
      createAffix("talent","eradication",2,3),
      createAffix("talent","demonKnowledge",2,3),
      createAffix("talent","demonify",2,3),
      createAffix("talent","soulBoost",2,3),
      createAffix("talent","vampirism",2,3),
      createAffix("talent","decayAura",2,3)
    ],
    lvl35: [
      createAffix("randomHero","damage",40,65),
      createAffix("randomHero","damagePercent",6,12),
      createAffix("randomHero","attackSpeedPercent",10,17),
      createAffix("allHero","damage",20,30),
      createAffix("allHero","damagePercent",4,6),
      createAffix("allHero","attackSpeedPercent",5,9),
      createAffix("ranger","damage",40,60),
      createAffix("warrior","damagePercent",20,30),
      createAffix("berzerker","attackSpeedPercent",30,40),
      createAffix("basic","healingPower",200,200)
    ],
    lvl50: [
      createAffix("randomHero","damage",80,80),
      createAffix("randomHero","damagePercent",15,15),
      createAffix("randomHero","attackSpeedPercent",20,20),
      createAffix("allHero","damage",40,40),
      createAffix("allHero","damagePercent",8,8),
      createAffix("allHero","attackSpeedPercent",12,12),
      createAffix("ranger","damage",100,100),
      createAffix("warrior","damagePercent",40,40),
      createAffix("berzerker","attackSpeedPercent",55,55),
      createAffix("basic","healingPower",300,300),
      createAffix("talent","poison",5,5),
      createAffix("talent","darkMagic",5,5),
      createAffix("talent","eradication",5,5),
      createAffix("talent","demonKnowledge",5,5),
      createAffix("talent","demonify",5,5),
      createAffix("talent","soulBoost",5,5),
      createAffix("talent","vampirism",5,5),
      createAffix("talent","decayAura",5,5)
    ]
  },
  robe: { //defence buffs
    lvl0: [
      createAffix("randomHero","health",30,40),
      createAffix("randomHero","healthPercent",2,5),
      createAffix("randomHero","damageReductionPercent",5,10),
      createAffix("allHero","health",10,20),
      createAffix("allHero","healthPercent",1,3),
      createAffix("allHero","damageReductionPercent",2,5)
    ],
    lvl5: [
      createAffix("randomHero","health",50,80),
      createAffix("randomHero","healthPercent",3,6),
      createAffix("randomHero","damageReductionPercent",7,12),
      createAffix("allHero","health",20,40),
      createAffix("allHero","healthPercent",2,3),
      createAffix("allHero","damageReductionPercent",2,6),
      createAffix("talent","resilience",1,1),
      createAffix("talent","strengthen",1,1),
      createAffix("talent","fortificationAura",1,1),
      createAffix("talent","aspectOfTheTreeFolk",1,1),
      createAffix("talent","regenAura",1,1)
    ],
    lvl10: [
      createAffix("randomHero","health",70,120),
      createAffix("randomHero","healthPercent",4,7),
      createAffix("randomHero","damageReductionPercent",8,13),
      createAffix("allHero","health",30,60),
      createAffix("allHero","healthPercent",2,4),
      createAffix("allHero","damageReductionPercent",4,6)
    ],
    lvl15: [
      createAffix("randomHero","health",90,160),
      createAffix("randomHero","healthPercent",5,9),
      createAffix("randomHero","damageReductionPercent",9,14),
      createAffix("allHero","health",40,80),
      createAffix("allHero","healthPercent",3,5),
      createAffix("allHero","damageReductionPercent",4,7),
      createAffix("ranger","dodgeChance",15,25),
      createAffix("warrior","damageReductionPercent",10,15),
      createAffix("berzerker","healthRegenPer",1,1),
      createAffix("healer","health",150,300)
    ],
    lvl25: [
      createAffix("randomHero","health",110,200),
      createAffix("randomHero","healthPercent",5,10),
      createAffix("randomHero","damageReductionPercent",10,15),
      createAffix("allHero","health",60,100),
      createAffix("allHero","healthPercent",4,5),
      createAffix("allHero","damageReductionPercent",5,8),
      createAffix("talent","resilience",2,3),
      createAffix("talent","strengthen",2,3),
      createAffix("talent","fortificationAura",2,3),
      createAffix("talent","aspectOfTheTreeFolk",2,3),
      createAffix("talent","regenAura",2,3)
    ],
    lvl35: [
      createAffix("randomHero","health",130,240),
      createAffix("randomHero","healthPercent",6,12),
      createAffix("randomHero","damageReductionPercent",10,17),
      createAffix("allHero","health",70,120),
      createAffix("allHero","healthPercent",4,6),
      createAffix("allHero","damageReductionPercent",5,9),
      createAffix("ranger","dodgeChance",20,35),
      createAffix("warrior","damageReductionPercent",15,20),
      createAffix("berzerker","healthRegenPer",1,2),
      createAffix("healer","health",300,450)
    ],
    lvl50: [
      createAffix("randomHero","health",300,300),
      createAffix("randomHero","healthPercent",15,15),
      createAffix("randomHero","damageReductionPercent",20,20),
      createAffix("allHero","health",150,150),
      createAffix("allHero","healthPercent",8,8),
      createAffix("allHero","damageReductionPercent",12,12),
      createAffix("ranger","dodgeChance",45,45),
      createAffix("warrior","damageReductionPercent",25,25),
      createAffix("berzerker","healthRegenPer",3,3),
      createAffix("healer","health",600,600),
      createAffix("talent","resilience",5,5),
      createAffix("talent","strengthen",5,5),
      createAffix("talent","fortificationAura",5,5),
      createAffix("talent","aspectOfTheTreeFolk",5,5),
      createAffix("talent","regenAura",5,5)
    ]
  }
};

function generateItem(num){
  var affixNumArray = [0,0,0,0,0,0,0,0];
  for(var x = 0;x<num;x++){
    getItemLevel();
    generateName();
    affixPool = createAffixPool();
    itemAffixes = selectAffixes();
    completeItem = createItem();
    display();
    //console.log("item");
    affixNumArray[affixNum-1]++;
    //console.log(itemAffixes);
  }
  //console.log(affixNumArray);
}

function display(){
  var picture = document.getElementById("itemPicture");
  picture.src = "pictures/"+type+".png";
  var tooltip = document.getElementById("itemInfo");
  var itemBaseInfoString = this.name + "<br>Item Level: " + itemLevel + "<br>Affixes: "+affixNum+"/"+minAffixNum+"-"+maxAffixNum;
  var item = completeItem;
  var itemAffixString = "";
  if(item.healingPower!=0){
    itemAffixString+="<br>+"+item.healingPower+" Healing Power";
  }
  if(item.healingPowerPercent!=0){
    itemAffixString+="<br>+"+item.healingPowerPercent+"% Healing Power";
  }
  if(item.mana!=0){
    itemAffixString+="<br>+"+item.mana+" Mana";
  }
  if(item.manaPercent!=0){
    itemAffixString+="<br>+"+item.manaPercent+"% Mana";
  }
  for(var x = 0;x <Object.keys(item.heroes).length;x++){
    var key = Object.keys(item.heroes)[x];
    for(var y = 0;y <Object.keys(item.heroes[key]).length;y++){
      var name = Object.keys(item.heroes[key])[y];
      if(item.heroes[key][name]!=0){
        itemAffixString+="<br>+"+item.heroes[key][name]+(isPercent(name)?"% ":" ")+toRegStr(key)+" "+toRegStr(name);
      }
    }
  }
  for(var x = 0;x <Object.keys(item.talents).length;x++){
    var key = Object.keys(item.talents)[x];
    for(var y = 0;y <Object.keys(item.talents[key]).length;y++){
      var name = Object.keys(item.talents[key])[y];
      if(item.talents[key][name]!=0){
        itemAffixString+="<br>"+(item.talents[key][name]>0?"+":"")+item.talents[key][name]+(isPercent(name)?"% ":" ")+toRegStr(name)+""+(name=="all"?(" "+toRegStr(key)+" skills"):"");
      }
    }
  }
  for(var x = 0;x <Object.keys(item.skills).length;x++){
    var key = Object.keys(item.skills)[x];
    for(var y = 0;y <Object.keys(item.skills[key]).length;y++){
      var name = Object.keys(item.skills[key])[y];
      if(item.skills[key][name]!=0){
        itemAffixString+="<br>+"+item.skills[key][name]+(isPercent(name)?"% ":" ")+toRegStr(key)+" "+toRegStr(name);
      }
    }
  }
  tooltip.innerHTML = itemBaseInfoString+itemAffixString;
}

function isPercent(string){
  if(string.substring(string.length-7) == "Percent"){
    return true;
  }
  return false;
}

function toRegStr(str){
  var string = str;
  string = (string.charCodeAt(0)>90)?(String.fromCharCode(string.charCodeAt(0)-32)+string.substring(1)):string;
  var returnString = "";
  var lastCapital = 0;
  for(var x = 0;x<string.length;x++){
    if(string.charCodeAt(x)<91){
      returnString+=string.substring(lastCapital,x)+" ";
      lastCapital = x;
      //console.log("yup "+string);
    }
  }
  if(string.substring(lastCapital)!="Percent"){
    returnString+=string.substring(lastCapital);
  }
  //console.log(returnString);
  return returnString;
}

function generateName(){
  var materialLevel = Math.min(Math.floor((itemLevel+10)/20),2);
  var namePrefix = "";
  var nameSuffix = "";
  type =  itemTypes[Math.floor(Math.random()*itemTypes.length)];
  var typeMaterialString = type + materialLevel;
  var materialChoices = itemMaterials[typeMaterialString];
  material = materialChoices[Math.floor(Math.random()*materialChoices.length)]
  if(materialLevel>0){
    namePrefix = namePrefixes[Math.floor(Math.random()*namePrefixes.length)];
  }
  if(materialLevel>1){
    nameSuffix = nameSuffixes[Math.floor(Math.random()*nameSuffixes.length)];
  }
  name = namePrefix + " " + material  + " " + type + " " + nameSuffix;
  //console.log(name);
}

function selectAffixes(){
  var usedAffixKeys = [];
  var selectedAffixes = [];
  var used = false;
  for(var x = 0;x<affixNum;x++){
    while(true){
      var randAffix = Math.floor(Math.random()*affixPool.length);
      var affix = affixPool[randAffix];
      used = false;
      for(var y = 0;y<usedAffixKeys.length;y++){
        //console.log(usedAffixKeys[y]["key"] + " " + affix["key"]);
        if(usedAffixKeys[y]["key"] == affix["key"]&&usedAffixKeys[y]["name"] == affix["name"]){
          used = true;
          break;
        }
      }
      if(!used){
        selectedAffixes.push(affix);
        var temp = {key : affix["key"],name : affix["name"]};
        usedAffixKeys.push(temp);
        //console.log(usedAffixKeys);
        break;
      }
    }
  }
  //console.log(selectedAffixes);
  return selectedAffixes;
}

function createAffixPool(){
  var newAffixPool = [];
  var possiblePool1 = affixes.generic;
  var possiblePool2 = affixes[type];
  for(x in possiblePool1){
    if(itemLevel >= parseInt(x.substring(3))){
      for(var y = 0;y < possiblePool1[x].length;y++){
        newAffixPool.push(possiblePool1[x][y]);
      }
    }
  }
  for(x in possiblePool2){
    if(itemLevel >= parseInt(x.substring(3))){
      for(var y = 0;y < possiblePool2[x].length;y++){
        newAffixPool.push(possiblePool2[x][y]);
      }
    }
  }
  //console.log(newAffixPool);
  return newAffixPool;
}

function getItemLevel(){
  itemLevel = parseInt(document.getElementById("itemLevel").value);

  minAffixNum = Math.min(1 + Math.floor((itemLevel+5)/25),5);
  maxAffixNum = Math.min(2 + Math.floor(itemLevel/10),8);

  var minMaxAffixRollDiff = maxAffixNum - minAffixNum;
  var affixNumRandomizerMaxRoll = Math.pow(extraAffixChanceModifier,Math.min(Math.floor(itemLevel/10),minMaxAffixRollDiff));
  var affixNumRandomizerRoll = Math.ceil(Math.random()*affixNumRandomizerMaxRoll);
  affixNum = maxAffixNum-Math.ceil(Math.log(affixNumRandomizerRoll)/Math.log(extraAffixChanceModifier));
  if(affixNumRandomizerRoll==27&&extraAffixChanceModifier==3){
    affixNum = maxAffixNum-3;
  }else if (affixNumRandomizerRoll==81&&extraAffixChanceModifier==3) {
    affixNum = maxAffixNum-4;
  }else if (affixNumRandomizerRoll==9&&extraAffixChanceModifier==3) {
    affixNum = maxAffixNum-2;
  }
  /*if(affixNum<2||affixNum>8){
    console.log(affixNum+ " = " +maxAffixNum+ "-Math.ceil(Math.log(" +affixNumRandomizerRoll+ ")/Math.log(" +extraAffixChanceModifier+ "))");
  }*/
  //console.log(affixNumRandomizerRoll+"/"+affixNumRandomizerMaxRoll);
  //console.log(affixNum+"/"+minAffixNum+"-"+maxAffixNum);
}

function createItem(){
  var item = {
    healingPower : 0,
    healingPowerPercent : 0,
    mana : 0,
    manaPercent : 0,
    heroes : {
      warrior : {damage : 0,damagePercent : 0,health : 0,healthPercent : 0,attackSpeedPercent : 0,damageReductionPercent : 0},
      ranger : {damage : 0,damagePercent : 0,health : 0,healthPercent : 0,attackSpeedPercent : 0,damageReductionPercent : 0,dodgeChance : 0},
      berzerker : {damage : 0,damagePercent : 0,health : 0,healthPercent : 0,attackSpeedPercent : 0,damageReductionPercent : 0,healthRegenPer : 0},
      healer : {damage : 0,damagePercent : 0,health : 0,healthPercent : 0,attackSpeedPercent : 0,damageReductionPercent : 0},
      all : {damage : 0,damagePercent : 0,health : 0,healthPercent : 0,attackSpeedPercent : 0,damageReductionPercent : 0}
    },
    talents : {
      druid : {naturesBlessing : 0,abundantGrowth : 0,conjuration : 0,harmony : 0,poison : 0,eclipse : 0,aspectOfTheTreeFolk : 0,regenAura : 0, all : 0},
      priest : {pathsEnd : 0,resilience : 0,pathOfLight : 0,desperatePrayer : 0,strengthen : 0,helpingHands : 0,lightsGuidance : 0,fortificationAura : 0, all : 0},
      occultist : {darkMagic : 0,eradication : 0,demonKnowledge : 0,demonify : 0,soulBoost : 0,vampirism : 0,decayAur a : 0, all : 0},
    },
    skills : {
      lesserHealing : {baseHealing : 0,baseHealingPercent : 0,healingPowerBonus : 0,manaCostReductionPercent : 0,cooldownReductionPercent : 0,castTimeReductionPercent : 0},
      renew : {baseHealing : 0,baseHealingPercent : 0,healingPowerBonus : 0,manaCostReductionPercent : 0,cooldownReductionPercent : 0,duration : 0,durationPercent : 0},
      dispel : {manaCostReductionPercent : 0, cooldownReductionPercent : 0,additionalStatusRemove : 0,castTimeReductionPercent : 0},
      radiantHeal : {baseHealing : 0,baseHealingPercent : 0,healingPowerBonus : 0,manaCostReductionPercent : 0,cooldownReductionPercent : 0,castTimeReductionPercent : 0},
      flashHealing : {baseHealing : 0,baseHealingPercent : 0,healingPowerBonus : 0,manaCostReductionPercent : 0,cooldownReductionPercent : 0},
      rejuvenate : {baseHealingPercent : 0,cooldownReductionPercent : 0,duration : 0,durationPercent : 0,cooldownRed : 0},
      all : {baseHealing : 0,baseHealingPercent : 0,healingPowerBonus : 0,manaCostReductionPercent : 0,cooldownReductionPercent : 0,castTimeReductionPercent : 0,duration : 0,durationPercent : 0}
    }//affix["name"] == "darkMagic"||affix["name"] == "eradication"||affix["name"] == "demonKnowledge"||affix["name"] == "demonify"||affix["name"] == "soulBoost"||affix["name"] == "vampirism"||affix["name"] == "decayAura"
  };
  for(var x = 0;x< itemAffixes.length;x++){
    addAffix(item,itemAffixes[x]);
  }
  return item;
}

function addAffix(item, affix){
  //console.log(affix);
  var roll = affix.min + Math.floor(Math.random()*(affix.max-affix.min));
  if(affix["key"] == "basic"){
    item[affix["name"]] += roll;
  }else if(affix["key"] == "randomHero"){
    var hero = Object.keys(item.heroes)[Math.floor(Object.keys(item.heroes).length*Math.random())];
    item.heroes[hero][affix.name] += roll;
  }else if(affix["key"] == "randomSkill"){
    var validSkills = [];
    for(var x = 0;x<Object.keys(item.skills).length;x++){
      if(Object.keys(item.skills[Object.keys(item.skills)[x]]).includes(affix["name"])){
        validSkills.push(Object.keys(item.skills)[x]);
      }
    }
    var skill = validSkills[Math.floor(validSkills.length*Math.random())];
    item.skills[skill][affix.name] += roll;
  }else if(affix["key"] == "talent"){
    if(affix["name"] == "randomDruidTalent"){
      var talent = Object.keys(item.talents.druid)[Math.floor(Object.keys(item.talents.druid).length*Math.random())];
      item.talents.druid[talent] += roll;
    }else if (affix["name"] == "randomPriestTalent") {
      var talent = Object.keys(item.talents.priest)[Math.floor(Object.keys(item.talents.priest).length*Math.random())];
      item.talents.priest[talent] += roll;
    }else if (affix["name"] == "randomOccultistTalent") {
      var talent = Object.keys(item.talents.occultist)[Math.floor(Object.keys(item.talents.occultist).length*Math.random())];
      item.talents.occultist[talent] += roll;
    }else if (affix["name"] == "allPriest") {
      item.talents.priest["all"] += roll;
    }else if (affix["name"] == "allDruid") {
      item.talents.druid["all"] += roll;
    }else if (affix["name"] == "allOccultist") {
      item.talents.occultist["all"] += roll;
    }else if(affix["name"] == "naturesBlessing"||affix["name"] == "abundantGrowth"||affix["name"] == "conjuration"||affix["name"] == "harmony"||affix["name"] == "poison"||affix["name"] == "eclipse"||affix["name"] == "aspectOfTheTreeFolk"||affix["name"] == "regenAura"){
      item.talents.druid[affix["name"]] += roll;
    }else if(affix["name"] == "pathsEnd"||affix["name"] == "resilience"||affix["name"] == "pathOfLight"||affix["name"] == "desperatePrayer"||affix["name"] == "strengthen"||affix["name"] == "helpingHands"||affix["name"] == "lightsGuidance"||affix["name"] == "fortificationAura"){
      item.talents.priest[affix["name"]] += roll;
    }else if(affix["name"] == "darkMagic"||affix["name"] == "eradication"||affix["name"] == "demonKnowledge"||affix["name"] == "demonify"||affix["name"] == "soulBoost"||affix["name"] == "vampirism"||affix["name"] == "decayAura"){
      item.talents.occultist[affix["name"]] += roll;
    }
  }else if (affix["key"] == "allSkill") {
    item.skills["all"][affix["name"]] += roll;
  }else if (affix["key"] == "lesserHealing"||affix["key"] == "renew"||affix["key"] == "dispel"||affix["key"] == "radiantHeal"||affix["key"] == "flashHealing"||affix["key"] == "rejuvenate") {
    item.skills[affix["key"]][affix["name"]] += roll;
  }else if (affix["key"] == "talentExchange") {
    if(affix["name"] == "druidToPriest"){
        item.talents.druid["all"] -= roll;
        item.talents.priest["all"] += roll;
    }else if (affix["name"] == "priestToOccultist") {
        item.talents.priest["all"] -= roll;
        item.talents.occultist["all"] += roll;
    }else if (affix["name"] == "occultistToDruid") {
        item.talents.occultist["all"] -= roll;
        item.talents.druid["all"] += roll;
    }
  }else if (affix["key"] == "allHero") {
    item.heroes["all"][affix["name"]] += roll;
  }else if (affix["key"] == "ranger"||affix["key"] == "warrior"||affix["key"] == "berzerker"||affix["key"] == "healer") {
    item.heroes[affix["key"]][affix["name"]] += roll;
  }else{
    console.log("YOU ARE AWFUL AT CODING, THE FOLLOWING AFFIX DIDNT WORK");
    console.log(affix);
  }
}

function createAffix(keyString, nameString, minValue, maxValue){
  var affix = {
    key : keyString,
    name : nameString,
    min : minValue,
    max : maxValue
  };
  return affix;
}
