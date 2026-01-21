import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Brain, Fish, LayoutDashboard, Database, Cpu, LineChart } from 'lucide-react';

const projects = [
  {
    title: 'Mentor Mind',
    subtitle: 'AI-Powered Learning Management System',
    description:
      'Architected and developed a scalable, full-stack LMS for creating, managing, and delivering personalized learning experiences. Leveraged the Gemini API for intelligent course content generation.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Express.js'],
    components: [
      { name: 'AI Content Generator', icon: Brain, desc: 'Dynamic course & assessment generation' },
      { name: 'Learning Dashboard', icon: LayoutDashboard, desc: 'Progress tracking & analytics' },
      { name: 'Course Manager', icon: Database, desc: 'CRUD operations for content' },
    ],
    gradient: 'from-primary to-secondary',
    featured: true,
  },
  {
    title: 'Matsyavan',
    subtitle: 'Industry-Collaborated IoT Aquaculture System',
    description:
      'Real-time, offline aquaculture monitoring system using IoT sensors with local data storage. Features stereo vision-based fish length estimation using OpenCV and RNN for temporal analysis.',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'Raspberry Pi', 'ESP32', 'RNN'],
    components: [
      { name: 'Stereo Vision Module', icon: Fish, desc: 'Dual camera fish measurement' },
      { name: 'Edge Computing Unit', icon: Cpu, desc: 'Low-latency local processing' },
      { name: 'Analytics Dashboard', icon: LineChart, desc: 'Real-time data visualization' },
    ],
    gradient: 'from-cyan-500 to-blue-600',
    featured: true,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing component-driven architecture and real-world implementations
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="gradient-border p-8 rounded-2xl card-hover">
                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Project Info */}
                  <div className="lg:col-span-3 space-y-6">
                    <div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.subtitle}
                      </span>
                      <h3 className="font-display text-3xl font-bold mt-2 mb-4">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm"
                      >
                        <Github size={18} />
                        View Code
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary hover:text-primary transition-colors"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </motion.button>
                    </div>
                  </div>

                  {/* Key Components */}
                  <div className="lg:col-span-2">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      Key Components
                    </h4>
                    <div className="space-y-3">
                      {project.components.map((component, compIndex) => (
                        <motion.div
                          key={component.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 + compIndex * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <component.icon className="text-primary" size={20} />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">{component.name}</h5>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {component.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
