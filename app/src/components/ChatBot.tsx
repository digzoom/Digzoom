import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Phone, MinusCircle, Bot, User, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// ─── Inline useChat hook (merged to avoid tree-shaking issues) ───

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatResponse {
  keywords: string[];
  response: string;
  suggestions?: string[];
}

const botResponses: Record<string, ChatResponse[]> = {
  ar: [
    { keywords: ['مرحبا','هلا','السلام','عليكم','هاي','أهلا','حياك','سلام'], response: 'أهلاً وسهلاً بك في digzoom! 🎉 أنا مساعدك الذكي، كيف أقدر أساعدك اليوم؟', suggestions: ['كيف أشتري منتج؟','طرق الدفع','المنتجات المتوفرة'] },
    { keywords: ['شراء','اشتري','أشتري','طلب','اطلب','أطلب','تسوق','آخذ','أخذ'], response: 'عملية الشراء سهلة جداً! 📦\n\n1. تصفح المتجر واختر المنتج اللي يعجبك\n2. اضغط "أضف للسلة" 🛒\n3. اذهب لصفحة الدفع واملأ بياناتك\n4. ادفع بأي طريقة تناسبك\n5. تحصل على رابط التحميل فوراً بعد الدفع ✅', suggestions: ['طرق الدفع','كيف أحمل المنتج؟','المنتجات المتوفرة'] },
    { keywords: ['دفع','الدفع','فيزا','ماستر','مدى','بطاقة','أبل باي','جوجل باي','سترايب','تحويل'], response: 'نقبل جميع طرق الدفع الشائعة 💳:\n\n• Visa / Mastercard\n• Apple Pay 🍎\n• Google Pay 🤖\n• مدى (Mada)\n• Stripe\n\nكل المعاملات مشفرة وآمنة 100% 🔒', suggestions: ['الأسعار','كيف أشتري؟','ضمان الاسترجاع'] },
    { keywords: ['تحميل','احمل','أحمل','الملف','ينزل','نزل','تنزيل','فتح','وصل'], response: 'بعد إتمام الشراء مباشرة: 📥\n\n1. اذهب لصفحة "طلباتي" في حسابك\n2. اضغط على المنتج اللي اشتريته\n3. اضغط "تحميل" واحفظ الملف\n\n⚡ المنتجات رقمية 100% - التحميل فوري بعد الدفع!\n📧 كمان نرسل لك رابط التحميل على بريدك الإلكتروني.', suggestions: ['مشكلة في التحميل','كيف أشتري؟','تواصل مع الدعم'] },
    { keywords: ['استرجاع','رجع','استرداد','فلوس','ما عجبني','عطلان','مكسور','ما يفتح'], response: 'لا تقلق! 😊 عندك ضمان استرجاع كامل لمدة 30 يوم 📅\n\nإذا واجهتك أي مشكلة أو ما كنت راضي عن المنتج:\n\n1. تواصل معنا من صفحة "اتصل بنا"\n2. أو راسلنا على واتساب 📱\n\nنرجع لك فلوسك كاملة بدون أي أسئلة! 💰', suggestions: ['تواصل مع الدعم','سياسة الاسترجاع','المنتج ما يشتغل'] },
    { keywords: ['منتج','منتجات','كتب','قوالب','فيديو','صور','خطوط','كورسات','تصاميم','PLR','مكتبة'], response: 'عندنا أكثر من 300 منتج رقمي متنوع 🎨:\n\n📚 كتب إلكترونية\n📋 قوالب جاهزة\n🎬 فيديوهات وكورسات\n🎵 صوتيات ومؤثرات\n💻 أكواد ومواقع\n📷 صور احترافية\n🎨 خطوط عربية\n🖼️ تصاميم جرافيك\n\nتصفح المتجر واكتشف بنفسك! 🔥', suggestions: ['المنتجات الأكثر مبيعاً','كيف أشتري؟','الاشتراكات'] },
    { keywords: ['سعر','أسعار','بكم','كام','رخيص','غالي','خصم','عرض','تخفيض'], response: 'أسعارنا تبدأ من 29 ر.س فقط! 💰\n\n📌 كل المنتجات بخصم 50% دائم\n📌 اشتر مرة واستفيد مدى الحياة\n📌 تحديثات مجانية', suggestions: ['الاشتراكات','كيف أشتري؟','طرق الدفع'] },
    { keywords: ['دعم','مساعدة','مشكلة','تواصل','واتس','واتساب','اتصال','رقم','تلفون','شكوى'], response: 'فريق الدعم جاهز يساعدك! 🛎️\n\n📱 واتساب: +966 56 988 8456\n📧 بريد: support@digzoom.com\n💬 أو ابقى معي أنا مساعدك الذكي!\n\nمتاحين 24/7 🕐', suggestions: ['مشكلة في التحميل','المنتج ما يشتغل','طلب استرجاع'] },
    { keywords: ['شكرا','شكراً','تسلم','يسلمو','مشكور','thanks','thank'], response: 'عفواً! 😊 أنا في خدمتك دائماً. إذا احتجت أي شي ثاني لا تتردد!', suggestions: ['كيف أشتري؟','المنتجات المتوفرة'] },
    { keywords: ['سلامة','باي','وداعا','وداعاً','bye','goodbye'], response: 'مع السلامة! 👋 نتمنى لك تجربة ممتعة مع digzoom. نراك قريباً! 🌟', suggestions: [] },
  ],
  en: [
    { keywords: ['hello','hi','hey','welcome','good morning','good evening'], response: 'Welcome to digzoom! 🎉 I\'m your AI assistant. How can I help you today?', suggestions: ['How to buy?','Payment methods','Available products'] },
    { keywords: ['buy','purchase','order','shop','checkout','cart'], response: 'Buying is super easy! 📦\n\n1. Browse the shop and pick a product\n2. Click "Add to Cart" 🛒\n3. Go to checkout and fill your details\n4. Pay with any method you prefer\n5. Get instant download link after payment ✅', suggestions: ['Payment methods','How to download?','Available products'] },
    { keywords: ['pay','payment','visa','mastercard','mada','card','apple pay','google pay','stripe'], response: 'We accept all major payment methods 💳:\n\n• Visa / Mastercard\n• Apple Pay 🍎\n• Google Pay 🤖\n• Mada (Saudi Arabia)\n• Stripe\n\nAll transactions are encrypted and 100% secure 🔒', suggestions: ['Pricing','How to buy?','Refund policy'] },
    { keywords: ['download','get file','files','save','link'], response: 'After completing your purchase: 📥\n\n1. Go to "My Orders" in your account\n2. Click on the product you bought\n3. Hit "Download" and save the file\n\n⚡ All products are 100% digital - instant download!\n📧 We also email you the download link.', suggestions: ['Download issue','How to buy?','Contact support'] },
    { keywords: ['refund','return','money back','not working','broken','issue','problem'], response: 'No worries! 😊 We have a 30-day money-back guarantee 📅\n\nIf you face any issue or aren\'t satisfied:\n\n1. Contact us via "Contact Us" page\n2. Or message us on WhatsApp 📱\n\nWe\'ll refund you 100% - no questions asked! 💰', suggestions: ['Contact support','Refund policy','Download issue'] },
    { keywords: ['products','product','books','templates','videos','images','fonts','courses','designs','plr','library'], response: 'We have 300+ digital products 🎨:\n\n📚 E-Books\n📋 Templates\n🎬 Videos & Courses\n🎵 Audio & Sound Effects\n💻 Code & Web Assets\n📷 Professional Photos\n🎨 Arabic Fonts\n🖼️ Graphics\n\nBrowse the shop and discover more! 🔥', suggestions: ['Best sellers','How to buy?','Subscriptions'] },
    { keywords: ['price','prices','cost','how much','cheap','expensive','discount','offer','sale'], response: 'Prices start from just 29 SAR! 💰\n\n📌 All products have 50% permanent discount\n📌 Buy once, keep forever\n📌 Free updates included', suggestions: ['Subscriptions','How to buy?','Payment methods'] },
    { keywords: ['support','help','assist','contact','whatsapp','phone','call','number','reach'], response: 'Our support team is ready to help! 🛎️\n\n📱 WhatsApp: +966 56 988 8456\n📧 Email: support@digzoom.com\n💬 Or chat with me - I\'m your AI assistant!\n\nAvailable 24/7 🕐', suggestions: ['Download issue','Product not working','Refund request'] },
    { keywords: ['thank','thanks','appreciate','thx','grateful'], response: 'You\'re welcome! 😊 I\'m always here to help. If you need anything else, just ask!', suggestions: ['How to buy?','Available products'] },
    { keywords: ['bye','goodbye','see you','later'], response: 'Goodbye! 👋 We hope you enjoy your experience with digzoom. See you soon! 🌟', suggestions: [] },
  ]
};

const defaultResponses: Record<string, string> = {
  ar: 'أنا آسف، ما فهمت سؤالك بالضبط 🤔\n\nتقدر تسأل عن:\n• كيفية الشراء 💳\n• طريقة التحميل 📥\n• طرق الدفع 💰\n• المنتجات المتوفرة 📚\n\nأو تواصل معنا 📱 +966 56 988 8456',
  en: 'I\'m sorry, I didn\'t quite understand 🤔\n\nYou can ask about:\n• How to buy 💳\n• Download process 📥\n• Payment methods 💰\n• Available products 📚\n\nOr contact us 📱 +966 56 988 8456',
};

function useChat(lang: 'ar' | 'en' = 'ar') {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasUnread(false);
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        text: lang === 'ar' ? 'أهلاً وسهلاً بك في digzoom! 🎉 أنا مساعدك الذكي، كيف أقدر أساعدك اليوم؟' : 'Welcome to digzoom! 🎉 I\'m your AI assistant. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      }]);
      setSuggestions(lang === 'ar' ? ['كيف أشتري منتج؟','طرق الدفع','المنتجات المتوفرة'] : ['How to buy?','Payment methods','Available products']);
    }
  }, [lang, messages.length]);

  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => { if (isOpen) closeChat(); else openChat(); }, [isOpen, closeChat, openChat]);

  const getBotResponse = useCallback((userText: string): ChatResponse => {
    const text = userText.toLowerCase();
    const responses = botResponses[lang];
    for (const r of responses) { if (r.keywords.some(kw => text.includes(kw))) return r; }
    return { keywords: [], response: defaultResponses[lang], suggestions: lang === 'ar' ? ['كيف أشتري منتج؟','طرق الدفع','تواصل مع الدعم'] : ['How to buy?','Payment methods','Contact support'] };
  }, [lang]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, text: text.trim(), sender: 'user', timestamp: new Date() }]);
    setIsTyping(true);
    setSuggestions([]);
    setTimeout(() => {
      const br = getBotResponse(text);
      setMessages(prev => [...prev, { id: `b-${Date.now()}`, text: br.response, sender: 'bot', timestamp: new Date() }]);
      setIsTyping(false);
      setSuggestions(br.suggestions || []);
    }, 800 + Math.random() * 700);
  }, [getBotResponse]);

  useEffect(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, [messages, isTyping]);

  return { isOpen, messages, isTyping, hasUnread, suggestions, toggleChat, sendMessage, chatContainerRef };
}

// ─── ChatBot Component ───

export default function ChatBot() {
  const { lang } = useLanguage();
  const { isOpen, messages, isTyping, hasUnread, suggestions, toggleChat, sendMessage, chatContainerRef } = useChat(lang as 'ar' | 'en');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isAr = lang === 'ar';

  useEffect(() => { if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (inputValue.trim()) { sendMessage(inputValue.trim()); setInputValue(''); } };
  const handleSuggestion = (text: string) => sendMessage(text);
  const handleWhatsApp = () => window.open(`https://wa.me/966569888456?text=${encodeURIComponent(isAr ? 'مرحباً أحتاج مساعدة' : 'Hello I need help')}`, '_blank');

  return (
    <>
      {/* Toggle Button */}
      <button onClick={toggleChat} className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl ${hasUnread && !isOpen ? 'animate-bounce' : ''}`}>
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {hasUnread && !isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 ${isAr ? 'left-6' : 'right-6'} z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-[#0a0a0f] border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col overflow-hidden`}>
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/[0.06] bg-gradient-to-r from-blue-600/20 to-purple-600/20 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
            <div className="flex-1 min-w-0"><h3 className="font-semibold text-white text-sm truncate">{isAr ? 'مساعد digzoom الذكي' : 'digzoom AI Assistant'}</h3><p className="text-gray-500 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />{isAr ? 'متصل الآن' : 'Online'}</p></div>
            <button onClick={toggleChat} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"><MinusCircle className="w-4 h-4" /></button>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}>{msg.sender === 'user' ? <User className="w-3.5 h-3.5 text-blue-400" /> : <Sparkles className="w-3.5 h-3.5 text-purple-400" />}</div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white/[0.05] text-gray-200 border border-white/[0.06] rounded-tl-sm'}`}>{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5"><div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0"><Bot className="w-3.5 h-3.5 text-purple-400" /></div>
                <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3"><div className="flex gap-1"><span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" /><span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} /><span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} /></div></div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 shrink-0 border-t border-white/[0.04]">
              {suggestions.map((s, i) => <button key={i} onClick={() => handleSuggestion(s)} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors border border-white/[0.06]">{s}</button>)}
            </div>
          )}

          {/* WhatsApp */}
          <div className="px-4 py-2 border-t border-white/[0.04] shrink-0"><button onClick={handleWhatsApp} className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition-colors"><Phone className="w-3.5 h-3.5" /><span>{isAr ? 'واتساب' : 'WhatsApp'} +966 56 988 8456</span></button></div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-white/[0.06] bg-[#0a0a0f] shrink-0 flex gap-2">
            <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={isAr ? 'اكتب سؤالك هنا...' : 'Type your question...'} className="flex-1 bg-[#151520] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/40 transition-colors" />
            <button type="submit" disabled={!inputValue.trim() || isTyping} className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"><Send className="w-4 h-4" style={{ transform: isAr ? 'scaleX(-1)' : 'none' }} /></button>
          </form>
        </div>
      )}
    </>
  );
}
