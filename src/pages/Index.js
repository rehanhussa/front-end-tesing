
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    breed: '',
    description: '',
    age: 0,
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm((prevState) => ({
      ...prevState,
      [event.target.breed]: event.target.value,
    }));
  }

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createCat(newForm);
    setNewForm({
      breed: '',
      description: '',
      age: 0,
    });
  };

  // loaded function
  const loaded = () => {
    return props.cats.map((cat) => (
      <div key={cat._id} className="cat">
        <Link to={`/cats/${cat._id}`}>
          <h1>{cat.breed}</h1>
        </Link>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section className="cat-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.breed}
          name="breed"
          placeholder="breed"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.age}
          name="age"
          placeholder="age"
          onChange={handleChange}
        />
        <input type="submit" value="Create Cat" />
      </form>
      {props.cats ? loaded() : loading()}
    </section>
  );
}

export default Index;