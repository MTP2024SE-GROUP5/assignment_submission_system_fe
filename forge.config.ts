import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import MakerDMG from "@electron-forge/maker-dmg";
import PublisherGithub from "@electron-forge/publisher-github";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    osxSign: {},
    icon: '/src/renderer/src/assets/images/logo.png'
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "assignment_system"
    }),
    new MakerZIP({}, ['darwin', 'linux']),
    new MakerDMG({
      format: 'ULFO'
    }),
    new MakerDeb({
      options: {
        name: "assignment-system",
        maintainer: 'MTP2024SE-GROUP5',
        homepage: 'https://github.com/MTP2024SE-GROUP5/assignment_submission_system_fe.git'
      }
    }),
    new MakerRpm({}),
  ],
  publishers: [
    new PublisherGithub({
      repository: {
        owner: 'MTP2024SE-GROUP5',
        name: 'assignment_submission_system_fe'
      },
      prerelease: false,
      draft: true
    })
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.mjs',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
