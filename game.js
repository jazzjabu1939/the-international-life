const scenes = [
  {id:'boot', place:'DARWIN / NORTHERN TERRITORY', date:'LATE 1980s', eye:'A COURSE ABOUT BEGINNING ELSEWHERE', title:'THE INTERNATIONAL<br>LIFE', copy:'Your journey begins in Darwin: an airport, a brother’s apartment, an anonymous mall, and a choice between whole cities hidden inside scratched cassettes.', button:'BEGIN ARRIVAL', objective:'Arrive before you understand the map.', observe:'Darwin is the beginning. The cassette will determine where the course opens next.', art:'<i class="sun"></i><i class="coast"></i><i class="plane"></i>'},
  {id:'airport', place:'DARWIN INTERNATIONAL AIRPORT', date:'DAY 01 / 18:42', eye:'IMAGINED PROLOGUE / INTERACTIVE', title:'FIND YOUR<br>BAG', copy:'At check-in in the U.S., you confirmed that you packed the bag yourself. Mom wanted to tie a small red ribbon to its handle. You told her that was silly—you would recognize your own luggage. Now the conveyor shudders into motion, carrying bag after nearly identical bag.', button:"REMEMBER MOM'S ADVICE", objective:'Identify your suitcase among the similar bags.', observe:'Arrival begins with a small panic: recognition is easy until the familiar appears in multiples.', art:'<i class="window"></i><i class="belt"></i><i class="luggage luggage-a"></i><i class="luggage luggage-b"></i><i class="luggage luggage-c"></i><i class="bag"></i><i class="sign">ARRIVALS</i><i class="belt-direction">LUGGAGE →</i>'},
  {id:'arrivals', place:'DARWIN AIRPORT / MAIN ARRIVALS', date:'DAY 01 / 18:51', eye:'TOO MUCH INFORMATION', title:'FIND<br>YOUR WAY', copy:'Signs compete with voices, fluorescent light, luggage carts, advertisements, and the warm dusk beyond the doors. Your brother left an address near the Esplanade. Somewhere in the room is a person you can ask how to reach it.', button:'FIND THE INFORMATION DESK', objective:'Locate the information desk.', observe:'Competence abroad often begins with admitting that you do not know what to do next.', art:''},
  {id:'transit', place:'DARWIN / IN TRANSIT', date:'DAY 01 / 19:16', eye:'IN TRANSIT / FIRST IMPRESSIONS', title:'READ THE<br>CITY', copy:'Darwin passes beyond the window in sodium light, palms, low buildings, and unfamiliar constellations.', button:'ARRIVE AT THE APARTMENT', objective:'Notice what the journey reveals on the way in.', observe:'A map can name the road. The window shows you the place.', art:''},
  {id:'condo', place:"BROTHER'S APARTMENT / ABOVE THE BAR", date:'DAY 01 / 23:47', eye:'THE MUSIC COMES THROUGH THE FLOOR', title:"BROTHER'S<br>PLACE", copy:'The apartment sits directly above a bar. Bass thumps through the floor while a huge palm-tree sign outside the window flashes green, then yellow. An old caged ceiling fan swivels back and forth with the nightclub dancers below. Sleep will require earplugs.', button:'LOOK AROUND THE ROOM', objective:'Find the earplugs—and why the console cannot start.', observe:'The fan turns, the palm flashes, and the bass arrives through the bedframe. The glamorous foreign night becomes less glamorous at midnight.', art:'<i class="blinds"></i><i class="fan"></i><i class="balcony"></i><i class="apartment-console"></i><i class="apartment-glasses"></i><i class="apartment-gloves"></i><i class="apartment-note"></i>'},
  {id:'bar', place:'THE BAR / ONE FLOOR BELOW', date:'DAY 01 / 23:51', eye:'THE SAME MUSIC / NO FLOOR BETWEEN YOU', title:'DOWNSTAIRS', copy:'The house keys open the stair door and the bedroom bass becomes the room itself. Men crowd the bar while Filipino women carry trays of beer. The tall red-haired bartender works the taps with easy authority. At the far end, an adult Filipina performer in a theatrical school-uniform costume dances on the small raised table area.', button:'RETURN UPSTAIRS', objective:'See what was keeping you awake.', observe:'Upstairs, the music was an annoyance without a source. Down here it is work, sociability, performance, loneliness, and someone else’s ordinary Saturday night.', art:''},
  {id:'walk', place:'THE ESPLANADE / ON FOOT', date:'DAY 01 / 20:02', eye:'WALK TO THE MALL', title:'HEAT AFTER<br>DARK', copy:'The distance looked short on your brother’s sketch. It is not. Humid air holds the day’s heat while traffic, palms, and licensed signs lead you toward the Darwin Free Trade Zone.', button:'ENTER THE FREE TRADE ZONE', objective:'Follow the hand-drawn route to the mall.', observe:'Walking reveals the scale that a map—and a taxi—conceals.', art:'<i class="walk-road"></i><i class="walk-lamps"></i><i class="mall-glow"></i><i class="mall-sign">FREE TRADE ZONE</i>'},
  {id:'mall', place:'DARWIN FREE TRADE ZONE', date:'WEEK 02 / 14:08', eye:"GIBSON'S STORY BEGINS HERE", title:'THE SAME<br>MALL', copy:'You have walked miles. It could be Santa Barbara again, or Singapore. Then, at the edge of licensed commerce, you see a dusty card table.', button:'APPROACH THE TABLE', objective:'Find something the mall did not intend.', observe:'The official shops sell movement without arrival: brands travel farther than people do.', art:'<i class="shop shop-a">DUTY FREE</i><i class="shop shop-b">WORLD BRANDS</i><i class="table"></i><i class="guard"></i>'},
  {id:'vendor', place:'UNLICENSED STALL / LOWER PLAZA', date:'WEEK 02 / 14:11', eye:'TWO HANDMADE CASSETTES', title:'CHOOSE<br>A TAPE', copy:'The old man sees the security guard before you do. Two handmade tapes sit in scratched, dusty cases. He taps each one in turn: “Whole city in there.” Twenty dollars.', button:'SELECT A TAPE', objective:'Choose one city. You can afford one cassette.', observe:'No right answer is hidden on the table. Buying one city means leaving the other behind.', choices:[{label:'VIRTUAL KYOTO',detail:'Cream label · hand-drawn temple roof · A$20'},{label:'VIRTUAL TAIPEI',detail:'Red label · hand-drawn street grid · A$20'}], art:'<i class="vendor"></i><i class="card-table"></i><i class="guard guard-near"></i>'},
  {id:'console', place:"BROTHER'S APARTMENT / CONSOLE", date:'LATER / HE IS NOT HOME', eye:'WHOLE CITY IN THERE', title:'SLOT THE<br>TAPE', copy:'The anonymous game console waits beside wired glasses and gloves.', button:'ENTER THE SELECTED CITY', objective:'Cross the threshold.', observe:'No brand name. No technical explanation. Only the cassette click—and then another world.', art:'<i class="crt"></i><i class="console"></i><i class="glasses"></i><i class="gloves"></i>'},
  {id:'city', place:'CITY THRESHOLD', date:'ELAPSED TIME / UNKNOWN', eye:'WHOLE CITY IN THERE', title:'SIGNAL<br>ACQUIRED', copy:'The first image resolves around you.', button:'CONTINUE', objective:'Notice which city your choice opened.', observe:'The purchased cassette—not a right answer—determines the city at the other side.', art:'<i class="refrain">WHOLE CITY IN THERE</i>'}
];

let index = 0;
let furthestIndex = 0;
let selectedTape = '';
let purchasedTape = '';
let bagCollected = false;
let walletBalance = 50;
let transportMode = '';
let cityMapTaken = false;
let mallDirectionsFound = false;
let earplugsTaken = false;
let audioContext=null, musicGain=null, musicFilter=null, crowdGain=null, musicTimer=null, soundtrackStep=0;
const $ = (selector) => document.querySelector(selector);
const game=$('#game'), world=$('#world'), title=$('#title'), copy=$('#copy'), eye=$('#eyebrow'), action=$('#action'), place=$('#place'), date=$('#date'), objective=$('#objective'), progress=$('#progress'), observation=$('#observation'), observe=$('#observe'), choices=$('#choices'), rail=$('#chapter-rail'), travelHud=$('#travel-hud'), destinationStatus=$('#destination-status'), tapeStatus=$('#tape-status');

function shortTone(type,frequency,duration,volume,endFrequency=frequency){
  const now=audioContext.currentTime, oscillator=audioContext.createOscillator(), envelope=audioContext.createGain();
  oscillator.type=type; oscillator.frequency.setValueAtTime(frequency,now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20,endFrequency),now+duration);
  envelope.gain.setValueAtTime(volume,now); envelope.gain.exponentialRampToValueAtTime(.001,now+duration);
  oscillator.connect(envelope).connect(musicGain); oscillator.start(now); oscillator.stop(now+duration+.02);
}
function noiseHit(duration,volume){
  const frames=Math.max(1,Math.floor(audioContext.sampleRate*duration));
  const buffer=audioContext.createBuffer(1,frames,audioContext.sampleRate), data=buffer.getChannelData(0);
  for(let i=0;i<frames;i++)data[i]=(Math.random()*2-1)*(1-i/frames);
  const source=audioContext.createBufferSource(), filter=audioContext.createBiquadFilter(), gain=audioContext.createGain();
  source.buffer=buffer; filter.type='highpass'; filter.frequency.value=5200; gain.gain.value=volume;
  source.connect(filter).connect(gain).connect(musicGain); source.start();
}
function soundtrackBeat(){
  if(!audioContext)return;
  const bass=[55,55,65.41,49];
  if(soundtrackStep%2===0)shortTone('sine',105,.22,.95,44);
  if(soundtrackStep%4===0)shortTone('square',bass[(soundtrackStep/4)%bass.length],.38,.13);
  noiseHit(soundtrackStep%4===2?.09:.035,soundtrackStep%4===2?.12:.055);
  soundtrackStep=(soundtrackStep+1)%16;
}
function initializeSoundtrack(){
  const AudioEngine=window.AudioContext||window.webkitAudioContext;
  if(!AudioEngine)return false;
  if(audioContext)return true;
  audioContext=new AudioEngine();
  musicGain=audioContext.createGain(); musicGain.gain.value=0;
  musicFilter=audioContext.createBiquadFilter(); musicFilter.type='lowpass'; musicFilter.frequency.value=260;
  musicGain.connect(musicFilter).connect(audioContext.destination);

  const duration=5, buffer=audioContext.createBuffer(1,audioContext.sampleRate*duration,audioContext.sampleRate), data=buffer.getChannelData(0);
  let smoothed=0;
  for(let i=0;i<data.length;i++){smoothed=smoothed*.985+(Math.random()*2-1)*.015;data[i]=smoothed;}
  const crowd=audioContext.createBufferSource(), crowdFilter=audioContext.createBiquadFilter();
  crowd.buffer=buffer; crowd.loop=true; crowdFilter.type='bandpass'; crowdFilter.frequency.value=720; crowdFilter.Q.value=.7;
  crowdGain=audioContext.createGain(); crowdGain.gain.value=0;
  crowd.connect(crowdFilter).connect(crowdGain).connect(musicFilter); crowd.start();
  soundtrackBeat(); musicTimer=setInterval(soundtrackBeat,280);
  return true;
}
function setSoundscape(mode){
  try{
    if(mode==='off'&&!audioContext)return;
    if(!initializeSoundtrack())return;
    audioContext.resume();
    const presets={bar:{music:.16,filter:6500,crowd:.085},bedroom:{music:.055,filter:260,crowd:.006},off:{music:0,filter:260,crowd:0}};
    const preset=presets[mode]||presets.off, now=audioContext.currentTime;
    musicGain.gain.setTargetAtTime(preset.music,now,.08);
    musicFilter.frequency.setTargetAtTime(preset.filter,now,.12);
    crowdGain.gain.setTargetAtTime(preset.crowd,now,.08);
  }catch(error){/* Sound is an enhancement; the route remains usable without it. */}
}

function collectBag(){
  bagCollected=true;
  game.classList.add('bag-ready');
  $('#bag-status').textContent='COLLECTED';
  objective.textContent='Carry your suitcase into the arrivals hall.';
  action.disabled=false;
  action.innerHTML='ENTER MAIN ARRIVALS <span aria-hidden="true">→</span>';
  observation.hidden=false;
  observation.textContent='The small red ribbon is still on the handle. Mom was right. Continue into the main arrivals hall.';
  game.querySelectorAll('.decoy-hotspot, .interaction-hint').forEach(element=>element.remove());
  const hotspot=$('.bag-hotspot'); if(hotspot){hotspot.classList.add('collected');hotspot.textContent='YOUR BAG — COLLECTED';hotspot.disabled=true;}
}

function rejectBag(label){
  observation.hidden=false;
  observation.textContent=`${label} It looks like yours, but there is no red ribbon on the handle. Keep looking.`;
}

function guideToHotspot(selector,message){
  const hotspot=$(selector);
  observation.hidden=false;
  observation.textContent=message;
  if(hotspot){
    hotspot.classList.remove('attention');
    void hotspot.offsetWidth;
    hotspot.classList.add('attention');
    hotspot.focus();
  }
}

function openDesk(){ $('#information-desk').showModal(); setTimeout(()=>$('#desk-question').focus(),50); }

function renderRail(){
  rail.innerHTML=scenes.map((scene,i)=>{const number=String(i+1).padStart(2,'0');return `<button type="button" aria-label="${number} — go to scene: ${scene.place}" ${i>furthestIndex?'disabled':''} class="${i===index?'current':''}"><span>${number}</span></button>`;}).join('');
  [...rail.children].forEach((button,i)=>button.addEventListener('click',()=>{index=i;render();}));
}

function renderChoices(scene){
  choices.innerHTML='';
  if(!scene.choices)return;
  scene.choices.forEach(tape=>{
    const button=document.createElement('button');
    button.type='button'; button.className='tape';
    button.innerHTML=`<strong>${tape.label}</strong><small>${tape.detail}</small>`;
    button.setAttribute('aria-label',`${tape.label}, ${tape.detail}`);
    button.setAttribute('aria-pressed',String(tape.label===selectedTape));
    button.disabled=Boolean(purchasedTape);
    button.addEventListener('click',()=>{
      if(purchasedTape)return;
      selectedTape=tape.label;
      renderChoices(scene);
      action.disabled=false;
      action.innerHTML=`BUY ${tape.label} — A$20 <span aria-hidden="true">→</span>`;
      objective.textContent=`Buy ${tape.label}. A$${walletBalance} is in your wallet.`;
      observation.hidden=false;
      observation.textContent=`${tape.detail}. The old man taps the case again. “Whole city in there.”`;
    });
    choices.append(button);
  });
}

function buySelectedTape(){
  if(!selectedTape){
    observation.hidden=false;
    observation.textContent='Choose Virtual Kyoto or Virtual Taipei. Each handmade cassette costs A$20.';
    return;
  }
  if(walletBalance<20){
    observation.hidden=false;
    observation.textContent='You do not have A$20. This route cannot purchase a cassette.';
    return;
  }
  walletBalance-=20;
  purchasedTape=selectedTape;
  $('#wallet').textContent=`A$${walletBalance}`;
  tapeStatus.textContent=purchasedTape.replace('VIRTUAL ','');
  renderChoices(scenes[index]);
  objective.textContent=`Purchased ${purchasedTape}. A$${walletBalance} remains.`;
  action.innerHTML=`RETURN WITH ${purchasedTape} <span aria-hidden="true">→</span>`;
  observation.hidden=false;
  observation.textContent=`A$20 leaves your wallet. ${purchasedTape} goes into your bag. “Whole city in there,” the old man says.`;
}

function render(){
  const scene=scenes[index];
  game.querySelectorAll('.bag-hotspot, .decoy-hotspot, .desk-hotspot, .console-hotspot, .note-hotspot, .earplug-hotspot, .keys-hotspot, .bartender-hotspot, .interaction-hint, .sound-status').forEach(hotspot=>hotspot.remove());
  const cityClass=scene.id==='city'?(purchasedTape==='VIRTUAL TAIPEI'?'taipei':'kyoto'):scene.id;
  game.className=`scene scene--${scene.id} scene--${cityClass}`;
  game.dataset.scene=cityClass;
  world.innerHTML=`<div class="environment">${scene.art}</div><div class="vignette"></div><div class="grain"></div>`;
  title.innerHTML=scene.title; copy.textContent=scene.copy; eye.textContent=scene.eye;
  action.innerHTML=`${scene.button} <span aria-hidden="true">→</span>`;
  place.textContent=scene.place; date.textContent=scene.date; objective.textContent=scene.objective;
  progress.textContent=`${String(index+1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}`;
  observation.hidden=true; observation.textContent='';
  travelHud.hidden=!['airport','arrivals','transit','condo','bar','walk','mall','vendor','console','city'].includes(scene.id);
  $('#wallet').textContent=`A$${walletBalance}`;
  $('#bag-status').textContent=bagCollected?'COLLECTED':'MISSING';
  $('#map-status').textContent=cityMapTaken?'CITY MAP':'NONE';
  tapeStatus.textContent=purchasedTape?purchasedTape.replace('VIRTUAL ',''):'NONE';
  destinationStatus.textContent=['condo','walk','mall','vendor'].includes(scene.id)?'DARWIN FREE TRADE ZONE':scene.id==='console'||scene.id==='city'?(purchasedTape||'CITY UNKNOWN'):"BROTHER'S APARTMENT";
  action.hidden=false; action.disabled=false;
  if(scene.id==='condo')setSoundscape(earplugsTaken?'off':'bedroom'); else if(scene.id==='bar')setSoundscape('bar'); else setSoundscape('off');
  if(scene.id==='condo'||scene.id==='bar'){
    const status=document.createElement('p'); status.className='sound-status'; status.setAttribute('aria-live','polite');
    status.textContent=scene.id==='bar'?'SOUND: BAR / MUSIC + VOICES':earplugsTaken?'SOUND: MUTED / EARPLUGS':'SOUND: MUFFLED THROUGH FLOOR';
    game.append(status);
  }
  if(scene.id==='airport'){
    const hint=document.createElement('p'); hint.className='interaction-hint'; hint.textContent='SCAN THE PANORAMA · INSPECT THE LUGGAGE'; game.append(hint);
    const decoys=[['decoy-hotspot decoy-a','This brown suitcase is about the right size.'],['decoy-hotspot decoy-b','This dark suitcase looks familiar.'],['decoy-hotspot decoy-c','This brown case could be yours.']];
    decoys.forEach(([className,label])=>{const decoy=document.createElement('button');decoy.type='button';decoy.className=className;decoy.setAttribute('aria-label',`Inspect ${label}`);decoy.innerHTML='<span aria-hidden="true">?</span>';decoy.addEventListener('click',()=>rejectBag(label));game.append(decoy);});
    const hotspot=document.createElement('button'); hotspot.type='button'; hotspot.className='bag-hotspot'; hotspot.setAttribute('aria-label','Inspect suitcase with a small red ribbon on the handle'); hotspot.innerHTML='<span>INSPECT BAG</span><small>RED RIBBON ON HANDLE</small>'; hotspot.addEventListener('click',collectBag); game.append(hotspot);
    if(!bagCollected){action.innerHTML='REMEMBER THE CHECK-IN <span aria-hidden="true">→</span>';}
    else {
      hotspot.classList.add('collected'); hotspot.textContent='YOUR BAG — COLLECTED'; hotspot.disabled=true;
      objective.textContent='Carry your suitcase into the arrivals hall.';
      action.innerHTML='ENTER MAIN ARRIVALS <span aria-hidden="true">→</span>';
    }
  }
  if(scene.id==='arrivals'){
    const desk=document.createElement('button'); desk.type='button'; desk.className='desk-hotspot'; desk.setAttribute('aria-label','Open the airport information desk'); desk.innerHTML='<span>i</span><small>INFORMATION</small>'; desk.addEventListener('click',openDesk); game.append(desk);
    if(transportMode){
      objective.textContent=`${transportMode.toUpperCase()} selected. A$${walletBalance} remains.`;
      action.innerHTML=`TAKE THE ${transportMode.toUpperCase()} <span aria-hidden="true">→</span>`;
    }
  }
  if(scene.id==='transit'&&transportMode){
    const labels={bus:'The bus pulls away with your wallet almost intact. One change and a final walk remain.',shuttle:'The shared shuttle waits for two more passengers, then turns toward the Esplanade.',taxi:'The taxi door closes and takes the direct road to your brother’s building. Comfort has a price.'};
    const mapLine=cityMapTaken?'The free city map lies open on your lap, naming roads that still mean nothing to you.':'You left the free map at the desk and watch for landmarks instead.';
    copy.textContent=`${labels[transportMode]} ${mapLine} Darwin passes beyond the window in sodium light, palms, low buildings, and unfamiliar constellations. The fare leaves A$${walletBalance} in your wallet.`;
    place.textContent=transportMode==='taxi'?'STUART HIGHWAY / TAXI 27':transportMode==='shuttle'?'AIRPORT SHUTTLE / ROUTE 3':'PUBLIC BUS / CITYBOUND';
  }
  if(scene.id==='condo'){
    const hint=document.createElement('p'); hint.className='interaction-hint apartment-hint'; hint.textContent='INSPECT THE ROOM'; game.append(hint);
    const consoleHotspot=document.createElement('button'); consoleHotspot.type='button'; consoleHotspot.className='console-hotspot'; consoleHotspot.setAttribute('aria-label','Inspect the anonymous console, glasses, and gloves'); consoleHotspot.innerHTML='<span>CONSOLE</span><small>NO CASSETTE</small>'; consoleHotspot.addEventListener('click',()=>{observation.hidden=false;observation.textContent='The console has wired glasses, gloves, and an empty cassette slot. It cannot take you anywhere yet.';}); game.append(consoleHotspot);
    const noteHotspot=document.createElement('button'); noteHotspot.type='button'; noteHotspot.className='note-hotspot'; noteHotspot.setAttribute('aria-label',"Read your brother's note"); noteHotspot.innerHTML='<span>READ NOTE</span><small>ON THE TABLE</small>'; noteHotspot.addEventListener('click',()=>{mallDirectionsFound=true;noteHotspot.disabled=true;noteHotspot.classList.add('collected');noteHotspot.innerHTML='<span>DIRECTIONS</span><small>FREE TRADE ZONE</small>';objective.textContent='Walk to the Darwin Free Trade Zone.';action.disabled=false;action.innerHTML='WALK TO THE MALL <span aria-hidden="true">→</span>';observation.hidden=false;observation.textContent='“Working late. Food in the fridge. The Free Trade Zone is a walk from here—follow the Esplanade east.” A rough map fills the rest of the page.';}); game.append(noteHotspot);
    const earplugs=document.createElement('button'); earplugs.type='button'; earplugs.className='earplug-hotspot'; earplugs.setAttribute('aria-label','Put in the earplugs from the bedside table'); earplugs.innerHTML=earplugsTaken?'<span>EARPLUGS</span><small>MUSIC MUTED</small>':'<span>EARPLUGS</span><small>PUT THEM IN</small>'; earplugs.disabled=earplugsTaken; earplugs.addEventListener('click',()=>{earplugsTaken=true;setSoundscape('off');earplugs.disabled=true;earplugs.classList.add('collected');earplugs.innerHTML='<span>EARPLUGS</span><small>MUSIC MUTED</small>';const status=$('.sound-status');if(status)status.textContent='SOUND: MUTED / EARPLUGS';observation.hidden=false;observation.textContent='The music disappears. The bedframe still trembles faintly, but the room is finally quiet.';}); game.append(earplugs);
    const keys=document.createElement('button');keys.type='button';keys.className='keys-hotspot';keys.setAttribute('aria-label','Take the house keys and go to the bar below');keys.innerHTML='<span>HOUSE KEYS</span><small>GO DOWNSTAIRS</small>';keys.addEventListener('click',()=>{index=scenes.findIndex(item=>item.id==='bar');furthestIndex=Math.max(furthestIndex,index);render();});game.append(keys);
    if(!mallDirectionsFound){action.innerHTML='SHOW ME MY BROTHER’S NOTE <span aria-hidden="true">→</span>';}
    else {noteHotspot.disabled=true;noteHotspot.classList.add('collected');noteHotspot.innerHTML='<span>DIRECTIONS</span><small>FREE TRADE ZONE</small>';objective.textContent='Walk to the Darwin Free Trade Zone.';action.innerHTML='WALK TO THE MALL <span aria-hidden="true">→</span>';}
  }
  if(scene.id==='bar'){
    const bartender=document.createElement('button'); bartender.type='button'; bartender.className='bartender-hotspot';
    bartender.setAttribute('aria-label','Sit at the bar and talk with the bartender');
    bartender.innerHTML='<span>SIT AT THE BAR</span><small>TALK TO THE BARTENDER</small>';
    bartender.addEventListener('click',()=>{const dialog=$('#bartender-dialog');dialog.showModal();setTimeout(()=>$('#bartender-question').focus(),50);});
    game.append(bartender);
  }
  if(scene.id==='vendor'){
    if(purchasedTape){
      selectedTape=purchasedTape;
      objective.textContent=`Purchased ${purchasedTape}. A$${walletBalance} remains.`;
      action.innerHTML=`RETURN WITH ${purchasedTape} <span aria-hidden="true">→</span>`;
    } else {
      action.disabled=!selectedTape;
      action.innerHTML=selectedTape?`BUY ${selectedTape} — A$20 <span aria-hidden="true">→</span>`:'SELECT A TAPE';
    }
  }
  if(scene.id==='console'){
    copy.textContent=`The anonymous game console waits beside wired glasses and gloves. You slot ${purchasedTape} into the machine.`;
    action.innerHTML=`ENTER ${purchasedTape} <span aria-hidden="true">→</span>`;
    objective.textContent=`Use ${purchasedTape} to cross the threshold.`;
    world.querySelector('.console').dataset.tapeLabel=purchasedTape;
  }
  if(scene.id==='city'){
    if(purchasedTape==='VIRTUAL TAIPEI'){
      place.textContent='VIRTUAL TAIPEI / THRESHOLD';
      title.innerHTML='TAIPEI<br>SIGNAL';
      copy.textContent='Scooters, vertical signs, tiled arcades, temple smoke, and summer rain begin to resolve. Your cassette opened Taipei. This is the Taipei branch.';
      objective.textContent='Continue to the Taipei city course plan.';
      action.innerHTML='OPEN THE TAIPEI COURSE PLAN <span aria-hidden="true">→</span>';
    } else {
      place.textContent='VIRTUAL KYOTO / THRESHOLD';
      title.innerHTML='I WANT TO<br>GO THERE';
      copy.textContent='Fifteen stones against white sand. A pavilion of gold, another of silver. A waterfall where people pray. This is not a game. It is a city.';
      objective.textContent='Continue to the provisional Kyoto course plan.';
      action.innerHTML='OPEN THE KYOTO COURSE PLAN <span aria-hidden="true">→</span>';
    }
  }
  renderChoices(scene); renderRail();
  document.title=`${scene.place} — The International Life`;
}

function advance(){
  if(scenes[index].id==='airport'&&!bagCollected){
    observation.hidden=false;
    observation.textContent='Mom held up a little red ribbon. “Tie this to the handle—you will thank me later.” You laughed, but let her do it.';
    return;
  }
  if(scenes[index].id==='arrivals'&&!transportMode){openDesk();return;}
  if(scenes[index].id==='condo'&&!mallDirectionsFound){
    guideToHotspot('.note-hotspot','Your brother’s note is on the table below the story panel. Select READ NOTE to reveal the route to the mall.');
    return;
  }
  if(scenes[index].id==='condo'&&mallDirectionsFound){index=scenes.findIndex(item=>item.id==='walk');furthestIndex=Math.max(furthestIndex,index);render();return;}
  if(scenes[index].id==='bar'){index=scenes.findIndex(item=>item.id==='condo');render();return;}
  if(scenes[index].id==='vendor'&&!purchasedTape){buySelectedTape();return;}
  if(index<scenes.length-1){index+=1;furthestIndex=Math.max(furthestIndex,index);render();} else openCourseDoor();
}

function openCourseDoor(){
  const isTaipei=purchasedTape==='VIRTUAL TAIPEI';
  const city=isTaipei?'TAIPEI':'KYOTO';
  $('#course-door-branch').textContent=`SELECTED CASSETTE / VIRTUAL ${city}`;
  $('#course-door-copy').textContent=`Virtual ${city.charAt(0)+city.slice(1).toLowerCase()} is open. You entered through someone else's cassette. During the semester, each tape becomes a door into a real place, a real person, and a different way of paying attention.`;
  const link=$('#course-link');
  link.href=isTaipei?'taipei.html':'course.html';
  link.innerHTML=`ENTER THE ${city} CITY SYLLABUS <span aria-hidden="true">→</span>`;
  $('#course-door').showModal();
}

action.addEventListener('click',advance);
observe.addEventListener('click',()=>{observation.hidden=!observation.hidden;observation.textContent=scenes[index].observe;});
document.addEventListener('keydown',(event)=>{
  const activeDialog=document.querySelector('dialog[open]');
  const isTyping=event.target.matches('input, textarea, select, [contenteditable="true"]');
  if(activeDialog||isTyping)return;
  if(event.key==='ArrowRight'){event.preventDefault();advance();}
  if(event.key==='ArrowLeft'&&index>0){event.preventDefault();index-=1;render();}
});

const reader=$('#reader'), credits=$('#credits'), courseDoor=$('#course-door');
$('#transcript').innerHTML=scenes.map((scene,i)=>`<section><h3>${i+1}. ${scene.place}</h3><p>${scene.copy}</p><p><em>${scene.observe}</em></p></section>`).join('');
$('#access').addEventListener('click',()=>reader.showModal());
$('#credits-button').addEventListener('click',()=>credits.showModal());
[reader,credits,courseDoor].forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();}));

const deskDialog=$('#information-desk'), deskChat=$('#desk-chat');
$('#desk-form').addEventListener('submit',event=>{
  event.preventDefault(); const input=$('#desk-question'); const question=input.value.trim(); if(!question)return;
  const q=question.toLowerCase(); let answer='Your brother’s address is near the Esplanade. I can compare the bus, shared shuttle, and taxi for you.';
  if(/cheap|cheapest|save|bus/.test(q))answer='The public bus is A$4. It takes about 55 minutes, needs one change and a short walk, and leaves you with A$46.';
  else if(/fast|quick|taxi/.test(q))answer='A taxi is the direct route to your brother’s apartment. It takes about 18 minutes, but costs A$28—more than half your cash.';
  else if(/shuttle/.test(q))answer='The shared shuttle is A$12 and takes about 35 minutes. It stops two blocks from the apartment.';
  else if(/safe|night|late/.test(q))answer='All three are reasonable this evening. The bus requires a change and a short walk; the shuttle stops nearby; the taxi goes to the door.';
  else if(/brother|apartment|esplanade|where|how/.test(q))answer='The apartment is near the Esplanade. Bus A$4, shared shuttle A$12, or direct taxi A$28. Are you trying to save some money? If so, you might want to take the bus.';
  deskChat.insertAdjacentHTML('beforeend',`<p><strong>You:</strong> ${question.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</p><p><strong>Attendant:</strong> ${answer}</p>`); input.value=''; deskChat.scrollTop=deskChat.scrollHeight;
});
$('#transport-options').addEventListener('click',event=>{
  const button=event.target.closest('button[data-mode]'); if(!button)return;
  if(transportMode)return;
  transportMode=button.dataset.mode; walletBalance-=Number(button.dataset.cost); $('#wallet').textContent=`A$${walletBalance}`;
  [...$('#transport-options').children].forEach(option=>option.disabled=true);
  deskDialog.close(); objective.textContent=`Reach your brother’s apartment by ${transportMode}. A$${walletBalance} remains.`; action.innerHTML=`TAKE THE ${transportMode.toUpperCase()} <span aria-hidden="true">→</span>`;
});
$('#take-city-map').addEventListener('click',event=>{
  cityMapTaken=!cityMapTaken;
  event.currentTarget.setAttribute('aria-pressed',String(cityMapTaken));
  event.currentTarget.innerHTML=cityMapTaken?'<b>CITY MAP TAKEN</b><small>Free · folded paper map</small>':'<b>TAKE A FREE CITY MAP</b><small>Optional · from the information desk</small>';
  $('#map-status').textContent=cityMapTaken?'CITY MAP':'NONE';
  deskChat.insertAdjacentHTML('beforeend',cityMapTaken?'<p><strong>Attendant:</strong> Here you are—a free Darwin city map. You may find it useful.</p>':'<p><strong>You:</strong> On second thought, I’ll leave the map for someone else.</p>');
  deskChat.scrollTop=deskChat.scrollHeight;
});
deskDialog.addEventListener('click',event=>{if(event.target===deskDialog)deskDialog.close();});

const bartenderDialog=$('#bartender-dialog'), bartenderChat=$('#bartender-chat');
let bartenderTurn=0;
function bartenderReply(question){
  const q=question.toLowerCase();
  if(/menu|food|eat|hungry/.test(q))return 'Menu’s short, love: a meat pie, a toasted sandwich, or chips. Beer on tap, ginger ale, lemon squash, and water. The pie has survived longer than some marriages, so I’d take the toastie.';
  if(/beer|lager|drink|recommend|have/.test(q))return 'Cold lager is what most of this lot are having. Ginger ale if you want a clear head. Water if Darwin’s heat has already had a go at you. I’m a bartender, not a recruitment officer—you choose.';
  if(/darwin|australia|town|city|here/.test(q))return 'Darwin’s small enough to meet everyone twice and hot enough to forgive nobody. People arrive for six months, then wake up ten years later owning a boat they can’t quite afford.';
  if(/music|loud|noise|sleep|upstairs|brother|apartment|earplug/.test(q))return 'Always this loud on Saturday. Your brother knew that when he took the room upstairs—cheap rent, expensive sleep. Earplugs are behind the lamp, unless he’s lost them again.';
  if(/name|who are you|yourself/.test(q))return 'Everyone calls me Red. Very imaginative bunch. Six feet tall, red hair, freckles—apparently the mystery defeated them.';
  if(/how ya goin|how are you|good|fine/.test(q))return 'Flat out, which is better than flat broke. You’ve just arrived, haven’t you? Still looking at the ceiling fans as though they require instructions.';
  if(/woman|women|filipino|dancer|dance|work/.test(q))return 'People here are working, same as me. Ask them their names before you invent their stories. That rule’ll serve you well outside this bar too.';
  if(/no|nothing|just looking|not drinking/.test(q))return 'No worries. Sit down anyway. A person can learn more over a lemon squash than over three bad beers.';
  const replies=[
    'That’s a larger question than this bar usually gets before midnight. Try me again, but give me the short version.',
    'Could be. Then again, half the men in here have been confidently wrong since opening time.',
    'You’re new, so I’ll give you one piece of local advice: ask twice, listen once, and don’t trust a distance described as “just down the road.”'
  ];
  return replies[bartenderTurn++%replies.length];
}
function sendBartenderMessage(question){
  const safe=question.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  bartenderChat.insertAdjacentHTML('beforeend',`<p><strong>You:</strong> ${safe}</p><p><strong>Bartender:</strong> ${bartenderReply(question)}</p>`);
  bartenderChat.scrollTop=bartenderChat.scrollHeight;
}
$('#bartender-form').addEventListener('submit',event=>{event.preventDefault();const input=$('#bartender-question'),question=input.value.trim();if(!question)return;sendBartenderMessage(question);input.value='';});
$('#bartender-prompts').addEventListener('click',event=>{const button=event.target.closest('button[data-prompt]');if(button)sendBartenderMessage(button.dataset.prompt);});
bartenderDialog.addEventListener('click',event=>{if(event.target===bartenderDialog)bartenderDialog.close();});
render();
