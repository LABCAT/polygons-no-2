import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { range } from 'd3-array'
import * as voronoi from 'd3-voronoi'
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';

import audio from "../audio/circles-no-3.ogg";
import midi from "../audio/circles-no-3.mid";

const d3 = Object.assign(
  {},
  {
    range,
  },
  voronoi
);
const RAND = (min, max) => Math.random() * (max - min) + min;

const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    const noteSet1 = result.tracks[5].notes; // Synth 1
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.audioLoaded = true;
                    document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 

        p.positions = [];
        p.velocities = [];
        p.voronoi = [];
        p.totalShapes = 64;

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.colorMode(p.HSB);
            p.background(0);
            p.generateColourScheme()

            p.positions = d3.range(p.totalShapes).map(_ => Float64Array.from({length: 2}, (_, i) => Math.random() * (i & 1 ? p.height : p.width)))
            p.velocities = d3.range(p.totalShapes).map(_ => Float64Array.from({length: 2}, _ => RAND(-0.0001, 0.0001) ));
            p.voronoi = d3.voronoi().extent([[0, 0],[p.width, p.height]]);
        }

        p.draw = () => {
            p.renderVoronoi();
            if(p.audioLoaded && p.song.isPlaying()){

            }
        }

        p.polygons = [];

        p.renderVoronoi = () => {
            p.drawingContext.clearRect(0, 0, p.drawingContext.canvas.width, p.drawingContext.canvas.height);
            p.polygons = p.voronoi(p.positions).polygons()

            for (let i = 0; i < p.totalShapes; i++) {
                
                // EULER
                let pos = p.positions[i]
                let vel = p.velocities[i]
                vel[0] += RAND(-0.1, 0.1)
                vel[1] += RAND(-0.1, 0.1)
                pos[0] += vel[0]
                pos[1] += vel[1]
                vel[0] *= 0.99
                vel[1] *= 0.99

                // WALLS
                if (pos[0] >= p.width-4 || pos[0] <= 4) vel[0] *= -1 
                if (pos[1] >= p.height-4 || pos[1] <= 4) vel[1] *= -1
                
                
                // ALGO
                let vertices = p.polygons[i].map(v => p.createVector(v[0], v[1]));
                //rverts = roundCorners(vertices, 15);
                
                
                // RENDER (cell)
                p.push()
                p.fill(p.colourScheme[i])
                // p.noStroke()
                p.beginShape();
                vertices.map(v => p.vertex(v.x, v.y));
                p.endShape(p.CLOSE);
                p.pop()
                
            }
        }

        p.executeCueSet1 = (note) => {
            p.background(p.random(255), p.random(255), p.random(255));
            p.fill(p.random(255), p.random(255), p.random(255));
            p.noStroke();
            p.ellipse(p.width / 2, p.height / 2, p.width / 4, p.width / 4);
        }

        p.colourScheme = [];

        p.generateColourScheme = () => {
            p.colourScheme = [];
            const startHue = p.random([0,30,60,90,120,150,180,210,240,270,300,330])
            for (let i = 0; i < p.totalShapes; i++) {
                p.colourScheme.push(
                    p.color(
                        // p.random(startHue, startHue + 30),
                        startHue,
                        p.random(75, 100),
                        p.random(75, 100),
                    )
                );
            }
        }

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                    }
                    document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                }
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/"
                );
                p.song.stop();
            }
        };

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
            <PlayIcon />
        </div>
    );
};

export default P5SketchWithAudio;
