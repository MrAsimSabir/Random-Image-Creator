import { useCallback, useEffect, useState } from 'react';
import './index.css'; // Tailwind styles
import './App.css';

function App() {
  const [dogeImage, setDogeImage] = useState('');
  const [catImage, setCatImage] = useState('');
  const [rabbitImage, setRabbitImage] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch a dog image
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error("Failed to load");
      }
      const data = await response.json();
      setDogeImage(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch a cat image
  const fetchData2 = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) {
        throw new Error("Failed to load");
      }
      const data = await response.json();
      setCatImage(data[0].url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch a placeholder image for rabbit
  const fetchData3 = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://placekitten.com/300/300'); // Placeholder for rabbit
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      setRabbitImage(response.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch images on mount
  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
  }, [fetchData, fetchData2, fetchData3]);

  // Handle image selection
  const handleImageSelection = useCallback(
    (animal) => {
      if (animal === 'dog') {
        setImage(dogeImage);
        fetchData();
      } else if (animal === 'cat') {
        setImage(catImage);
        fetchData2();
      } else if (animal === 'rabbit') {
        setImage(rabbitImage);
        fetchData3();
      }
    },
    [dogeImage, catImage, rabbitImage, fetchData, fetchData2, fetchData3]
  );

  return (
    <div className="largebox">
      <div className="selectionbox">
        <div className="doge">
          <button onClick={() => handleImageSelection('dog')}>Doge</button>
        </div>
        <div className="rabbit">
          <button onClick={() => handleImageSelection('rabbit')}>Rabbit</button>
        </div>
        <div className="cat">
          <button onClick={() => handleImageSelection('cat')}>Cat</button>
        </div>
        <div className="horse">
          <button>Horse</button>
        </div>
        <div className="parrot">
          <button>Parrot</button>
        </div>
        <div className="eagle">
          <button>Eagle</button>
        </div>
      </div>
      <div className='image'>
        {loading ? (
          <div className='text'>Loading...</div>
        ) : (
          image && <img src={image} alt="Random Animal" />
        )}
      </div>
    </div>
  );
}

export default App;
