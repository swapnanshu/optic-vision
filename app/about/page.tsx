import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  const whatsappNumber = '919876543210';
  const phoneNumber = '07123456789';
  const fullAddress = 'Optic Vision Boutique, Near Dharampeth Metro Station, Dharampeth, Nagpur, Maharashtra 440010';

  const businessHours = [
    { day: 'Monday', hours: '10:00 AM - 8:00 PM', closed: false },
    { day: 'Tuesday', hours: '10:00 AM - 8:00 PM', closed: false },
    { day: 'Wednesday', hours: '10:00 AM - 8:00 PM', closed: false },
    { day: 'Thursday', hours: '10:00 AM - 8:00 PM', closed: false },
    { day: 'Friday', hours: '10:00 AM - 8:00 PM', closed: false },
    { day: 'Saturday', hours: '10:00 AM - 8:00 PM', closed: false },
    { day: 'Sunday', hours: 'Weekly Closed', closed: true },
  ];

  return (
    <main className="pt-32 pb-32 max-w-5xl mx-auto px-5 md:px-16 min-h-screen">
      {/* Title */}
      <section className="mb-12 text-center">
        <span className="text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">
          About Us 🏬
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
          Optic Vision Nagpur
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto font-semibold leading-relaxed">
          Nagpur ki sabse stylish optical boutique. Hum yahan eyewear designs ko personalized precision aur premium care ke sath present karte hain.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Details & Contact */}
        <div className="md:col-span-7 flex flex-col gap-8">
          
          {/* About description */}
          <Card hoverable={false} className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Premium Eyewear, Local Heart ❤️
            </h2>
            <p className="text-sm md:text-base font-semibold text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Optic Vision Dharampeth, Nagpur mein modern digital eye checks aur custom frame pairings ka ek exclusive standard lead karta hai. Har piece ko pure aur select material ke sath structure kiya gaya hai taaki long-term durability aur comfort dono mile.
            </p>
            <p className="text-sm md:text-base font-semibold text-[var(--color-text-secondary)] leading-relaxed">
              Nagpur ke stylish creatives aur families ke liye, hum har glass ko personalized eye parameters ke anusaar configure karte hain, jisse absolute focal precision aur aesthetic look dono guarantee hota hai.
            </p>
          </Card>

          {/* Map Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Humari Location (Google Maps)</span>
            </h3>
            <div className="w-full aspect-video rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-xs">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.144458315802!2d79.05739827607738!3d21.146663583723382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0fa0f576e27%3A0xe54ef864811b712c!2sDharampeth%2C%20Nagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716035000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs font-bold text-[var(--color-text-secondary)] px-2">
              📍 Dharampeth Metro Station ke bilkul paas, {fullAddress}
            </p>
          </div>
        </div>

        {/* Right Column: Contact info & Hours */}
        <div className="md:col-span-5 flex flex-col gap-8">
          
          {/* Quick Contact Box */}
          <Card hoverable={false} className="p-6 bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] flex flex-col gap-5">
            <h3 className="text-lg font-extrabold text-[var(--color-primary-dark)]">
              Direct Contact Karein 📞
            </h3>
            
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-4 bg-white border border-[var(--color-primary-light)] p-4 rounded-xl hover:shadow-xs active:scale-98 transition-all"
            >
              <div className="p-2.5 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-[var(--color-text-secondary)] uppercase">Store Phone</p>
                <p className="font-extrabold text-sm text-[var(--color-text-primary)]">{phoneNumber}</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-[var(--color-primary-light)] p-4 rounded-xl hover:shadow-xs active:scale-98 transition-all"
            >
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-[var(--color-text-secondary)] uppercase">WhatsApp Chat</p>
                <p className="font-extrabold text-sm text-[var(--color-text-primary)]">Chat instantly</p>
              </div>
            </a>
          </Card>

          {/* Business Hours */}
          <Card hoverable={false} className="p-6">
            <h3 className="text-lg font-extrabold text-[var(--color-text-primary)] mb-4 flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Clock className="w-5 h-5 text-[var(--color-primary)]" />
              <span>Business Hours ⏰</span>
            </h3>

            <div className="flex flex-col gap-3 font-semibold text-sm">
              {businessHours.map((bh) => (
                <div key={bh.day} className="flex justify-between items-center pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className="text-[var(--color-text-secondary)]">{bh.day}</span>
                  {bh.closed ? (
                    <span className="text-[var(--color-danger)] font-extrabold uppercase text-xs">Closed</span>
                  ) : (
                    <span className="text-[var(--color-text-primary)] font-extrabold">{bh.hours}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </main>
  );
}
