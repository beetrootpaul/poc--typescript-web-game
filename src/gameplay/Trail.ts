import { SolidColor } from "@framework";
import { Origin } from "./Origin.ts";
import { Particle } from "./Particle.ts";

type TrailParams = {
  origin: Origin;
  color: SolidColor;
};

export class Trail {
  readonly #origin: Origin;
  readonly #color: SolidColor;

  // TODO: migrate from Lua
  // local frames_between_particles = 4
  // local frame_counter = frames_between_particles

  readonly #particles: Particle[] = [];

  constructor(params: TrailParams) {
    this.#origin = params.origin;
    this.#color = params.color;
  }

  update(): void {
    this.#particles.forEach((particle) => {
      particle.age();
    });
    // TODO: migrate from Lua
    /*
          for i = 1, #particles do
              if particles[i] then
                  particles[i].age()
                  if particles[i].should_disappear() then
                      deli(particles, i)
                      particles[i] = particles[#particles]
                      particles[#particles] = nil
                  end
              end
          end
  
          if frame_counter <= 0 then
              add(particles, new_particle {
                  x = origin.xc(),
                  y = origin.yc(),
                  color = color,
              })
          end
  
          frame_counter = (frame_counter + 1) % frames_between_particles
     */
  }

  draw() {
    this.#particles.forEach((particle) => {
      particle.draw();
    });
  }
}
