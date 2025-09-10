
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_USERS, CURRENT_USER_ID } from '../constants';
import { Conversation, Message as MessageType, User } from '../types';
import { SendIcon, SearchIcon } from '../components/icons';

const getUserById = (id: number): User | undefined => MOCK_USERS.find(u => u.id === id);

const Messages: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [activeConversationId, setActiveConversationId] = useState<number | null>(conversations[0]?.id || null);
    const [messages, setMessages] = useState<{ [key: number]: MessageType[] }>(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, activeConversationId]);

    const handleSelectConversation = (id: number) => {
        setActiveConversationId(id);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversationId) return;

        const newMsg: MessageType = {
            id: Date.now(),
            conversationId: activeConversationId,
            senderId: CURRENT_USER_ID,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedMessages = {
            ...messages,
            [activeConversationId]: [...(messages[activeConversationId] || []), newMsg],
        };
        setMessages(updatedMessages);

        const updatedConversations = conversations.map(convo => 
            convo.id === activeConversationId
            ? { ...convo, lastMessage: newMessage, lastMessageTimestamp: newMsg.timestamp }
            : convo
        );

        const currentConvo = updatedConversations.find(c => c.id === activeConversationId);
        const otherConvos = updatedConversations.filter(c => c.id !== activeConversationId);
        if (currentConvo) {
            setConversations([currentConvo, ...otherConvos]);
        }

        setNewMessage('');
    };

    const activeConversation = conversations.find(c => c.id === activeConversationId);
    
    const getConversationPartners = (convo: Conversation) => {
        return convo.participants
            .filter(pid => pid !== CURRENT_USER_ID)
            .map(pid => getUserById(pid))
            .filter((u): u is User => u !== undefined);
    };

    return (
        <>
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Messages
            </h1>
            <div className="flex h-[calc(100vh-150px)] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Chats</h2>
                        <div className="relative mt-2">
                             <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                <SearchIcon className="w-4 h-4 text-gray-500" />
                            </div>
                            <input type="text" placeholder="Search chats" className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-sm dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(convo => {
                            const partners = getConversationPartners(convo);
                            if (partners.length === 0) return null;

                            return (
                                <div
                                    key={convo.id}
                                    onClick={() => handleSelectConversation(convo.id)}
                                    className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${activeConversationId === convo.id ? 'bg-primary-50 dark:bg-primary-900/50' : ''}`}
                                >
                                    <img src={partners[0].avatar} alt={partners[0].name} className="w-12 h-12 rounded-full mr-4" />
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{partners.map(p => p.name).join(', ')}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{convo.lastMessageTimestamp}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{convo.lastMessage}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="w-2/3 flex flex-col">
                    {activeConversation ? (
                        <>
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                                <img src={getConversationPartners(activeConversation)[0]?.avatar} alt="" className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{getConversationPartners(activeConversation).map(p => p.name).join(', ')}</p>
                                    <p className="text-xs text-green-500">Online</p>
                                </div>
                            </div>
                            {/* Messages */}
                            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                                {activeConversationId && (messages[activeConversationId] || []).map(msg => (
                                    <div key={msg.id} className={`flex items-end mb-4 ${msg.senderId === CURRENT_USER_ID ? 'justify-end' : 'justify-start'}`}>
                                        {msg.senderId !== CURRENT_USER_ID && (
                                            <img src={getUserById(msg.senderId)?.avatar} alt="" className="w-8 h-8 rounded-full mr-3 self-start" />
                                        )}
                                        <div className={`max-w-md p-3 rounded-2xl ${msg.senderId === CURRENT_USER_ID ? 'bg-primary-700 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={`text-xs mt-1 text-right ${msg.senderId === CURRENT_USER_ID ? 'text-primary-200' : 'text-gray-500'}`}>{msg.timestamp}</p>
                                        </div>
                                         {msg.senderId === CURRENT_USER_ID && (
                                            <img src={getUserById(msg.senderId)?.avatar} alt="" className="w-8 h-8 rounded-full ml-3 self-start" />
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            {/* Input */}
                            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                                <form onSubmit={handleSendMessage} className="flex items-center">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    />
                                    <button type="submit" className="ml-4 p-3 bg-primary-700 text-white rounded-full hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400" disabled={!newMessage.trim()}>
                                        <SendIcon className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            <p>Select a conversation to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Messages;
