
import { User, RecentActivity, PracticeArea, Jurisdiction, Conversation, Message } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Adebayo Adewale', email: 'adebayo.a@example.com', barNumber: 'NBA/LAG/12345', practiceArea: PracticeArea.Litigation, jurisdiction: Jurisdiction.Lagos, firm: 'Adewale & Co.', isVerified: true, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Chidinma Okoro', email: 'chidinma.o@example.com', barNumber: 'NBA/ABJ/54321', practiceArea: PracticeArea.Corporate, jurisdiction: Jurisdiction.FCT, firm: 'Okoro Legal', isVerified: true, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Musa Ibrahim', email: 'musa.i@example.com', barNumber: 'NBA/KAD/67890', practiceArea: PracticeArea.Criminal, jurisdiction: Jurisdiction.Kaduna, firm: 'Ibrahim & Partners', isVerified: false, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Folake Adeyemi', email: 'folake.a@example.com', barNumber: 'NBA/OYO/11223', practiceArea: PracticeArea.Family, jurisdiction: Jurisdiction.Oyo, firm: 'Adeyemi Chambers', isVerified: true, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Tariq Bello', email: 'tariq.b@example.com', barNumber: 'NBA/RIV/33445', practiceArea: PracticeArea.RealEstate, jurisdiction: Jurisdiction.Rivers, firm: 'Bello Law Associates', isVerified: true, avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Ngozi Eze', email: 'ngozi.e@example.com', barNumber: 'NBA/ENU/66778', practiceArea: PracticeArea.IntellectualProperty, jurisdiction: Jurisdiction.Enugu, firm: 'Adewale & Co.', isVerified: false, avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Emeka Nwosu', email: 'emeka.n@example.com', barNumber: 'NBA/ANA/88990', practiceArea: PracticeArea.Litigation, jurisdiction: Jurisdiction.Anambra, firm: 'Okoro Legal', isVerified: true, avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Fatima Aliyu', email: 'fatima.a@example.com', barNumber: 'NBA/KAT/99001', practiceArea: PracticeArea.Corporate, jurisdiction: Jurisdiction.Katsina, firm: 'Ibrahim & Partners', isVerified: true, avatar: 'https://i.pravatar.cc/150?u=8' },
];

export const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
    { id: 1, user: { name: 'Chidinma Okoro', avatar: 'https://i.pravatar.cc/150?u=2' }, action: 'served', target: 'Affidavit of Urgency to Musa Ibrahim', timestamp: '2 hours ago' },
    { id: 2, user: { name: 'You', avatar: 'https://i.pravatar.cc/150?u=1' }, action: 'accepted', target: 'Writ of Summons from Folake Adeyemi', timestamp: '5 hours ago' },
    { id: 3, user: { name: 'Tariq Bello', avatar: 'https://i.pravatar.cc/150?u=5' }, action: 'commented on', target: 'Case File: FHC/L/CS/2024/001', timestamp: '1 day ago' },
    { id: 4, user: { name: 'Ngozi Eze', avatar: 'https://i.pravatar.cc/150?u=6' }, action: 'shared', target: 'Draft Partnership Agreement', timestamp: '2 days ago' },
];

export const CURRENT_USER_ID = 1;

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: 1, participants: [1, 2], lastMessage: 'Great, I will review it and get back to you shortly.', lastMessageTimestamp: '10:40 AM', unreadCount: 0 },
  { id: 2, participants: [1, 4], lastMessage: 'Can you please confirm receipt of the documents?', lastMessageTimestamp: 'Yesterday', unreadCount: 2 },
  { id: 3, participants: [1, 5], lastMessage: 'See you in court tomorrow.', lastMessageTimestamp: 'Wednesday', unreadCount: 0 },
  { id: 4, participants: [1, 7, 3], lastMessage: 'Musa, please send the preliminary objections.', lastMessageTimestamp: 'Tuesday', unreadCount: 1 },
];

export const MOCK_MESSAGES: { [key: number]: Message[] } = {
  1: [
    { id: 1, conversationId: 1, senderId: 1, text: 'Hi Chidinma, I have sent the draft agreement for your review.', timestamp: '10:30 AM' },
    { id: 2, conversationId: 1, senderId: 2, text: 'Thanks, Adebayo. I have received it.', timestamp: '10:32 AM' },
    { id: 3, conversationId: 1, senderId: 2, text: 'Great, I will review it and get back to you shortly.', timestamp: '10:40 AM' },
  ],
  2: [
    { id: 4, conversationId: 2, senderId: 4, text: 'Good morning. I sent the documents for the land transaction case.', timestamp: 'Yesterday' },
    { id: 5, conversationId: 2, senderId: 4, text: 'Can you please confirm receipt of the documents?', timestamp: 'Yesterday' },
  ],
  3: [
    { id: 6, conversationId: 3, senderId: 5, text: 'See you in court tomorrow.', timestamp: 'Wednesday' },
  ],
  4: [
    { id: 7, conversationId: 4, senderId: 1, text: 'Team, let\'s sync on the State v. Acme Corp case.', timestamp: 'Tuesday' },
    { id: 8, conversationId: 4, senderId: 7, text: 'I have completed the witness statements.', timestamp: 'Tuesday' },
    { id: 9, conversationId: 4, senderId: 1, text: 'Excellent. Musa, please send the preliminary objections.', timestamp: 'Tuesday' },
  ]
};
