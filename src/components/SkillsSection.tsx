import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'TypeScript', level: 75 },
    ],
  },
  {
    title: 'ML & Data Science',
    skills: [
      { name: 'NumPy & Pandas', level: 88 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'TensorFlow/Keras', level: 75 },
      { name: 'EDA & Feature Engineering', level: 82 },
    ],
  },
  {
    title: 'Backend & Deployment',
    skills: [
      { name: 'Node.js & Express', level: 85 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'MongoDB', level: 80 },
      { name: 'Docker & Git', level: 78 },
    ],
  },
  {
    title: 'IoT & Embedded',
    skills: [
      { name: 'Raspberry Pi', level: 85 },
      { name: 'ESP32', level: 80 },
      { name: 'Sensor Integration', level: 82 },
      { name: 'Edge Computing', level: 75 },
    ],
  },
];

const techStack = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express.js',
  'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'TensorFlow', 'Keras',
  'NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Raspberry Pi', 'ESP32',
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
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        {/* Skill Bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="p-6 rounded-xl glass"
            >
              <h3 className="font-display font-semibold text-xl mb-6 text-primary">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + catIndex * 0.1 + skillIndex * 0.1,
                          ease: 'easeOut',
                        }}
                        className="skill-bar-fill"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="font-display font-semibold text-xl mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="tech-badge cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
