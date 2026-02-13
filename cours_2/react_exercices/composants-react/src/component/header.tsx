const header =() => {
  const getrandomstring = (tableau: string[]) => {
    return tableau[Math.floor(Math.random() * tableau.length)];
  }
return (
	<>
	<img src="src/assets/react.svg" className="logo react" alt="React logo" />
          <h1>Bienvenue sur mon app React</h1>
          <h2>{getrandomstring(["A", "B", "C"])}</h2>
	</>
  );
};
export default header;

