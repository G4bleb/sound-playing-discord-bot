import { gracefulShutdown, scheduledJobs, scheduleJob } from "node-schedule";
import { playSound } from "./sound-system";
import { Channel, Guild } from "discord.js";
import { config, SoundConfig } from "./config";
import { getSoundPath } from "./utils/sounds-utils";

export function scheduleSound(
  guild: Guild,
  channel: Channel,
  sound: SoundConfig
) {
  scheduleJob(
    guild.id + ":" + sound.name,
    {
      rule: sound.schedule,
      tz: config.timezone,
    },
    () => {
      playSound(guild, channel.id, getSoundPath(sound.name));
    }
  );
}

export async function cancelSchedule() {
  await gracefulShutdown(); //Cancel all jobs
}

export function getNextPlay(guildId: string, soundName: string): Date {
  return (
    scheduledJobs[guildId + ":" + soundName].nextInvocation() as unknown as {
      toDate: () => Date;
    }
  ).toDate();
}
