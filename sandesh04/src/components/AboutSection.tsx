import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Brain, Server } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Building scalable web applications with modern frameworks and best practices.',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Applying ML models for intelligent data analysis and prediction systems.',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Designing efficient data pipelines and database architectures.',
  },
  {
    icon: Server,
    title: 'IoT Systems',
    description: 'Developing edge computing solutions with embedded systems.',
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate developer with a focus on creating impactful digital solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a Computer Engineering student at the University of Mumbai, passionate about 
              building innovative solutions that bridge the gap between cutting-edge technology 
              and real-world applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My expertise spans across full-stack web development, machine learning, and IoT 
              systems. I love architecting scalable systems and implementing intelligent features 
              that enhance user experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently working on industry-collaborated projects involving real-time monitoring 
              systems and AI-powered learning platforms, I'm always eager to tackle complex 
              technical challenges.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: '5+', label: 'Projects' },
                { value: '10+', label: 'Technologies' },
                { value: '2026', label: 'Graduating' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-lg glass"
                >
                  <div className="text-3xl font-display font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-xl glass card-hover group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
