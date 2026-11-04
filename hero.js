'use strict';
(() => {
const hero=document.querySelector('.hero');if(!hero)return;
const scenes=[...hero.querySelectorAll('.hero-scene')],dots=[...hero.querySelectorAll('[data-hero-slide]')];
const indicator=hero.querySelector('#hero-indicator'),pauseButton=hero.querySelector('.hero-pause'),announcement=hero.querySelector('.hero-announcement');
const indicators=['imgFrame87530.svg','hero-leaves-imgFrame87531.svg','hero-pan-imgFrame87531.svg','hero-mineral-imgFrame87531.svg','hero-infusion-imgFrame87531.svg'];
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let active=0,timer,cleanupTimer,ready=false,inView=true,userPaused=motionPreference.matches;
function focusBlocks(){const el=document.activeElement;return el!==pauseButton&&hero.contains(el)&&el.matches(':focus-visible')}
function blocked(){return userPaused||document.hidden||!inView||focusBlocks()}
function schedule(delay=2000){clearTimeout(timer);if(ready&&!blocked())timer=setTimeout(()=>show((active+1)%scenes.length,false),delay)}
function updatePauseButton(){pauseButton.textContent=userPaused?'▶':'Ⅱ';pauseButton.setAttribute('aria-label',userPaused?'Play slideshow':'Pause slideshow');pauseButton.setAttribute('aria-pressed',String(userPaused));}
function show(index,manual=true){
 if(index===active){schedule();return}
 clearTimeout(cleanupTimer);
 scenes.forEach(scene=>scene.classList.remove('is-leaving'));
 const previous=scenes[active],next=scenes[index],duration=manual?800:300;
 hero.style.setProperty('--hero-transition',duration+'ms');
 previous.classList.remove('is-active');previous.classList.add('is-leaving');previous.inert=true;previous.setAttribute('aria-hidden','true');
 next.classList.add('is-active');next.inert=false;next.setAttribute('aria-hidden','false');
 active=index;hero.dataset.activeScene=String(index);hero.dataset.transitionSource=manual?'manual':'autoplay';
 indicator.src='assets/'+indicators[index];
 dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===index)));
 if(manual)announcement.textContent='Scene '+(index+1)+' of 5';
 cleanupTimer=setTimeout(()=>previous.classList.remove('is-leaving'),motionPreference.matches?0:duration);
 schedule(2000+(motionPreference.matches?0:duration));
}
dots.forEach((dot,index)=>{
 dot.addEventListener('click',()=>show(index,true));
 dot.addEventListener('keydown',event=>{let index;if(event.key==='ArrowRight')index=(active+1)%scenes.length;else if(event.key==='ArrowLeft')index=(active+scenes.length-1)%scenes.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=scenes.length-1;else return;event.preventDefault();show(index,true);dots[index].focus()});
});
pauseButton.addEventListener('click',()=>{userPaused=!userPaused;updatePauseButton();schedule()});
hero.addEventListener('focusin',()=>{if(focusBlocks())clearTimeout(timer)});
hero.addEventListener('focusout',()=>queueMicrotask(()=>schedule()));
document.addEventListener('visibilitychange',()=>schedule());
motionPreference.addEventListener('change',event=>{userPaused=event.matches;updatePauseButton();schedule()});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule()},{threshold:.1}).observe(hero);
updatePauseButton();
Promise.allSettled([...hero.querySelectorAll('img')].map(img=>img.decode())).then(()=>{ready=true;hero.dataset.imagesReady='true';schedule()});
})();
