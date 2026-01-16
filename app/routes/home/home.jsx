import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
  id="project-1"
  sectionRef={projectOne}
  visible={visibleSections.includes(projectOne.current)}
  index={1}
  title="SIT CPREP — Clinical Preparedness Medical Simulation"
  description="Real-world medical simulation scenarios for radiographers and physiotherapists. Built ECS-inspired systems for scenario flow, assessment, and state management, plus authoring & workflow automation tools for rapid content creation. Integrated LMS + Learning Record Store (xAPI) for analytics-driven training."
  buttonText="View project"
  buttonLink="/projects/sit-cprep"
  model={{
    type: 'laptop',
    alt: 'SIT CPREP simulation authoring and assessment workflow',
    textures: [
      {
        srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
        placeholder: sprTexturePlaceholder,
      },
    ],
  }}
/>

<ProjectSummary
  id="project-2"
  alternate
  sectionRef={projectTwo}
  visible={visibleSections.includes(projectTwo.current)}
  index={2}
  title="JLG Crane — VR Digital Twin Training"
  description="VR-based digital twin enabling real-time crane operation and training. Implemented system-driven simulation logic for interaction, physics coordination, and safety validation, with performance-focused architecture for reliable training workflows."
  buttonText="View project"
  buttonLink="/projects/jlg-crane-digital-twin"
  model={{
    type: 'phone',
    alt: 'JLG Crane VR digital twin interaction and telemetry views',
    textures: [
      {
        srcSet: `${gamestackTexture} 375w, ${gamestackTextureLarge} 750w`,
        placeholder: gamestackTexturePlaceholder,
      },
      {
        srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2Large} 750w`,
        placeholder: gamestackTexture2Placeholder,
      },
    ],
  }}
/>

<ProjectSummary
  id="project-3"
  sectionRef={projectThree}
  visible={visibleSections.includes(projectThree.current)}
  index={3}
  title="Bus Simulator BD — 2M+ Downloads"
  description="Large-scale Android driving simulation with 2M+ downloads. Optimized vehicle physics and rendering for low-end devices, contributed to scalable gameplay systems, and improved long-term performance stability for live product growth."
  buttonText="View project"
  buttonLink="/projects/bus-simulator-bd"
  model={{
    type: 'laptop',
    alt: 'Bus Simulator BD gameplay and performance optimization showcase',
    textures: [
      {
        srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
        placeholder: sliceTexturePlaceholder,
      },
    ],
  }}
/>

      <Footer />
    </div>
  );
};
