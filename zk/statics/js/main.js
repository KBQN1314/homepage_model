const header=document.getElementById('header');
const loading=document.querySelector('.loading');
const hero=document.querySelector('.hero');
const heroInner=document.querySelector('.hero-inner');
const progress=document.querySelector('.progress-line');
const slides=[...document.querySelectorAll('.slide')];
const dots=[...document.querySelectorAll('.hero-dots button')];
const hamburger=document.querySelector('.hamb');
const nav=document.querySelector('header nav');
const modal=document.getElementById('modal');
let current=slides.findIndex(slide=>slide.classList.contains('active'));
if(current<0) current=0;
let slideTimer=null;

function setupCurtainLoading(){
  if(!loading) return;
  loading.classList.remove('hide');
  loading.classList.add('loading-curtain');
  if(!loading.querySelector('.curtain-panel')){
    const top=document.createElement('span');
    const bottom=document.createElement('span');
    top.className='curtain-panel curtain-top';
    bottom.className='curtain-panel curtain-bottom';
    loading.prepend(bottom);
    loading.prepend(top);
  }
}

function finishCurtainLoading(){
  if(!loading) return;
  setTimeout(()=>loading.classList.add('hide'),250);
  setTimeout(()=>loading.classList.add('done'),1650);
}

function restartHeroIntro(){
  if(!heroInner) return;
  heroInner.classList.remove('anim');
  void heroInner.offsetWidth;
  heroInner.classList.add('anim');
}

function restartProgress(){
  if(!progress) return;
  progress.classList.remove('cur');
  void progress.offsetWidth;
  progress.classList.add('cur');
}

function syncSlideClasses(nextIndex){
  slides.forEach((slide,index)=>{
    slide.classList.remove('active','prev','next');
    if(index===nextIndex) slide.classList.add('active');
    else if(index<nextIndex) slide.classList.add('prev');
    else slide.classList.add('next');
  });
  dots.forEach((dot,index)=>dot.classList.toggle('active',index===nextIndex));
}

function go(n){
  if(!slides.length) return;
  current=(n+slides.length)%slides.length;
  syncSlideClasses(current);
  restartHeroIntro();
  restartProgress();
}

function startSlideTimer(){
  clearInterval(slideTimer);
  slideTimer=setInterval(()=>go(current+1),7000);
}

function setupHeroTracker(){
  if(!hero || hero.querySelector('.hero-tracker')) return;
  const tracker=document.createElement('div');
  tracker.className='hero-tracker';
  tracker.innerHTML=`
    <svg aria-hidden="true"><line x1="12" y1="5" x2="200" y2="100"></line></svg>
    <div class="pointer">
      <span class="pulse"></span>
      <span class="dot"></span>
      <div class="bubble">
        <b>学习力成长体系</b>
        <span>先测评、再训练、持续反馈，让孩子的成长过程更清楚。</span>
        <em>Find More</em>
      </div>
    </div>`;
  hero.appendChild(tracker);
  setTimeout(()=>tracker.classList.add('show'),1500);
}

function setupRevealAnimation(){
  const revealEls=[...document.querySelectorAll('.reveal')];
  revealEls.forEach(el=>el.classList.remove('show'));
  if(!('IntersectionObserver' in window)){
    revealEls.forEach(el=>el.classList.add('show'));
    return;
  }
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach((el,index)=>{
    el.style.transitionDelay=`${Math.min(index%6*0.06,.3)}s`;
    io.observe(el);
  });
}

function setupHeader(){
  if(!header) return;
  const update=()=>header.classList.toggle('scrolled',window.scrollY>40);
  update();
  window.addEventListener('scroll',update,{passive:true});
}

function setupMobileNav(){
  if(!hamburger || !nav) return;
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('expanded');
    document.body.classList.toggle('nav-open');
  });
  nav.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click',()=>{
      hamburger.classList.remove('expanded');
      document.body.classList.remove('nav-open');
    });
  });
}

function setupModal(){
  if(!modal) return;
  document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    modal.classList.add('show');
  }));
  const close=document.getElementById('closeModal');
  if(close) close.onclick=()=>modal.classList.remove('show');
  modal.addEventListener('click',event=>{
    if(event.target===modal) modal.classList.remove('show');
  });
}

function setupSlideControls(){
  syncSlideClasses(current);
  dots.forEach((dot,index)=>dot.addEventListener('click',()=>{
    go(index);
    startSlideTimer();
  }));
  if(hero){
    hero.addEventListener('mouseenter',()=>clearInterval(slideTimer));
    hero.addEventListener('mouseleave',startSlideTimer);
  }
  restartHeroIntro();
  restartProgress();
  startSlideTimer();
}

setupCurtainLoading();
setupHeader();
setupMobileNav();
setupSlideControls();
setupHeroTracker();
setupRevealAnimation();
setupModal();
window.addEventListener('load',finishCurtainLoading);