import Section from './section.js'
import CoreConcept from './CoreConcept.js'
import { CORE_CONCEPTS, EXAMPLES } from '../data.js'
import TabButton from './TabButton.js';

interface MainProps {
  onSelect: (selectedButton: string) => void;
  selectedTab: string;
}
const Main = ({ onSelect, selectedTab }: MainProps) => {
  const tabContent = EXAMPLES[selectedTab as keyof typeof EXAMPLES];

  return (
    <main>
      <Section />

      <section>
        <h2>A la fin de ce cours</h2>
        <p>Le JSX et les composants n'auront plus aucun secrets pour vous !</p>
      </section>

      <section id="core-concepts">
        <h2>Les concepts clés</h2>
        <ul>
          {CORE_CONCEPTS.map((concept) => (
            <CoreConcept key={concept.title} title={concept.title} description={concept.description} image={concept.image} />
          ))}
        </ul>
      </section>

      <section id="examples">
        <h2>Exemples</h2>
        <menu>
          <TabButton onSelect={() => onSelect('Components')}>Composants</TabButton>
          <TabButton onSelect={() => onSelect('JSX')}>JSX</TabButton>
          <TabButton onSelect={() => onSelect('Props')}>Props</TabButton>
          <TabButton onSelect={() => onSelect('State')}>State</TabButton>
        </menu>
        <div id="tab-content">
          <h3>{tabContent.title}</h3>
          <p>{tabContent.description}</p>
          <pre>
            <code>{tabContent.code}</code>
          </pre>
        </div>
      </section>
    </main>
  );
};
export default Main;