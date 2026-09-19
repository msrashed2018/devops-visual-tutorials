(() => {
  const nodes=[...document.querySelectorAll('.loop-node')];
  const status=document.getElementById('loopStatus');
  const statuses=[
    'Reading metrics from the Kubernetes metrics APIs.',
    'Comparing the observed value with the target.',
    'Calculating the desired number of replicas.',
    'Updating the workload scale subresource.'
  ];
  let step=0,timer=null;
  function render(){nodes.forEach((n,i)=>n.classList.toggle('active',i===step));if(status)status.textContent=statuses[step]}
  function advance(){step=(step+1)%nodes.length;render()}
  function play(){if(timer)return;timer=setInterval(advance,1400)}
  function pause(){if(timer){clearInterval(timer);timer=null}}
  function replay(){pause();step=0;render();play()}
  document.getElementById('playLoop')?.addEventListener('click',play);
  document.getElementById('pauseLoop')?.addEventListener('click',pause);
  document.getElementById('resetLoop')?.addEventListener('click',replay);
  const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion)play();
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click',async()=>{
      const code=btn.parentElement?.querySelector('code')?.innerText||'';
      try{await navigator.clipboard.writeText(code);const old=btn.textContent;btn.textContent='Copied';setTimeout(()=>btn.textContent=old,1200)}
      catch{btn.textContent='Select & copy';setTimeout(()=>btn.textContent='Copy',1200)}
    });
  });
})();