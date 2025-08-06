
interface Person {
  fullName: string,
  age: number,

  address: Address,
  isAlive?: boolean
}

interface Address {
  country: string,
  houseNo: number
}


export const ObjectLiterals = () => {

  const person: Person = {
    fullName: 'Mi nombre',
    age: 30,
    address: {
      country: 'London',
      houseNo: 612
    }
  }

  return (
    <>
      <h3>Objetos Literales</h3>

      <pre>
        {JSON.stringify(person, null, 2)}
      </pre>
    </>
  )
}
