'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Store, Home as HomeIcon, ArrowRight, Heart, Eye } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="pt-24 pb-32 md:pb-12 max-w-7xl mx-auto px-5 md:px-16 overflow-x-hidden">
      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative aspect-[3/4] md:aspect-[21/9] rounded-3xl overflow-hidden group shadow-xl"
      >
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuALBrAb2j_KKlxx3ZePQB7VZDeC7ns_gAGfqCJMOxHrdbrTI-qbQ6uWc-Q6IQK5YG3siWbKEUTeOimHKjyoUuM0JKOtHK-s6hyZLxtwbT4GCKoqYIuCYbtljuFc2uwTz-tvW6K2r426Pb2h2sPkY9RzUZmFVi5SG8LwAWTzjaZDJAhtR0HEzuGYSwX_0wrU6xtNpBHfYDO-rV1KIZ74_8szI131GLFqqLCAqO5OjeJfWeTXijoP2R-g8KvxxJI9JXONBUY17EVdvXQD" 
          alt="Hero" 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-14 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[2.5rem] md:text-7xl font-extrabold text-on-primary-container leading-tight mb-8 tracking-tighter"
          >
            Aankhon ki jaanch <br/>book karo
          </motion.h2>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary hover:bg-primary/95 text-on-primary px-8 py-5 rounded-2xl font-bold flex items-center gap-3 active:scale-95 transition-all shadow-lg text-lg"
          >
            BOOK EYE TEST <Calendar className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.section>

      {/* Services Bento */}
      <section className="mt-8 grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-surface-container-low p-6 md:p-10 rounded-3xl flex flex-col justify-between h-48 md:h-64 border border-outline-variant/50 active:scale-[0.98] transition-transform shadow-sm hover:shadow-md"
        >
          <Store className="text-primary w-10 h-10 md:w-14 md:h-14" />
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-on-surface">Store Visit</h3>
            <p className="text-sm md:text-base font-medium text-secondary mt-1">Visit our Nagpur flagship</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="bg-primary-container p-6 md:p-10 rounded-3xl flex flex-col justify-between h-48 md:h-64 active:scale-[0.98] transition-transform shadow-md hover:shadow-lg"
        >
          <HomeIcon className="text-on-primary-container w-10 h-10 md:w-14 md:h-14" />
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-on-primary-container">Home Test</h3>
            <p className="text-sm md:text-base font-medium text-on-primary-container/80 mt-1">We come to you</p>
          </div>
        </motion.div>
      </section>

      {/* Trending */}
      <section className="mt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-primary font-bold text-xs md:text-sm uppercase tracking-[0.15em] block mb-2">Curated</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">Trending Frames</h2>
          </div>
          <Link href="/catalog" className="text-primary font-bold flex items-center gap-1.5 hover:underline text-sm md:text-base">
            VIEW ALL <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-8 -mx-5 px-5 md:mx-0 md:px-0 no-scrollbar">
          <ProductCard 
            id="nagpur-noir"
            title="Nagpur Noir"
            subtitle="Matte Black Classic"
            price="₹3,499"
            tag="NEW ARRIVAL"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuANAqwLAR_39rh2HtPL9g4KF_1RARjfJruMPCPWzuA7lbXgxkflPzqrFtxeY7urqSmedaX81jV0OqkWIXPdb9zpNyY-HIesiY-zmtx4wrwRPF0exPNwNNNC_AkJxqr2cZsRHhanx0rPAMlP-rmhH7F3Aj-CrvWaf3yhpcVVYRw6BW88X_cFl-k8gqhVti2H7OlRmqV-B20hC71oktmNxNDZmINiw2i3tAU_7RT56daNHFAJqIT7s7d7NHAlcbrfH4dqNAmd5tDavvIv"
          />
          <ProductCard 
            id="gold-meridian"
            title="Gold Meridian"
            subtitle="Premium Metal Series"
            price="₹4,999"
            tag="NAGPUR EXCLUSIVE"
            tagPrimary
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuB77PrhSndj3rirlOvha3KGHliRkIO66Cb3LEYsrDGUZ53S8r4k924HmwIidGV5n6dcCowblxF8DO0_kCKLuLdqPI-hPdipIYalxHxTmtvZ5NRgmrh_B_lH2-WmPvuKRRABma0fQElrnFjowFJ1jaYiPzpaxtl3_p0Y645cpFDt6QJzi555L4fIhOFrNDo90AlwnXS0i0eVVspqQOVRnw2uiO_lIN9CCg_ZfO74KTQxsAT7bK7ADTR7JUb-OxcvNCQD7W20C2TSDIzU"
          />
          <ProductCard 
            id="crystal-clear"
            title="Crystal Clear"
            subtitle="Minimal"
            price="₹1,899"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDxUaBAyuiZDxDomT_yyNO6hrhW5ma6vXf56tg3vvxrlk7JL56bIagbZ-Sf8YKEckhwrEAEG9VTSkQbBze197nVhMMQrjVnQ7CCEuRiHYY3IUCpVxLe-YiafnH6tHLR6vC3jA7SsPTLrXP7-vQZn0mnDOEpUAiT_eD8MZLleD1wE82iRAVKZaqhM2YkCvTuQARfekFouqt-ohPLyH0PF3adnZ71LzVvYhfBVsvXK9EXyUFdIQWwGTNQHjuS-Y_xiP0w9_imAZaVqtee"
          />
        </div>
      </section>

      {/* Promo */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6"
      >
        <div className="bg-surface-container rounded-[2rem] p-8 md:p-14 relative overflow-hidden flex items-center min-h-[220px] shadow-sm border border-outline-variant/30">
          <div className="relative z-10 w-3/4 md:w-1/2">
            <p className="text-tertiary font-bold text-xs uppercase tracking-widest mb-3">Limited Offer</p>
            <h3 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-3 leading-tight">Buy 1 Get 1 Free</h3>
            <p className="text-secondary font-medium md:text-lg">On all premium acetate collections.</p>
          </div>
          <Eye className="absolute -right-8 -bottom-10 w-72 h-72 text-primary opacity-5" />
        </div>
      </motion.section>
      
      {/* Map */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 mb-12"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-center border border-outline-variant/30 rounded-[2rem] p-4 lg:p-6 bg-surface-container-highest/20 shadow-sm">
          <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden relative group border border-outline-variant/20 shadow-sm">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHLs04wfVLSoNE4yiJg40YRxaQLaA74L1CWM3Noq6Mq_Vc2nsElpYxPLc2p4gb92LnEBnUWbS5xa5QmtHho_fbjCbJH0K1KGD_zt7fN5jaetr9CerqNKgBgYQ3tsDU4GeSIEZVq71zWYKKjb5vQRshni_UGxQSLV94yw6Bbi-5NdAGJ7a41UCO1euisJkegVVna-WJ0GYcEhCtjeHn00do1tIh-Gu0dJ9i8fk5ALGUeSxezVSXGSpLKOwHShGAfSl_hRNbOE4uHQEk"
              alt="Map"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:pr-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4 tracking-tight">Find us in Nagpur</h2>
            <p className="text-secondary mb-8 leading-relaxed font-medium md:text-lg">Experience our modern studio at Civil Lines. Personalized styling and comprehensive eye care in a serene setting.</p>
            <button className="border-b-2 border-primary text-primary font-bold pb-1 text-lg hover:opacity-70 transition-opacity uppercase tracking-wider">
              GET DIRECTIONS
            </button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

function ProductCard({ id, title, subtitle, price, tag, tagPrimary, image }: any) {
  return (
    <Link href={`/product/${id}`} className="block min-w-[280px] md:min-w-[340px] group">
      <div className="aspect-[4/5] bg-surface-container-highest rounded-3xl overflow-hidden mb-5 relative border border-transparent group-hover:border-outline-variant/50 transition-colors shadow-sm group-hover:shadow-md">
        <Image src={image} alt={title} fill className="object-cover mix-blend-multiply transition-transform duration-[1.5s] group-hover:scale-110" referrerPolicy="no-referrer" />
        {tag && (
           <span className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${tagPrimary ? 'bg-primary text-on-primary' : 'bg-tertiary text-on-tertiary'}`}>
             {tag}
           </span>
        )}
        <button className="absolute top-5 right-5 bg-surface/90 backdrop-blur-sm p-3 rounded-full text-primary hover:bg-surface transition-colors active:scale-90 shadow-sm" onClick={(e)=>e.preventDefault()}>
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <h4 className="text-2xl font-extrabold text-on-surface mb-1">{title}</h4>
      <p className="text-secondary font-medium mb-2">{subtitle}</p>
      <p className="text-lg font-bold text-primary">{price}</p>
    </Link>
  )
}
