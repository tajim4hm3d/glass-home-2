/* Glass Home 2.0 complete screensaver add-on — gh-addon-complete-v1 */
(function(){
'use strict';
if(window.__ghCompleteAddon) return;
window.__ghCompleteAddon=true;
var KEY={green:404,yellow:405,blue:406,info:457};
var settings=function(k,d){ try {var v=localStorage.getItem(k);return v===null?d:v;}catch(e){return d;} };
var save=function(k,v){try{localStorage.setItem(k,v);}catch(e){}};
var page=document.createElement('style');
page.textContent='\n#gh-weather{position:fixed;right:4%;top:5%;z-index:1005;padding:15px 21px;border-radius:16px;background:rgba(6,15,34,.48);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(9px);color:#fff;font:600 24px Arial,sans-serif;text-align:right;text-shadow:0 2px 7px #061023;pointer-events:none}#gh-weather small{display:block;font-size:15px;opacity:.8;margin-top:5px}#gh-scene-tip{position:fixed;bottom:3%;right:3%;z-index:1005;color:#fff;background:rgba(6,15,34,.55);padding:10px 16px;border-radius:10px;font:16px Arial,sans-serif;pointer-events:none;opacity:0;transition:opacity .3s}#gh-extra-effects{position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2}#gh-help{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2000;display:none;color:#fff;background:rgba(8,16,33,.94);padding:30px 38px;border:1px solid #7e9dc3;border-radius:18px;max-width:85vw;font:20px/1.8 Arial,sans-serif;box-shadow:0 10px 80px #0009}#gh-help h2{margin:0 0 12px;font-size:25px}';
document.head.appendChild(page);
var weather=document.createElement('div');weather.id='gh-weather'; weather.textContent='';document.body.appendChild(weather);
var tip=document.createElement('div');tip.id='gh-scene-tip';document.body.appendChild(tip);
var help=document.createElement('div');help.id='gh-help';help.innerHTML='<h2>Glass Home · Screensaver controls</h2>🟢 Green / → &nbsp; Next scene<br>🟡 Yellow / ← &nbsp; Previous scene<br>🔵 Blue / W &nbsp; Weather on/off<br>INFO / H &nbsp; Show/hide help<br>Back / Escape &nbsp; Return home';document.body.appendChild(help);
var can=document.createElement('canvas');can.id='gh-extra-effects';document.body.appendChild(can);
var ctx=can.getContext('2d');
function toast(message){tip.textContent=message;tip.style.opacity='1';clearTimeout(toast.t);toast.t=setTimeout(function(){tip.style.opacity='0';},2400);}
function weatherVisible(){return settings('gh.lofi.weatherVisible','1')==='1';}
function applyWeather(){weather.style.display=weatherVisible()?'block':'none';}
var cityCache={London:[51.5085,-.1257],Birmingham:[52.4814,-1.8998],Manchester:[53.4808,-2.2426],Leeds:[53.7974,-1.5438],Glasgow:[55.8642,-4.2518],Edinburgh:[55.9533,-3.1883],Cardiff:[51.4816,-3.1791],Bristol:[51.4545,-2.5879],Liverpool:[53.4084,-2.9916],Nottingham:[52.9536,-1.1505]};
function codeLabel(code){if(code===0)return 'Clear';if(code<=3)return 'Partly cloudy';if(code===45||code===48)return 'Foggy';if(code>=51&&code<=67)return 'Rain';if(code>=71&&code<=77)return 'Snow';if(code>=80&&code<=82)return 'Showers';if(code>=95)return 'Thunderstorm';return 'Cloudy';}
function weatherIcon(code){if(code===0)return '☀';if(code<=3)return '⛅';if(code>=71&&code<=77)return '❄';if(code>=95)return '⛈';if(code>=51||code>=80)return '☂';return '☁';}
var weatherBusy=false;
function updateWeather(){
 if(weatherBusy)return;var city=settings('gh.lofi.weatherCity','London');var geo=cityCache[city]||cityCache.London;
 if(!weatherVisible())return;
 if(!navigator.onLine){weather.textContent='Weather unavailable offline';return;}
 weatherBusy=true;
 var url='https://api.open-meteo.com/v1/forecast?latitude='+geo[0]+'&longitude='+geo[1]+'&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto&forecast_days=1';
 fetch(url).then(function(r){if(!r.ok)throw new Error('network');return r.json();}).then(function(j){var c=j.current;if(!c||!Number.isFinite(c.temperature_2m))throw new Error('missing');weather.innerHTML='';var headline=document.createElement('div');headline.textContent=weatherIcon(c.weather_code)+' '+Math.round(c.temperature_2m)+'°C';var sub=document.createElement('small');sub.textContent=city+' · '+codeLabel(c.weather_code)+' · Humidity '+c.relative_humidity_2m+'%';weather.appendChild(headline);weather.appendChild(sub);}).catch(function(){weather.textContent='Weather unavailable · '+city;}).then(function(){weatherBusy=false;});
}
applyWeather();updateWeather();setInterval(updateWeather,15*60*1000);
function toggleWeather(){var next=weatherVisible()?'0':'1';save('gh.lofi.weatherVisible',next);applyWeather();if(next==='1')updateWeather();toast('Weather '+(next==='1'?'on':'off'));}
function sceneStep(direction){
 // Existing screensaver handles Left/Right. Dispatch a simulated key event to its handler.
 var c=direction>0?39:37;
 document.dispatchEvent(new KeyboardEvent('keydown',{keyCode:c,which:c,bubbles:true}));
 toast(direction>0?'Next scene':'Previous scene');
}
document.addEventListener('keydown',function(event){
 if(!event.isTrusted && (event.keyCode===37||event.keyCode===39))return;
 var code=event.keyCode;
 if(code===KEY.green){event.preventDefault();event.stopImmediatePropagation();sceneStep(1);}
 else if(code===KEY.yellow){event.preventDefault();event.stopImmediatePropagation();sceneStep(-1);}
 else if(code===KEY.blue||event.key==='w'||event.key==='W'){event.preventDefault();event.stopImmediatePropagation();toggleWeather();}
 else if(code===KEY.info||event.key==='h'||event.key==='H'){event.preventDefault();event.stopImmediatePropagation();var shown=help.style.display==='block';help.style.display=shown?'none':'block';}
},true);
// Lightweight, TV-friendly atmospheric particles for scenes 01–05.
// Keeps existing animations intact, and only draws additional gentle overlays.
var w=0,h=0,dpr=1,particles=[],last=0;
function resize(){w=window.innerWidth;h=window.innerHeight;dpr=Math.min(window.devicePixelRatio||1,1.5);can.width=Math.round(w*dpr);can.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);particles=[];for(var i=0;i<55;i++){particles.push({x:Math.random()*w,y:Math.random()*h,v:.3+Math.random()*.85,r:1.3+Math.random()*2.4,s:Math.random()*6.28});}}
window.addEventListener('resize',resize);resize();
function activeScene(){var s=window.ghLofiActiveFile||'';if(!s){var imgs=document.querySelectorAll('img');for(var i=0;i<imgs.length;i++){var im=imgs[i];if(im.complete && im.naturalWidth && getComputedStyle(im).opacity!=='0'&&/0[1-5]-/.test(im.src)){s=im.src;break;}}}return String(s);}
function frame(now){requestAnimationFrame(frame);if(now-last<38)return;var dt=Math.min((now-last)/16.7,3);last=now;var scene=activeScene();ctx.clearRect(0,0,w,h);if(!/0[1-5]-/.test(scene))return;var rain=/01-|03-/.test(scene);for(var i=0;i<particles.length;i++){var p=particles[i];if(rain){p.y+=(4.5+p.v*3)*dt;p.x-=.8*dt;if(p.y>h+30){p.y=-20;p.x=Math.random()*w;}if(p.x<0)p.x=w;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-2,p.y+12+p.v*12);ctx.strokeStyle='rgba(168,211,255,.13)';ctx.lineWidth=1;ctx.stroke();}else{p.y+=(.32+p.v*.62)*dt;p.x+=(Math.sin(now/1300+p.s)*.55+.2)*dt;if(p.y>h+15){p.y=-10;p.x=Math.random()*w;}if(p.x>w+12)p.x=0;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(now/1500+p.s);ctx.fillStyle=i%3===0?'rgba(255,106,48,.42)':'rgba(239,146,65,.28)';ctx.fillRect(-p.r,-p.r,p.r*2.2,p.r*1.2);ctx.restore();}}}
requestAnimationFrame(frame);
})();
