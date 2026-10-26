const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
const updateHeader=()=>header.classList.toggle('scrolled',window.scrollY>25);
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
links?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

document.querySelector('.enquiry-form')?.addEventListener('submit',event=>{event.preventDefault();event.currentTarget.querySelector('.form-message').textContent='Thank you. Our advisory team will be in touch shortly.';event.currentTarget.reset()});
const carousel=document.querySelector('.estate-carousel .estate-grid');
document.querySelectorAll('[data-carousel]').forEach(button=>button.addEventListener('click',()=>{const card=carousel?.querySelector('.estate-card');if(!carousel||!card)return;const amount=card.getBoundingClientRect().width+19;carousel.scrollBy({left:button.dataset.carousel==='next'?amount:-amount,behavior:'smooth'})}));
if(carousel){let carouselTimer;const moveCarousel=()=>{if(carousel.closest('.estate-carousel')?.classList.contains('grid-view'))return;const card=carousel.querySelector('.estate-card');if(!card)return;const amount=card.getBoundingClientRect().width+19;const atEnd=carousel.scrollLeft+carousel.clientWidth>=carousel.scrollWidth-4;carousel.scrollTo({left:atEnd?0:carousel.scrollLeft+amount,behavior:'smooth'})};const startCarousel=()=>{clearInterval(carouselTimer);carouselTimer=setInterval(moveCarousel,4200)};carousel.addEventListener('mouseenter',()=>clearInterval(carouselTimer));carousel.addEventListener('mouseleave',startCarousel);carousel.addEventListener('touchstart',()=>clearInterval(carouselTimer),{passive:true});carousel.addEventListener('touchend',startCarousel,{passive:true});startCarousel()}
const heroSlides=[...document.querySelectorAll('.hero-image')];
const heroDots=[...document.querySelectorAll('[data-hero-slide]')];
let activeHero=0,heroTimer;
const showHero=index=>{activeHero=(index+heroSlides.length)%heroSlides.length;heroSlides.forEach((slide,i)=>slide.classList.toggle('active',i===activeHero));heroDots.forEach((dot,i)=>dot.classList.toggle('active',i===activeHero))};
const startHero=()=>{clearInterval(heroTimer);heroTimer=setInterval(()=>showHero(activeHero+1),5200)};
heroDots.forEach(dot=>dot.addEventListener('click',()=>{showHero(Number(dot.dataset.heroSlide));startHero()}));
showHero(0);startHero();
const propertyCarousel=document.querySelector('.estate-carousel');
document.querySelectorAll('[data-property-view]').forEach(button=>button.addEventListener('click',()=>{const grid=button.dataset.propertyView==='grid';propertyCarousel?.classList.toggle('grid-view',grid);propertyCarousel?.classList.toggle('editorial-view',!grid);document.querySelectorAll('[data-property-view]').forEach(item=>item.classList.toggle('active',item===button));if(!grid)carousel?.scrollTo({left:0,behavior:'smooth'})}));
const propertyCards=[...document.querySelectorAll('[data-category]')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(item=>item.classList.toggle('active',item===button));propertyCards.forEach(card=>card.classList.toggle('is-hidden',filter!=='all'&&card.dataset.category!==filter))}));
document.querySelectorAll('.property-card-link').forEach(card=>{const open=event=>{if(event.target.closest('a'))return;window.location.href=card.dataset.propertyUrl};card.addEventListener('click',open);card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();window.location.href=card.dataset.propertyUrl}})});

// Custom Cursor Setup
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 250, fill: "forwards" });
});
