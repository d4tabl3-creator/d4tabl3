const C='mtbb-tablet-v1';
const A=['./','./index.html','./manifest.json','../img/logo.png','../img/logo-sm.png','../img/qr-pagina.png','../img/presentacion-poster.jpg','../img/presentacion.mp4','./f/fraunces-latin-700-normal.woff2','./f/fraunces-latin-500-italic.woff2','./f/figtree-latin-400-normal.woff2','./f/figtree-latin-600-normal.woff2','./f/figtree-latin-700-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.status===200&&e.request.method==='GET'){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match(u.pathname.endsWith('.mp4')?'../img/presentacion.mp4':'./index.html'))))});
