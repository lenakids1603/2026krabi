export interface EmergencyContact {
  id: string;
  title: string;
  subtitle: string;
  phoneDirect: string;
  phoneAlt?: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    title: '紧急医疗支援 / Emergency Medical',
    subtitle: '甲米曼谷医院 (Bangkok Hospital Krabi) - 24小时救援',
    phoneDirect: '1719',
    phoneAlt: '+66 75 626 777'
  }
];
