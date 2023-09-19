import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
  const [cats, setCat] = useState(null);

  const URL = `http://localhost:3001/api/cats`;
  //change this to your own heroku backend url

  const getCat = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setCat(data);
    } catch (error) {
      // TODO: Add a task we'd like to perform in the event of an error
    }
  };

  const createCat = async (cat) => {
    try {
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(cat),
      });
      getCat();
    } catch (error) {
      // TODO: Add a task we'd like to perform in the event of an error
    }
  };

  const updateCat = async (cat) => {
    console.log(cat._id)
    await fetch(URL + '/' + cat._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(cat),
    });
    // update list of cat
    getCat();
  };

  const deleteCat = async (id) => {
    await fetch(URL + '/' + id, {
      method: 'DELETE',
    });
    getCat();
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <main>
      <Routes>
        <Route 
          path="/" 
          element={
            <Index 
              cats={cats} 
              createCat={createCat} 
            />
          }
        />
        <Route
            path="/cats/:id"
            element={
                <Show
                cats={cats}
                updateCat={updateCat}
                deleteCat={deleteCat}
                />
            }
            />
      </Routes>
      
    </main>
  );
}

export default Main;