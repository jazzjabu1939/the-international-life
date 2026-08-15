const scenes = [
  {id:'boot', place:'DARWIN / NORTHERN TERRITORY', date:'LATE 1980s', eye:'A COURSE ABOUT BEGINNING ELSEWHERE', title:'THE INTERNATIONAL<br>LIFE', copy:'Your journey begins in Darwin: an airport, a brother’s apartment, an anonymous mall, and a choice between whole cities hidden inside scratched cassettes.', button:'BEGIN ARRIVAL', objective:'Arrive before you understand the map.', observe:'Darwin is the beginning. The cassette will determine where the course opens next.', art:'<i class="sun"></i><i class="coast"></i><i class="plane"></i>'},
  {id:'airport', place:'DARWIN INTERNATIONAL AIRPORT', date:'DAY 01 / 18:42', eye:'IMAGINED PROLOGUE / INTERACTIVE', title:'FIND YOUR<br>BACKPACK', copy:'The conveyor shudders into motion. Your backpack is somewhere among the unfamiliar luggage. Look for the worn UMass patch and click the correct bag.', button:'LOCATE YOUR BACKPACK', objective:'Scan the moving belt for your UMass backpack.', observe:'Arrival begins with a small panic: every bag looks plausible until one detail makes it yours.', art:'<i class="window"></i><i class="belt"></i><i class="luggage luggage-a"></i><i class="luggage luggage-b"></i><i class="luggage luggage-c"></i><i class="bag"></i><i class="sign">ARRIVALS</i><i class="belt-direction">LUGGAGE →</i>'},
  {id:'arrivals', place:'DARWIN AIRPORT / MAIN ARRIVALS', date:'DAY 01 / 18:51', eye:'TOO MUCH INFORMATION', title:'FIND<br>YOUR WAY', copy:'Signs compete with voices, fluorescent light, luggage carts, advertisements, and the warm dusk beyond the doors. Somewhere in the room is a person you can ask.', button:'FIND THE INFORMATION DESK', objective:'Locate the information desk.', observe:'Competence abroad often begins with admitting that you do not know what to do next.', art:''},
  {id:'transit', place:'DARWIN / IN TRANSIT', date:'DAY 01 / 19:16', eye:'IN TRANSIT', title:'NO MAP<br>YET', copy:'Darwin passes in sodium light, palms, low buildings, and unfamiliar constellations.', button:'CONTINUE', objective:'Reach the student house.', observe:'The route knows exactly where you are. You do not.', art:'<i class="road"></i><i class="mirror"></i><i class="lights"></i><i class="dash"></i>'},
  {id:'condo', place:'THE ESPLANADE / GUEST ROOM', date:'DAY 03 / 02:07', eye:'THE HOURS WILL NOT SETTLE', title:'AWAKE<br>ELSEWHERE', copy:'The ceiling fan counts a time zone your body refuses to accept. Beyond the balcony, a warm city keeps making sounds you cannot name.', button:'TWO WEEKS LATER', objective:'Let the unfamiliar become ordinary.', observe:'A place begins to enter you before you have learned how to describe it.', art:'<i class="blinds"></i><i class="fan"></i><i class="balcony"></i>'},
  {id:'mall', place:'DARWIN FREE TRADE ZONE', date:'WEEK 02 / 14:08', eye:"GIBSON'S STORY BEGINS HERE", title:'THE SAME<br>MALL', copy:'You have walked miles. It could be Santa Barbara again, or Singapore. Then, at the edge of licensed commerce, you see a dusty card table.', button:'APPROACH THE TABLE', objective:'Find something the mall did not intend.', observe:'The official shops sell movement without arrival: brands travel farther than people do.', art:'<i class="shop shop-a">DUTY FREE</i><i class="shop shop-b">WORLD BRANDS</i><i class="table"></i><i class="guard"></i>'},
  {id:'vendor', place:'UNLICENSED STALL / LOWER PLAZA', date:'WEEK 02 / 14:11', eye:'A DOZEN SCRATCHED CASSETTES', title:'CHOOSE<br>A TAPE', copy:'The old man sees the security guard before Kelsey does. His handmade tapes sit in scratched, dusty cases. He taps one: “Whole city in there.” Twenty dollars.', button:'BUY THE SELECTED TAPE', objective:'Choose before the option disappears.', observe:'The tape looks ordinary because the extraordinary travels best without a logo.', choices:['SYDNEY GRID','DESERT WEATHER','VIRTUAL KYOTO'], art:'<i class="vendor"></i><i class="card-table"></i><i class="guard guard-near"></i>'},
  {id:'console', place:"KELSEY'S BROTHER'S ROOM", date:'LATER / HE IS NOT HOME', eye:'WHOLE CITY IN THERE', title:'SLOT THE<br>TAPE', copy:'An anonymous game console waits beside wired glasses and gloves. Kelsey puts them on and slots Virtual Kyoto into the machine.', button:'ENTER VIRTUAL KYOTO', objective:'Cross the threshold.', observe:'No brand name. No technical explanation. Only the cassette click—and then another world.', art:'<i class="crt"></i><i class="console"></i><i class="glasses"></i><i class="gloves"></i>'},
  {id:'kyoto', place:'VIRTUAL KYOTO', date:'ELAPSED TIME / UNKNOWN', eye:'WHOLE CITY IN THERE', title:'I WANT TO<br>GO THERE', copy:'Fifteen stones against white sand. A pavilion of gold, another of silver. A waterfall where people pray. This is not a game. It is a city.', button:'OPEN THE CITY SYLLABUS', objective:'Pay attention to what is actually there.', observe:'The course begins with someone else’s tape. It ends when you make the next one.', art:'<i class="refrain">WHOLE CITY IN THERE</i><i class="moon"></i><i class="roof roof-a"></i><i class="roof roof-b"></i><i class="stones"></i><i class="gate"></i>'}
];

let index = 0;
let furthestIndex = 0;
let selectedTape = 'VIRTUAL KYOTO';
let bagCollected = false;
let walletBalance = 50;
let transportMode = '';
const $ = (selector) => document.querySelector(selector);
const game=$('#game'), world=$('#world'), title=$('#title'), copy=$('#copy'), eye=$('#eyebrow'), action=$('#action'), place=$('#place'), date=$('#date'), objective=$('#objective'), progress=$('#progress'), observation=$('#observation'), observe=$('#observe'), choices=$('#choices'), rail=$('#chapter-rail'), travelHud=$('#travel-hud');

function collectBag(){
  bagCollected=true;
  game.classList.add('bag-ready');
  $('#pack-status').textContent='COLLECTED';
  objective.textContent='Carry the backpack into the arrivals hall.';
  action.disabled=false;
  action.innerHTML='ENTER MAIN ARRIVALS <span aria-hidden="true">→</span>';
  observation.hidden=false;
  observation.textContent='That is yours. Backpack collected. Continue into the main arrivals hall.';
  game.querySelectorAll('.decoy-hotspot, .interaction-hint').forEach(element=>element.remove());
  const hotspot=$('.bag-hotspot'); if(hotspot){hotspot.classList.add('collected');hotspot.textContent='UMASS PACK COLLECTED';hotspot.disabled=true;}
}

function rejectBag(label){
  observation.hidden=false;
  observation.textContent=`${label} Not yours. Keep scanning for the faded maroon UMass patch.`;
}

function openDesk(){ $('#information-desk').showModal(); setTimeout(()=>$('#desk-question').focus(),50); }

function renderRail(){
  rail.innerHTML=scenes.map((scene,i)=>{const number=String(i+1).padStart(2,'0');return `<button type="button" aria-label="${number} — go to scene: ${scene.place}" ${i>furthestIndex?'disabled':''} class="${i===index?'current':''}"><span>${number}</span></button>`;}).join('');
  [...rail.children].forEach((button,i)=>button.addEventListener('click',()=>{index=i;render();}));
}

function renderChoices(scene){
  choices.innerHTML='';
  if(!scene.choices)return;
  scene.choices.forEach(label=>{
    const button=document.createElement('button');
    button.type='button'; button.className='tape'; button.textContent=label;
    button.setAttribute('aria-pressed',String(label===selectedTape));
    button.addEventListener('click',()=>{
      selectedTape=label;
      renderChoices(scene);
      if(label!=='VIRTUAL KYOTO'){
        observation.hidden=false;
        observation.textContent=`${label}: the case is empty. The old man taps the Kyoto cassette instead.`;
      } else observation.hidden=true;
    });
    choices.append(button);
  });
}

function render(){
  const scene=scenes[index];
  game.querySelectorAll('.bag-hotspot, .decoy-hotspot, .desk-hotspot, .interaction-hint').forEach(hotspot=>hotspot.remove());
  game.className=`scene scene--${scene.id}`;
  game.dataset.scene=scene.id;
  world.innerHTML=`<div class="environment">${scene.art}</div><div class="vignette"></div><div class="grain"></div>`;
  title.innerHTML=scene.title; copy.textContent=scene.copy; eye.textContent=scene.eye;
  action.innerHTML=`${scene.button} <span aria-hidden="true">→</span>`;
  place.textContent=scene.place; date.textContent=scene.date; objective.textContent=scene.objective;
  progress.textContent=`${String(index+1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}`;
  observation.hidden=true; observation.textContent='';
  travelHud.hidden=!['airport','arrivals','transit'].includes(scene.id);
  $('#wallet').textContent=`A$${walletBalance}`;
  $('#pack-status').textContent=bagCollected?'COLLECTED':'MISSING';
  action.hidden=false; action.disabled=false;
  if(scene.id==='airport'){
    const hint=document.createElement('p'); hint.className='interaction-hint'; hint.textContent='CLICK THE LUGGAGE TO INSPECT IT'; game.append(hint);
    const decoys=[['decoy-hotspot decoy-a','Black roller bag.'],['decoy-hotspot decoy-b','Red suitcase.'],['decoy-hotspot decoy-c','Canvas duffel.']];
    decoys.forEach(([className,label])=>{const decoy=document.createElement('button');decoy.type='button';decoy.className=className;decoy.setAttribute('aria-label',`Inspect ${label}`);decoy.innerHTML='<span aria-hidden="true">?</span>';decoy.addEventListener('click',()=>rejectBag(label));game.append(decoy);});
    const hotspot=document.createElement('button'); hotspot.type='button'; hotspot.className='bag-hotspot'; hotspot.setAttribute('aria-label','Collect the backpack with the UMass patch'); hotspot.innerHTML='<span>UMASS</span><small>FADED PATCH</small>'; hotspot.addEventListener('click',collectBag); game.append(hotspot);
    if(!bagCollected){action.disabled=true;action.innerHTML='FIND THE UMASS PATCH';}
    else {
      hotspot.classList.add('collected'); hotspot.textContent='UMASS PACK COLLECTED'; hotspot.disabled=true;
      objective.textContent='Carry the backpack into the arrivals hall.';
      action.innerHTML='ENTER MAIN ARRIVALS <span aria-hidden="true">→</span>';
    }
  }
  if(scene.id==='arrivals'){
    const desk=document.createElement('button'); desk.type='button'; desk.className='desk-hotspot'; desk.setAttribute('aria-label','Open the airport information desk'); desk.innerHTML='<span>i</span><small>INFORMATION</small>'; desk.addEventListener('click',openDesk); game.append(desk);
  }
  if(scene.id==='transit'&&transportMode){
    const labels={bus:'The bus pulls away with your wallet almost intact.',shuttle:'The shared shuttle waits for two more passengers.',taxi:'The taxi door closes. Comfort has a price.'};
    copy.textContent=`${labels[transportMode]} Darwin passes in sodium light, palms, low buildings, and unfamiliar constellations. You have A$${walletBalance} left.`;
    place.textContent=transportMode==='taxi'?'STUART HIGHWAY / TAXI 27':transportMode==='shuttle'?'AIRPORT SHUTTLE / ROUTE 3':'PUBLIC BUS / CITYBOUND';
  }
  renderChoices(scene); renderRail();
  document.title=`${scene.place} — The International Life`;
}

function advance(){
  if(scenes[index].id==='airport'&&!bagCollected)return;
  if(scenes[index].id==='arrivals'&&!transportMode){openDesk();return;}
  if(scenes[index].id==='vendor' && selectedTape!=='VIRTUAL KYOTO'){
    observation.hidden=false;
    observation.textContent='The selected case is empty. Choose VIRTUAL KYOTO before the guard arrives.';
    return;
  }
  if(index<scenes.length-1){index+=1;furthestIndex=Math.max(furthestIndex,index);render();} else $('#course-door').showModal();
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
  const q=question.toLowerCase(); let answer='Top End Student House is in the city centre. I can compare the bus, shared shuttle, and taxi for you.';
  if(/cheap|cheapest|save|bus/.test(q))answer='The public bus is A$4. It takes about 55 minutes, needs one change, and leaves you with A$46.';
  else if(/fast|quick|taxi/.test(q))answer='A taxi is direct and takes about 18 minutes, but costs A$28—more than half your cash.';
  else if(/shuttle/.test(q))answer='The shared shuttle is A$12 and takes about 35 minutes. It will drop you at the hostel door.';
  else if(/safe|night|late/.test(q))answer='All three are reasonable this evening. The bus requires a short walk; the shuttle and taxi stop at the hostel.';
  else if(/hostel|student|house|where|how/.test(q))answer='Top End Student House is near the Esplanade. Bus A$4, shared shuttle A$12, or taxi A$28. You have A$50.';
  deskChat.insertAdjacentHTML('beforeend',`<p><strong>You:</strong> ${question.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</p><p><strong>Attendant:</strong> ${answer}</p>`); input.value=''; deskChat.scrollTop=deskChat.scrollHeight;
});
$('#transport-options').addEventListener('click',event=>{
  const button=event.target.closest('button[data-mode]'); if(!button)return;
  if(transportMode)return;
  transportMode=button.dataset.mode; walletBalance-=Number(button.dataset.cost); $('#wallet').textContent=`A$${walletBalance}`;
  [...$('#transport-options').children].forEach(option=>option.disabled=true);
  deskDialog.close(); objective.textContent=`Reach the hostel by ${transportMode}. A$${walletBalance} remains.`; action.innerHTML=`TAKE THE ${transportMode.toUpperCase()} <span aria-hidden="true">→</span>`;
});
deskDialog.addEventListener('click',event=>{if(event.target===deskDialog)deskDialog.close();});
render();
