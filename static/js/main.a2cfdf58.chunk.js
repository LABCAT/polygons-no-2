(this["webpackJsonppolygons-no-2"]=this["webpackJsonppolygons-no-2"]||[]).push([[0],{18:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),i=a(9),o=a.n(i),c=(a(18),a(2));window.p5=c;a(20);var r=a(33),h=a(13),v=a(10),d=a(0);function u(){return Object(d.jsxs)("svg",{id:"play-icon",className:"fade-out",xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24",children:[Object(d.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(d.jsx)("path",{d:"M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})]})}var l=a(11),g=a(12),p=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"rect",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:8;Object(l.a)(this,e),this.canvas=t,this.shape=a,this.rows=n,this.columns=s,this.canvas.rectMode(this.canvas.CENTER)}return Object(g.a)(e,[{key:"setShape",value:function(e){this.shape=e}},{key:"setStrokeWeight",value:function(e){this.weight=e}},{key:"draw",value:function(){this.canvas.strokeWeight(this.weight),this.canvas.rect(this.canvas.width/2,this.canvas.height/2,this.canvas.width,this.canvas.height);for(var e=this.canvas.width/this.columns,t=this.canvas.height/this.rows,a=e/2;a<this.canvas.width;a+=e)for(var n=t/2;n<this.canvas.height;n+=t)this.drawShape(a,n,e,t)}},{key:"reDraw",value:function(){this.canvas.clear(),this.draw()}},{key:"drawShape",value:function(e,t,a,n){switch(this.shape){case"triangle":this.canvas.triangle(e-a/2,t+n/2,e+a/2,t+n/2,e,t-n/2+this.weight/2);break;case"diamond":this.canvas.push(),this.canvas.beginShape(),this.canvas.vertex(e,t-n/2),this.canvas.vertex(e+a/2,t),this.canvas.vertex(e,t+n/2),this.canvas.vertex(e-a/2,t),this.canvas.endShape(this.canvas.CLOSE),this.canvas.pop();break;case"hex":this.canvas.push(),this.canvas.beginShape(),this.canvas.vertex(e-a/4,t-n/2),this.canvas.vertex(e+a/4,t-n/2),this.canvas.vertex(e+a/2,t),this.canvas.vertex(e+a/4,t+n/2),this.canvas.vertex(e-a/4,t+n/2),this.canvas.vertex(e-a/2,t),this.canvas.endShape(this.canvas.CLOSE),this.canvas.pop();break;case"hex90":this.canvas.push(),this.canvas.beginShape(),this.canvas.vertex(e,t-n/2),this.canvas.vertex(e+a/2,t-n/4),this.canvas.vertex(e+a/2,t+n/4),this.canvas.vertex(e,t+n/2),this.canvas.vertex(e-a/2,t+n/4),this.canvas.vertex(e-a/2,t-n/4),this.canvas.endShape(this.canvas.CLOSE),this.canvas.pop();break;case"oct":this.canvas.push(),this.canvas.beginShape(),this.canvas.vertex(e-a/4,t-n/2),this.canvas.vertex(e+a/4,t-n/2),this.canvas.vertex(e+a/2,t-n/4),this.canvas.vertex(e+a/2,t+n/4),this.canvas.vertex(e+a/4,t+n/2),this.canvas.vertex(e-a/4,t+n/2),this.canvas.vertex(e-a/2,t+n/4),this.canvas.vertex(e-a/2,t-n/4),this.canvas.endShape(this.canvas.CLOSE),this.canvas.pop();break;default:this.canvas.rect(e,t,a,n)}}}]),e}(),f=a.p+"static/media/polygons-no-2.d61eb39c.ogg",w=a.p+"static/media/polygons-no-2.c061a233.mid",S=Object.assign({},{range:r.a},h),m=function(e,t){return Math.random()*(t-e)+e},x=function(){var e=Object(n.useRef)(),t=function(e){e.canvas=null,e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.audioLoaded=!1,e.player=null,e.PPQ=15360,e.loadMidi=function(){v.Midi.fromUrl(w).then((function(t){console.log(t);var a=t.tracks[3].notes,n=t.tracks[6].notes,s=Object.assign({},t.tracks[1].controlChanges);e.scheduleCueSet(a,"executeCueSet1"),e.scheduleCueSet(n,"executeCueSet2"),e.scheduleCueSet(s[Object.keys(s)[0]],"executeCueSet3"),e.audioLoaded=!0,document.getElementById("loader").classList.add("loading--complete"),document.getElementById("play-icon").classList.remove("fade-out")}))},e.preload=function(){e.song=e.loadSound(f,e.loadMidi),e.song.onended(e.logCredits)},e.scheduleCueSet=function(t,a){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=-1,i=1,o=0;o<t.length;o++){var c=t[o],r=c.ticks,h=c.time;(r!==s||n)&&(c.currentCue=i,e.song.addCue(h,e[a],c),s=r,i++)}},e.grid=null,e.setup=function(){e.canvas=e.createCanvas(e.canvasWidth,e.canvasHeight),e.colorMode(e.HSB),e.background(0),e.generateColourScheme(),e.setupVoronoi(),e.gridCanvas=e.createGraphics(e.canvasWidth,e.canvasHeight),e.gridCanvas.noFill(),e.grid=new p(e.gridCanvas,"rect",3,3),e.grid.setStrokeWeight(32),e.grid.draw()},e.showGrid=!1,e.draw=function(){e.audioLoaded&&e.song.isPlaying()&&(e.renderVoronoi(),e.showGrid&&e.image(e.gridCanvas,0,0))},e.polygons=[],e.renderVoronoi=function(){e.drawingContext.clearRect(0,0,e.drawingContext.canvas.width,e.drawingContext.canvas.height),e.polygons=e.voronoi(e.positions).polygons();for(var t=0;t<e.totalShapes;t++){var a=e.positions[t],n=e.velocities[t];n[0]+=m(-.1,.1),n[1]+=m(-.1,.1),a[0]+=n[0],a[1]+=n[1],n[0]*=.99,n[1]*=.99,(a[0]>=e.width-4||a[0]<=4)&&(n[0]*=-1),(a[1]>=e.height-4||a[1]<=4)&&(n[1]*=-1);var s=e.polygons[t].map((function(t){return e.createVector(t[0],t[1])})),i=e.colourScheme[t];i.setAlpha(e.voronoiOpacity),e.strokeWeight(4),e.stroke(0,0,100,e.voronoiOpacity),e.fill(i),e.push(),e.beginShape(),s.map((function(t){return e.vertex(t.x,t.y)})),e.endShape(e.CLOSE),e.pop()}},e.executeCueSet1=function(t){var a=t.ticks;t.currentCue;a%30720===0&&(e.totalShapes=e.totalShapes+3,e.generateColourScheme(),e.setupVoronoi())},e.currentGridShape="rect",e.executeCueSet2=function(t){var a=t.midi,n=t.currentCue;if(![39,44,45,49,54].includes(a)){var s=["rect","diamond","hex","hex90","oct"];s.splice(s.indexOf(e.currentGridShape),1),e.showGrid=!0,e.currentGridShape=n<159?e.random(s):"rect",e.grid.setShape(e.currentGridShape),e.grid.reDraw()}},e.voronoiOpacity=0,e.executeCueSet3=function(t){e.voronoiOpacity=e.map(t.value,0,1,0,.75)},e.positions=[],e.velocities=[],e.voronoi=[],e.totalShapes=3,e.setupVoronoi=function(){e.positions=S.range(e.totalShapes).map((function(t){return Float64Array.from({length:2},(function(t,a){return Math.random()*(1&a?e.height:e.width)}))})),e.velocities=S.range(e.totalShapes).map((function(e){return Float64Array.from({length:2},(function(e){return m(-1e-4,1e-4)}))})),e.voronoi=S.voronoi().extent([[0,0],[e.width,e.height]])},e.colourScheme=[],e.generateColourScheme=function(){e.colourScheme=[];for(var t=e.random([0,30,60,90,120,150,180,210,240,270,300,330]),a=0;a<e.totalShapes;a++)e.colourScheme.push(e.color(t,e.random(75,100),e.random(75,100)))},e.mousePressed=function(){e.audioLoaded&&(e.song.isPlaying()?e.song.pause():(parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&e.reset(),document.getElementById("play-icon").classList.add("fade-out"),e.canvas.addClass("fade-in"),e.song.play()))},e.creditsLogged=!1,e.logCredits=function(){!e.creditsLogged&&parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&(e.creditsLogged=!0,console.log("Music By: http://labcat.nz/","\n","Animation By: https://github.com/LABCAT/"),e.song.stop())},e.reset=function(){},e.updateCanvasDimensions=function(){e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.canvas=e.resizeCanvas(e.canvasWidth,e.canvasHeight)},window.attachEvent?window.attachEvent("onresize",(function(){e.updateCanvasDimensions()})):window.addEventListener&&window.addEventListener("resize",(function(){e.updateCanvasDimensions()}),!0)};return Object(n.useEffect)((function(){new c(t,e.current)}),[]),Object(d.jsx)("div",{ref:e,children:Object(d.jsx)(u,{})})};var C=function(){return Object(d.jsx)(x,{})};o.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(C,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.a2cfdf58.chunk.js.map