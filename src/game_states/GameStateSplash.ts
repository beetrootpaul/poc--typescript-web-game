import type { GameDrawContext } from "@framework";
import { xy_ } from "@framework";
import { Pico8Colors } from "../Pico8Color.ts";
import { GameState } from "./GameState.ts";

export class GameStateSplash implements GameState {
  // TODO: migrate from Lua
  /*
      local sash = new_sash({
        duration = 10 * a.music_beat_frames,
        expand = false,
        draw_text = function(sash_center_x, sash_center_y)
            local title = "avoid your past"
            local title_w = u.measure_text_width(title)
            local author = "by @beetrootpaul"
            local author_w = u.measure_text_width(author)
            u.print_with_outline(
                title,
                sash_center_x - title_w / 2,
                sash_center_y - u.text_height_px - 3,
                u.colors.pink,
                u.colors.black
            )
            print(
                author,
                sash_center_x - author_w / 2,
                sash_center_y + 2,
                u.colors.white
            )
        end,
    })
    audio.play_music()
    audio.enable_music_layers { false, false, false }
   */

  update(): GameState {
    // TODO: migrate from Lua
    /*
        if sash.has_collapsed() then
            return new_game_state_start()
        end

        if btnp(u.buttons.l) or btnp(u.buttons.r) or btnp(u.buttons.u) or btnp(u.buttons.d) then
            sash.collapse()
        end

        sash.advance_1_frame()
     */

    return this;
  }

  draw({ drawApi }: GameDrawContext): void {
    drawApi.drawRectFilled(
      // TODO: migrate from Lua: a.camera_x, a.camera_y
      xy_(0, -16),
      // TODO: migrate from Lua: a.camera_x + u.screen_px, a.camera_y + u.screen_px
      xy_(128, 128 - 16),
      // TODO: migrate from Lua: a.bg_color_mode_normal
      Pico8Colors.DarkBlue
    );

    // TODO: migrate from Lua
    // sash.draw()
  }
}
