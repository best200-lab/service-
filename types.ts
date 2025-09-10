
export interface User {
  id: number;
  name: string;
  email: string;
  barNumber: string;
  practiceArea: string;
  jurisdiction: string;
  firm: string;
  isVerified: boolean;
  avatar: string;
  role?: 'admin' | 'lawyer';
}

export interface RecentActivity {
  id: number;
  user: Pick<User, 'name' | 'avatar'>;
  action: string;
  target: string;
  timestamp: string;
}

export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  participants: number[];
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

export enum PracticeArea {
  Litigation = "Litigation",
  Corporate = "Corporate Law",
  Family = "Family Law",
  RealEstate = "Real Estate",
  Criminal = "Criminal Law",
  IntellectualProperty = "Intellectual Property",
}

export enum Jurisdiction {
  Abia = "Abia",
  Adamawa = "Adamawa",
  AkwaIbom = "Akwa Ibom",
  Anambra = "Anambra",
  Bauchi = "Bauchi",
  Bayelsa = "Bayelsa",
  Benue = "Benue",
  Borno = "Borno",
  CrossRiver = "Cross River",
  Delta = "Delta",
  Ebonyi = "Ebonyi",
  Edo = "Edo",
  Ekiti = "Ekiti",
  Enugu = "Enugu",
  Gombe = "Gombe",
  Imo = "Imo",
  Jigawa = "Jigawa",
  Kaduna = "Kaduna",
  Kano = "Kano",
  Katsina = "Katsina",
  Kebbi = "Kebbi",
  Kogi = "Kogi",
  Kwara = "Kwara",
  Lagos = "Lagos",
  Nasarawa = "Nasarawa",
  Niger = "Niger",
  Ogun = "Ogun",
  Ondo = "Ondo",
  Osun = "Osun",
  Oyo = "Oyo",
  Plateau = "Plateau",
  Rivers = "Rivers",
  Sokoto = "Sokoto",
  Taraba = "Taraba",
  Yobe = "Yobe",
  Zamfara = "Zamfara",
  FCT = "Federal Capital Territory (FCT)",
}