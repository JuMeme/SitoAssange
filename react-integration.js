/**
 * Complete React Integration with All Animations - React Bits Style
 * Fully integrated with all smooth animations
 */

(function() {
    'use strict';

    function initReactAnimations() {
        if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || typeof Motion === 'undefined') {
            setTimeout(initReactAnimations, 100);
            return;
        }

        const { createElement: h, useState, useEffect, useRef } = React;
        const { createRoot } = ReactDOM;
        const { motion, AnimatePresence } = Motion;

        // Scroll animation hook
        function useScrollAnimation({ delay = 0, triggerOnce = true, threshold = 0.1 } = {}) {
            const [isVisible, setIsVisible] = useState(false);
            const ref = useRef(null);

            useEffect(() => {
                const element = ref.current;
                if (!element) return;
                
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                setIsVisible(true);
                                if (triggerOnce) observer.unobserve(element);
                            }, delay * 1000);
                        } else if (!triggerOnce) {
                            setIsVisible(false);
                        }
                    },
                    { threshold, rootMargin: '0px 0px -50px 0px' }
                );
                
                observer.observe(element);
                return () => observer.unobserve(element);
            }, [delay, triggerOnce, threshold]);

            return [ref, isVisible];
        }

        // Theme hook
        function useTheme() {
            const [theme, setTheme] = useState(() => {
                return document.documentElement.getAttribute('data-theme') || 'light';
            });

            useEffect(() => {
                const observer = new MutationObserver(() => {
                    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
                });
                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['data-theme']
                });
                return () => observer.disconnect();
            }, []);

            return theme;
        }

        // Animated Hero Component - React Bits Style
        function AnimatedHero() {
            return h('div', { className: 'hero-content' },
                h(motion.h1, {
                    className: 'animated-hero',
                    initial: { opacity: 0, y: -50, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { 
                        duration: 1, 
                        delay: 0.2, 
                        ease: [0.16, 1, 0.3, 1] 
                    }
                }, 'GIORNALISMO È UN CRIMINE?'),
                h(motion.p, {
                    className: 'animated-hero-sub',
                    initial: { opacity: 0, y: 30, scale: 0.95 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { 
                        duration: 1, 
                        delay: 0.5, 
                        ease: [0.16, 1, 0.3, 1] 
                    }
                }, "L'eredità di Julian Assange e il futuro della libertà di stampa."),
                h(motion.a, {
                    href: '#il-dibattito',
                    className: 'cta-button',
                    initial: { opacity: 0, y: 30, scale: 0.8 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { 
                        duration: 0.8, 
                        delay: 0.8, 
                        ease: [0.16, 1, 0.3, 1] 
                    },
                    whileHover: { 
                        scale: 1.08, 
                        y: -5,
                        boxShadow: '0 10px 30px rgba(0, 86, 179, 0.4)',
                        transition: { duration: 0.3 }
                    },
                    whileTap: { scale: 0.95 }
                }, 'Leggi l\'analisi')
            );
        }

        // Animated Card Component - React Bits Style
        function AnimatedCard({ children, delay = 0 }) {
            const [ref, isVisible] = useScrollAnimation({ delay, triggerOnce: true });
            
            return h(motion.div, {
                ref: ref,
                className: 'card',
                initial: { opacity: 0, y: 60, scale: 0.9, rotateX: -10 },
                animate: isVisible ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotateX: 0
                } : { opacity: 0, y: 60 },
                transition: { 
                    duration: 0.7, 
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1] 
                },
                whileHover: { 
                    scale: 1.06, 
                    y: -12,
                    rotateY: 3,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                },
                whileTap: { scale: 0.98 }
            }, children);
        }

        // Animated Section Title - React Bits Style
        function AnimatedTitle({ children, delay = 0, id }) {
            const [ref, isVisible] = useScrollAnimation({ delay, triggerOnce: true });
            
            return h(motion.h2, {
                ref: ref,
                id: id,
                initial: { opacity: 0, y: -40, scale: 0.95 },
                animate: isVisible ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1 
                } : { opacity: 0, y: -40 },
                transition: { 
                    duration: 0.8, 
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1] 
                }
            }, children);
        }

        // Animated Text Block - React Bits Style
        function AnimatedText({ children, delay = 0, id, className = '' }) {
            const [ref, isVisible] = useScrollAnimation({ delay, triggerOnce: true });
            
            return h(motion.div, {
                ref: ref,
                id: id,
                className: className,
                initial: { opacity: 0, y: 30, x: -20 },
                animate: isVisible ? { 
                    opacity: 1, 
                    y: 0,
                    x: 0
                } : { opacity: 0, y: 30 },
                transition: { 
                    duration: 0.7, 
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1] 
                }
            }, children);
        }

        // Animated Nav Link - React Bits Style
        function AnimatedNavLink({ children, href, className = '' }) {
            return h(motion.a, {
                href: href,
                className: className,
                role: 'menuitem',
                whileHover: { 
                    scale: 1.15, 
                    y: -3,
                    color: 'var(--primary-color)',
                    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                },
                whileTap: { scale: 0.9 }
            }, children);
        }

        // Team Member Card Component - React Bits Style
        function TeamMemberCard({ name, image, text, delay = 0 }) {
            const [ref, isVisible] = useScrollAnimation({ delay, triggerOnce: true });
            
            return h(motion.div, {
                ref: ref,
                className: 'team-member-card',
                initial: { opacity: 0, y: 80, scale: 0.85, rotateY: -15 },
                animate: isVisible ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotateY: 0
                } : { opacity: 0, y: 80 },
                transition: { 
                    duration: 0.8, 
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1] 
                },
                whileHover: { 
                    scale: 1.08, 
                    y: -15,
                    rotateY: 5,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }
            },
                h(motion.div, {
                    className: 'team-member-image',
                    initial: { scale: 0, opacity: 0, rotate: -180 },
                    animate: isVisible ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0 },
                    transition: { 
                        duration: 0.6, 
                        delay: delay + 0.2,
                        ease: [0.16, 1, 0.3, 1]
                    }
                }, 
                    h('img', { 
                        src: image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=0056b3&color=fff&bold=true`,
                        alt: name,
                        onError: function(e) {
                            e.target.style.display = 'none';
                            const parent = e.target.parentElement;
                            if (parent) {
                                parent.innerHTML = `<div class="team-member-avatar">${name.charAt(0)}</div>`;
                            }
                        }
                    })
                ),
                h(motion.h3, {
                    className: 'team-member-name',
                    initial: { opacity: 0, y: 30, scale: 0.9 },
                    animate: isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 },
                    transition: { 
                        duration: 0.6, 
                        delay: delay + 0.3,
                        ease: [0.16, 1, 0.3, 1]
                    }
                }, name),
                h(motion.p, {
                    className: 'team-member-text',
                    initial: { opacity: 0, y: 30 },
                    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0 },
                    transition: { 
                        duration: 0.7, 
                        delay: delay + 0.4,
                        ease: [0.16, 1, 0.3, 1]
                    }
                }, text)
            );
        }

        // Team Thoughts Modal - React Bits Style
        function TeamThoughtsModal({ isOpen, onClose }) {
            const theme = useTheme();
            
            useEffect(() => {
                if (isOpen) {
                    document.body.classList.add('no-scroll');
                    document.documentElement.style.overflow = 'hidden';
                } else {
                    document.body.classList.remove('no-scroll');
                    document.documentElement.style.overflow = '';
                }
                return () => {
                    document.body.classList.remove('no-scroll');
                    document.documentElement.style.overflow = '';
                };
            }, [isOpen]);

            useEffect(() => {
                const handleEscape = (e) => {
                    if (e.key === 'Escape' && isOpen) onClose();
                };
                if (isOpen) {
                    document.addEventListener('keydown', handleEscape);
                }
                return () => document.removeEventListener('keydown', handleEscape);
            }, [isOpen, onClose]);

            const teamMembers = [
                {
                    name: 'Leonardo',
                    text: "A parer mio, questa situazione ci fa comprendere più che mai quanto il mondo sia profondamente corrotto da stati che, pur di portare avanti i propri interessi, non esitano a compiere azioni disumane, spesso senza alcun consenso o trasparenza verso la propria popolazione. Mantengono le persone all'oscuro, mostrando solo la parte di realtà che fa loro comodo e condannando chi cerca semplicemente di rivelare la <b>verità</b>. Vedere come venga trattato un uomo che ha svolto il proprio lavoro con coraggio ci fa riflettere sulla fragilità dei valori proclamati, e quanto le libertà fondamentali possano essere ignorate quando interferiscono con il potere e gli interessi di pochi. È un chiaro monito su quanto il concetto di giustizia e trasparenza possa essere distorto per favorire chi detiene il <b>controllo</b>.",
                    image: 'i/leonardo.jpg'
                },
                {
                    name: 'Marco',
                    text: "Julian Assange mi fa riflettere, perché da una parte ammiro davvero il suo <b>coraggio</b>: si è esposto completamente pur di far vedere al mondo cose che altrimenti sarebbero rimaste nascoste, anche rischiando la sua libertà. Allo stesso tempo però il suo modo di agire apre un sacco di domande: fin dove arriva il diritto delle persone a sapere la <b>verità</b> e dove invece inizia il rischio di invadere la privacy o mettere qualcuno in pericolo? È come se con il suo gesto avesse messo tutti davanti a un bivio: scegliere tra la <b>trasparenza</b> assoluta e le conseguenze che questa può portare. E anche se non tutti condividono quello che ha fatto, è difficile non riconoscere che ci ha costretti a guardare in faccia temi che spesso preferiamo ignorare.",
                    image: 'i/marco.jpg'
                },
                {
                    name: 'Astrit',
                    text: "Assange secondo me rappresenta la <b>resilienza</b> e lo spirito non conformista che tutti i giornalisti dovrebbero avere: andare incontro a entità molto potenti come la CIA significa non solo rischiare il proprio lavoro, ma la propria vita per diffondere la <b>verità</b>, senza godere dei diritti concessi ai giornalisti. Si parla spesso che i segreti di stato siano necessari per mantenere la calma e la stabilità in un paese, tuttavia, tale 'tranquillità' è fin troppo spesso unilaterale poiché garantire la sicurezza di una nazione significa farlo a discapito di un'altra, creando cittadini di serie A e di serie B a livello globale. Mentre negli Stati Uniti gran parte della popolazione aveva una percezione distorta, o addirittura positiva, delle operazioni militari in Iraq e Afghanistan la realtà per i civili era quella di una <b>violenza</b> brutale, morti ingiustificate e totale mancanza di giustizia o di un processo equo. La diffusione di questi documenti ha reso molto scomode le nazioni più avvantaggiate, sentimento essenziale per realizzare che la guerra post 11 settembre era una finzione mediatica che nascondeva una realtà <b>disumana</b>. Dovrebbe esistere un premio Pulitzer con il nome di Julian Assange scritto sopra eppure siamo ancora qui a discutere se ciò che ha fatto fosse 'giusto' o 'sbagliato' mettendo in discussione l'essenza stessa del giornalismo investigativo.",
                    image: 'i/astrit.jpg'
                },
                {
                    name: 'Jacopo',
                    text: "Rispetto molto Assange perché ha scelto di rimanere fedele ai suoi <b>ideali</b>, trovando un problema e decidendo di dare tutto sé stesso a combattere per raggiungere il suo obbiettivo, rimanendo pronto a pagare i prezzi necessari. Anche se alla fine ha 'gettato la spugna' lo ha fatto in una maniera che fa capire che non lo ha fatto totalmente ma semplicemente si è reso conto di esser diventato troppo vecchio e stanco per poter fare la differenza. Per quanto riguarda quello che hanno fatto gli stati americani di nascondere così tante informazioni soprattutto sulle pesanti violazioni dei <b>diritti umani</b>, trovo comprensibile che abbiano voluto insabbiare l'avvenimento di questi fatti il più possibile al fine di proteggere la loro reputazione e la <b>stabilità</b> nazionale, ma trovo comunque fastidio che tali avvenimenti si siano verificati così frequentemente, mostrando che non c'è stata un vero tentativo di controllare avvenimenti del genere che sono molto conosciuti e prevedibili. Oltre tutto credo che l'impedimento di tali azioni sia più lucrativo allo stato in questioni di costi, disciplina e immagine pubblica.",
                    image: 'i/jacopo.jpg'
                }
            ];

            return h(AnimatePresence, null,
                isOpen && h(motion.div, {
                    className: 'modal',
                    'data-theme': theme,
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.3 },
                    onClick: onClose
                },
                    h(motion.div, {
                        className: 'modal-content team-thoughts-modal',
                        initial: { opacity: 0, scale: 0.7, y: 100, rotateX: -20 },
                        animate: { opacity: 1, scale: 1, y: 0, rotateX: 0 },
                        exit: { opacity: 0, scale: 0.7, y: 100, rotateX: -20 },
                        transition: { 
                            duration: 0.6, 
                            ease: [0.16, 1, 0.3, 1] 
                        },
                        onClick: (e) => e.stopPropagation()
                    },
                        h(motion.button, {
                            className: 'close-btn',
                            onClick: onClose,
                            'aria-label': 'Chiudi',
                            initial: { opacity: 0, rotate: -180, scale: 0 },
                            animate: { opacity: 1, rotate: 0, scale: 1 },
                            exit: { opacity: 0, rotate: 180, scale: 0 },
                            transition: { delay: 0.3, duration: 0.4 },
                            whileHover: { rotate: 90, scale: 1.2, backgroundColor: 'var(--secondary-bg-color)' },
                            whileTap: { scale: 0.9 }
                        }, '×'),
                        h(motion.h2, {
                            id: 'modal-title',
                            className: 'team-thoughts-title',
                            initial: { opacity: 0, y: -30, scale: 0.9 },
                            animate: { opacity: 1, y: 0, scale: 1 },
                            exit: { opacity: 0, y: -30 },
                            transition: { delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                        }, 'Il Nostro Pensiero'),
                        h(motion.div, {
                            className: 'team-members-grid',
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            exit: { opacity: 0 },
                            transition: { delay: 0.3, duration: 0.5 }
                        },
                            teamMembers.map((member, index) => 
                                h(TeamMemberCard, {
                                    key: member.name,
                                    name: member.name,
                                    image: member.image,
                                    text: member.text,
                                    delay: 0.4 + (index * 0.12),
                                })
                            )
                        )
                    )
                )
            );
        }

        // Main App Component - FIXED BUTTON
        function App() {
            const [modalOpen, setModalOpen] = useState(false);

            // FIX: Ensure button works by checking multiple times
            useEffect(() => {
                const setupButton = () => {
                    const openBtn = document.getElementById('open-quotes-btn');
                    if (openBtn) {
                        // Remove any existing listeners
                        const newBtn = openBtn.cloneNode(true);
                        openBtn.parentNode.replaceChild(newBtn, openBtn);
                        
                        // Add click handler
                        newBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            setModalOpen(true);
                        });
                        
                        return true;
                    }
                    return false;
                };

                // Try immediately
                if (!setupButton()) {
                    // Retry after a short delay
                    setTimeout(() => {
                        if (!setupButton()) {
                            // Final retry
                            setTimeout(setupButton, 500);
                        }
                    }, 100);
                }
            }, []);

            // Also listen for button clicks globally as fallback
            useEffect(() => {
                const handleClick = (e) => {
                    if (e.target && e.target.id === 'open-quotes-btn') {
                        e.preventDefault();
                        setModalOpen(true);
                    }
                };
                document.addEventListener('click', handleClick);
                return () => document.removeEventListener('click', handleClick);
            }, []);

            return h('div', null,
                h(TeamThoughtsModal, {
                    isOpen: modalOpen,
                    onClose: () => setModalOpen(false)
                })
            );
        }

        // Initialize all components
        function initializeComponents() {
            // Hero
            const heroRoot = document.getElementById('hero-react-root');
            if (heroRoot) {
                createRoot(heroRoot).render(h(AnimatedHero));
            }

            // Section Titles
            const titles = [
                { id: 'chi-e-title', delay: 0.1 },
                { id: 'revelations-title', delay: 0.1 },
                { id: 'timeline-title', delay: 0.1 },
                { id: 'dibattito-title', delay: 0.1 },
                { id: 'espionage-title', delay: 0.1 },
                { id: 'libero-title', delay: 0.1 }
            ];

            titles.forEach(({ id, delay }) => {
                const el = document.getElementById(id);
                if (el) {
                    const text = el.textContent;
                    createRoot(el).render(h(AnimatedTitle, { delay, id }, text));
                }
            });

            // Text Blocks - preserve structure
            const textBlocks = [
                { id: 'chi-e-text', delay: 0.2 },
                { id: 'revelations-intro', delay: 0.2, className: 'section-intro' },
                { id: 'dibattito-intro', delay: 0.2, className: 'section-intro' },
                { id: 'espionage-text', delay: 0.2 },
                { id: 'espionage-quote', delay: 0.3 },
                { id: 'libero-text-1', delay: 0.2 },
                { id: 'libero-text-2', delay: 0.3 }
            ];

            textBlocks.forEach(({ id, delay, className }) => {
                const el = document.getElementById(id);
                if (el) {
                    const content = el.innerHTML;
                    createRoot(el).render(
                        h(AnimatedText, { delay, id, className }, 
                            h('div', { dangerouslySetInnerHTML: { __html: content } })
                        )
                    );
                }
            });

            // Cards - React Bits Style
            document.querySelectorAll('.card').forEach((card, index) => {
                const cardIndex = parseInt(card.dataset.cardIndex) || index;
                const delay = (cardIndex * 0.12);
                const content = card.innerHTML;
                createRoot(card).render(
                    h(AnimatedCard, { delay },
                        h('div', { dangerouslySetInnerHTML: { __html: content } })
                    )
                );
            });

            // Timeline Items - CSS-based animation to preserve structure
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const item = entry.target;
                        const index = Array.from(document.querySelectorAll('.timeline-item')).indexOf(item);
                        const delay = index * 120;
                        const isOdd = index % 2 === 0;
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0) scale(1)';
                            item.classList.add('timeline-animated');
                            
                            // Animate dots
                            const dot = item.querySelector('.timeline-dot');
                            if (dot) {
                                const isOdd = index % 2 === 0;
                                dot.style.opacity = '1';
                                dot.style.transform = isOdd ? 'translate(50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(1)';
                            }
                        }, delay);
                        
                        timelineObserver.unobserve(item);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            document.querySelectorAll('.timeline-item').forEach((item, index) => {
                const isOdd = index % 2 === 0;
                item.style.opacity = '0';
                item.style.transform = `translateX(${isOdd ? '-40px' : '40px'}) scale(0.9)`;
                item.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                
                // Initialize dots
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    dot.style.opacity = '0';
                    const isOdd = index % 2 === 0;
                    dot.style.transform = isOdd ? 'translate(50%, -50%) scale(0)' : 'translate(-50%, -50%) scale(0)';
                    dot.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                }
                
                timelineObserver.observe(item);
            });

            // Navigation Links - React Bits Style
            document.querySelectorAll('#desktop-nav a, #mobile-nav-links a').forEach(link => {
                const href = link.getAttribute('href');
                const text = link.textContent;
                const className = link.className;
                createRoot(link).render(
                    h(AnimatedNavLink, { href, className }, text)
                );
            });

            // Footer - React Bits Style
            const footer = document.getElementById('footer');
            if (footer) {
                const footerObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                            footerObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                footer.style.opacity = '0';
                footer.style.transform = 'translateY(30px)';
                footer.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                footerObserver.observe(footer);
            }

            // Modal - Initialize App component
            const modalRoot = document.getElementById('modal-react-root');
            if (modalRoot) {
                createRoot(modalRoot).render(h(App));
            }

            console.log('✅ React Bits animations fully integrated!');
        }

        // Wait for DOM and initialize
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeComponents);
        } else {
            initializeComponents();
        }
    }

    // Start initialization
    initReactAnimations();
})();

