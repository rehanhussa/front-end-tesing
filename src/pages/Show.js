import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Show(props) {
  // set up nav function with the useNavigate hook
  const navigate = useNavigate();
  const { id } = useParams();
  const cats = props.cats;
  const cat = cats ? cats.find((c) => c._id === id) : null;

  const [editForm, setEditForm] = useState({
    breed: "",
    age: 0,
    description: ""
  });

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm(prevState => ({
      ...prevState,
      [event.target.breed]: event.target.value
    }))
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    props.updateCats(editForm);
  };

  const handleDelete = () => {
    props.deleteCats(cat._id);
    navigate('/');
  };

  const loaded = () => {
    return (
      <>
        <h1>{cat.breed}</h1>
        <h2>{cat.age}</h2>
        <img 
          className="avatar-description" 
          src={cat.description} 
          alt={cat.breed} 
        />
        <button id="delete" onClick={handleDelete}>
          DELETE
        </button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  useEffect(() => {
    if(cat) { 
      setEditForm(cat);
    }
  }, [cat]);

  return (
    <div className="cat">
      { cat ? loaded() : loading() }
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editForm.breed}
          name="breed"
          placeholder="breed"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.age}
          name="age"
          placeholder="age"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cat" />
      </form>
    </div>
  );
}

export default Show;