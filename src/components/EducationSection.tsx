import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Academic foundation in Computer Engineering
          </p>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="gradient-border p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 glow-sm">
                <GraduationCap className="text-primary" size={40} />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold mb-2">
                  Bachelor of Engineering
                </h3>
                <p className="text-xl text-primary font-medium mb-4">
                  Computer Engineering
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  University of Mumbai
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <span>Nov 2022 – May 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <span>Mumbai, India</span>
                  </div>
                </div>

                {/* CGPA Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl glass"
                >
                  <span className="text-muted-foreground">CGPA</span>
                  <span className="text-3xl font-display font-bold gradient-text">7.32</span>
                </motion.div>
              </div>
            </div>

            {/* Coursework/Focus Areas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 pt-8 border-t border-border"
            >
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Key Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Data Structures & Algorithms',
                  'Machine Learning',
                  'Database Management',
                  'Web Development',
                  'Computer Networks',
                  'IoT Systems',
                  'Cloud Computing',
                  'Software Engineering',
                ].map((area) => (
                  <span key={area} className="tech-badge">
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
