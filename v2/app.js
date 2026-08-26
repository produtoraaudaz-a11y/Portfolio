const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');
const toast=document.getElementById('toast');
const whatsBtn=document.getElementById('whatsBtn');

function setMenu(open){mobileMenu.classList.toggle('open',open);mobileMenu.setAttribute('aria-hidden',String(!open));menuBtn.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''}
menuBtn.addEventListener('click',()=>setMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

whatsBtn.addEventListener('click',()=>{toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)});

const coarse=window.matchMedia('(pointer:coarse)').matches;
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{const v=entry.target.querySelector('video');if(!v)return;if(entry.isIntersecting&&entry.intersectionRatio>.42){v.play().catch(()=>{})}else{v.pause()}})},{threshold:[0,.42,.7]});
document.querySelectorAll('.work-card').forEach(card=>observer.observe(card));

if(!coarse){
  document.querySelectorAll('.work-card').forEach(card=>{const v=card.querySelector('video'),dot=card.querySelector('.hover-dot');card.addEventListener('mouseenter',()=>v.play().catch(()=>{}));card.addEventListener('mouseleave',()=>{if(card.getBoundingClientRect().bottom<0||card.getBoundingClientRect().top>innerHeight)v.pause()});card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();dot.style.left=(e.clientX-r.left)+'px';dot.style.top=(e.clientY-r.top)+'px'})});
}

document.querySelectorAll('.frame-tile video').forEach(v=>{
  v.addEventListener('loadedmetadata',()=>{const t=parseFloat(v.dataset.preview||'.5');try{v.currentTime=Math.min(t,Math.max(.1,v.duration-.1))}catch(e){}});
  const tile=v.closest('.frame-tile');
  tile.addEventListener('mouseenter',()=>{if(!coarse)v.play().catch(()=>{})});
  tile.addEventListener('mouseleave',()=>{if(!coarse){v.pause();try{v.currentTime=parseFloat(v.dataset.preview||'.5')}catch(e){}}});
  tile.addEventListener('pointerdown',()=>{if(coarse){if(v.paused)v.play().catch(()=>{});else v.pause()}});
});