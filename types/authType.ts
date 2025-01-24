import { Platform } from './table';

export type PlatformType = {
  platformInfos: PlatformDetailType[];
};

export type PlatformDetailType = {
  platformName: Platform;
  id: string;
  password?: string;
};
