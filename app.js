const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const dialog=document.querySelector('#download-dialog');let opener;
document.querySelectorAll('[data-download]').forEach(button=>button.addEventListener('click',()=>{opener=button;dialog.showModal()}));
document.querySelectorAll('.dialog-close,.dialog-dismiss').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
dialog.addEventListener('close',()=>opener?.focus());
let toastTimer;document.querySelectorAll('[data-app]').forEach(button=>button.addEventListener('click',()=>{const toast=document.querySelector('.demo-toast');toast.textContent=button.dataset.app+' · концепт интерфейса';toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}));
if(!reduceMotion&&matchMedia('(pointer: fine)').matches){const cursor=document.querySelector('.cursor');let x=-100,y=-100,tx=-100,ty=-100,frame=0;const move=()=>{x+=(tx-x)*.16;y+=(ty-y)*.16;const size=cursor.classList.contains('active')?42:22;cursor.style.transform=`translate3d(${x-size/2}px,${y-size/2}px,0)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.1)frame=requestAnimationFrame(move);else frame=0};document.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cursor.style.opacity='1';cursor.classList.toggle('active',!!e.target.closest('a,button'));if(!frame)frame=requestAnimationFrame(move)});document.addEventListener('pointerleave',()=>{cursor.style.opacity='0'});}

if(!reduceMotion&&matchMedia('(pointer: fine)').matches){
  const scene=document.querySelector('.desktop-scene');
  scene.addEventListener('pointermove',event=>{const r=scene.getBoundingClientRect();const px=(event.clientX-r.left)/r.width;const py=(event.clientY-r.top)/r.height;scene.style.transform=`perspective(1400px) rotateY(${(px-.5)*10}deg) rotateX(${(py-.5)*-7}deg)`;scene.style.setProperty('--shine-x',`${px*100}%`);scene.style.setProperty('--shine-y',`${py*100}%`)});
  scene.addEventListener('pointerleave',()=>{scene.style.transform='';scene.style.removeProperty('--shine-x');scene.style.removeProperty('--shine-y')});
  document.querySelectorAll('.glass-card').forEach(card=>card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect();card.style.setProperty('--shine-x',`${(event.clientX-r.left)/r.width*100}%`);card.style.setProperty('--shine-y',`${(event.clientY-r.top)/r.height*100}%`)}));
}
