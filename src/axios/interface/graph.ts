export interface graphBpmHrvArr {
  writetime: string;
  bpm: number;
  hrv: number;
  breathe: number;
  count: number;
}

export interface graphKindButton {
  bpm_hrv_arr: boolean;
  cal_step: boolean;
  ecg: boolean;
  stress: boolean;
}
