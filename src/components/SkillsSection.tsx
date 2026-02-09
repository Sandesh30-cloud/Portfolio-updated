import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Server, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'ML & Data Science',
    icon: Database,
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Keras', 'OpenCV'],
  },
  {
    title: 'Backend & Deployment',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'MongoDB', 'PostgreSQL', 'Docker', 'Git'],
  },
  {
    title: 'IoT & Embedded',
    icon: Cpu,
    skills: ['Raspberry Pi', 'ESP32', 'Sensor Integration', 'Edge Computing', 'MQTT'],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(260_60%_60%_/_0.05)_0%,_transparent_50%)]" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Core technologies and tools I use to build scalable, production-ready applications
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="group p-6 rounded-xl glass border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.3 + catIndex * 0.1 + skillIndex * 0.05,
                      }}
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted/50 text-foreground/80 border border-border/50 hover:border-primary/40 hover:text-primary transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
