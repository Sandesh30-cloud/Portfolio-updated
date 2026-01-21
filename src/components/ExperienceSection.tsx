import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Award, GraduationCap } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Web Development Intern',
    company: 'Prodigy Infotech',
    period: '2024',
    description: [
      'Developed and deployed interactive web pages using HTML, CSS, and JavaScript',
      'Implemented responsive front-end designs ensuring cross-browser compatibility',
      'Integrated APIs for dynamic content rendering and enhanced UX',
    ],
    icon: Briefcase,
  },
];

const achievements = [
  {
    type: 'certification',
    title: 'IBM Data Fundamentals Certification',
    organization: 'IBM',
    description: 'Foundational knowledge in data handling, databases, data analysis, and data-driven decision-making.',
    icon: Award,
  },
  {
    type: 'certification',
    title: 'Data Science Certification',
    organization: 'Udemy',
    description: 'Comprehensive course covering data cleaning, EDA, statistics, machine learning, and visualization using Python.',
    icon: GraduationCap,
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(187_100%_50%_/_0.05)_0%,_transparent_50%)]" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional experience and certifications that shaped my journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
              <Briefcase className="text-primary" size={28} />
              Work Experience
            </h3>
            
            <div className="relative border-l-2 border-border pl-8 space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-primary glow-sm" />
                  
                  <div className="p-6 rounded-xl glass card-hover">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h4 className="font-display font-semibold text-lg">{exp.title}</h4>
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
              <Award className="text-primary" size={28} />
              Certifications
            </h3>
            
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-6 rounded-xl glass card-hover group"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <achievement.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-primary mb-2">{achievement.organization}</p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
