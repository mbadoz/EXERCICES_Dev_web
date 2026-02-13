import componentLogo from './assets/package_google.png';
import propsLogo from './assets/gear_google.png';
import jsxLogo from './assets/jsx.png';
import stateLogo from './assets/database.png';

export const CORE_CONCEPTS = [
  {
    image: componentLogo,
    title: 'Components',
    description:
      'Le concept de base de toutes les applications web modernes, on créé les interfaces en combinant les composants.',
  },
  {
    image: jsxLogo,
    title: 'JSX',
    description:
      "Un mélange de HTML et de Javascript permettant une meilleur flexibilité dans l'affichage.",
  },
  {
    image: propsLogo,
    title: 'Props',
    description:
      "Permet aux composant d'être configurable et réutilisable en leurs injectant des données.",
  },
  {
    image: stateLogo,
    title: 'State',
    description:
      "Données du composants qui une fois changés déclenche un nouveau rendu du composant et une maj de l'ui.",
  },
];
export const EXAMPLES = {
  "empty": {
    "title": "Please click a button",
    "description": "",
    "code": "",
  },
  "Components": {
    "title": 'Components',
    "description":
      'Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
    "code": `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  "JSX": {
    "title": 'JSX',
    "description":
      'JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).',
    "code": `
<div>
<h1>Welcome {userName}</h1>
<p>Time to learn React!</p>
</div>`,
  },
  "Props": {
    "title": 'Props',
    "description":
      'Components accept arbitrary inputs called props. They are like function arguments.',
    "code": `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  "State": {
    "title": 'State',
    "description":
      'State allows React components to change their output over time in response to user actions, network responses, and anything else.',
    "code": `
function Counter() {
  const [isVisible, setIsVisible] = useState(false);
 
  function handleClick() {
    setIsVisible(true);
  }
 
  return (
<div>
<button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Amazing details!</p>}
</div>
  );
}`,
  },
};
