/* ── Stars ── */
  (function(){
    const c = document.getElementById('stars');
    for(let i = 0; i < 130; i++){
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random() * 2.5 + 0.5;
      s.style.cssText = `
        width:${sz}px; height:${sz}px;
        top:${Math.random()*100}%; left:${Math.random()*100}%;
        animation:twinkle ${2+Math.random()*3}s ${Math.random()*4}s infinite alternate;
        opacity:0.15;
      `;
      c.appendChild(s);
    }
  })();

  /* ── Block diagram scale animation ── */
  (function(){
    const blks = Array.from(document.querySelectorAll('.blk'));
    let idx = 0;
    setInterval(()=>{
      blks.forEach(b => b.style.transform = 'scale(1)');
      if(blks[idx]) blks[idx].style.transform = 'scale(1.08)';
      idx = (idx + 1) % blks.length;
    }, 900);
  })();

  /* ── Scene manager ── */
  const scenes  = Array.from(document.querySelectorAll('.scene'));
  const dots    = Array.from(document.querySelectorAll('.dot'));
  const bar     = document.getElementById('progressBar');
  let current   = 0, timer = null;

  function updateBar(i){ bar.style.width = ((i+1)/scenes.length*100) + '%'; }

  function goTo(idx){
    if(idx === current) return;
    scenes[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    scenes[current].classList.add('active');
    dots[current].classList.add('active');
    updateBar(current);
    resetTimer();
  }

  function next(){ goTo((current + 1) % scenes.length); }
  function resetTimer(){ clearInterval(timer); timer = setInterval(next, 7000); }

  /* Keyboard */
  document.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight' || e.key === ' ') next();
    if(e.key === 'ArrowLeft') goTo((current - 1 + scenes.length) % scenes.length);
  });

  /* Touch swipe */
  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
  document.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if(Math.abs(dx) > 50){ dx < 0 ? next() : goTo((current - 1 + scenes.length) % scenes.length); }
  });

  /* Click anywhere (except header/nav) */
  document.addEventListener('click', e => {
    if(!e.target.closest('#nav') && !e.target.closest('#header')) next();
  });

  updateBar(0);
  resetTimer();