export type Language = 'en' | 'hi';

export type TextSize = 'sm' | 'normal' | 'lg' | 'xl';

export interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  increasedSpacing: boolean;
  increasedLineHeight: boolean;
  hideImages: boolean;
  bigCursor: boolean;
}

export interface OfficialProfile {
  id: string;
  name: string;
  nameHi: string;
  designation: string;
  designationHi: string;
  ministry: string;
  ministryHi: string;
  room?: string;
  phone: string;
  email: string;
  isLeadership: boolean;
  bio?: string;
}

export interface OrganizationCategory {
  id: string;
  name: string;
  nameHi: string;
  count: number;
}

export interface OrganizationItem {
  id: string;
  categoryId: string;
  name: string;
  nameHi: string;
  shortCode?: string;
  description: string;
  descriptionHi: string;
  headquarters: string;
  headquartersHi: string;
  jurisdiction: string;
  website: string;
  established?: string;
}

export type InfoCategory =
  | 'notifications'
  | 'updates'
  | 'circulars'
  | 'press_releases'
  | 'reports'
  | 'acts_rules'
  | 'schemes';

export interface InformationDocument {
  id: string;
  category: InfoCategory;
  title: string;
  titleHi: string;
  date: string;
  refNumber?: string;
  fileSize?: string;
  fileType: 'PDF' | 'DOC' | 'HTML';
  summary: string;
  summaryHi: string;
  details?: string;
  externalLink?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  date: string;
  snippet: string;
  link: string;
  refNumber?: string;
  docData?: InformationDocument;
}

export interface CompanyMasterRecord {
  cin: string;
  companyName: string;
  roc: string;
  registrationNumber: string;
  companyCategory: string;
  classOfCompany: string;
  authorizedCapital: string;
  paidUpCapital: string;
  dateOfIncorporation: string;
  registeredAddress: string;
  status: 'Active' | 'Under Liquidation' | 'Amalgamated' | 'Strike Off';
  email: string;
}
