import { Audio } from "../Audio.ts";
import { f, g } from "../globals.ts";
import { Sash } from "../gui/Sash.ts";
import { GameState } from "./GameState.ts";
import { GameStateStart } from "./GameStateStart.ts";

export class GameStateSplash implements GameState {
  readonly #sash: Sash = new Sash({
    duration: g.__quickStart ? 0 : 10 * g.musicBeatFrames,
    expand: false,
    // TODO: migrate from Lua
    // draw_text = function(sash_center_x, sash_center_y)
    //     local title = "avoid your past"
    //     local title_w = u.measure_text_width(title)
    //     local author = "by @beetrootpaul"
    //     local author_w = u.measure_text_width(author)
    //     u.print_with_outline(
    //         title,
    //         sash_center_x - title_w / 2,
    //         sash_center_y - u.text_height_px - 3,
    //         u.colors.pink,
    //         u.colors.black
    //     )
    //     print(
    //         author,
    //         sash_center_x - author_w / 2,
    //         sash_center_y + 2,
    //         u.colors.white
    //     )
    // end,
  });

  constructor() {
    Audio.play_music();
    // TODO: migrate from Lua
    // audio.enable_music_layers { false, false, false }
  }

  update(): GameState {
    if (this.#sash.has_collapsed()) {
      return new GameStateStart();
    }

    if (
      f.gameInputEvents.has("left") ||
      f.gameInputEvents.has("right") ||
      f.gameInputEvents.has("up") ||
      f.gameInputEvents.has("down")
    ) {
      this.#sash.collapse();
    }

    this.#sash.advance1Frame();

    return this;
  }

  draw(): void {
    f.drawApi.rectFilled(
      g.cameraOffset,
      g.cameraOffset.add(g.screenSize),
      g.colors.bgColorModeNormal
    );

    this.#sash.draw();
  }
}
