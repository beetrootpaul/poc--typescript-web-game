import { Framework, transparent } from "@framework";
import * as UPNG from "upng-js";
import { GameState } from "./game_states/GameState.ts";
import { GameStateSplash } from "./game_states/GameStateSplash.ts";
import { g } from "./globals.ts";
import { Pico8Colors } from "./Pico8Color.ts";

type GameOptions = {
  htmlDisplaySelector: string;
  htmlCanvasSelector: string;
  htmlOffscreenCanvasFallbackSelector: string;
  htmlControlsFullscreenSelector: string;
};

type GameStoredState = {};

// TODO: REWORK THIS
export let s_imgW = 0;
export let s_imgH = 0;
export let s_imgType: "rgba" | "rgb" = "rgba";
export let s_imgBytes: Uint8Array | undefined;

export class Game {
  readonly #framework: Framework<GameStoredState>;

  #gameState: GameState<GameStoredState>;

  constructor(options: GameOptions) {
    this.#framework = new Framework<GameStoredState>({
      htmlDisplaySelector: options.htmlDisplaySelector,
      htmlCanvasSelector: options.htmlCanvasSelector,
      htmlOffscreenCanvasFallbackSelector:
        options.htmlOffscreenCanvasFallbackSelector,
      htmlControlsFullscreenSelector: options.htmlControlsFullscreenSelector,
      htmlCanvasBackground: Pico8Colors.Black,
      gameCanvasSize: g.screenSize,
      desiredFps: g.fps,
      // TODO: consider disabling these logs in the production build
      logActualFps: true,
      // TODO: make it disabled for prod and toggleable for dev
      debug: true,
    });

    this.#gameState = new GameStateSplash();
  }

  start(): void {
    // TODO: REWORK THIS
    // const spriteFile = "test-image.png";
    const spriteFile = "spritesheet.png";
    fetch(spriteFile)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer())
      // docs: https://github.com/photopea/UPNG.js/#upngdecodebuffer
      .then((rawArrayBuffer) => UPNG.decode(rawArrayBuffer))
      .then(({ width, height, depth, ctype, frames, tabs, data }) => {
        s_imgW = width;
        s_imgH = height;
        if (depth != 8) {
          throw Error(`Unexpected img depth of ${depth}. Expected: 8`);
        }
        // Values and their meaning taken from https://github.com/photopea/UPNG.js/blob/master/UPNG.js
        if (ctype != 2 && ctype != 6) {
          throw Error(
            `Unexpected img ctype of ${ctype}. Expected: 2 (RGB) or 6 (RGB + alpha)`
          );
        }
        if (ctype === 2) {
          s_imgType = "rgb";
        }
        if (ctype === 6) {
          s_imgType = "rgba";
        }
        if (frames.length > 0) {
          throw Error(
            `Unexpected img frames in length of ${frames.length}. Expected length: 0`
          );
        }
        return new Uint8Array(data);
      })
      .then((uint8Array) => {
        s_imgBytes = uint8Array.slice(
          0,
          s_imgW * s_imgH * (s_imgType === "rgb" ? 3 : 4)
        );
      })
      .catch((e) => {
        console.error("FETCH:", e);
      });

    this.#framework.setOnUpdate((context) => {
      this.#gameState = this.#gameState.update(context);
    });

    this.#framework.setOnDraw((context) => {
      context.drawApi.clear(Pico8Colors.Black);
      context.drawApi.setCameraOffset(g.cameraOffset);
      this.#gameState.draw(context);
    });

    this.#framework.startGame(({}) => {});
  }
}